// Utility hook for all display formatters.
// Currently we need only currency.
export const useFormatter = () => {
  const formatCurrency = (
    value: number = 0,
    currency: 'AUD' | 'USD' = 'AUD', // Include list of valid ISO 4217
    locale: string = 'en-AU',
  ): string => {
    if (typeof value !== 'number' || isNaN(value)) {
      throw new Error('Value must be a valid number');
    }

    if (typeof currency !== 'string' || currency.length !== 3) {
      throw new Error('Currency must be a valid ISO 4217 currency code');
    }

    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(value);
  };
  return { formatCurrency };
};
