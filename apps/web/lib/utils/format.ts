/**
 * Format number as Indian currency (INR)
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format number with Indian number system (lakhs, crores)
 */
export function formatIndianNumber(amount: number): string {
  if (amount >= 10000000) {
    // Crores
    return `${(amount / 10000000).toFixed(2)} Cr`;
  } else if (amount >= 100000) {
    // Lakhs
    return `${(amount / 100000).toFixed(2)} L`;
  } else if (amount >= 1000) {
    // Thousands
    return `${(amount / 1000).toFixed(2)} K`;
  }
  return amount.toString();
}

