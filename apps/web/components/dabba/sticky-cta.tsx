'use client';

import Link from 'next/link';

interface StickyCtaProps {
  href: string;
  label: string;
  disabled?: boolean;
}

export function StickyCta({ href, label, disabled }: StickyCtaProps) {
  if (disabled) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 p-4 shadow-lg">
        <button
          disabled
          className="w-full bg-gray-300 text-gray-500 py-4 px-6 rounded-xl font-semibold text-lg cursor-not-allowed">
          {label}
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 p-4 shadow-lg">
      <Link
        href={href}
        className="block w-full bg-orange-500 hover:bg-orange-600 text-white py-4 px-6 rounded-xl font-semibold text-lg text-center transition-colors">
        {label}
      </Link>
    </div>
  );
}

