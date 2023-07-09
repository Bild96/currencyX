const convert = async () => {
  const sourceCurrency = sourceCurrencyInput.value;
  const targetCurrency = targetCurrencySelect.value;

  // Get the exchange rate from the cache.
  const rate = cache[`https://api.exchangeratesapi.io/latest?base=${sourceCurrency}`];

  if (!rate) {
    // The exchange rate is not in the cache, so fetch it from the API.
    const response = await fetch("https://api.exchangeratesapi.io/latest?base=" + sourceCurrency);
    const data = await response.json();
    rate = data.rates[targetCurrency];

    // Cache the exchange rate for future use.
    cache[`https://api.exchangeratesapi.io/latest?base=${sourceCurrency}`] = rate;
  }

  // Convert the value.
  const convertedValue = parseFloat(sourceCurrencyInput.value) * rate;

  // Update the converted value.
  convertedValueP.innerHTML = convertedValue.toFixed(2);

  // Update the converted value currency.
  convertedValueCurrencyP.innerHTML = targetCurrency;
};

