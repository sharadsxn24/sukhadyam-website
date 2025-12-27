export interface EMICalculationInput {
  loanAmount: number;
  interestRate: number;
  loanTenure: number; // in years
}

export interface EMICalculationResult {
  emi: number;
  totalInterest: number;
  totalAmount: number;
  principal: number;
}

/**
 * Calculate EMI (Equated Monthly Installment) using the standard formula
 * Formula: [P x R x (1+R)^N] / [(1+R)^N - 1]
 * Where:
 * P = Principal (loan amount)
 * R = Monthly interest rate (annual rate / 12 / 100)
 * N = Number of months (tenure in years * 12)
 */
export function calculateEMI(input: EMICalculationInput): EMICalculationResult {
  const { loanAmount: principal, interestRate: rate, loanTenure: tenure } = input;

  // Validate inputs
  if (principal <= 0 || rate <= 0 || tenure <= 0) {
    return {
      emi: 0,
      totalInterest: 0,
      totalAmount: 0,
      principal: 0,
    };
  }

  // Convert annual rate to monthly and tenure to months
  const monthlyRate = rate / 12 / 100;
  const months = tenure * 12;

  // Calculate EMI using the formula
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);

  // Calculate total amount and interest
  const totalAmount = emi * months;
  const totalInterest = totalAmount - principal;

  return {
    emi: isNaN(emi) ? 0 : emi,
    totalInterest: isNaN(totalInterest) ? 0 : totalInterest,
    totalAmount: isNaN(totalAmount) ? 0 : totalAmount,
    principal,
  };
}
