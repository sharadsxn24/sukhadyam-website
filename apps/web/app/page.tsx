import Link from 'next/link';
import { StickyCta } from '@/components/dabba/sticky-cta';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen pb-10" style={{ backgroundColor: '#1a4789' }}>
      {/* Hero Section */}
      <section className="pt-8 pb-8 px-4">
        <div className="max-w-md mx-auto text-center">
          <img src="/images/sukhadyam-logo.png" alt="Sukhadyam" style={{ height: 80, width: 'auto', margin: '0 auto' }} />
          <div className="flex items-center justify-center text-white mt-4 mb-1">introducing</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-yellow-300 uppercase dabba-cursive">Dabba</span>
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
          <h2 className="text-2xl font-bold text-yellow-300 mb-6 text-center">How Dabba Works</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">1</div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Check Today&apos;s Menu</h3>
                  <p className="text-gray-600 text-sm">Fresh rotating menu every day. No customisation, just simple, homely food.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">2</div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Order by 12:30 PM</h3>
                  <p className="text-gray-600 text-sm">Place your order before the cut-off. Orders close strictly at 12:30 PM.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">3</div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Get Your Dabba</h3>
                  <p className="text-gray-600 text-sm">Delivered fresh to your office between 1–3 PM. Simple, reliable, sorted.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 px-4">
        <div className="max-w-md mx-auto text-center">
          <Link href="/kal-ka-dabba" className="text-orange-600 hover:text-orange-700 font-semibold text-lg">
            Kal ka Dabba dekho 👀
          </Link>
        </div>
      </section>

      <StickyCta href="/dabba" label="Order Aaj Ka Dabba" />
    </div>
  );
}
