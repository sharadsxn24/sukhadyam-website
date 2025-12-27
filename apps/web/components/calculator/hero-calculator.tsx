'use client';

import { useState, useMemo } from 'react';
import { calculateEMI } from '@/lib/calculators/emi';
import { formatCurrency } from '@/lib/utils/format';
import Link from 'next/link';

export function HeroCalculator() {
  const [loanAmount, setLoanAmount] = useState<number>(2500000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [loanTenure, setLoanTenure] = useState<number>(20);
  const [tenureUnit, setTenureUnit] = useState<'years' | 'months'>('years');

  const calculations = useMemo(() => {
    // Convert months to years for calculation
    const tenureInYears = tenureUnit === 'months' ? loanTenure / 12 : loanTenure;
    return calculateEMI({
      loanAmount,
      interestRate,
      loanTenure: tenureInYears,
    });
  }, [loanAmount, interestRate, loanTenure, tenureUnit]);

  const loanAmountOptions = [
    { value: 1000000, label: '₹10L' },
    { value: 5000000, label: '₹50L' },
    { value: 10000000, label: '₹1Cr' },
    { value: 20000000, label: '₹2Cr' },
  ];
  const tenureOptions = [5, 10, 20, 30];

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-2xl">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">How Much Do You Need?</h3>

      {/* Loan Amount Slider */}
      <div className="mb-8">
        <div className="flex items-end gap-3 mb-4">
          <div className="max-w-[200px] w-full">
            <label className="block text-sm text-gray-500 mb-1.5">Amount</label>
            <div className="relative flex items-center">
              <input
                type="number"
                min="0"
                max="20000000"
                step="100000"
                value={loanAmount}
                onChange={(e) => {
                  const value = Math.max(0, Math.min(20000000, Number(e.target.value) || 0));
                  setLoanAmount(value);
                }}
                className="w-full pl-7 pr-3 py-2 text-2xl font-bold border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-left"
                placeholder="Amount"
              />
              <span className="absolute left-3 text-lg text-gray-500 pointer-events-none font-semibold">₹</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 flex-1">
            {loanAmountOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setLoanAmount(option.value)}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
                  loanAmount === option.value ? 'bg-blue-600 text-white shadow-lg scale-105' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}>
                {option.label}
              </button>
            ))}
          </div>
        </div>
        <div className="relative px-1">
          <div className="relative py-2">
            <input
              type="range"
              min="0"
              max="20000000"
              step="100000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 relative z-10"
              style={{
                background: `linear-gradient(to right, #2563eb 0%, #2563eb ${((loanAmount - 0) / (20000000 - 0)) * 100}%, #e5e7eb ${((loanAmount - 0) / (20000000 - 0)) * 100}%, #e5e7eb 100%)`,
              }}
            />
            {/* Tick marks below slider */}
            <div className="absolute top-full left-0 right-0 flex justify-between pointer-events-none z-0" style={{ marginTop: -13 }}>
              {[0, 5000000, 10000000, 15000000, 20000000].map((tick) => {
                const position = ((tick - 0) / (20000000 - 0)) * 100;
                return <div key={tick} className="absolute h-3 bg-gray-400" style={{ left: `calc(${position}% - 0.5px)`, top: '0', width: '0.5px' }} />;
              })}
            </div>
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1 px-1">
          <span>₹0</span>
          <span>₹50L</span>
          <span>₹1Cr</span>
          <span>₹1.5Cr</span>
          <span>₹2Cr</span>
        </div>
        {/* <div className="text-center mt-2">
          <span className="text-lg font-bold text-blue-600">{formatAmount(loanAmount)}</span>
        </div> */}
      </div>

      {/* Interest Rate */}
      <div className="mb-8">
        <div className="flex items-end gap-3 mb-3">
          <div className="max-w-[120px]">
            <label className="block text-sm text-gray-500 mb-1.5">Interest Rate</label>
            <div className="relative flex items-center">
              <input
                type="number"
                min="5"
                max="20"
                step="0.1"
                value={interestRate}
                onChange={(e) => {
                  const value = Math.max(5, Math.min(20, Number(e.target.value) || 5));
                  setInterestRate(value);
                }}
                className="w-full pl-3 pr-7 py-2 text-2xl font-bold border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-left"
                placeholder="Rate"
              />
              <span className="absolute right-3 text-lg text-gray-500 pointer-events-none font-semibold">%</span>
            </div>
          </div>
          <div className="text-xs text-gray-500 flex-1 pb-2">per annum</div>
        </div>
        <div className="relative px-1">
          <div className="relative py-2">
            <input
              type="range"
              min="5"
              max="20"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 relative z-10"
              style={{
                background: `linear-gradient(to right, #2563eb 0%, #2563eb ${((interestRate - 5) / (20 - 5)) * 100}%, #e5e7eb ${((interestRate - 5) / (20 - 5)) * 100}%, #e5e7eb 100%)`,
              }}
            />
            {/* Tick marks below slider */}
            <div className="absolute top-full left-0 right-0 flex justify-between pointer-events-none z-0" style={{ marginTop: -13 }}>
              {[5, 8, 11, 14, 17, 20].map((tick) => {
                const position = ((tick - 5) / (20 - 5)) * 100;
                return <div key={tick} className="absolute h-3 bg-gray-400" style={{ left: `calc(${position}% - 0.5px)`, top: '0', width: '0.5px' }} />;
              })}
            </div>
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1 px-1">
          <span>5%</span>
          <span>8%</span>
          <span>11%</span>
          <span>14%</span>
          <span>17%</span>
          <span>20%</span>
        </div>
      </div>

      {/* Loan Tenure Slider */}
      <div className="mb-8">
        <div className="flex items-end gap-3 mb-4">
          <div className="max-w-[160px]">
            <label className="block text-sm text-gray-500 mb-1.5">Loan Tenure</label>
            <div className="relative flex items-center">
              <input
                type="number"
                min={tenureUnit === 'months' ? 1 : 1}
                max={tenureUnit === 'months' ? 360 : 30}
                step="1"
                value={loanTenure}
                onChange={(e) => {
                  const max = tenureUnit === 'months' ? 360 : 30;
                  const value = Math.max(1, Math.min(max, Number(e.target.value) || 1));
                  setLoanTenure(value);
                }}
                className="w-full px-3 pr-20 py-2 text-2xl font-bold border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-left"
                placeholder={tenureUnit === 'months' ? 'Months' : 'Years'}
              />
              {/* Toggle buttons inside input field */}
              <div className="absolute right-1 flex items-center gap-0.5 bg-gray-50 rounded-md p-0.5">
                <button
                  type="button"
                  onClick={() => {
                    if (tenureUnit === 'months') {
                      // Convert months to years
                      setLoanTenure(Math.round(loanTenure / 12));
                      setTenureUnit('years');
                    }
                  }}
                  className={`px-2.5 py-1 text-xs font-semibold rounded transition-all ${tenureUnit === 'years' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}
                  title="Years">
                  Y
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (tenureUnit === 'years') {
                      // Convert years to months
                      setLoanTenure(loanTenure * 12);
                      setTenureUnit('months');
                    }
                  }}
                  className={`px-2.5 py-1 text-xs font-semibold rounded transition-all ${tenureUnit === 'months' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}
                  title="Months">
                  M
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 flex-1">
            {tenureOptions.map((years) => {
              const value = tenureUnit === 'months' ? years * 12 : years;
              const displayValue = tenureUnit === 'months' ? years * 12 : years;
              const displayUnit = tenureUnit === 'months' ? 'M' : 'Y';
              return (
                <button
                  key={years}
                  onClick={() => setLoanTenure(value)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
                    loanTenure === value ? 'bg-blue-600 text-white shadow-lg scale-105' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}>
                  {displayValue}
                  {displayUnit}
                </button>
              );
            })}
          </div>
        </div>
        <div className="relative px-1">
          <div className="relative py-2">
            <input
              type="range"
              min="1"
              max={tenureUnit === 'months' ? 360 : 30}
              step="1"
              value={loanTenure}
              onChange={(e) => setLoanTenure(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 relative z-10"
              style={{
                background: `linear-gradient(to right, #2563eb 0%, #2563eb ${((loanTenure - 1) / ((tenureUnit === 'months' ? 360 : 30) - 1)) * 100}%, #e5e7eb ${((loanTenure - 1) / ((tenureUnit === 'months' ? 360 : 30) - 1)) * 100}%, #e5e7eb 100%)`,
              }}
            />
            {/* Tick marks below slider */}
            <div className="absolute top-full left-0 right-0 flex justify-between pointer-events-none z-0" style={{ marginTop: -13 }}>
              {(tenureUnit === 'months' ? [12, 60, 120, 180, 240, 300, 360] : [1, 5, 10, 15, 20, 25, 30]).map((tick) => {
                const max = tenureUnit === 'months' ? 360 : 30;
                const position = ((tick - 1) / (max - 1)) * 100;
                return <div key={tick} className="absolute h-3 bg-gray-400" style={{ left: `calc(${position}% - 0.5px)`, top: '0', width: '0.5px' }} />;
              })}
            </div>
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1 px-1">
          {tenureUnit === 'months' ? (
            <>
              <span>12M</span>
              <span>60M</span>
              <span>120M</span>
              <span>180M</span>
              <span>240M</span>
              <span>300M</span>
              <span>360M</span>
            </>
          ) : (
            <>
              <span>1Y</span>
              <span>5Y</span>
              <span>10Y</span>
              <span>15Y</span>
              <span>20Y</span>
              <span>25Y</span>
              <span>30Y</span>
            </>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Pay Monthly</span>
          <span className="text-2xl font-bold text-gray-900">{formatCurrency(calculations.emi)}</span>
        </div>
        {/* <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Term of Use</span>
          <span className="text-lg font-semibold text-gray-900">
            {loanTenure} {tenureUnit === 'months' ? 'Months' : 'Years'}
          </span>
        </div> */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Total Pay Back Amount</span>
          <span className="text-2xl font-bold text-blue-600">{formatCurrency(calculations.totalAmount)}</span>
        </div>
      </div>

      {/* CTA Button */}
      <Link
        href="/emi-calculator"
        className="w-full inline-flex items-center justify-center px-6 py-4 text-base font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
        <span>View EMI Breakdown</span>
        <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </Link>
    </div>
  );
}
