'use client';

import { motion } from 'framer-motion';

const features = [
  { 
    icon: '🎙️', 
    title: 'Text-to-Speech', 
    desc: 'Convert any text into natural, expressive AI voices instantly with 50+ voices.',
    color: 'from-blue-500 to-blue-600'
  },
  { 
    icon: '🗣️', 
    title: 'Voice Cloning', 
    desc: 'Clone any voice with just 5–10 seconds of audio. Perfect for personalization.',
    color: 'from-purple-500 to-purple-600'
  },
  { 
    icon: '🌍', 
    title: '15+ Languages', 
    desc: 'Support for English, Urdu, Hindi, Arabic, Chinese, Spanish, and more.',
    color: 'from-green-500 to-green-600'
  },
  { 
    icon: '🎭', 
    title: 'Emotion Control', 
    desc: 'Add happy, sad, angry, or surprised tones using simple tags like [happy].',
    color: 'from-yellow-500 to-orange-600'
  },
  { 
    icon: '⚡', 
    title: 'Real-Time API', 
    desc: 'Generate speech in under 200ms – ideal for live apps and voice assistants.',
    color: 'from-red-500 to-red-600'
  },
  { 
    icon: '🔒', 
    title: 'Enterprise Grade', 
    desc: 'Role-based access, API keys, admin dashboard, and ethical AI policies.',
    color: 'from-indigo-500 to-indigo-600'
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

export function Features() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
          >
            Powerful Features at Your Fingertips
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mt-4 text-lg text-gray-600 dark:text-gray-400"
          >
            Everything you need to create amazing AI voices
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={item}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              {/* Gradient line on hover */}
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${f.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              
              <div className={`w-14 h-14 bg-gradient-to-br ${f.color} rounded-2xl flex items-center justify-center text-3xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {f.icon}
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">{f.title}</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}