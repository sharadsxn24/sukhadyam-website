/**
 * Time utilities for Dabba ordering system
 * Note: Frontend displays time, but backend is the source of truth
 */

/**
 * Format time in 12-hour format
 */
export function formatTime12Hour(hour: number, minute: number): string {
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${displayHour}:${String(minute).padStart(2, '0')} ${period}`;
}

/**
 * Get current time string (for display only)
 */
export function getCurrentTimeString(): string {
  const now = new Date();
  return formatTime12Hour(now.getHours(), now.getMinutes());
}

/**
 * Check if current time is within ordering window (client-side check only)
 * Backend is the single source of truth - this is just for UI state
 */
export function isWithinOrderingWindow(): boolean {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();

  // Ordering window: 11:00 AM - 12:30 PM
  if (hour < 11) return false;
  if (hour > 12) return false;
  if (hour === 12 && minute > 30) return false;

  return true;
}

