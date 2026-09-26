import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { KNOWLEDGE_BASE, KnowledgeDoc } from "./server/knowledgeBase.js";
import { executeRAGQuery } from "./server/ragEngine.js";
import {
  classifyProduct,
  checkABSCompliance,
  checkTKDLPriorArt,
  getKnowledgeGraphData
} from "./server/regulatoryServices.js";
import { AuditLogEntry, EscalationRequest } from "./src/types.js";

dotenv.config();

// In-memory runtime storage for dynamic documents, audit logs, and escalation tickets
let documentsList: KnowledgeDoc[] = [...KNOWLEDGE_BASE];

const auditLogs: AuditLogEntry[] = [
  {
    id: 'log-seed-1',
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    query: 'I developed a new Ayurvedic formulation. Can I patent it?',
    jurisdiction: 'india',
    language: 'en',
    retrievedDocTitles: [
      'Section 3(p) – Traditional Knowledge Non-Patentability Exclusion',
      'Section 3(e) – Mere Admixture vs. Non-Obvious Synergism'
    ],
    confidenceScore: 92,
    confidenceLevel: 'high',
    escalationStatus: false
  },
  {
    id: 'log-seed-2',
    timestamp: new Date(Date.now() - 3600000 * 1).toISOString(),
    query: 'I want to sell my Ayurvedic herbal product in the USA. What should I consider?',
    jurisdiction: 'international',
    language: 'en',
    retrievedDocTitles: [
      'USA Export Guide: FDA Dietary Supplements (DSHEA 1994 & 21 CFR 111)',
      'Ayush Standard & Premium Quality Mark Scheme'
    ],
    confidenceScore: 89,
    confidenceLevel: 'high',
    escalationStatus: false
  }
];

const escalationsList: EscalationRequest[] = [];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // --- API ROUTES FIRST ---

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      service: "IP-SAKTI Sahayak Backend",
      version: "1.0.0-sih2026",
      hasGeminiApiKey: Boolean(process.env.GEMINI_API_KEY)
    });
  });

  // 1. RAG AI Chatbot Endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { query, jurisdiction = 'india', language = 'en' } = req.body;

      if (!query || typeof query !== 'string' || query.trim().length === 0) {
        res.status(400).json({ error: "Query string is required" });
        return;
      }

      const cleanQuery = query.trim();
      const cleanJurisdiction = jurisdiction === 'international' ? 'international' : 'india';

      const ragResponse = await executeRAGQuery(cleanQuery, cleanJurisdiction, language);

      // Audit Logging (aligned with DPDP Act - storing only query, timestamp, metrics, no sensitive PII)
      const logEntry: AuditLogEntry = {
        id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        timestamp: new Date().toISOString(),
        query: cleanQuery,
        jurisdiction: cleanJurisdiction,
        language,
        retrievedDocTitles: ragResponse.sources.map(s => s.title),
        confidenceScore: ragResponse.confidence.score,
        confidenceLevel: ragResponse.confidence.level,
        escalationStatus: ragResponse.escalationRecommended
      };
      auditLogs.unshift(logEntry);
      if (auditLogs.length > 200) auditLogs.pop(); // keep recent 200

      res.json(ragResponse);
    } catch (error: any) {
      console.error("Error in /api/chat:", error);
      res.status(500).json({
        error: "Failed to process RAG query",
        details: error?.message || "Internal server error"
      });
    }
  });

  // 2. Product Classification Engine
  app.post("/api/classify", (req, res) => {
    try {
      const input = req.body;
      const result = classifyProduct(input);
      res.json(result);
    } catch (error: any) {
      console.error("Error in /api/classify:", error);
      res.status(500).json({ error: "Failed to classify product", details: error?.message });
    }
  });

  // 3. Access and Benefit Sharing (ABS) Compliance Checker
  app.post("/api/abs-check", (req, res) => {
    try {
      const input = req.body;
      const result = checkABSCompliance(input);
      res.json(result);
    } catch (error: any) {
      console.error("Error in /api/abs-check:", error);
      res.status(500).json({ error: "Failed to check ABS compliance", details: error?.message });
    }
  });

  // 4. TKDL & Prior Art Analysis
  app.post("/api/prior-art", (req, res) => {
    try {
      const input = req.body;
      const result = checkTKDLPriorArt(input);
      res.json(result);
    } catch (error: any) {
      console.error("Error in /api/prior-art:", error);
      res.status(500).json({ error: "Failed to check prior art", details: error?.message });
    }
  });

  // 5. Relational Knowledge Graph
  app.get("/api/knowledge-graph", (_req, res) => {
    try {
      const data = getKnowledgeGraphData();
      res.json(data);
    } catch (error: any) {
      console.error("Error in /api/knowledge-graph:", error);
      res.status(500).json({ error: "Failed to fetch knowledge graph", details: error?.message });
    }
  });

  // 6. Document Management & Repository
  app.get("/api/documents", (req, res) => {
    try {
      const { jurisdiction, category } = req.query;
      let docs = documentsList;

      if (jurisdiction) {
        docs = docs.filter(d => d.jurisdiction === jurisdiction || d.jurisdiction === 'both');
      }
      if (category) {
        docs = docs.filter(d => d.category.toLowerCase() === String(category).toLowerCase());
      }

      res.json(docs);
    } catch (error: any) {
      console.error("Error in /api/documents:", error);
      res.status(500).json({ error: "Failed to fetch documents", details: error?.message });
    }
  });

  // Add / Upload New Document (Admin)
  app.post("/api/documents", (req, res) => {
    try {
      const {
        title,
        organization,
        jurisdiction,
        category,
        actOrRule,
        sectionArticle,
        effectiveDate,
        officialUrl,
        content,
        keywords = []
      } = req.body;

      if (!title || !content || !actOrRule) {
        res.status(400).json({ error: "Title, content, and act/rule are required." });
        return;
      }

      const newDoc: KnowledgeDoc = {
        id: `doc-custom-${Date.now()}`,
        title,
        organization: organization || 'Government Regulatory Authority',
        jurisdiction: jurisdiction || 'india',
        category: category || 'Patents',
        actOrRule,
        sectionArticle: sectionArticle || 'General Provision',
        effectiveDate: effectiveDate || new Date().toISOString().split('T')[0],
        lastUpdated: new Date().toISOString().split('T')[0],
        version: '1.0 (Admin Uploaded)',
        isAuthoritative: true,
        officialUrl: officialUrl || 'https://ayush.gov.in',
        keywords: Array.isArray(keywords) ? keywords : String(keywords).split(',').map(k => k.trim()),
        content,
        status: 'active'
      };

      documentsList.unshift(newDoc);
      res.status(201).json(newDoc);
    } catch (error: any) {
      console.error("Error in POST /api/documents:", error);
      res.status(500).json({ error: "Failed to add document", details: error?.message });
    }
  });

  // Delete Document (Admin)
  app.delete("/api/documents/:id", (req, res) => {
    try {
      const { id } = req.params;
      const initialCount = documentsList.length;
      documentsList = documentsList.filter(d => d.id !== id);

      if (documentsList.length === initialCount) {
        res.status(404).json({ error: "Document not found" });
        return;
      }
      res.json({ message: "Document deleted successfully", id });
    } catch (error: any) {
      console.error("Error in DELETE /api/documents:", error);
      res.status(500).json({ error: "Failed to delete document", details: error?.message });
    }
  });

  // 7. Admin Audit Logs & Analytics
  app.get("/api/admin/audit-logs", (_req, res) => {
    try {
      const totalQueries = auditLogs.length;
      const highConfidence = auditLogs.filter(l => l.confidenceLevel === 'high').length;
      const moderateConfidence = auditLogs.filter(l => l.confidenceLevel === 'moderate').length;
      const lowConfidence = auditLogs.filter(l => l.confidenceLevel === 'low').length;
      const escalated = auditLogs.filter(l => l.escalationStatus).length;

      res.json({
        logs: auditLogs,
        summary: {
          totalQueries,
          highConfidence,
          moderateConfidence,
          lowConfidence,
          escalated,
          averageConfidence: totalQueries > 0
            ? Math.round(auditLogs.reduce((acc, l) => acc + l.confidenceScore, 0) / totalQueries)
            : 0
        }
      });
    } catch (error: any) {
      console.error("Error in /api/admin/audit-logs:", error);
      res.status(500).json({ error: "Failed to fetch audit logs", details: error?.message });
    }
  });

  // 8. Human Legal Escalation Request
  app.post("/api/escalate", (req, res) => {
    try {
      const { query, jurisdiction, userNotes, contactEmail } = req.body;
      const ticket: EscalationRequest = {
        id: `TKT-SIH-${Math.floor(100000 + Math.random() * 900000)}`,
        timestamp: new Date().toISOString(),
        query: query || 'N/A',
        jurisdiction: jurisdiction || 'india',
        userNotes: userNotes || '',
        contactEmail: contactEmail || 'anonymous-innovator@ayush.sih',
        status: 'pending'
      };
      escalationsList.unshift(ticket);
      res.status(201).json({
        message: "Escalation ticket created successfully. An IP expert or Ayush regulatory attorney will review this brief.",
        ticket
      });
    } catch (error: any) {
      console.error("Error in /api/escalate:", error);
      res.status(500).json({ error: "Failed to create escalation ticket", details: error?.message });
    }
  });

  // --- VITE MIDDLEWARE (DEV) OR STATIC SERVING (PROD) ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[IP-SAKTI Sahayak] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
