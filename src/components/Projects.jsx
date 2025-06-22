import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useAnimationFrame } from 'framer-motion';
import { projectCards } from './ProjectCards';

const ProjectCard = ({ project, offsetX }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(offsetX);

  // Bigger scale difference due to larger card size
  const scale = useTransform(x, [-800, 0, 800], [0.4, 1, 0.4]);
  const opacity = useTransform(x, [-800, 0, 800], [0.1, 1, 0.1]);

  useAnimationFrame(() => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const center = window.innerWidth / 2;
    x.set(rect.left - center + rect.width / 2);
  });

  return (
    <motion.div
      ref={cardRef}
      style={{ scale, opacity }}
      className="min-w-[320px] max-w-[320px] mx-6 bg-[#111827] rounded-2xl overflow-hidden backdrop-blur-md text-white border border-white/10 hover:scale-[1.03] transition-transform duration-200 shadow-lg"
    >
      <div className="h-32 bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
        <img src="https://cdn-icons-png.flaticon.com/512/10437/10437090.png" alt="project" className="h-10" />
      </div>
      <div className="p-5 flex flex-col justify-between h-[280px]">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-center">{project.title}</h3>
          <p className="text-sm text-gray-300 text-center">{project.description}</p>
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {project.tags.map((tag, i) => (
            <span key={i} className="px-2 py-1 text-xs bg-white/10 border border-white/20 rounded">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-4 text-center">
          <a
            href={project.source}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-400 hover:underline"
          >
            GitHub →
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      id="projects"
      className="min-h-screen px-4 py-20 bg-gradient-to-b from-black via-gray-900 to-black text-white overflow-hidden"
    >
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-sm text-blue-500 dark:text-yellow-500 uppercase tracking-wider mb-2">
          Some of my work
        </p>
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-yellow-400 mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Projects
        </motion.h2>

        <div
          className="relative overflow-hidden mt-8 cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            className="flex w-max"
            animate={!isHovered ? { x: '-50%' } : false}
            transition={!isHovered ? {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 90,
              ease: 'linear',
            } : {}}
            drag="x"
            dragConstraints={{ left: -1000, right: 0 }}
            dragElastic={0.04}
          >
            {[...projectCards, ...projectCards].map((project, idx) => (
              <ProjectCard key={idx} project={project} offsetX={0} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
