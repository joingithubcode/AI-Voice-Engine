'use client';

import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const stats = [
  { number: 50000, label: 'Active Users', icon: '👥' },
  { number: 1500000, label: 'Audio Generated (mins)', icon: '🎵' },
  { number: 50, label: 'AI Voices', icon: '🎙️' },
  { number: 15, label: 'Languages', icon: '🌍' },
];

export function Stats() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section ref={ref} className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-900 transition-colors duration-300 border-y border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
                {inView && (
                  <CountUp
                    start={0}
                    end={stat.number}
                    duration={2.5}
                    separator=","
                    suffix={stat.number >= 1000 ? '+' : ''}
                  />
                )}
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}