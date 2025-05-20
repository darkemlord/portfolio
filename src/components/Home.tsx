import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Group, Points } from 'three';
import './Home.css';

function SpaceBackground() {
  const starsRef = useRef<Points>(null);
  
  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0005;
      starsRef.current.rotation.x += 0.0002;
    }
  });

  return (
    <Stars
      ref={starsRef}
      radius={100}
      depth={50}
      count={5000}
      factor={4}
      saturation={0}
      fade
      speed={1}
    />
  );
}

function AnimatedModel() {
  const modelRef = useRef<Group>(null);
  
  useFrame(({ clock }) => {
    if (modelRef.current) {
      modelRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.2;
      modelRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <group ref={modelRef}>
      <mesh castShadow receiveShadow>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <meshStandardMaterial 
          color="#c19a6b"
          metalness={0.7}
          roughness={0.2}
          emissive="#c19a6b"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
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
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }} shadows>
          <color attach="background" args={['#1a1a1a']} />
          <fog attach="fog" args={['#1a1a1a', 10, 50]} />
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          <SpaceBackground />
          <AnimatedModel />
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </div>
    </div>
  );
};

export default Home; 