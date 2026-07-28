'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-20 transition-colors duration-300">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/30 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-200/30 dark:bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000 pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
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
              About VoiceAI
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
              We're Building the{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Future of Voice
              </span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Empowering creators, developers, and businesses with cutting-edge AI voice technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Mission</h2>
              <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                To democratize access to high-quality AI voice synthesis by providing a platform
                that is <strong>affordable, easy to use, and incredibly powerful</strong>.
                We believe everyone deserves to have a voice that truly represents them.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                  <span className="text-blue-600 dark:text-blue-400 text-xl">🎯</span>
                  <span>Enable creators to produce professional voiceovers without expensive studios.</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                  <span className="text-blue-600 dark:text-blue-400 text-xl">🌍</span>
                  <span>Bridge language barriers with multi‑language support and natural accents.</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                  <span className="text-blue-600 dark:text-blue-400 text-xl">⚡</span>
                  <span>Deliver real‑time performance for interactive applications.</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Vision</h2>
              <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                To become the world's leading AI voice platform, trusted by millions to create
                authentic, emotional, and engaging voice experiences. We envision a future where
                AI voices are indistinguishable from human voices, making communication borderless.
              </p>
              <div className="mt-6 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                <p className="text-blue-800 dark:text-blue-200 font-medium">
                  "We are not just building a tool; we are building a bridge between imagination and reality."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
            >
              What We Offer
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-4 text-lg text-gray-600 dark:text-gray-400"
            >
              A complete suite of AI voice solutions for every need
            </motion.p>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: '🎙️',
                title: 'Text-to-Speech Engine',
                desc: 'Convert any text into natural, human-like speech with 50+ voices and emotion control.',
              },
              {
                icon: '🗣️',
                title: 'Voice Cloning Studio',
                desc: 'Clone voices with just 5–10 seconds of audio. Perfect for personalization and branding.',
              },
              {
                icon: '⚡',
                title: 'Real-Time API',
                desc: 'Integrate voice generation into your apps with sub‑200ms latency for live experiences.',
              },
              {
                icon: '🌍',
                title: '15+ Languages',
                desc: 'Support for English, Urdu, Hindi, Arabic, Chinese, Spanish, and many more.',
              },
              {
                icon: '🎭',
                title: 'Emotion & Effects',
                desc: 'Add emotions like happy, sad, angry, and sound effects like laugh or sigh.',
              },
              {
                icon: '📦',
                title: 'Batch Processing',
                desc: 'Generate thousands of audio files efficiently for content teams and large projects.',
              },
            ].map((offer, idx) => (
              <motion.div
                key={idx}
                variants={item}
                whileHover={{ y: -8 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-2xl">
                  {offer.icon}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">{offer.title}</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">{offer.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us (Benefits) */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
            >
              Why Choose VoiceAI?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-4 text-lg text-gray-600 dark:text-gray-400"
            >
              The smartest choice for AI voice generation
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Unmatched Quality',
                desc: 'Our AI models produce studio-grade audio that sounds natural and expressive.',
                icon: '🎯',
              },
              {
                title: 'Affordable Pricing',
                desc: 'Flexible plans that scale with your needs – from free to enterprise.',
                icon: '💰',
              },
              {
                title: 'Privacy & Security',
                desc: 'Your data is yours. We never store your audio or text without permission.',
                icon: '🔒',
              },
              {
                title: 'Developer Friendly',
                desc: 'Clear API documentation, SDKs, and webhooks for seamless integration.',
                icon: '👨‍💻',
              },
              {
                title: 'Continuous Innovation',
                desc: 'Regular updates with new voices, languages, and features.',
                icon: '🚀',
              },
              {
                title: 'Community & Support',
                desc: 'Join a thriving community and get 24/7 support from our team.',
                icon: '💬',
              },
            ].map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="flex items-start gap-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
              >
                <span className="text-3xl">{benefit.icon}</span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{benefit.title}</h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-400 text-sm">{benefit.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
            >
              Built on Cutting‑Edge Technology
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-4 text-lg text-gray-600 dark:text-gray-400"
            >
              Leveraging the best open‑source models and modern infrastructure
            </motion.p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Kokoro', icon: '🧠', desc: 'Fastest CPU‑based TTS' },
              { name: 'Faster‑Whisper', icon: '🎤', desc: 'Speech‑to‑text' },
              { name: 'Transformers', icon: '🤖', desc: 'NLP & translation' },
              { name: 'FastAPI', icon: '⚡', desc: 'High‑performance backend' },
              { name: 'Next.js', icon: '🖥️', desc: 'Modern frontend' },
              { name: 'PostgreSQL', icon: '🐘', desc: 'Reliable database' },
              { name: 'TailwindCSS', icon: '🎨', desc: 'Beautiful UI' },
              { name: 'Docker', icon: '🐳', desc: 'Easy deployment' },
            ].map((tech, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 text-center hover:shadow-md transition-shadow"
              >
                <div className="text-3xl">{tech.icon}</div>
                <h4 className="mt-2 font-semibold text-gray-900 dark:text-white">{tech.name}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">{tech.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team / Trust Section */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Trusted by Innovators</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We partner with creators, educators, and enterprises to bring AI voices to life.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
              <span>✅ 5,000+ Active Users</span>
              <span>✅ 1.5M+ Minutes Generated</span>
              <span>✅ 4.9/5 Average Rating</span>
              <span>✅ 30-Day Money‑Back Guarantee</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-800 dark:to-indigo-800 transition-colors duration-300">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white">
              Ready to Experience the Future?
            </h2>
            <p className="mt-4 text-lg text-blue-100">
              Join thousands of users and start creating amazing AI voices today.
            </p>
            <a href="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 px-8 py-4 bg-white text-blue-600 hover:bg-gray-100 font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all"
              >
                Start Free Trial →
              </motion.button>
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}