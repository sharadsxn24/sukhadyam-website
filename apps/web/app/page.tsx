import Link from 'next/link';
import { StickyCta } from '@/components/dabba/sticky-cta';

export default function Home() {
  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: '#184b96' }}>
      {/* Hero Section */}
      <section className="pt-8 pb-8 px-4">
        <div className="max-w-md mx-auto text-center">
          <img src="/images/sukhadyam-logo.png" alt="Sukhadyam" style={{ height: 80, width: 'auto', margin: '0 auto' }} />
          <div className="flex items-center justify-center text-lg text-gray-300 mt-4 mb-1">introducing</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-yellow-300 uppercase dabba-cursive">Office Dabba</span>
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            Everyday meals for workdays.
            <br />
            Order by <span className="font-semibold text-yellow-300">12:30 PM</span>.
            <br />
            Delivered <span className="font-semibold text-yellow-300">1–3 PM</span>.
          </p>
        </div>
      </section>

      {/* How Dabba Works */}
      <section className="pt-0 pb-12 px-4">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-yellow-300 mb-6 text-center">How Office Dabba Works</h2>
          <div className="space-y-6">
            <div className="text-white rounded-xl p-5 border border-yellow-300 border-dashed" style={{ backgroundColor: '#033276' }}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-yellow-300 text-blue-900 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">1</div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Check Today&apos;s Menu</h3>
                  <p className="text-gray-300 text-sm">Fresh rotating menu every day. No customisation, just simple, homely food.</p>
                </div>
              </div>
            </div>

            <div className="text-white rounded-xl p-5 border border-yellow-300 border-dashed" style={{ backgroundColor: '#033276' }}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-yellow-300 text-blue-900 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">2</div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Order by 12:30 PM</h3>
                  <p className="text-gray-300 text-sm">Place your order before the cut-off. Orders close strictly at 12:30 PM.</p>
                </div>
              </div>
            </div>

            <div className="text-white rounded-xl p-5 border border-yellow-300 border-dashed" style={{ backgroundColor: '#033276' }}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-yellow-300 text-blue-900 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">3</div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Get Your Dabba</h3>
                  <p className="text-gray-300 text-sm">Delivered fresh to your office between 1–3 PM. Simple, reliable, sorted.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StickyCta href="/office-dabba" label="Order Office Dabba" />
    </div>
  );
}
