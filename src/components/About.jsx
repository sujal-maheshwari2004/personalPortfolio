import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useAnimationFrame } from 'framer-motion';

const AnimatedText = ({ text, className }) => (
  <motion.div
    className={`inline-block ${className}`}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
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

const aiSkills = ['Python', 'PyTorch', 'Scikit-learn', 'Langchain', 'Langgraph'];
const webSkills = ['JavaScript', 'React', 'FastAPI', 'Flask', 'Streamlit'];

const allSkills = [
  'Python', 'C/C++', 'JavaScript', 'React', 'FastAPI',
  'Flask', 'Streamlit', 'MongoDB', 'PostgreSQL', 'Azure',
  'PyTorch', 'Scikit-learn', 'SQL', 'Git', 'Langchain', 'Langgraph',
];

const getSkillMeta = (skill) => {
  if (aiSkills.includes(skill)) {
    return { category: 'AI/ML', className: 'border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)] hover:shadow-[0_0_16px_3px_#22d3ee]' };
  }
  if (webSkills.includes(skill)) {
    return { category: 'Web Dev', className: 'border-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)] hover:shadow-[0_0_16px_3px_#facc15]' };
  }
  return { category: 'Other', className: 'border-white/20 hover:shadow-[0_0_12px_2px_#e5e7eb]' };
};

const SkillItem = ({ skill, offsetX }) => {
  const itemRef = useRef(null);
  const x = useMotionValue(offsetX);
  const scale = useTransform(x, [-400, 0, 400], [0.6, 1, 0.6]);
  const opacity = useTransform(x, [-400, 0, 400], [0.2, 1, 0.2]);
  const { className, category } = getSkillMeta(skill);

  useAnimationFrame(() => {
    if (!itemRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const center = window.innerWidth / 2;
    x.set(rect.left - center + rect.width / 2);
  });

  return (
    <motion.div
      ref={itemRef}
      style={{ scale, opacity }}
      className={`min-w-[120px] px-6 py-3 mx-2 text-sm font-semibold rounded-lg backdrop-blur-md text-white bg-white/10 hover:scale-105 transition-transform duration-200 border relative group ${className}`}
    >
      {skill}
      <div className="absolute bottom-full mb-2 px-2 py-1 text-xs rounded bg-white text-black opacity-0 group-hover:opacity-100 transition-opacity">
        {category}
      </div>
    </motion.div>
  );
};

const About = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [filter, setFilter] = useState('All');

  const filteredSkills =
    filter === 'All'
      ? allSkills
      : allSkills.filter((skill) => getSkillMeta(skill).category === filter);

  return (
    <section
      id="about"
      className="min-h-screen px-4 py-20 bg-gradient-to-b from-gray-900 via-slate-900 to-black text-gray-900 dark:text-white"
    >
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sm text-blue-500 dark:text-yellow-500 uppercase tracking-wider mb-2">
          Get to know me
        </p>
        <AnimatedText
          text="About Me"
          className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-yellow-400 mb-10"
        />
        <motion.div
          className="text-md md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p>
            I’m Sujal Maheshwari, a final-year B.Tech Computer Science (AI & DS) student passionate about building intelligent, high-impact software systems.
          </p>
          <p className="mt-4">
            My experience spans full-stack AI tools, web pipelines, and LLM-powered applications. I’ve worked remotely with teams across India and contributed to both live deployments and patented AI systems. Currently, I’m interning at Basal AI, building production-grade pipelines and generative AI tools.
          </p>
        </motion.div>

        <div className="my-12 w-32 mx-auto border-t border-dashed border-white/30 animate-pulse" />

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {['All', 'AI/ML', 'Web Dev', 'Other'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-md text-sm font-medium border ${
                filter === cat
                  ? 'bg-blue-600 text-white border-blue-500'
                  : 'bg-white/10 text-gray-300 border-white/20 hover:bg-white/20'
              } transition`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Carousel */}
        <div
          className="relative overflow-hidden mt-12 px-4 cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            className="flex w-max"
            animate={!isHovered ? { x: '-50%' } : false}
            transition={!isHovered ? {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 60,
              ease: 'linear',
            } : {}}
            drag="x"
            dragConstraints={{ left: -1000, right: 0 }}
            dragElastic={0.05}
          >
            {[...filteredSkills, ...filteredSkills].map((skill, idx) => (
              <SkillItem key={idx} skill={skill} offsetX={0} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
