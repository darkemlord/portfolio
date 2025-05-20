import React from 'react';
import { motion } from 'framer-motion';
import './Projects.css';

const projects = [
  {
    title: '3D Portfolio',
    description: 'A stunning 3D animated portfolio built with React, Three.js, and TypeScript.'
  },
  {
    title: 'E-commerce UI',
    description: 'Modern, responsive e-commerce interface with advanced filtering and animations.'
  },
  {
    title: 'Design System',
    description: 'Reusable component library and design system for scalable web apps.'
  },
  {
    title: 'Interactive Data Viz',
    description: 'Beautiful, interactive data visualizations using D3 and React.'
  },
];

const Projects: React.FC = () => {
  return (
    <div className="projects-container">
      <motion.h2 initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>My Projects</motion.h2>
      <div className="projects-grid">
        {projects.map((project, idx) => (
          <motion.div
            className="project-card"
            key={project.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + idx * 0.15, duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
          >
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <span className="coming-soon">Coming Soon</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Projects; 