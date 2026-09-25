const API_BASE = 'http://localhost:5000/api';

const getAuthHeaders = (extraHeaders = {}) => {
  const token = localStorage.getItem('reconstructx_token') || localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...extraHeaders
  };
};

export const api = {
  // Auth
  login: async (email, password) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Authentication failed');
    return data;
  },

  register: async (name, email, password, role = 'INVESTIGATOR') => {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Registration failed');
    return data;
  },

  // Dashboard stats
  getDashboardStats: async () => {
    const res = await fetch(`${API_BASE}/dashboard/stats`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  // Cases (Scoped)
  getCases: async () => {
    const res = await fetch(`${API_BASE}/cases`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  getCaseById: async (id) => {
    const res = await fetch(`${API_BASE}/cases/${id}`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  createCase: async (caseData) => {
    const res = await fetch(`${API_BASE}/cases`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(caseData)
    });
    return res.json();
  },

  // Storage & Upload
  getStorageSources: async (caseId) => {
    const res = await fetch(`${API_BASE}/cases/${caseId}/storage-sources`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  uploadEvidence: async (caseId, file) => {
    const token = localStorage.getItem('reconstructx_token') || localStorage.getItem('token');
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`${API_BASE}/cases/${caseId}/upload`, {
      method: 'POST',
      headers: token ? { 'Authorization': `Bearer ${token}` } : {},
      body: formData
    });
    return res.json();
  },

  generateDemoEvidence: async (caseId) => {
    const res = await fetch(`${API_BASE}/cases/${caseId}/generate-demo-evidence`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    return res.json();
  },

  // Analysis & Recovery
  triggerAnalysis: async (caseId) => {
    const res = await fetch(`${API_BASE}/cases/${caseId}/analyze`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    return res.json();
  },

  getFragments: async (caseId) => {
    const res = await fetch(`${API_BASE}/cases/${caseId}/fragments`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  getRelationships: async (caseId) => {
    const res = await fetch(`${API_BASE}/cases/${caseId}/relationships`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  getRecoveredFiles: async (caseId) => {
    const res = await fetch(`${API_BASE}/cases/${caseId}/recovered-files`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  getAuditLogs: async (caseId) => {
    const res = await fetch(`${API_BASE}/cases/${caseId}/audit-logs`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  getNotifications: async () => {
    const res = await fetch(`${API_BASE}/notifications`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  // AI Assistant
  askAiAssistant: async (data) => {
    const res = await fetch(`${API_BASE}/ai/explain-recovery`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return res.json();
  }
};
