'use client';

import { useState, useMemo } from 'react';
import { calculateEMI } from '@/lib/calculators/emi';
import { formatCurrency } from '@/lib/utils/format';
import Link from 'next/link';

export function HeroCalculator() {
  const [loanAmount, setLoanAmount] = useState<number>(2500000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [loanTenure, setLoanTenure] = useState<number>(20);

  const calculations = useMemo(() => {
    return calculateEMI({
      loanAmount,
      interestRate,
      loanTenure,
    });
  }, [loanAmount, interestRate, loanTenure]);

  const loanAmountOptions = [
    { value: 1000000, label: '₹10L' },
    { value: 2500000, label: '₹25L' },
    { value: 5000000, label: '₹50L' },
  ];
  const tenureOptions = [5, 10, 15, 20, 25, 30];

  const formatAmount = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)}Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(0)}L`;
    } else if (amount >= 1000) {
      return `₹${(amount / 1000).toFixed(0)}K`;
    }
    return formatCurrency(amount);
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-md">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">How Much Do You Need?</h3>

      {/* Loan Amount Slider */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          {loanAmountOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setLoanAmount(option.value)}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
                loanAmount === option.value
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        <div className="relative">
          <input
            type="range"
            min="100000"
            max="10000000"
            step="100000"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            style={{
              background: `linear-gradient(to right, #2563eb 0%, #2563eb ${((loanAmount - 100000) / (10000000 - 100000)) * 100}%, #e5e7eb ${((loanAmount - 100000) / (10000000 - 100000)) * 100}%, #e5e7eb 100%)`,
            }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>₹1L</span>
          <span>₹1Cr</span>
        </div>
        <div className="text-center mt-2">
          <span className="text-lg font-bold text-blue-600">{formatAmount(loanAmount)}</span>
        </div>
      </div>

      {/* Interest Rate */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Interest Rate: {interestRate}% per annum
        </label>
        <div className="relative">
          <input
            type="range"
            min="5"
            max="15"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            style={{
              background: `linear-gradient(to right, #2563eb 0%, #2563eb ${((interestRate - 5) / (15 - 5)) * 100}%, #e5e7eb ${((interestRate - 5) / (15 - 5)) * 100}%, #e5e7eb 100%)`,
            }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>5%</span>
          <span>15%</span>
        </div>
      </div>

      {/* Loan Tenure Slider */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {tenureOptions.map((years) => (
            <button
              key={years}
              onClick={() => setLoanTenure(years)}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
                loanTenure === years
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {years} {years === 1 ? 'Year' : 'Years'}
            </button>
          ))}
        </div>
        <div className="relative">
          <input
            type="range"
            min="1"
            max="30"
            step="1"
            value={loanTenure}
            onChange={(e) => setLoanTenure(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            style={{
              background: `linear-gradient(to right, #2563eb 0%, #2563eb ${((loanTenure - 1) / (30 - 1)) * 100}%, #e5e7eb ${((loanTenure - 1) / (30 - 1)) * 100}%, #e5e7eb 100%)`,
            }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>1 Year</span>
          <span>30 Years</span>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Pay Monthly</span>
          <span className="text-2xl font-bold text-gray-900">{formatCurrency(calculations.emi)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Term of Use</span>
          <span className="text-lg font-semibold text-gray-900">{loanTenure} Years</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Total Pay Back Amount</span>
          <span className="text-2xl font-bold text-blue-600">{formatCurrency(calculations.totalAmount)}</span>
        </div>
      </div>

      {/* CTA Button */}
      <Link
        href="/emi-calculator"
        className="w-full inline-flex items-center justify-center px-6 py-4 text-base font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        <span>CALCULATE EMI</span>
        <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </Link>
    </div>
  );
}

