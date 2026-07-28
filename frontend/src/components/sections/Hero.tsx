'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';

export function Hero() {
  const { user } = useAuth();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 min-h-[90vh] flex items-center transition-colors duration-300">
      {/* Animated background waves */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full">
          <svg className="absolute bottom-0 w-full h-64 text-blue-500/5 dark:text-blue-400/5" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="currentColor" d="M0,128L48,122.7C96,117,192,107,288,112C384,117,480,139,576,149.3C672,160,768,160,864,144C960,128,1056,96,1152,85.3C1248,75,1344,85,1392,90.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"/>
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
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
            AI Voice Generation Made Simple
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white leading-tight">
            Turn Your Text Into
            <span className="block bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent mt-2">
              Natural AI Voices
            </span>
          </h1>
          
          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-300">
            Generate studio-quality speech with 50+ voices, emotion control, and 15+ languages. 
            Perfect for creators, developers, and businesses.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {user ? (
              <Link href={user.role === 'admin' ? '/admin' : '/user'}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all text-lg"
                >
                  Go to Dashboard →
                </motion.button>
              </Link>
            ) : (
              <>
                <Link href="/register">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all text-lg"
                  >
                    Start Free Trial
                  </motion.button>
                </Link>
                <Link href="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-white font-semibold rounded-full shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all text-lg"
                  >
                    Login
                  </motion.button>
                </Link>
              </>
            )}
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-2">🎯 10,000 free chars</span>
            <span className="flex items-center gap-2">🎙️ 50+ voices</span>
            <span className="flex items-center gap-2">🌍 15+ languages</span>
            <span className="flex items-center gap-2">💳 No credit card</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}