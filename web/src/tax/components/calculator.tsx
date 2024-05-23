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
    superAmount: number;
    grossIncome: number;
    grossPlusSuper: number;
    taxAmount: number;
    netAmount: number;
    netPlusSuper: number;
  } | null>(null);

  const { calculateTax } = useCalculateTax();

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
    <div className="flex justify-center">
      <Spacer direction="vertical">
        <h1>Simple tax Calculator</h1>
        <Spacer direction="horizontal">
          <label>
            Gross amount:
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(parseFloat(e.target.value))}
              min="-100"
            />
          </label>
          <label>
            <input
              type="checkbox"
              checked={isGrossPlusSuper}
              onChange={() => setIsGrossPlusSuper(!isGrossPlusSuper)}
            />
            Salary includes superannuation
          </label>
        </Spacer>
        <div>
          <label>
            Superannuation Percentage (&gt;= 10.5%):
            <input
              type="number"
              value={superPrecentage}
              onChange={(e) => setSuperPrecentage(parseFloat(e.target.value))}
              min="10.5"
              step="0.1"
            />
          </label>
        </div>
        <div>
          <label>
            Tax Year:
            <select
              value={taxYear}
              onChange={(e) => setTaxYear(e.target.value)}
            >
              <option value="2022-2023">2023</option>
              <option value="2023-2024">2024</option>
              <option value="2024-2025">2025</option>
            </select>
          </label>
        </div>
        <button onClick={calculate}>Calculate</button>
        {results && (
          <div>
            <h2>Results:</h2>
            <p>Superannuation Amount: ${results.superAmount.toFixed(2)}</p>
            <p>Gross Amount: ${results.grossIncome.toFixed(2)}</p>
            <p>
              Gross + Superannuation Amount: $
              {results.grossPlusSuper.toFixed(2)}
            </p>
            <p>Tax Amount: ${results.taxAmount.toFixed(2)}</p>
            <p>Net Amount: ${results.netAmount.toFixed(2)}</p>
            <p>
              Net + Superannuation Amount: ${results.netPlusSuper.toFixed(2)}
            </p>
          </div>
        )}
      </Spacer>
    </div>
  );
};

export default Calculator;
