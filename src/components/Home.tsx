import React, { useRef, useEffect, useState } from 'react';
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

const TypingText: React.FC<{ text: string, speed?: number, className?: string }> = ({ 
  text, 
  speed = 100,
  className = "" 
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else {
      setIsComplete(true);
    }
  }, [currentIndex, text, speed]);

  return <span className={`${className} ${isComplete ? 'typing-complete' : ''}`}>{displayedText}</span>;
};

const Home: React.FC = () => {
  const [shine, setShine] = useState(false);

  // Efecto de brillo cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setShine(true);
      setTimeout(() => setShine(false), 1000); // Duración del brillo: 1 segundo
    }, 5000); // Intervalo: 5 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      <motion.div
        className={`intro-text ${shine ? 'shine-effect' : ''}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1><TypingText text="Hi, I'm Emanuel Caro" speed={80} /></h1>
        <h2><TypingText text="Frontend Engineer" speed={80} className="delayed-typing" /></h2>
        <p><TypingText text="Building stunning web experiences with React, TypeScript & 3D magic." speed={30} className="delayed-typing-more" /></p>
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