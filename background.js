// Import the necessary libraries
const { chrome } = require('electron');
const { ipcRenderer } = chrome.webContents;

// Define the currency exchange API
const api = {
  getRates: async (baseCurrency, targetCurrency) => {
    // Fetch the currency exchange rates from an API
    const rates = await fetch(`https://api.exchangeratesapi.io/latest?base=${baseCurrency}&symbols=${targetCurrency}`);
    const data = await rates.json();

    // Return the exchange rates
    return data.rates;
  },
};

// Listen for events from the popup
ipcRenderer.on('exchange', (event, baseCurrency, targetCurrency) => {
  // Get the exchange rates
  const rates = await api.getRates(baseCurrency, targetCurrency);

  // Send the exchange rates to the popup
  event.sender.send('rates', rates);
});

