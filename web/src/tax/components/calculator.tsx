// src/calculator/components/Calculator.tsx
import React, { useState } from 'react';
import { Spacer } from '../../components/Spacer';
import { useCalculateTax } from '../hooks/useCalculateTax';

const Calculator: React.FC = () => {
  const [superPrecentage, setSuperPrecentage] = useState<number>(10.5);
  const [income, setIncome] = useState<number>(0);
  const [isGrossPlusSuper, setIsGrossPlusSuper] = useState<boolean>(false);
  const [taxYear, setTaxYear] = useState<string>('2022-23');
  const [results, setResults] = useState<{
    tax: number;
    netIncome: number;
    superAnnuation: number;
  } | null>(null);

  const { calculateTax, loading, error } = useCalculateTax();

  const calculate = () => {
    calculateTax({
      income,
      year: taxYear,
      superannuationRate: superPrecentage,
      includeSuper: isGrossPlusSuper,
    }).then((results) => {
      console.log(results);
    });
  };

  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-center text-xl font-bold mb-4">
          Simple Tax Calculator
        </h1>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <label className="w-full sm:w-1/2 text-left sm:text-right sm:pr-4">
              Gross amount:
            </label>
            <input
              type="number"
              className="w-full sm:w-1/2 px-4 py-2 mt-2 sm:mt-0 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              value={income}
              onChange={(e) => setIncome(parseFloat(e.target.value))}
              min="-100"
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <label className="w-full sm:w-1/2 text-left sm:text-right sm:pr-4">
              Salary includes superannuation
            </label>
            <div className="w-full sm:w-1/2 flex items-center mt-2 sm:mt-0">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out disabled:bg-gray-100 disabled:cursor-not-allowed"
                checked={isGrossPlusSuper}
                onChange={() => setIsGrossPlusSuper(!isGrossPlusSuper)}
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <label className="w-full sm:w-1/2 text-left sm:text-right sm:pr-4">
              Superannuation Percentage (≥ 10.5%):
            </label>
            <input
              type="number"
              className="w-full sm:w-1/2 px-4 py-2 mt-2 sm:mt-0 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              value={superPrecentage}
              onChange={(e) => setSuperPrecentage(parseFloat(e.target.value))}
              min="10.5"
              step="0.1"
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <label className="w-full sm:w-1/2 text-left sm:text-right sm:pr-4">
              Tax Year:
            </label>
            <select
              className="w-full sm:w-1/2 px-4 py-2 mt-2 sm:mt-0 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              value={taxYear}
              onChange={(e) => setTaxYear(e.target.value)}
            >
              <option value="2022-2023">2023</option>
              <option value="2023-2024">2024</option>
              <option value="2024-2025">2025</option>
            </select>
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={calculate}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
            >
              Calculate
            </button>
          </div>
          {results && (
            <div>
              <h2 className="text-lg font-bold mt-4">Results:</h2>
              <p>Superannuation Amount: ${results.superAnnuation.toFixed(2)}</p>
              <p>Gross Amount: ${income.toFixed(2)}</p>
              <p>
                Gross + Superannuation Amount: $
                {results.netIncome.toFixed(2) + results.superAnnuation}
              </p>
              <p>Tax Amount: ${results.tax.toFixed(2)}</p>
              <p>Net Amount: ${results.netIncome.toFixed(2)}</p>
              <p>
                Net + Superannuation Amount: ${results.netIncome.toFixed(2)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
