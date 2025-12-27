import { formatCurrency } from '@/lib/utils/format';
import type { EMICalculationResult } from '@/lib/calculators/emi';

interface EMIResultsProps {
  results: EMICalculationResult;
  loanTenure: string;
}

export function EMIResults({ results, loanTenure }: EMIResultsProps) {
  const interestPercentage =
    results.principal > 0
      ? ((results.totalInterest / results.principal) * 100).toFixed(1)
      : '0';

  return (
    <div className="border-t-2 border-gray-100 pt-8">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Loan Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* Monthly EMI */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
          <div className="text-sm font-medium text-blue-700 mb-2">Monthly EMI</div>
          <div className="text-2xl md:text-3xl font-bold text-blue-900">
            {formatCurrency(results.emi)}
          </div>
          <div className="text-xs text-blue-600 mt-1">
            Per month for {loanTenure || 0} years
          </div>
        </div>

        {/* Total Interest */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
          <div className="text-sm font-medium text-orange-700 mb-2">Total Interest</div>
          <div className="text-2xl md:text-3xl font-bold text-orange-900">
            {formatCurrency(results.totalInterest)}
          </div>
          <div className="text-xs text-orange-600 mt-1">
            {interestPercentage}% of loan amount
          </div>
        </div>

        {/* Total Amount */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
          <div className="text-sm font-medium text-green-700 mb-2">Total Amount</div>
          <div className="text-2xl md:text-3xl font-bold text-green-900">
            {formatCurrency(results.totalAmount)}
          </div>
          <div className="text-xs text-green-600 mt-1">Principal + Interest</div>
        </div>
      </div>
    </div>
  );
}

