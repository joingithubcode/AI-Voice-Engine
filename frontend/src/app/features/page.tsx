'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';

const featuresList = [
  {
    icon: '🎙️',
    title: 'Text-to-Speech',
    desc: 'Convert any text into natural, expressive AI voices instantly with 50+ voices and multiple accents.',
    color: 'from-blue-500 to-blue-600',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    icon: '🗣️',
    title: 'Voice Cloning',
    desc: 'Clone any voice with just 5–10 seconds of audio. Perfect for personalized content and branding.',
    color: 'from-purple-500 to-purple-600',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
  },
  {
    icon: '🌍',
    title: 'Multi-Language',
    desc: 'Support for 15+ languages including English, Urdu, Hindi, Arabic, Chinese, Spanish, and more.',
    color: 'from-green-500 to-green-600',
    bg: 'bg-green-50 dark:bg-green-900/20',
  },
  {
    icon: '🎭',
    title: 'Emotion Control',
    desc: 'Add emotional tones like happy, sad, angry, surprised, or fearful using simple tags like [happy].',
    color: 'from-yellow-500 to-orange-600',
    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
  },
  {
    icon: '⚡',
    title: 'Real-Time API',
    desc: 'Generate speech in under 200ms – ideal for live applications, voice assistants, and chatbots.',
    color: 'from-red-500 to-red-600',
    bg: 'bg-red-50 dark:bg-red-900/20',
  },
  {
    icon: '📦',
    title: 'Batch Processing',
    desc: 'Generate large volumes of speech efficiently with our batch processing feature. Perfect for content teams.',
    color: 'from-indigo-500 to-indigo-600',
    bg: 'bg-indigo-50 dark:bg-indigo-900/20',
  },
  {
    icon: '🔒',
    title: 'Enterprise Grade Security',
    desc: 'Role-based access, API key authentication, audit logs, and ethical AI policies built-in.',
    color: 'from-gray-500 to-gray-600',
    bg: 'bg-gray-50 dark:bg-gray-800/50',
  },
  {
    icon: '🎵',
    title: 'Podcast Studio',
    desc: 'Create multi-speaker podcasts and dialogues with different voices for each character.',
    color: 'from-pink-500 to-pink-600',
    bg: 'bg-pink-50 dark:bg-pink-900/20',
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

export default function FeaturesPage() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-20 transition-colors duration-300">
        {/* Animated background shapes */}
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
              Everything You Need to Create Amazing AI Voices
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
              Powerful Features{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                at Your Fingertips
              </span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
              From text-to-speech to voice cloning, we provide all the tools you need to create
              professional-grade AI voices.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featuresList.map((f, i) => (
              <motion.div
                key={i}
                variants={item}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative bg-gray-50 dark:bg-gray-800/50 p-8 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                {/* Gradient top bar */}
                <div
                  className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${f.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>

                {/* Icon */}
                <div
                  className={`w-14 h-14 ${f.bg} rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300`}
                >
                  {f.icon}
                </div>

                {/* Title */}
                <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                  {f.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {f.desc}
                </p>

                {/* Learn more link (hover effect) */}
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-blue-600 dark:text-blue-400 text-sm font-medium inline-flex items-center gap-1">
                    Learn more →
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-800 dark:to-indigo-800 transition-colors duration-300">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white">
              Ready to Get Started?
            </h2>
            <p className="mt-4 text-lg text-blue-100">
              Join thousands of creators using VoiceAI. Start your free trial today.
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