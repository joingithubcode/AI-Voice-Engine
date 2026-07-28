'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const testimonials = [
  {
    name: 'Sarah Ahmed',
    role: 'Content Creator',
    avatar: '👩',
    content: 'VoiceAI has completely transformed my content creation workflow. The voices are incredibly natural and the emotion control feature is a game-changer!',
    rating: 5,
  },
  {
    name: 'Muhammad Ali',
    role: 'Software Developer',
    avatar: '👨',
    content: 'The API is blazing fast and the voice cloning is mind-blowing. I integrated it into my app in less than an hour. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Ayesha Khan',
    role: 'E-Learning Instructor',
    avatar: '👩‍🏫',
    content: 'My students love the voiceovers! The multi-language support helps me reach a wider audience. Best investment for my online courses.',
    rating: 5,
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

const item = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
};

export function Testimonials() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
          >
            What Our Users Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mt-4 text-lg text-gray-600 dark:text-gray-400"
          >
            Trusted by creators, developers, and businesses worldwide
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={item}
              whileHover={{ y: -8 }}
              className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 rounded-full flex items-center justify-center text-2xl">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{t.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t.role}</p>
                </div>
              </div>
              <div className="flex gap-1 text-yellow-400 mb-3">
                {[...Array(t.rating)].map((_, idx) => (
                  <span key={idx}>⭐</span>
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">"{t.content}"</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}