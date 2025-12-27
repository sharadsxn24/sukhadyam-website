'use client';

import { Input } from '@/components/ui/input';

interface EMIInputFormProps {
  loanAmount: string;
  interestRate: string;
  loanTenure: string;
  onLoanAmountChange: (value: string) => void;
  onInterestRateChange: (value: string) => void;
  onLoanTenureChange: (value: string) => void;
}

export function EMIInputForm({
  loanAmount,
  interestRate,
  loanTenure,
  onLoanAmountChange,
  onInterestRateChange,
  onLoanTenureChange,
}: EMIInputFormProps) {
  return (
    <div className="space-y-6">
      {/* Loan Amount */}
      <Input
        id="loanAmount"
        label="Loan Amount (₹)"
        prefix="₹"
        type="text"
        value={loanAmount}
        onChange={(e) => {
          const value = e.target.value.replace(/[^0-9]/g, '');
          onLoanAmountChange(value);
        }}
        placeholder="50,00,000"
        quickButtons={[10, 25, 50, 100].map((lakh) => ({
          label: `${lakh}L`,
          value: String(lakh * 100000),
          onClick: () => onLoanAmountChange(String(lakh * 100000)),
        }))}
      />

      {/* Interest Rate */}
      <Input
        id="interestRate"
        label="Interest Rate (% per annum)"
        suffix="%"
        type="text"
        value={interestRate}
        onChange={(e) => {
          const value = e.target.value.replace(/[^0-9.]/g, '');
          if (value.split('.').length <= 2) {
            onInterestRateChange(value);
          }
        }}
        placeholder="8.5"
        quickButtons={[7.5, 8.5, 9.5, 10.5].map((rate) => ({
          label: `${rate}%`,
          value: String(rate),
          onClick: () => onInterestRateChange(String(rate)),
        }))}
      />

      {/* Loan Tenure */}
      <Input
        id="loanTenure"
        label="Loan Tenure (Years)"
        suffix="Years"
        type="text"
        value={loanTenure}
        onChange={(e) => {
          const value = e.target.value.replace(/[^0-9]/g, '');
          onLoanTenureChange(value);
        }}
        placeholder="20"
        quickButtons={[5, 10, 15, 20, 25, 30].map((years) => ({
          label: `${years}Y`,
          value: String(years),
          onClick: () => onLoanTenureChange(String(years)),
        }))}
      />
    </div>
  );
}

