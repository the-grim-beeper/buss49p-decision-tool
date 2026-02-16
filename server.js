const express = require('express');
const Anthropic = require('@anthropic-ai/sdk');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const path = require('path');
const fs = require('fs');

// ── Persistence paths ──
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
const UPLOADS_DIR = path.join(DATA_DIR, 'uploads');
const DATA_FILE = path.join(DATA_DIR, 'changes.json');
const DOCS_FILE = path.join(DATA_DIR, 'documents.json');
const TREE_FILE = path.join(DATA_DIR, 'tree.json');

// Ensure upload directory exists
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

function loadData() {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, JSON.stringify({ changelog: [], overrides: {} }));
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch {
    return { changelog: [], overrides: {} };
  }
}

function saveData(data) {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// ── Document persistence ──
function loadDocuments() {
  try {
    if (!fs.existsSync(DOCS_FILE)) fs.writeFileSync(DOCS_FILE, JSON.stringify({ documents: [] }));
    return JSON.parse(fs.readFileSync(DOCS_FILE, 'utf8'));
  } catch {
    return { documents: [] };
  }
}

function saveDocuments(docs) {
  fs.writeFileSync(DOCS_FILE, JSON.stringify(docs, null, 2));
}

// ── Override rebuild logic ──
// Rebuilds overrides from changelog, skipping entries whose documentId belongs to an excluded document
function rebuildOverrides(changelog, documents) {
  const excludedDocIds = new Set(
    documents.filter(d => !d.included).map(d => d.id)
  );
  const overrides = {};
  for (const entry of changelog) {
    if (entry.documentId && excludedDocIds.has(entry.documentId)) continue;
    const key = `${entry.nodeId}::${entry.company}`;
    overrides[key] = { score: entry.newScore, rationale: entry.newRationale };
  }
  return overrides;
}

// ── Multer config for PDF uploads ──
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, UPLOADS_DIR),
    filename: (req, file, cb) => {
      const id = `doc_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      req.docId = id;
      cb(null, `${id}.pdf`);
    }
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') cb(null, true);
    else cb(new Error('Only PDF files are allowed'));
  },
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB
});

// ── API key: set via ANTHROPIC_API_KEY env var (Railway) or paste here for local use ──
const API_KEY = process.env.ANTHROPIC_API_KEY || '';
// ─────────────────────────────────────────

const app = express();
app.use(express.json({ limit: '10mb' }));

// ── Password protection ──
// Set SITE_PASSWORD env var on Railway, or leave empty to disable
const SITE_PASSWORD = process.env.SITE_PASSWORD || '';

if (SITE_PASSWORD) {
  app.use((req, res, next) => {
    const auth = req.headers.authorization;
    if (auth) {
      const [, encoded] = auth.split(' ');
      const [, password] = Buffer.from(encoded, 'base64').toString().split(':');
      if (password === SITE_PASSWORD) return next();
    }
    res.set('WWW-Authenticate', 'Basic realm="Buss 49P Decision Tool"');
    res.status(401).send('Access denied');
  });
}

app.use(express.static(path.join(__dirname, 'public')));

const anthropic = new Anthropic(API_KEY ? { apiKey: API_KEY } : undefined);

// ── Score change API endpoints ──
app.get('/api/changes', (req, res) => {
  res.json(loadData());
});

app.post('/api/changes', (req, res) => {
  const entry = req.body;
  const data = loadData();
  data.changelog.push(entry);
  const key = `${entry.nodeId}::${entry.company}`;
  data.overrides[key] = { score: entry.newScore, rationale: entry.newRationale };
  saveData(data);
  res.json(data);
});

app.delete('/api/changes/:index', (req, res) => {
  const idx = parseInt(req.params.index, 10);
  const data = loadData();
  if (idx < 0 || idx >= data.changelog.length) {
    return res.status(400).json({ error: 'Invalid index' });
  }
  data.changelog.splice(idx, 1);
  const docs = loadDocuments();
  data.overrides = rebuildOverrides(data.changelog, docs.documents);
  saveData(data);
  res.json(data);
});

app.post('/api/changes/reset', (req, res) => {
  const data = { changelog: [], overrides: {} };
  saveData(data);
  res.json(data);
});

// ── Document API endpoints ──
app.get('/api/documents', (req, res) => {
  res.json(loadDocuments());
});

app.post('/api/documents/upload', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No PDF file provided' });

    const docId = req.docId;
    const pdfPath = path.join(UPLOADS_DIR, `${docId}.pdf`);

    // Extract text from PDF
    const pdfBuffer = fs.readFileSync(pdfPath);
    let extractedText = '';
    try {
      const pdfData = await pdfParse(pdfBuffer);
      extractedText = pdfData.text;
    } catch (e) {
      console.error('PDF parse error:', e.message);
    }

    const doc = {
      id: docId,
      filename: req.file.originalname,
      uploadedAt: new Date().toISOString(),
      included: true,
      status: 'uploaded',
      extractedText: extractedText.slice(0, 100000), // cap stored text
      suggestions: []
    };

    const docs = loadDocuments();
    docs.documents.push(doc);
    saveDocuments(docs);

    // Return doc without the full extracted text to keep response small
    const { extractedText: _, ...docMeta } = doc;
    res.json(docMeta);
  } catch (error) {
    console.error('Upload error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/documents/:id/analyze', async (req, res) => {
  try {
    const docs = loadDocuments();
    const doc = docs.documents.find(d => d.id === req.params.id);
    if (!doc) return res.status(404).json({ error: 'Document not found' });

    const { leafNodes } = req.body;
    if (!leafNodes || !leafNodes.length) {
      return res.status(400).json({ error: 'leafNodes array required' });
    }

    doc.status = 'analyzing';
    saveDocuments(docs);

    // Build analysis prompt
    const docText = (doc.extractedText || '').slice(0, 50000);
    const criteriaJson = JSON.stringify(leafNodes, null, 2);

    const analysisPrompt = `You are analyzing a document against a military bus procurement decision framework.
Below is the extracted text from "${doc.filename}".

<document>
${docText}
</document>

Below are the leaf-level decision criteria. For each criterion where the document
contains relevant information, suggest updated scores for one or more companies.

<criteria>
${criteriaJson}
</criteria>

Companies: Scania (scania), Volvo Buses (volvo), MAN Truck & Bus (man)

Respond with ONLY a JSON array of suggestions:
[{
  "nodeId": "perf-engine-power",
  "company": "scania",
  "suggestedScore": 9.5,
  "rationale": "Brief justification based on document evidence",
  "confidence": "high|medium|low",
  "excerpt": "Relevant quote or page reference from document"
}]

Only include nodes/companies where the document provides meaningful evidence.
Do not suggest scores where the document is silent or irrelevant.`;

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 8192,
      messages: [{ role: 'user', content: analysisPrompt }]
    });

    const responseText = response.content[0].text;

    // Parse JSON from response (handle markdown code blocks)
    let suggestions = [];
    try {
      const jsonMatch = responseText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        suggestions = JSON.parse(jsonMatch[0]);
      }
    } catch (e) {
      console.error('Failed to parse AI suggestions:', e.message);
      doc.status = 'error';
      saveDocuments(docs);
      return res.status(500).json({ error: 'Failed to parse AI response' });
    }

    doc.suggestions = suggestions;
    doc.status = 'analyzed';
    saveDocuments(docs);

    res.json({ id: doc.id, status: doc.status, suggestions: doc.suggestions });
  } catch (error) {
    console.error('Analysis error:', error.message);
    // Update status to error
    const docs = loadDocuments();
    const doc = docs.documents.find(d => d.id === req.params.id);
    if (doc) { doc.status = 'error'; saveDocuments(docs); }
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/documents/:id', (req, res) => {
  const docs = loadDocuments();
  const doc = docs.documents.find(d => d.id === req.params.id);
  if (!doc) return res.status(404).json({ error: 'Document not found' });

  if (req.body.included !== undefined) {
    doc.included = req.body.included;
  }
  saveDocuments(docs);

  // Rebuild overrides with updated inclusion state
  const data = loadData();
  data.overrides = rebuildOverrides(data.changelog, docs.documents);
  saveData(data);

  res.json({ document: { id: doc.id, included: doc.included }, changes: data });
});

app.delete('/api/documents/:id', (req, res) => {
  const docs = loadDocuments();
  const docIndex = docs.documents.findIndex(d => d.id === req.params.id);
  if (docIndex === -1) return res.status(404).json({ error: 'Document not found' });

  const docId = docs.documents[docIndex].id;
  docs.documents.splice(docIndex, 1);
  saveDocuments(docs);

  // Remove uploaded PDF file
  const pdfPath = path.join(UPLOADS_DIR, `${docId}.pdf`);
  if (fs.existsSync(pdfPath)) fs.unlinkSync(pdfPath);

  // Remove changelog entries from this document and rebuild overrides
  const data = loadData();
  data.changelog = data.changelog.filter(e => e.documentId !== docId);
  data.overrides = rebuildOverrides(data.changelog, docs.documents);
  saveData(data);

  res.json({ documents: docs, changes: data });
});

// ── Scenario Analysis endpoint ──
app.post('/api/scenarios/analyze', async (req, res) => {
  try {
    const { scenario, leafNodes } = req.body;
    if (!scenario || !leafNodes || !leafNodes.length) {
      return res.status(400).json({ error: 'scenario and leafNodes array required' });
    }

    const criteriaJson = JSON.stringify(leafNodes, null, 2);

    const analysisPrompt = `You are analyzing a hypothetical scenario for the FMV Buss 49P military bus procurement.

<scenario>
${scenario}
</scenario>

Below are the leaf-level decision criteria with current scores.

<criteria>
${criteriaJson}
</criteria>

Companies: Scania (scania), Volvo Buses (volvo), MAN Truck & Bus (man)

Given this scenario, suggest how scores would change. Respond with ONLY a JSON array:
[{
  "nodeId": "...",
  "company": "...",
  "suggestedScore": 9.5,
  "rationale": "Brief justification",
  "confidence": "high|medium|low"
}]

Only include nodes/companies where the scenario meaningfully affects the score.
Do not repeat unchanged scores.`;

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 8192,
      messages: [{ role: 'user', content: analysisPrompt }]
    });

    const responseText = response.content[0].text;

    let suggestions = [];
    try {
      const jsonMatch = responseText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        suggestions = JSON.parse(jsonMatch[0]);
      }
    } catch (e) {
      console.error('Failed to parse scenario suggestions:', e.message);
      return res.status(500).json({ error: 'Failed to parse AI response' });
    }

    res.json({ suggestions });
  } catch (error) {
    console.error('Scenario analysis error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

const SYSTEM_PROMPT = `You are an expert analyst specializing in Swedish defence procurement, military vehicle logistics, and commercial bus platforms adapted for military use. You have deep knowledge of the FMV Buss 49P military bus procurement programme.

Key context:
- FMV (Forsvarets materielverk) is procuring 60 military buses designated "Buss 49P" (49-passenger) with an option for 30 additional units
- Programme value: 513.8 million SEK
- The buses are for Forsvarsmakten (Swedish Armed Forces) to transport soldiers on highways and roads with some rough road capability
- Open procedure under EU Directive 2014/24/EU
- Buses must balance commercial highway performance with military durability and field serviceability
- Key requirements include troop transport capacity (49 passengers), luggage/equipment storage, rough road tolerance, cold climate operation, and NATO interoperability considerations

Three candidates:
1. Scania (scania) - Touring HD / Interlink platform. Swedish manufacturer headquartered in Sodertalje. Strong military vehicle heritage through decades of supplying trucks and engines to Forsvarsmakten. Part of TRATON Group (Volkswagen). Established Swedish service network.
2. Volvo Buses (volvo) - 9700 / 8900 platform. Swedish manufacturer headquartered in Gothenburg. Part of Volvo Group which includes Volvo Defense (formerly Arquus partnership). Extensive Nordic dealer and service network. Long history with Swedish public transport and military logistics.
3. MAN Truck & Bus (man) - Lion's Coach platform. German manufacturer, also part of TRATON Group. Strong European military truck heritage (HX series). Competitive lifecycle cost profile. Growing Nordic service infrastructure.

Evaluation pillars (estimated weights): Vehicle Performance 30%, Delivery & Schedule 25%, Lifecycle Cost 25%, Industrial & Operational Fit 20%

Be specific, analytical, and reference real programme details. When suggesting improvements or actions, be concrete and actionable. When debating scores, present evidence-based arguments.`;

app.post('/api/chat', async (req, res) => {
  try {
    const { messages, context } = req.body;

    const systemMessage = SYSTEM_PROMPT + (context ? `\n\nCurrent context: ${context}` : '');

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 8192,
      system: systemMessage,
      messages: messages
    });

    res.json({
      content: response.content[0].text
    });
  } catch (error) {
    console.error('API Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// ── Tree Structure API endpoints ──
app.get('/api/tree', (req, res) => {
  try {
    if (fs.existsSync(TREE_FILE)) {
      const tree = JSON.parse(fs.readFileSync(TREE_FILE, 'utf8'));
      return res.json({ tree });
    }
    res.json({ tree: null });
  } catch (err) {
    console.error('Failed to load tree:', err.message);
    res.json({ tree: null });
  }
});

app.post('/api/tree', (req, res) => {
  const { tree } = req.body;
  if (!tree || !tree.id || !tree.label || !tree.children) {
    return res.status(400).json({ error: 'Invalid tree: must have id, label, and children' });
  }
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(TREE_FILE, JSON.stringify(tree, null, 2));
    res.json({ success: true });
  } catch (err) {
    console.error('Failed to save tree:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/tree', (req, res) => {
  try {
    if (fs.existsSync(TREE_FILE)) fs.unlinkSync(TREE_FILE);
    res.json({ success: true });
  } catch (err) {
    console.error('Failed to delete tree:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/tree/ai-balance', async (req, res) => {
  try {
    const { node, originalTree } = req.body;
    if (!node || !node.children || !node.children.length) {
      return res.status(400).json({ error: 'Node must have children to balance' });
    }

    const prompt = `You are helping balance weights in a decision tree for the FMV Buss 49P military bus procurement.

The original reference tree had these weights:
<original>${JSON.stringify(originalTree, null, 2)}</original>

The user has modified the tree. Balance the weights of this node's children so they sum to 100%.
Consider the original weights as guidance for reasonable proportions.

<node>${JSON.stringify(node, null, 2)}</node>

Return ONLY a JSON object with the same structure but with adjusted "weight" fields (as strings like "35%").
All children weights must sum to exactly 100%. Preserve all other fields unchanged.`;

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 8192,
      messages: [{ role: 'user', content: prompt }]
    });

    const responseText = response.content[0].text;
    let balancedNode;
    try {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        balancedNode = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (e) {
      console.error('Failed to parse AI balance response:', e.message);
      return res.status(500).json({ error: 'Failed to parse AI response' });
    }

    res.json({ balancedNode });
  } catch (error) {
    console.error('AI balance error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`\n  Buss 49P Decision Tool running at http://localhost:${PORT}\n`);
});
