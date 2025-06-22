import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useAnimationFrame } from 'framer-motion';
import { projectCards } from './ProjectCards';

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

const ProjectCard = ({ project, offsetX, onClick }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(offsetX);
  const scale = useTransform(x, [-500, 0, 500], [0.6, 1, 0.6]);
  const opacity = useTransform(x, [-500, 0, 500], [0.3, 1, 0.3]);

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
      onClick={() => onClick(project)}
      className="min-w-[300px] max-w-[300px] mx-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 text-white shadow-lg hover:scale-105 transition-transform duration-200 flex flex-col justify-between cursor-pointer"
    >
      <div>
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-sm text-gray-300 line-clamp-3">{project.description}</p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        {project.tags.map((tag, i) => (
          <span key={i} className="px-2 py-1 bg-white/10 border border-white/20 rounded text-white">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-4 flex gap-3">
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-400 hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            Live Demo
          </a>
        )}
        <a
          href={project.source}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-300 hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          GitHub
        </a>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section
      id="projects"
      className="min-h-screen px-4 py-20 bg-gradient-to-b from-black via-gray-900 to-black text-white"
    >
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-sm text-blue-500 dark:text-yellow-500 uppercase tracking-wider mb-2">
          Some of my work
        </p>
        <AnimatedText
          text="Projects"
          className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-yellow-400 mb-16"
        />

        <div
          className="relative overflow-hidden cursor-grab active:cursor-grabbing px-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            className="flex w-max"
            animate={!isHovered ? { x: '-50%' } : false}
            transition={
              !isHovered
                ? {
                    repeat: Infinity,
                    repeatType: 'loop',
                    duration: 70,
                    ease: 'linear',
                  }
                : {}
            }
            drag="x"
            dragConstraints={{ left: -1000, right: 0 }}
            dragElastic={0.05}
          >
            {[...projectCards, ...projectCards].map((project, idx) => (
              <ProjectCard
                key={project.title + idx}
                project={project}
                offsetX={0}
                onClick={setSelectedProject}
              />
            ))}
          </motion.div>
        </div>

        {selectedProject && (
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-zinc-900 max-w-lg w-full rounded-xl p-6 text-left text-white shadow-lg"
            >
              <h2 className="text-2xl font-bold mb-4">{selectedProject.title}</h2>
              <p className="text-sm text-gray-300 mb-4">{selectedProject.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedProject.tags.map((tag, i) => (
                  <span key={i} className="px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-xs">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                {selectedProject.link && (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline text-sm"
                  >
                    Live Demo
                  </a>
                )}
                <a
                  href={selectedProject.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:underline text-sm"
                >
                  GitHub
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
