const MarSciAPI = {
    getAuthToken: () => localStorage.getItem('marsci_token'),
    setAuthToken: (token) => localStorage.setItem('marsci_token', token),
    clearAuthToken: () => localStorage.removeItem('marsci_token'),

    authenticatedFetch: async (url, options = {}) => {
        const token = MarSciAPI.getAuthToken();
        if (!token && !window.location.pathname.endsWith('/login')) {
            window.location.href = '/login';
            return;
        }

        const headers = {
            ...options.headers,
            'Authorization': `Bearer ${token}`
        };

        const response = await fetch(url, { ...options, headers });

        if (response.status === 401 && !window.location.pathname.endsWith('/login')) {
            MarSciAPI.clearAuthToken();
            window.location.href = '/login';
            return;
        }

        return response;
    },

    getHistory: async () => {
        const response = await MarSciAPI.authenticatedFetch('/v1/diagnosis-history');
        return response ? await response.json() : null;
    },

    getDetail: async (runId) => {
        const response = await MarSciAPI.authenticatedFetch(`/v1/diagnosis-history/${runId}`);
        return response ? await response.json() : null;
    },

    getComparison: async (runId) => {
        const response = await MarSciAPI.authenticatedFetch(`/v1/diagnosis-history/${runId}/comparison`);
        return response ? await response.json() : null;
    },

    getImpactSummary: async () => {
        const response = await MarSciAPI.authenticatedFetch('/v1/impact-summary');
        return response ? await response.json() : null;
    },

    getExecutiveOverview: async () => {
        const response = await MarSciAPI.authenticatedFetch('/v1/executive-overview');
        return response ? await response.json() : null;
    },

    getExportPreview: async (runId) => {
        const response = await MarSciAPI.authenticatedFetch(`/v1/export-preview/google-sheets/${runId}`);
        return response ? await response.json() : null;
    }
};
