document.addEventListener('DOMContentLoaded', () => {
    const quoteEl = document.getElementById('quote');
    const authorEl = document.getElementById('author');
    const newQuoteBtn = document.getElementById('new-quote');
    const copyBtn = document.getElementById('copy-quote');
    const toggleModeBtn = document.getElementById('toggle-mode');
    const statusEl = document.getElementById('status');
    const spinner = document.getElementById('spinner');
    const body = document.getElementById('body');

    const API_URL = 'https://quotes.domiadi.com/api';


    // Regular Function Example
    // Show Loading Spinner
    function showSpinner(show) {
        spinner.classList.toggle('hidden', !show);
    }

    // Async Function Example
    // Fetch a quote and update the DOM

    async function fetchQuote() {
        setStatus('⏳ Fetching quote...');
        showSpinner(true);

        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();

            // Use helper function to update DOM
            displayQuote(data.quote, data.from, data.responseTime);
        } catch (err) {
            displayQuote("⚠️ Could not load a quote.", "", null);
            setStatus(`❌ Error: ${err.message}`);
        } finally {
            showSpinner(false);
        }
    }


    // Arrow Function
    // Update quote and author text

    const displayQuote = (quote, author, responseTime) => {
        quoteEl.textContent = `"${quote}"`;
        authorEl.textContent = author ? `– ${author}` : "";
        setStatus(responseTime ? `✅ Quote loaded in ${responseTime}` : "⚠️ Offline fallback");
    };


    // Arrow Function
    // Update status message

    const setStatus = (message) => {
        statusEl.textContent = message;
    };

    //Function Expression
    //Copy text to clipboard

    const copyQuote = function () {
        const textToCopy = `${quoteEl.textContent} ${authorEl.textContent}`.trim();

        navigator.clipboard.writeText(textToCopy)
            .then(() => setStatus('📋 Quote copied to clipboard!'))
            .catch(() => setStatus('❌ Failed to copy.'));
    };


    // Function Expression
    // Toggle Dark/Light Mode

    const toggleMode = function () {
        body.classList.toggle('dark');
        const isDark = body.classList.contains('dark');
        setStatus(isDark ? "🌙 Dark mode enabled" : "☀️ Light mode enabled");
    };

    // Event Handlers
    newQuoteBtn.addEventListener('click', fetchQuote);  // load new quote
    copyBtn.addEventListener('click', copyQuote);       // copy quote
    toggleModeBtn.addEventListener('click', toggleMode); // toggle theme

    fetchQuote();
});
