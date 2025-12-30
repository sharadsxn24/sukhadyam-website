'use client';

import { useEffect, useState } from 'react';
import { getTomorrowMenu } from '@/lib/api/dabba';
import { StickyCta } from '@/components/dabba/sticky-cta';
import Link from 'next/link';

export default function KalKaDabbaPage() {
  const [tomorrowMenu, setTomorrowMenu] = useState<{
    theme: string;
    timeSlot: string;
    date: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTomorrowMenu();
  }, []);

  const loadTomorrowMenu = async () => {
    setLoading(true);
    const response = await getTomorrowMenu();
    if (response.success && response.data) {
      setTomorrowMenu(response.data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <div className="text-center">
          <div className="text-2xl mb-2">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 pb-24">
      <div className="max-w-md mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Kal Ka Dabba 👀</h1>
          <p className="text-lg text-gray-700">
            Fresh rotating Dabba drops at <span className="font-semibold text-orange-600">10:30 AM</span>
          </p>
        </div>

        {tomorrowMenu ? (
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <div className="text-5xl mb-4">🍽️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Tomorrow&apos;s Theme</h2>
            <p className="text-3xl font-bold text-orange-600 mb-6">{tomorrowMenu.theme}</p>
            <p className="text-gray-600 mb-6">
              Menu details will be available tomorrow at 10:30 AM. Stay tuned! 😊
            </p>
            <Link
              href="/dabba"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl">
              Aaj Ka Dabba Dekho
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <p className="text-gray-600 mb-6">
              Kal ka menu abhi available nahi hai. Check back tomorrow!
            </p>
            <Link
              href="/dabba"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl">
              Aaj Ka Dabba Dekho
            </Link>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link href="/how-dabba-works" className="text-orange-600 hover:text-orange-700 font-semibold">
            How Dabba Works →
          </Link>
        </div>
      </div>

      <StickyCta href="/dabba" label="Order Aaj Ka Dabba" />
    </div>
  );
}

