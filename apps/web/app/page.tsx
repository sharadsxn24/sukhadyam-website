import Link from 'next/link';
import { TopBar } from '@/components/layout/top-bar';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroCalculator } from '@/components/calculator/hero-calculator';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* <TopBar /> */}
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-800 to-indigo-800 min-h-[80vh] flex items-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.3),transparent_50%)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.3),transparent_50%)]"></div>
        </div>

        {/* Slider Indicators */}
        {/* <div className="absolute left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col space-y-4">
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex items-center space-x-3">
              <div className={`w-2 h-2 rounded-full ${num === 1 ? 'bg-blue-500 w-8' : 'bg-gray-600'}`}></div>
              <span className={`text-sm font-medium ${num === 1 ? 'text-blue-400' : 'text-gray-500'}`}>{String(num).padStart(2, '0')}</span>
            </div>
          ))}
        </div> */}

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Content */}
            <div className="text-white">
              {/* <div className="mb-6">
                <span className="text-lg md:text-xl text-blue-400 font-medium">
                  Smart Loans For <span className="text-blue-300 font-semibold">Bright Futures</span>
                </span>
              </div> */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-center md:text-left pt-4 md:pt-0 mb-0 md:mb-6">
                EMI Calculator &
                <br />
                Smart Loan Planning
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl leading-relaxed hidden md:block">
                Calculate your EMI, total interest, and repayment schedule for home, car, and personal loans — free and instant.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8 hidden md:flex">
                <Link
                  href="/services"
                  className="group inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-blue-600 bg-white rounded-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-lg">
                  <span></span>
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  <svg className="ml-1 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href="/emi-calculator"
                  className="group inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white border-2 border-white rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <span>How EMI Works</span>
                  {/* <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg> */}
                  <svg className="ml-1 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Right Side - Calculator Widget */}
            <div className="flex justify-center lg:justify-end">
              <HeroCalculator />
            </div>
          </div>
        </div>

        {/* Abstract Pattern Overlay */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
      </section>

      {/* Quick Value Proposition */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="group relative bg-white p-8 rounded-2xl shadow-md hover:shadow-xl border border-gray-100 hover:border-blue-200 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/30">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Accurate EMI Calculation</h3>
              <p className="text-gray-600 leading-relaxed">Know your monthly EMI, total interest, and total repayment with precision.</p>
            </div>

            <div className="group relative bg-white p-8 rounded-2xl shadow-md hover:shadow-xl border border-gray-100 hover:border-green-200 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-green-500/30">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Prepayment & Savings</h3>
              <p className="text-gray-600 leading-relaxed">See how extra payments reduce interest and loan tenure significantly.</p>
            </div>

            <div className="group relative bg-white p-8 rounded-2xl shadow-md hover:shadow-xl border border-gray-100 hover:border-purple-200 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-500/30">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Decision Guidance</h3>
              <p className="text-gray-600 leading-relaxed">Understand whether to reduce EMI or tenure based on your financial situation.</p>
            </div>

            <div className="group relative bg-white p-8 rounded-2xl shadow-md hover:shadow-xl border border-gray-100 hover:border-orange-200 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-orange-500/30">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">India-Focused Planning</h3>
              <p className="text-gray-600 leading-relaxed">Designed specifically for Indian salaries, loans, and banking systems.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Primary Feature Section - EMI Calculator */}
      <section className="py-20 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">EMI Calculator</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">Enter your loan amount, interest rate, and tenure to instantly see your EMI and loan breakup.</p>
          </div>
          <div className="text-center">
            <Link
              href="/emi-calculator"
              className="inline-flex items-center justify-center px-10 py-5 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/60 transition-all duration-300 hover:scale-105">
              <span>Open EMI Calculator</span>
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Simple steps to plan your loan EMIs</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center group">
              <div className="relative inline-block mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl font-bold text-white">1</span>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-400 rounded-full border-4 border-white"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Enter loan details</h3>
              <p className="text-gray-600 leading-relaxed">Input your loan amount, interest rate, and tenure in seconds.</p>
            </div>

            <div className="text-center group">
              <div className="relative inline-block mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl font-bold text-white">2</span>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-indigo-400 rounded-full border-4 border-white"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">View EMI & interest breakup</h3>
              <p className="text-gray-600 leading-relaxed">Get instant results showing monthly EMI and total interest breakdown.</p>
            </div>

            <div className="text-center group">
              <div className="relative inline-block mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl font-bold text-white">3</span>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-400 rounded-full border-4 border-white"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Plan prepayment or tenure reduction</h3>
              <p className="text-gray-600 leading-relaxed">Explore options to save on interest and reduce loan duration.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-24 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">Start Planning Your EMI Today</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">Take control of your loan repayments and make informed financial decisions.</p>
          <Link
            href="/emi-calculator"
            className="inline-flex items-center justify-center px-10 py-5 text-lg font-semibold text-blue-600 bg-white rounded-xl shadow-2xl hover:bg-gray-50 transition-all duration-300 hover:scale-105 hover:shadow-3xl">
            <span>Calculate EMI Now</span>
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
