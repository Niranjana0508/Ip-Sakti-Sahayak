import {
  RAGResponse,
  Jurisdiction,
  SupportedLanguage,
  ProductClassificationInput,
  ProductClassificationResult,
  ABSInput,
  ABSResult,
  PriorArtCheckInput,
  PriorArtResult,
  KnowledgeGraphData,
  DocumentRecord,
  EscalationRequest
} from '../types';

const API_BASE = '/api';

export async function sendChatMessage(
  query: string,
  jurisdiction: Jurisdiction,
  language: SupportedLanguage
): Promise<RAGResponse> {
  const response = await fetch(`${API_BASE}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, jurisdiction, language })
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || `Server returned error ${response.status}`);
  }

  return response.json();
}

export async function classifyProductApi(
  input: ProductClassificationInput
): Promise<ProductClassificationResult> {
  const response = await fetch(`${API_BASE}/classify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input)
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || `Failed to classify product`);
  }

  return response.json();
}

export async function checkABSApi(input: ABSInput): Promise<ABSResult> {
  const response = await fetch(`${API_BASE}/abs-check`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input)
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || `Failed to evaluate ABS`);
  }

  return response.json();
}

export async function checkPriorArtApi(
  input: PriorArtCheckInput
): Promise<PriorArtResult> {
  const response = await fetch(`${API_BASE}/prior-art`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input)
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || `Failed to search prior art`);
  }

  return response.json();
}

export async function getKnowledgeGraphApi(): Promise<KnowledgeGraphData> {
  const response = await fetch(`${API_BASE}/knowledge-graph`);
  if (!response.ok) {
    throw new Error('Failed to fetch knowledge graph');
  }
  return response.json();
}

export async function getDocumentsApi(
  jurisdiction?: string,
  category?: string
): Promise<DocumentRecord[]> {
  const params = new URLSearchParams();
  if (jurisdiction) params.append('jurisdiction', jurisdiction);
  if (category) params.append('category', category);

  const response = await fetch(`${API_BASE}/documents?${params.toString()}`);
  if (!response.ok) {
    throw new Error('Failed to fetch documents');
  }
  return response.json();
}

export async function addDocumentApi(doc: Partial<DocumentRecord>): Promise<DocumentRecord> {
  const response = await fetch(`${API_BASE}/documents`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(doc)
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to add document');
  }
  return response.json();
}

export async function deleteDocumentApi(id: string): Promise<void> {
  const response = await fetch(`${API_BASE}/documents/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error('Failed to delete document');
  }
}

export async function getAuditLogsApi(): Promise<{
  logs: any[];
  summary: {
    totalQueries: number;
    highConfidence: number;
    moderateConfidence: number;
    lowConfidence: number;
    escalated: number;
    averageConfidence: number;
  };
}> {
  const response = await fetch(`${API_BASE}/admin/audit-logs`);
  if (!response.ok) {
    throw new Error('Failed to fetch audit logs');
  }
  return response.json();
}

export async function submitEscalationApi(data: {
  query: string;
  jurisdiction: string;
  userNotes: string;
  contactEmail: string;
}): Promise<{ message: string; ticket: EscalationRequest }> {
  const response = await fetch(`${API_BASE}/escalate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to submit escalation');
  }
  return response.json();
}
