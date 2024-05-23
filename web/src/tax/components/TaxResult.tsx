import React from 'react';
import { CalculateTaxResponseType } from '../hooks/useCalculateTax';

const formatCurrency = (amount: number): string => {
  return amount.toFixed(2);
};

export const TaxResult: React.FC<CalculateTaxResponseType> = ({
  superannuation,
  isIncomeIncludingSuper,
  grossIncome,
  netIncome,
  tax,
}) => {
  return (
    <div className="mt-4">
      <h2 className="text-lg font-bold">Results:</h2>
      <table className="min-w-full divide-y divide-gray-200 mt-2">
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">
              Superannuation Amount:
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              ${formatCurrency(superannuation)}
            </td>
          </tr>
          {isIncomeIncludingSuper ? (
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">Gross Amount:</td>
              <td className="px-6 py-4 whitespace-nowrap">
                ${formatCurrency(grossIncome)}
              </td>
            </tr>
          ) : (
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                Gross + Superannuation Amount:
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                ${formatCurrency(netIncome + superannuation)}
              </td>
            </tr>
          )}
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">Tax Amount:</td>
            <td className="px-6 py-4 whitespace-nowrap">
              ${formatCurrency(tax)}
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">Net Amount:</td>
            <td className="px-6 py-4 whitespace-nowrap">
              ${formatCurrency(netIncome)}
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">
              Net + Superannuation Amount:
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              ${formatCurrency(netIncome + superannuation)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
