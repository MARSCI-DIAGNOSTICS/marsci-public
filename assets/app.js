/**
 * AFX Diagnostic Engine - Frontend Logic
 * Handles form submission and API interaction
 */

// Configuration
const API_BASE_URL = '/api';
const METRIC_ID_COUNTER = { count: 3 };

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('diagnosticForm');
    const addMetricBtn = document.getElementById('addMetricBtn');
    const debugToggle = document.getElementById('debugToggle');

    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }

    if (addMetricBtn) {
        addMetricBtn.addEventListener('click', addMetricGroup);
    }

    if (debugToggle) {
        debugToggle.addEventListener('change', toggleDebugSection);
    }
});

/**
 * Add a new metric group to the form
 */
function addMetricGroup(event) {
    event.preventDefault();

    const maxMetrics = 5;
    const currentMetrics = document.querySelectorAll('.metric-group').length;

    if (currentMetrics >= maxMetrics) {
        alert(`Maximum ${maxMetrics} metrics allowed`);
        return;
    }

    const id = METRIC_ID_COUNTER.count++;
    const additionalMetrics = document.getElementById('additionalMetrics');

    const html = `
        <div class="metric-group">
            <div class="metric-header">
                <label>Metric #${id}</label>
                <button type="button" class="btn-remove" onclick="removeMetricGroup(this)">Remove</button>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Metric ID</label>
                    <input type="text" class="metric-id" placeholder="e.g., conversion_rate">
                </div>
                <div class="form-group">
                    <label>Current Value</label>
                    <input type="number" class="current-value" placeholder="0" step="0.001">
                </div>
                <div class="form-group">
                    <label>Baseline Value</label>
                    <input type="number" class="baseline-value" placeholder="0" step="0.001">
                </div>
            </div>
        </div>
    `;

    additionalMetrics.insertAdjacentHTML('beforeend', html);
}

/**
 * Remove a metric group
 */
function removeMetricGroup(button) {
    const group = button.closest('.metric-group');
    if (group) {
        group.remove();
    }
}

/**
 * Toggle debug section visibility
 */
function toggleDebugSection() {
    const debugToggle = document.getElementById('debugToggle');
    const debugSection = document.getElementById('debugSection');

    if (debugSection) {
        debugSection.style.display = debugToggle.checked ? 'block' : 'none';
    }
}

/**
 * Handle form submission
 */
async function handleFormSubmit(event) {
    event.preventDefault();

    // Collect metrics
    const metrics = [];
    document.querySelectorAll('.metric-group').forEach(group => {
        const metricId = group.querySelector('.metric-id').value.trim();
        const currentValue = parseFloat(group.querySelector('.current-value').value);
        const baselineValue = parseFloat(group.querySelector('.baseline-value').value);

        if (!metricId || isNaN(currentValue) || isNaN(baselineValue)) {
            alert('Please fill in all metric fields');
            return;
        }

        metrics.push({
            metric_id: metricId,
            current_value: currentValue,
            baseline_value: baselineValue
        });
    });

    if (metrics.length === 0) {
        alert('Please add at least one metric');
        return;
    }

    // Show loading state
    showLoading(true);

    // Convert raw metrics to canonical KPI signals
    const kpis = metrics.map((metric, idx) => {
        let direction = 'FLAT';
        if (metric.current_value > metric.baseline_value) direction = 'UP';
        if (metric.current_value < metric.baseline_value) direction = 'DOWN';

        let role = 'cause';
        if (idx === 0 || idx === 1) role = 'effect';
        if (idx === 2) role = 'mechanism';

        return {
            name: metric.metric_id.toUpperCase(),
            direction,
            role
        };
    });

    try {
        // Call diagnostic API (real production endpoint)
        const response = await fetch(`${API_BASE_URL}/diagnose`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ kpis, normalization_targets: [] })
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        displayResults(result);

    } catch (error) {
        console.error('Error calling diagnostic API:', error);

        // Display the upstream API failure directly to the user.
        const errorDiv = document.getElementById('errorMessage');
        errorDiv.textContent = `Diagnosis failed: ${error.message}`;
        errorDiv.style.display = 'block';
        document.getElementById('results').style.display = 'none';
        document.getElementById('noResults').style.display = 'none';

    } finally {
        showLoading(false);
    }
}

/**
 * Display diagnostic results
 */
function displayResults(result) {
    const resultsDiv = document.getElementById('results');
    const noResultsDiv = document.getElementById('noResults');
    const errorDiv = document.getElementById('errorMessage');

    if (!result || !result.kpi_pattern) {
        errorDiv.textContent = result?.error?.message || result?.detail || 'An error occurred during analysis';
        errorDiv.style.display = 'block';
        resultsDiv.style.display = 'none';
        noResultsDiv.style.display = 'none';
        return;
    }

    const output = result;

    // Display diagnosis
    document.getElementById('diagnosis').textContent = output.description || 'Analysis complete';

    // Display visible KPIs
    const kpiGrid = document.getElementById('visibleKpis');
    kpiGrid.innerHTML = '';
    (output.signals || []).forEach((signal) => {
        const match = String(signal).match(/^(.+?)\s([↑↓→])\s(\d+)%$/);
        const name = match ? match[1] : String(signal);
        const direction = match ? match[2] : '→';
        const pct = match ? Number(match[3]) : 0;
        const severity = determineSeverity(pct);
        const html = `
            <div class="kpi-card">
                <div class="kpi-name">${name}</div>
                <div class="kpi-value">${direction} ${pct}%</div>
                <div class="kpi-severity severity-${severity}">${severity.toUpperCase()}</div>
            </div>
        `;
        kpiGrid.insertAdjacentHTML('beforeend', html);
    });

    // Display pattern
    document.getElementById('pattern').textContent = output.pattern_name || 'Unknown Pattern';

    // Display investigation
    const actions = Array.isArray(output.recommended_action) ? output.recommended_action : [];
    document.getElementById('investigation').textContent = actions.join(' ') || 'Further investigation recommended';

    // Display confidence
    const confidenceStr = output.confidence || '50%';
    const confidence = parseFloat(String(confidenceStr).replace('%', '')) / 100;
    const confidenceDiv = document.getElementById('confidence');
    confidenceDiv.innerHTML = `
        <div class="confidence-bar-bg">
            <div class="confidence-bar-fill" style="width: ${confidence * 100}%">
                ${(confidence * 100).toFixed(0)}%
            </div>
        </div>
        <small>Confidence in diagnosis</small>
    `;

    // Display debug info if toggled
    if (document.getElementById('debugToggle').checked) {
        document.getElementById('debugTrace').textContent = JSON.stringify(result, null, 2);
    }

    // Show results
    resultsDiv.style.display = 'block';
    noResultsDiv.style.display = 'none';
    errorDiv.style.display = 'none';

    // Scroll to results
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Determine severity level
 */
function determineSeverity(deviationPct) {
    const absDev = Math.abs(deviationPct);
    if (absDev >= 20) return 'high';
    if (absDev >= 10) return 'medium';
    return 'low';
}

/**
 * Show/hide loading indicator
 */
function showLoading(show) {
    const loadingDiv = document.getElementById('loading');
    const resultsDiv = document.getElementById('results');
    const noResultsDiv = document.getElementById('noResults');

    if (show) {
        loadingDiv.style.display = 'block';
        resultsDiv.style.display = 'none';
        noResultsDiv.style.display = 'none';
    } else {
        loadingDiv.style.display = 'none';
    }
}
