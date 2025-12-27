'use client';

import { useState, useMemo } from 'react';
import { calculateEMI } from '@/lib/calculators/emi';
import { EMIInputForm } from '@/components/calculator/emi-input-form';
import { EMIResults } from '@/components/calculator/emi-results';

export default function EMICalculatorPage() {
  const [loanAmount, setLoanAmount] = useState<string>('5000000');
  const [interestRate, setInterestRate] = useState<string>('8.5');
  const [loanTenure, setLoanTenure] = useState<string>('20');

  // Calculate EMI using the calculator function
  const calculations = useMemo(() => {
    return calculateEMI({
      loanAmount: parseFloat(loanAmount) || 0,
      interestRate: parseFloat(interestRate) || 0,
      loanTenure: parseFloat(loanTenure) || 0,
    });
  }, [loanAmount, interestRate, loanTenure]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 md:py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">Loan EMI Calculator</h1>
          <p className="text-lg text-gray-600">Calculate your monthly EMI, total interest, and total amount payable</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 lg:p-10">
          {/* Input Fields */}
          <div className="mb-8">
            <EMIInputForm
              loanAmount={loanAmount}
              interestRate={interestRate}
              loanTenure={loanTenure}
              onLoanAmountChange={setLoanAmount}
              onInterestRateChange={setInterestRate}
              onLoanTenureChange={setLoanTenure}
            />
          </div>

          {/* Results Section */}
          <EMIResults results={calculations} loanTenure={loanTenure} />

          {/* Additional Info */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 leading-relaxed">
                <strong className="text-gray-900">Note:</strong> This EMI calculator provides an estimate based on the inputs provided. The actual EMI may vary based on the bank&apos;s policies,
                processing fees, and other charges. Please consult with your bank for accurate loan details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
