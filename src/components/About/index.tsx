import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About: React.FC = () => {
  return (
    <div className="about-container">
      <motion.h2 initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>About Me</motion.h2>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1 }}>
        I am a passionate Frontend Engineer with a love for creating beautiful, performant, and accessible web applications. My expertise is in React, TypeScript, and modern web technologies. I enjoy blending design and code to deliver delightful user experiences, always pushing the boundaries of what's possible on the web.
      </motion.p>
      <motion.ul className="about-skills" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 1 }}>
        <li>React / Next.js</li>
        <li>TypeScript / JavaScript</li>
        <li>Three.js / 3D Web</li>
        <li>UI/UX Design</li>
        <li>Performance Optimization</li>
      </motion.ul>
    </div>
  );
};

export default About; 