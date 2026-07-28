'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    chars: '10,000',
    features: [
      'Basic AI voices',
      'MP3 export',
      'Community support',
      '10,000 characters/month',
    ],
    cta: 'Start Free',
    popular: false,
    color: 'from-gray-400 to-gray-500',
    border: 'border-gray-200 dark:border-gray-700',
  },
  {
    name: 'Creator',
    price: '$9',
    period: '/month',
    chars: '100,000',
    features: [
      'All AI voices (50+)',
      'Voice cloning',
      '7-day free trial',
      'Priority support',
      'Emotion control',
      '100,000 characters/month',
    ],
    cta: 'Start 7-Day Trial',
    popular: true,
    color: 'from-blue-500 to-indigo-600',
    border: 'border-blue-500 dark:border-blue-400',
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    chars: '500,000',
    features: [
      'Premium AI voices',
      'Advanced voice cloning',
      '14-day free trial',
      'API access',
      'Podcast Studio',
      '500,000 characters/month',
    ],
    cta: 'Start 14-Day Trial',
    popular: false,
    color: 'from-purple-500 to-purple-600',
    border: 'border-purple-200 dark:border-purple-700',
  },
  {
    name: 'Agency',
    price: '$99',
    period: '/month',
    chars: '2,000,000',
    features: [
      'Team collaboration',
      'Full API access',
      '30-day free trial',
      'Dedicated support',
      'White-label options',
      '2M characters/month',
    ],
    cta: 'Start 30-Day Trial',
    popular: false,
    color: 'from-indigo-500 to-indigo-600',
    border: 'border-indigo-200 dark:border-indigo-700',
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  // Adjust pricing for yearly (20% discount)
  const getPrice = (price: string) => {
    if (billingCycle === 'yearly' && price !== '$0') {
      const num = parseInt(price.replace('$', ''));
      return `$${Math.round(num * 12 * 0.8)}`;
    }
    return price;
  };
  const getPeriod = (price: string) => {
    if (billingCycle === 'yearly' && price !== '$0') return '/year';
    return '/month';
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-20 transition-colors duration-300">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/30 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-200/30 dark:bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000 pointer-events-none"></div>

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-sm text-blue-700 dark:text-blue-300 font-medium mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Simple, Transparent Pricing
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
              Choose the{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Right Plan
              </span>{' '}
              for You
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
              No hidden fees. Cancel anytime. Start with a free trial on any paid plan.
            </p>
          </motion.div>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex justify-center items-center gap-4"
          >
            <span className={`text-sm ${billingCycle === 'monthly' ? 'text-gray-900 dark:text-white font-semibold' : 'text-gray-500 dark:text-gray-400'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="relative w-14 h-8 bg-gray-300 dark:bg-gray-700 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <span
                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
                  billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-sm ${billingCycle === 'yearly' ? 'text-gray-900 dark:text-white font-semibold' : 'text-gray-500 dark:text-gray-400'}`}>
              Yearly <span className="text-green-600 dark:text-green-400 font-medium ml-1">Save 20%</span>
            </span>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ y: -12, scale: 1.02 }}
                className={`relative bg-gray-50 dark:bg-gray-800/50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 ${
                  plan.popular
                    ? 'border-blue-500 dark:border-blue-400 shadow-blue-200 dark:shadow-blue-900/30'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold rounded-full shadow-md">
                    ★ Most Popular
                  </div>
                )}

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                    {getPrice(plan.price)}
                  </span>
                  <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                    {getPeriod(plan.price)}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {plan.chars} characters/month
                </p>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <span className="text-blue-600 dark:text-blue-400 font-bold">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  className={`mt-8 w-full py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-xl ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {plan.cta}
                </button>

                {plan.popular && (
                  <p className="mt-3 text-center text-xs text-gray-500 dark:text-gray-400">
                    No credit card required • 7-day free trial
                  </p>
                )}
                {!plan.popular && plan.price !== '$0' && (
                  <p className="mt-3 text-center text-xs text-gray-400 dark:text-gray-500">
                    Free trial available
                  </p>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-20 flex flex-wrap justify-center gap-8 text-sm text-gray-600 dark:text-gray-400"
          >
            <span className="flex items-center gap-2">💳 No hidden fees</span>
            <span className="flex items-center gap-2">🔄 Cancel anytime</span>
            <span className="flex items-center gap-2">🔒 Secure payments</span>
            <span className="flex items-center gap-2">⭐ 4.9/5 average rating</span>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-20 max-w-3xl mx-auto"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: 'Can I change my plan later?',
                  a: 'Yes, you can upgrade or downgrade at any time from your dashboard.',
                },
                {
                  q: 'Is there a free plan?',
                  a: 'Yes, the Free plan gives you 10,000 characters per month forever.',
                },
                {
                  q: 'Do you offer a refund?',
                  a: 'Yes, we offer a 30-day money-back guarantee on all paid plans.',
                },
                {
                  q: 'Can I use the API with any plan?',
                  a: 'Yes, the Pro and Agency plans include full API access.',
                },
              ].map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"
                >
                  <dt className="font-semibold text-gray-900 dark:text-white">{faq.q}</dt>
                  <dd className="mt-1 text-gray-600 dark:text-gray-400 text-sm">{faq.a}</dd>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}