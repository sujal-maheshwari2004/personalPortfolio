import React from 'react';
import { ArrowDownToLine, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

// Helper: Split string into motion spans
const AnimatedText = ({ text, className }) => {
  return (
    <motion.div
      className={`inline-block ${className}`}
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.04 } },
      }}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: `0.25em` },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.4 }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  );
};

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-black via-slate-900 to-gray-900"
    >
      <div className="max-w-4xl mx-auto text-center">
        <AnimatedText
          text="Hi, my name is"
          className="text-lg font-medium text-blue-600 dark:text-yellow-400"
        />

        <motion.h1
          className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mt-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Sujal Maheshwari
        </motion.h1>

        <motion.h2
          className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mt-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          I build modern web applications.
        </motion.h2>

        <motion.p
          className="text-md md:text-lg text-gray-600 dark:text-gray-400 mt-6 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          I'm a frontend developer who loves turning ideas into responsive, accessible, and performant digital experiences.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          >
            <Mail size={18} /> Contact Me
          </a>
          <a
            href="../assets/SujalMaheshwari2025.pdf" // Replace with actual path
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 dark:text-yellow-400 dark:border-yellow-400 rounded-full hover:bg-blue-100 dark:hover:bg-yellow-900 transition"
          >
            <ArrowDownToLine size={18} /> Resume
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
