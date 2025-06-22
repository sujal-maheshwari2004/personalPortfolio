import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { experiences } from './experiences'; // adjust path if needed

const Experience = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section id="experience" className="min-h-screen px-4 py-20 bg-gradient-to-b from-black via-slate-900 to-black text-white">
      <div className="max-w-5xl mx-auto">
        <p className="text-sm text-blue-500 dark:text-yellow-500 uppercase tracking-wider mb-2 text-center">
          Where I’ve Been
        </p>
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center text-blue-600 dark:text-yellow-400 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Experience
        </motion.h2>

        <div className="relative border-l-2 border-white/20 pl-8 space-y-12">
          {experiences
            .sort((a, b) => new Date(b.startDate || b.duration?.split('–')[0]) - new Date(a.startDate || a.duration?.split('–')[0]))
            .map((exp, i) => (
              <motion.div
                key={i}
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="absolute -left-[1.1rem] top-2 w-6 h-6 rounded-full bg-yellow-400 shadow-lg flex items-center justify-center">
                  <Briefcase size={16} className="text-black" />
                </div>

                <div
                  className="cursor-pointer bg-white/5 p-5 rounded-lg transition hover:bg-white/10"
                  onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-xl font-bold text-white">{exp.company}</h3>
                    <span className="text-sm text-gray-400 font-mono whitespace-nowrap">{exp.duration}</span>
                  </div>
                  <div className="text-blue-400 text-md mt-1 font-semibold">{exp.title}</div>
                  {exp.location && <div className="text-sm text-gray-400 mt-0.5 italic">{exp.location}</div>}
                </div>

                <AnimatePresence>
                  {activeIndex === i && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 ml-4 p-5 border border-white/10 bg-white/10 backdrop-blur-md rounded-xl shadow-md"
                    >
                      <ul className="list-disc pl-5 space-y-2 text-gray-200 text-sm">
                        {exp.description.map((point, j) => (
                          <li key={j}>{point}</li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
