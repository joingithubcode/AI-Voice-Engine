'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';

export function CTA() {
  const { user } = useAuth();

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-800 dark:via-indigo-800 dark:to-purple-800 transition-colors duration-300 relative overflow-hidden">
      {/* Animated shapes */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000 pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center px-4 relative z-10"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-white">
          Ready to Build with AI Voice?
        </h2>
        <p className="mt-4 text-lg md:text-xl text-blue-100">
          Join thousands of creators using VoiceAI to generate studio-quality speech.
          No credit card required. Start your free trial today.
        </p>
        <div className="mt-10">
          <Link href={user ? (user.role === 'admin' ? '/admin' : '/user') : '/register'}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-blue-600 hover:bg-gray-100 font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all text-lg"
            >
              {user ? 'Go to Dashboard →' : 'Start Free Trial →'}
            </motion.button>
          </Link>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-blue-200">
          <span>✓ 10,000 free characters</span>
          <span>✓ 50+ AI voices</span>
          <span>✓ 24/7 support</span>
        </div>
      </motion.div>
    </section>
  );
}