import { useState } from 'react';
import useApi from '../../hooks/useAPI';

type calculateTaxType = {
  income: number;
  year: string;
  includeSuper: boolean;
  superannuationRate?: number;
};

export type CalculateTaxResponseType = {
  tax: number;
  netIncome: number;
  superannuation: number;
  grossIncome: number;
  isIncomeIncludingSuper: boolean;
};
const API_URL = '/tax/calculate';
export const useCalculateTax = () => {
  const [result, setResult] = useState<CalculateTaxResponseType>();
  const { request, loading, error } = useApi<CalculateTaxResponseType>();
  const calculateTax = (data: calculateTaxType) => {
    request(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => setResult(res));
  };
  return { calculateTax, loading, error, taxes: result };
};
