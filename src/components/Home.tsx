import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import './Home.css';

function AnimatedModel() {
  // Un modelo 3D simple y elegante (puede ser una esfera flotante con efectos)
  return (
    <Float speed={2} rotationIntensity={1.2} floatIntensity={2}>
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[1.2, 64, 64]} />
        <meshStandardMaterial color="#6C63FF" roughness={0.2} metalness={0.7} />
      </mesh>
    </Float>
  );
}

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <motion.div
        className="intro-text"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1>Hi, I'm Emanuel Caro</h1>
        <h2>Frontend Engineer</h2>
        <p>Building stunning web experiences with React, TypeScript & 3D magic.</p>
      </motion.div>
      <div className="canvas-wrapper">
        <Canvas camera={{ position: [0, 0, 4], fov: 50 }} shadows>
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
          <AnimatedModel />
          <Environment preset="sunset" />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
        </Canvas>
      </div>
    </div>
  );
};

export default Home; 