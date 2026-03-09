document.addEventListener('DOMContentLoaded', async () => {
    const resultView = document.getElementById('result-view');
    if (!resultView) return;

    // 1. Extract diagnosis_run_id from path /result/{id}
    const pathParts = window.location.pathname.split('/');
    const diagnosisRunId = pathParts[pathParts.length - 1];

    if (!diagnosisRunId || diagnosisRunId === 'result') {
        resultView.innerHTML = '<div class="error-card">No diagnosis ID provided.</div>';
        return;
    }

    const renderResult = (data) => {
        const impactRange = data.expected_impact_range || { low: '0%', high: '0%' };
        const recommendedActions = Array.isArray(data.recommended_action) ? data.recommended_action : [];
        const evidencePanel = data.evidence_panel || {};

        resultView.innerHTML = `
            <div class="result-header">
                <div>
                    <h1>${data.pattern_name || 'Diagnosis Result'}</h1>
                    <p class="impact-badge">${impactRange.low} - ${impactRange.high} Target Efficiency Gain</p>
                </div>
                <div class="meta-section">
                    <p>Confidence: <strong>${data.confidence || 'N/A'}</strong></p>
                    <p>Severity: <span class="severity-badge ${(data.severity || 'low').toLowerCase()}">${data.severity || 'Low'}</span></p>
                </div>
            </div>

            <div class="detail-grid">
                <div class="main-info">
                    <h3>Observed KPI Pattern</h3>
                    <div class="kpi-pattern">${data.kpi_pattern || 'N/A'}</div>
                    <p>${data.description || 'No detailed description available.'}</p>
                    
                    <h3>Recommended Actions</h3>
                    <ul class="action-list">
                        ${recommendedActions.length > 0 ?
                recommendedActions.map(a => `<li><strong>• ${a}</strong></li>`).join('') :
                '<li>No specific actions recommended.</li>'}
                    </ul>
                </div>

                <div class="sidebar">
                    <div class="evidence-card">
                        <h4>Evidence Panel</h4>
                        <p>Cause Lane: <strong>${evidencePanel.likely_cause_lane || 'Unknown'}</strong></p>
                        <p>Metric Variance: ${evidencePanel.metric_variance_percent || 'N/A'}</p>
                    </div>
                </div>
            </div>

            <div class="export-actions" style="margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px;">
                <button class="btn btn-primary" id="btn-export-real" data-id="${diagnosisRunId}">Create Real Google Sheet</button>
                <p id="export-status" class="info-note" style="display:none;"></p>
            </div>
        `;

        document.getElementById('btn-export-real').addEventListener('click', async (e) => {
            const btn = e.target;
            const status = document.getElementById('export-status');
            btn.disabled = true;
            status.style.display = 'block';
            status.textContent = 'Writing to Google Drive...';

            try {
                const response = await MarSciAPI.authenticatedFetch(`/v1/export-google-sheets/${diagnosisRunId}`);
                if (response && response.ok) {
                    const resData = await response.json();
                    status.innerHTML = `✓ Spreadsheet created: <a href="${resData.spreadsheet_url}" target="_blank">View on Google Sheets</a>`;
                    status.style.background = '#dcfce7';
                    status.style.color = '#166534';
                } else {
                    const errorMsg = response ? await response.text() : 'Failed to reach export service.';
                    status.textContent = `Error: ${errorMsg}`;
                    status.style.background = '#fee2e2';
                    status.style.color = '#991b1b';
                    btn.disabled = false;
                }
            } catch (err) {
                status.textContent = `Execution failed: ${err.message}`;
                btn.disabled = false;
            }
        });
    };

    try {
        const response = await MarSciAPI.authenticatedFetch(`/v1/diagnosis-history/${diagnosisRunId}`);
        if (response && response.ok) {
            const data = await response.json();
            renderResult(data);
        } else {
            resultView.innerHTML = `<div class="error-card">Failed to fetch result (Status: ${response?.status || 'Unknown'}).</div>`;
        }
    } catch (error) {
        resultView.innerHTML = `<div class="error-card">Error loading result: ${error.message}</div>`;
    }

    document.getElementById('logout-btn').addEventListener('click', () => {
        MarSciAPI.clearAuthToken();
        window.location.href = '/login';
    });
});
