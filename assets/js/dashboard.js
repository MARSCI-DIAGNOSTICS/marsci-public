document.addEventListener('DOMContentLoaded', async () => {
    const dashboard = document.getElementById('dashboard');
    if (!dashboard) return;

    const renderLoading = (elementId) => {
        document.getElementById(elementId).innerHTML = '<div class="loading">Loading...</div>';
    };

    const renderError = (elementId, message) => {
        document.getElementById(elementId).innerHTML = `<div class="error-card">Error: ${message} <button onclick="window.location.reload()">Retry</button></div>`;
    };

    const renderEmpty = (elementId, message) => {
        document.getElementById(elementId).innerHTML = `<div class="empty-state">${message}</div>`;
    };

    const loadDashboard = async () => {
        // Individual panels load independently
        loadHistory();
        loadImpact();
        loadExecutive();
    };

    const loadHistory = async () => {
        const elId = 'history-list';
        renderLoading(elId);
        try {
            const history = await MarSciAPI.getHistory();
            if (history) renderHistory(history);
            else renderError(elId, 'Unauthorized access.');
        } catch (error) {
            console.error('Failed to load history:', error);
            renderError(elId, 'Failed to fetch history.');
        }
    };

    const loadImpact = async () => {
        const elId = 'impact-summary';
        renderLoading(elId);
        try {
            const impact = await MarSciAPI.getImpactSummary();
            if (impact) renderImpact(impact);
            else renderError(elId, 'Unauthorized access.');
        } catch (error) {
            console.error('Failed to load impact:', error);
            renderError(elId, 'Failed to fetch impact summary.');
        }
    };

    const loadExecutive = async () => {
        const elId = 'executive-overview';
        renderLoading(elId);
        try {
            const executive = await MarSciAPI.getExecutiveOverview();
            if (executive) renderExecutive(executive);
            else renderError(elId, 'Unauthorized access.');
        } catch (error) {
            console.error('Failed to load executive overview:', error);
            renderError(elId, 'Failed to fetch executive overview.');
        }
    };

    const renderHistory = (data) => {
        const historyEl = document.getElementById('history-list');
        if (!data.runs || data.runs.length === 0) {
            renderEmpty('history-list', 'No diagnosis history found. Run your first diagnosis to get started.');
            return;
        }

        let html = '<table class="history-table"><thead><tr><th>Date</th><th>Pattern</th><th>Severity</th><th>Confidence</th><th>Status</th><th>Actions</th></tr></thead><tbody>';
        data.runs.forEach(run => {
            const detectedAt = run.detected_at ? new Date(run.detected_at).toLocaleString() : 'N/A';
            const patternName = run.pattern_name || 'Unknown Pattern';
            const severity = run.severity || 'Low';
            const confidence = run.confidence || 'N/A';
            const status = run.recommendation_status || 'Pending';

            html += `
                <tr class="history-row" data-id="${run.diagnosis_run_id}">
                    <td>${detectedAt}</td>
                    <td>${patternName}</td>
                    <td><span class="severity-badge ${severity.toLowerCase()}">${severity}</span></td>
                    <td>${confidence}</td>
                    <td>${status}</td>
                    <td>
                        <button class="btn btn-sm btn-detail" data-id="${run.diagnosis_run_id}">View Detail</button>
                        <button class="btn btn-sm btn-compare" data-id="${run.diagnosis_run_id}">Compare</button>
                        <button class="btn btn-sm btn-export" data-id="${run.diagnosis_run_id}">Export</button>
                    </td>
                </tr>
            `;
        });
        html += '</tbody></table>';
        historyEl.innerHTML = html;

        // Add event listeners for buttons
        document.querySelectorAll('.btn-detail').forEach(btn => btn.addEventListener('click', (e) => openDetail(e.target.dataset.id)));
        document.querySelectorAll('.btn-compare').forEach(btn => btn.addEventListener('click', (e) => openComparison(e.target.dataset.id)));
        document.querySelectorAll('.btn-export').forEach(btn => btn.addEventListener('click', (e) => openExportPreview(e.target.dataset.id)));
    };

    const renderImpact = (data) => {
        const impactEl = document.getElementById('impact-summary');
        const gainRange = data.estimated_efficiency_gain_range || { low: '0%', high: '0%' };

        html = `
            <div class="impact-grid">
                <div class="impact-card">
                    <h3>Patterns Detected</h3>
                    <div class="impact-val">${data.total_patterns_detected ?? 0}</div>
                </div>
                <div class="impact-card">
                    <h3>Applied Recommendations</h3>
                    <div class="impact-val">${data.total_applied ?? 0} / ${data.total_recommendations_issued ?? 0}</div>
                </div>
                <div class="impact-card">
                    <h3>Observed Improvements</h3>
                    <div class="impact-val">${data.observed_improvements_count ?? 0}</div>
                </div>
                <div class="impact-card">
                    <h3>Efficiency Opportunity</h3>
                    <div class="impact-val">${gainRange.low} - ${gainRange.high}</div>
                    <div class="impact-sub">Average Confidence: ${data.average_confidence || 'N/A'}</div>
                </div>
            </div>
            <p class="disclaimer">${data.disclaimer || ''}</p>
        `;
        impactEl.innerHTML = html;
    };

    const renderExecutive = (data) => {
        const execEl = document.getElementById('executive-overview');
        let issuesHtml = '';
        if (Array.isArray(data.highest_severity_issues)) {
            data.highest_severity_issues.forEach(issue => {
                issuesHtml += `<li><strong>${issue.pattern_name || 'Issue'}</strong> - <span class="${(issue.severity || 'low').toLowerCase()}">${issue.severity || 'Low'}</span></li>`;
            });
        }

        let patternsHtml = '';
        if (Array.isArray(data.active_patterns)) {
            data.active_patterns.forEach(p => {
                patternsHtml += `<li>${p.pattern_name || 'Pattern'} (x${p.frequency || 0})</li>`;
            });
        }

        const oppRange = data.estimated_efficiency_improvement_opportunity_range || { low: '0%', high: '0%' };

        html = `
            <div class="exec-grid">
                <div class="exec-card">
                    <h4>Highest Severity Issues</h4>
                    <ul>${issuesHtml || '<li>No critical issues found</li>'}</ul>
                </div>
                <div class="exec-card">
                    <h4>Top Active Patterns</h4>
                    <ul>${patternsHtml || '<li>No active patterns</li>'}</ul>
                </div>
                <div class="exec-card">
                    <h4>Efficiency Opportunity</h4>
                    <div class="exec-val">${oppRange.low} to ${oppRange.high}</div>
                </div>
            </div>
        `;
        execEl.innerHTML = html;
    };

    const openDetail = async (id) => {
        const modal = document.getElementById('modal');
        const modalContent = document.getElementById('modal-body');
        modal.style.display = 'block';
        modalContent.innerHTML = '<div class="loading">Loading profile...</div>';

        try {
            const data = await MarSciAPI.getDetail(id);
            if (!data) return;

            const impactRange = data.expected_impact_range || { low: '0%', high: '0%' };
            const efficiencyRatio = data.expected_efficiency_ratio || { low: '1.00x', high: '1.00x' };
            const recommendedActions = Array.isArray(data.recommended_action) ? data.recommended_action : [];
            const evidencePanel = data.evidence_panel || { likely_cause_lane: 'Unknown' };

            modalContent.innerHTML = `
                <h2>${data.pattern_name || 'Diagnosis Detail'}</h2>
                <div class="detail-grid">
                    <div class="detail-section">
                        <h4>KPI Pattern</h4>
                        <div class="kpi-pattern">${data.kpi_pattern || 'N/A'}</div>
                        <p>${data.description || 'No description available.'}</p>
                    </div>
                    <div class="detail-section">
                        <h4>Evidence & Severity</h4>
                        <p>Severity: <span class="severity-badge ${(data.severity || 'low').toLowerCase()}">${data.severity || 'Low'}</span></p>
                        <p>Confidence: ${data.confidence || 'N/A'}</p>
                        <p>Cause Lane: ${evidencePanel.likely_cause_lane}</p>
                    </div>
                    <div class="detail-section">
                        <h4>Recommended Actions</h4>
                        <ul>${recommendedActions.length > 0 ? recommendedActions.map(a => `<li>${a}</li>`).join('') : '<li>No actions recommended.</li>'}</ul>
                    </div>
                    <div class="detail-section">
                        <h4>Impact Projection</h4>
                        <p>Efficiency Gain: ${impactRange.low} - ${impactRange.high}</p>
                        <p>Efficiency Ratio: ${efficiencyRatio.low} - ${efficiencyRatio.high}</p>
                    </div>
                </div>
                <p class="disclaimer">${data.disclaimer || ''}</p>
            `;
        } catch (error) {
            modalContent.innerHTML = '<div class="error">Failed to load detail.</div>';
        }
    };

    const openComparison = async (id) => {
        const modal = document.getElementById('modal');
        const modalContent = document.getElementById('modal-body');
        modal.style.display = 'block';
        modalContent.innerHTML = '<div class="loading">Loading comparison...</div>';

        try {
            const data = await MarSciAPI.getComparison(id);
            if (!data) return;

            let metricsHtml = '';
            if (Array.isArray(data.baseline_metrics)) {
                data.baseline_metrics.forEach(m => {
                    metricsHtml += `<li>${m.kpi || 'Unknown KPI'}: ${m.value || '0'} ${m.unit || ''}</li>`;
                });
            }
            if (!metricsHtml) metricsHtml = '<li>No baseline metrics available.</li>';

            const originalDiag = data.original_diagnosis || {};
            modalContent.innerHTML = `
                <h2>Comparison: ${originalDiag.pattern_name || 'Diagnosis'}</h2>
                <div class="comparison-grid">
                    <div class="comp-col">
                        <h4>Original Baseline</h4>
                        <ul>${metricsHtml}</ul>
                    </div>
                    <div class="comp-col">
                        <h4>Current Observed Improvement</h4>
                        <p class="impact-summary-note">${data.observed_impact_summary || 'No data.'}</p>
                        <p>Status: <strong>${data.recommendation_status || 'Pending'}</strong></p>
                    </div>
                </div>
                <p class="disclaimer">${data.disclaimer || ''}</p>
            `;
        } catch (error) {
            modalContent.innerHTML = '<div class="error">Failed to load comparison.</div>';
        }
    };

    const openExportPreview = async (id) => {
        const modal = document.getElementById('modal');
        const modalContent = document.getElementById('modal-body');
        modal.style.display = 'block';
        modalContent.innerHTML = '<div class="loading">Generating preview...</div>';

        try {
            const data = await MarSciAPI.getExportPreview(id);
            if (!data) return;

            modalContent.innerHTML = `
                <h2>Export Preview (Google Sheets)</h2>
                <div class="export-status">IP Safety Check: <span class="safety-${data.ip_safety_check}">${(data.ip_safety_check || '').toUpperCase()}</span></div>
                <div class="preview-scroll">
                    <pre>${JSON.stringify(data.export_sections, null, 2)}</pre>
                </div>
                <div class="export-actions">
                    <p class="info-note">Integration Note: Google Drive write is planned for subsequent release. Use the preview above for manual verification of IP safety.</p>
                </div>
                <p class="disclaimer">${data.disclaimer || ''}</p>
            `;
        } catch (error) {
            modalContent.innerHTML = '<div class="error">Failed to load export preview.</div>';
        }
    };

    // Modal close logic
    document.querySelector('.close-modal').addEventListener('click', () => {
        document.getElementById('modal').style.display = 'none';
    });
    window.onclick = (event) => {
        const modal = document.getElementById('modal');
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };

    loadDashboard();
});
