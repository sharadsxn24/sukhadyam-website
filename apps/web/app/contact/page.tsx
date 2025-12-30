import { StickyCta } from '@/components/dabba/sticky-cta';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 pb-24">
      <div className="max-w-md mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Contact Us</h1>

        <div className="space-y-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Phone</h2>
            <a
              href="tel:+911234567890"
              className="text-orange-600 hover:text-orange-700 font-semibold text-lg">
              +91 12345 67890
            </a>
            <p className="text-sm text-gray-600 mt-2">Call us for any queries or support</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-3">WhatsApp</h2>
            <a
              href="https://wa.me/911234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 hover:text-orange-700 font-semibold text-lg">
              Chat with us on WhatsApp
            </a>
            <p className="text-sm text-gray-600 mt-2">Quick responses, instant support</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Outlet Timings</h2>
            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span>Order Window:</span>
                <span className="font-semibold">11:00 AM - 12:30 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Window:</span>
                <span className="font-semibold">1:00 PM - 3:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Days:</span>
                <span className="font-semibold">Monday - Friday</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Location</h2>
            <div className="aspect-video bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
              <p className="text-gray-500">Google Maps Embed</p>
            </div>
            <p className="text-sm text-gray-600">
              We deliver to offices in your area. Check if we serve your location!
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/dabba"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-xl text-lg">
            Order Aaj Ka Dabba
          </Link>
        </div>
      </div>

      <StickyCta href="/dabba" label="Order Aaj Ka Dabba" />
    </div>
  );
}

