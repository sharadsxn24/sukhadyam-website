import Link from 'next/link';
import { StickyCta } from '@/components/dabba/sticky-cta';

export default function HowDabbaWorksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 pb-24">
      <div className="max-w-md mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">How Dabba Works</h1>

        <div className="space-y-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Fixed Daily Dabba</h2>
            <p className="text-gray-600 leading-relaxed">
              Every day, we prepare a fresh, rotating menu. No confusion, no endless scrolling. Just simple, homely food that hits the spot.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-3">No Customisation</h2>
            <p className="text-gray-600 leading-relaxed">
              We keep it simple. No add-ons, no modifications. Just like your home dabba - what you see is what you get. Trust us, it&apos;s good! 😊
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Time-Based Ordering</h2>
            <p className="text-gray-600 leading-relaxed">
              Order window: <span className="font-semibold">11:00 AM - 12:30 PM</span>
              <br />
              Orders close strictly at 12:30 PM. No exceptions. Plan ahead!
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Office-Friendly Delivery</h2>
            <p className="text-gray-600 leading-relaxed">
              We deliver fresh dabbas to your office between <span className="font-semibold">1:00 PM - 3:00 PM</span>.
              Just provide your office name and delivery location.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Simple & Reliable</h2>
            <p className="text-gray-600 leading-relaxed">
              Office ka apna Dabba — roz ka, reliable, sorted. No apps to download, no complicated processes. Just good food, delivered on time.
            </p>
          </div>
        </div>

        <div className="text-center space-y-4">
          <Link
            href="/dabba"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-xl text-lg">
            Order Aaj Ka Dabba
          </Link>
          <div>
            <Link href="/kal-ka-dabba" className="text-orange-600 hover:text-orange-700 font-semibold">
              Kal ka Dabba dekho 👀
            </Link>
          </div>
        </div>
      </div>

      <StickyCta href="/dabba" label="Order Aaj Ka Dabba" />
    </div>
  );
}

