import Link from 'next/link';
import { StickyCta } from '@/components/dabba/sticky-cta';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 pb-20">
      {/* Hero Section */}
      <section className="pt-12 pb-8 px-4">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">It&apos;s Dabba Time 😋</h1>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Everyday meals for workdays.
            <br />
            Order by <span className="font-semibold text-orange-600">12:30 PM</span>.
            <br />
            Delivered <span className="font-semibold text-orange-600">1–3 PM</span>.
          </p>
          <Link href="/dabba" className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-lg transition-colors">
            Order Aaj Ka Dabba
          </Link>
        </div>
      </section>

      {/* How Dabba Works */}
      <section className="py-12 px-4">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">How Dabba Works</h2>
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
