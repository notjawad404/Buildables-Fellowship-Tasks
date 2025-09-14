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

  /*  
     Regular Function
  */
  function showSpinner(show) {
    spinner.classList.toggle('hidden', !show);
  }

  // Regular async function
  async function fetchQuote() {
    setStatus('Fetching quote...');
    showSpinner(true);

    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();

      // DOM manipulation through arrow function
      displayQuote(data.quote, data.from, data.responseTime);
    } catch (err) {
      displayQuote("Could not load a quote.", "", null);
      setStatus(`Error: ${err.message}`);
    } finally {
      showSpinner(false);
    }
  }

  /*  
     Arrow Function
  */
  const displayQuote = (quote, author, responseTime) => {
    quoteEl.textContent = `"${quote}"`;
    authorEl.textContent = author ? `– ${author}` : "";
    setStatus(responseTime ? `Quote loaded in ${responseTime}` : "Offline fallback");
  };

  const setStatus = (message) => {
    statusEl.textContent = message;
  };

  /*  
     Function Expression
     Toggle Dark/Light Mode
  */
  const toggleMode = function () {
    document.documentElement.classList.toggle("dark");

    // Save preference in localStorage
    if (document.documentElement.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
      setStatus("🌙 Dark mode enabled!");
    } else {
      localStorage.setItem("theme", "light");
      setStatus("☀️ Light mode enabled!");
    }
  };

  /*  
     Regular Function
     Copy quote to clipboard (Promise .then)
  */
  function copyQuote() {
    const textToCopy = `${quoteEl.textContent} ${authorEl.textContent}`.trim();

    navigator.clipboard.writeText(textToCopy)
      .then(() => setStatus('Quote copied to clipboard!'))
      .catch(() => setStatus('Failed to copy.'));
  }

  /*  
     Event Handlers
  */
  newQuoteBtn.addEventListener('click', fetchQuote);
  copyBtn.addEventListener('click', copyQuote);
  toggleModeBtn.addEventListener('click', toggleMode);

  // Apply saved theme on load
  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
  }

  fetchQuote();
});
