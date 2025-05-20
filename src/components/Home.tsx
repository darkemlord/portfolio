import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Environment, MeshDistortMaterial } from '@react-three/drei';
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
      factor={15}
      saturation={0}
      fade
      speed={1}
    />
  );
}

function AnimatedModel() {
  const sphereRef = useRef<Group>(null);
  
  useFrame(({ clock }) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y = clock.getElapsedTime() * 0.2;
      sphereRef.current.rotation.x = clock.getElapsedTime() * 0.1;
      sphereRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.2;
    }
  });

  return (
    <group ref={sphereRef} scale={1.5}>
      {/* Esfera exterior reflectante */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#ffffff"
          envMapIntensity={1.5}
          clearcoat={1}
          clearcoatRoughness={0}
          metalness={1}
          roughness={0}
          distort={0.4}
          speed={1.5}
          reflectivity={1}
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
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
          <spotLight 
            position={[0, 5, 5]} 
            intensity={0.8} 
            angle={0.6} 
            penumbra={0.5} 
            castShadow 
          />
          <SpaceBackground />
          <AnimatedModel />
          <Environment preset="sunset" />
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