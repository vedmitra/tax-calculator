import useApi from '../../hooks/useAPI';

type calculateTaxType = {
  income: number;
  year: string;
  includeSuper: boolean;
  superannuationRate?: number;
};
const API_URL = '/tax/calculate';
export const useCalculateTax = () => {
  const { request, loading, error } = useApi();
  const calculateTax = (data: calculateTaxType) => {
    return request(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  };
  return { calculateTax, loading, error };
};
