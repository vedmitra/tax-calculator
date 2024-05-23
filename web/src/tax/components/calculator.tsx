import React, { useState, useEffect } from 'react';
import { useCalculateTax } from '../hooks/useCalculateTax';
import { TaxResult } from './TaxResult';

const Calculator: React.FC = () => {
  const [superPercentage, setSuperPercentage] = useState<number>(10.5);
  const [income, setIncome] = useState<number>(0);
  const [isGrossPlusSuper, setIsGrossPlusSuper] = useState<boolean>(false);
  const [taxYear, setTaxYear] = useState<string>('2022-23');
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [touchedFields, setTouchedFields] = useState<{
    [key: string]: boolean;
  }>({
    income: false,
    superPercentage: false,
  });

  const { calculateTax, loading, error, taxes = null } = useCalculateTax();

  // TODO: Form validation must go to standalone util
  const validateForm = () => {
    const errors = [];
    if (income <= 0) {
      errors.push('Income must be a positive number.');
    }
    if (superPercentage < 10.5) {
      errors.push('Superannuation percentage must be at least 10.5.');
    }
    setErrorMessages(errors);
    setIsFormValid(errors.length === 0);
  };

  useEffect(() => {
    validateForm();
  }, [income, superPercentage]);

  const handleBlur = (field: string) => {
    setTouchedFields({ ...touchedFields, [field]: true });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid) {
      calculateTax({
        income,
        year: taxYear,
        superannuationRate: superPercentage,
        includeSuper: isGrossPlusSuper,
      });
    }
    setTouchedFields({
      income: true,
      superPercentage: true,
    });
  };

  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-center text-xl font-bold mb-4">
          Simple Tax Calculator
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMessages.length > 0 &&
            (touchedFields.income || touchedFields.superPercentage) && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                <ul>
                  {touchedFields.income && income <= 0 && (
                    <li>Income must be a positive number.</li>
                  )}
                  {touchedFields.superPercentage && superPercentage < 10.5 && (
                    <li>Superannuation percentage must be at least 10.5.</li>
                  )}
                </ul>
              </div>
            )}
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <label className="w-full sm:w-1/2 text-left sm:text-right sm:pr-4">
              Gross amount:
            </label>
            <input
              type="number"
              className="w-full sm:w-1/2 px-4 py-2 mt-2 sm:mt-0 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              value={income}
              onChange={(e) => setIncome(parseFloat(e.target.value))}
              onBlur={() => handleBlur('income')}
              min="0"
              required
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
              value={superPercentage}
              onChange={(e) => setSuperPercentage(parseFloat(e.target.value))}
              onBlur={() => handleBlur('superPercentage')}
              min="10.5"
              step="0.1"
              required
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
              required
            >
              <option value="2022-2023">2023</option>
              <option value="2023-2024">2024</option>
              <option value="2024-2025">2025</option>
            </select>
          </div>
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              disabled={loading || !isFormValid}
              className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
            >
              Calculate
            </button>
          </div>
        </form>
        {!loading && !error && taxes && (
          <div className="mt-20">
            <TaxResult {...taxes} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculator;
