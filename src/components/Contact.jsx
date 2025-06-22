import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Phone } from 'lucide-react';

const Contact = () => {
  return (
    <section
      id="contact"
      className="min-h-screen px-4 py-20 bg-gradient-to-b from-black via-gray-900 to-black text-white flex items-center justify-center"
    >
      <div className="max-w-2xl w-full text-center">
        <p className="text-sm text-blue-500 dark:text-yellow-500 uppercase tracking-wider mb-2">
          Let’s Connect
        </p>

        <motion.h2
          className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-yellow-400 mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Contact
        </motion.h2>

        <motion.p
          className="text-lg text-gray-300 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          I’m always open to opportunities and collaboration. Feel free to get in touch!
        </motion.p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a
            href="mailto:sujalmaheshwari07@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-blue-500 text-blue-500 dark:text-yellow-400 dark:border-yellow-400 rounded-full hover:bg-blue-600 dark:hover:bg-yellow-400 hover:text-white dark:hover:text-black transition"
          >
            <Mail size={18} /> Email
          </a>

          <a
            href="https://www.linkedin.com/in/sujal-maheshwari/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-blue-500 text-blue-500 dark:text-yellow-400 dark:border-yellow-400 rounded-full hover:bg-blue-600 dark:hover:bg-yellow-400 hover:text-white dark:hover:text-black transition"
          >
            <Linkedin size={18} /> LinkedIn
          </a>

          <a
            href="tel:+918650322777"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-blue-500 text-blue-500 dark:text-yellow-400 dark:border-yellow-400 rounded-full hover:bg-blue-600 dark:hover:bg-yellow-400 hover:text-white dark:hover:text-black transition"
          >
            <Phone size={18} /> Call
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
