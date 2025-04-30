import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import * as THREE from 'three';
import Button from '../common/Button';
import SocialLinks from '../common/SocialLinks';

const Hero: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sphereRef = useRef<THREE.Mesh | null>(null);
  const isHoveringRef = useRef(false);
  
  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(400, 400);
    renderer.setClearColor(0x000000, 0);
    canvasRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create sphere geometry
    const geometry = new THREE.IcosahedronGeometry(2, 1);
    const material = new THREE.MeshPhongMaterial({
      color: 0x6366f1,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    sphereRef.current = sphere;

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (sphereRef.current) {
        // Only apply automatic rotation when not being hovered
        if (!isHoveringRef.current) {
          sphereRef.current.rotation.x += 0.005;
          sphereRef.current.rotation.y += 0.005;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle mouse enter/leave for the canvas
    const handleMouseEnter = () => {
      isHoveringRef.current = true;
    };

    const handleMouseLeave = () => {
      isHoveringRef.current = false;
      // Reset sphere rotation when mouse leaves
      if (sphereRef.current) {
        sphereRef.current.rotation.x = 0;
        sphereRef.current.rotation.y = 0;
      }
    };

    canvasRef.current.addEventListener('mouseenter', handleMouseEnter);
    canvasRef.current.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (canvasRef.current) {
        canvasRef.current.removeEventListener('mouseenter', handleMouseEnter);
        canvasRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (rendererRef.current && canvasRef.current) {
        canvasRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });

      // Only update sphere rotation if hovering
      if (sphereRef.current && isHoveringRef.current && canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        sphereRef.current.rotation.x = mouseY * 0.5;
        sphereRef.current.rotation.y = mouseX * 0.5;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const calculateTranslate = (axis: 'x' | 'y', factor: number) => {
    const { innerWidth, innerHeight } = window;
    const centerX = innerWidth / 2;
    const centerY = innerHeight / 2;
    
    if (axis === 'x') {
      const xDiff = (mousePosition.x - centerX) / centerX;
      return xDiff * factor;
    }
    
    const yDiff = (mousePosition.y - centerY) / centerY;
    return yDiff * factor;
  };
  
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5 dark:opacity-3"
          style={{
            backgroundImage: 'url(/WhatsApp Image 2025-04-29 at 21.25.38_5ee516fb.jpg)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-light-100/95 via-light-200/95 to-light-300/95 dark:from-dark-800/95 dark:via-dark-800/95 dark:to-dark-900/95" />
      </div>
      
      {/* Animated shapes */}
      <motion.div 
        className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-primary-200/20 dark:bg-primary-900/20 blur-3xl z-0"
        animate={{
          x: calculateTranslate('x', 20),
          y: calculateTranslate('y', 20),
        }}
        transition={{ type: 'spring', stiffness: 50 }}
      />
      
      <motion.div 
        className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-secondary-200/20 dark:bg-secondary-900/20 blur-3xl z-0"
        animate={{
          x: calculateTranslate('x', -20),
          y: calculateTranslate('y', -20),
        }}
        transition={{ type: 'spring', stiffness: 50 }}
      />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left side - Profile Image and Text content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={variants}
            className="flex flex-col relative"
          >
            {/* Profile Image */}
            <motion.div 
              className="w-48 h-48 mb-8 relative mx-auto md:mx-0"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full animate-pulse" />
              <img
                src="/1746020494134[1].jpg"
                alt="Shivam Dhuri"
                className="absolute inset-1 w-[calc(100%-8px)] h-[calc(100%-8px)] object-cover rounded-full"
              />
            </motion.div>

            <span className="text-primary-600 dark:text-primary-400 font-medium text-lg mb-4">
              Web Developer
            </span>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-dark-800 dark:text-light-100 mb-4 font-heading">
              Hi, I'm <span className="text-primary-500">Shivam Dhuri</span>
            </h1>
            
            <div className="text-xl sm:text-2xl text-dark-600 dark:text-light-300 mb-8 h-12">
              <TypeAnimation
                sequence={[
                  'I build modern web experiences.',
                  2000,
                  'I create responsive websites.',
                  2000,
                  'I develop web applications.',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </div>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <Button href="#projects" variant="primary" icon="ArrowDown">
                View My Work
              </Button>
              <Button href="/Shivam_Resume (4).pdf" variant="outline" icon="FileDown" download>
                Download Resume
              </Button>
            </div>
            
            <SocialLinks className="mt-2" />
          </motion.div>
          
          {/* Right side - 3D element and code snippet */}
          <motion.div 
            className="hidden md:flex flex-col items-center space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* 3D Canvas Container */}
            <div 
              ref={canvasRef} 
              className="w-[400px] h-[400px] cursor-move relative"
              style={{ perspective: '1000px' }}
            />
            
            {/* Code snippet */}
            <div className="w-full max-w-md transform hover:scale-105 transition-transform duration-300">
              <div className="relative">
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 opacity-75 blur"></div>
                <div className="relative bg-light-100 dark:bg-dark-700 p-6 rounded-lg shadow-xl">
                  <pre className="font-mono text-dark-800 dark:text-light-200 text-sm leading-relaxed">
                    <code>{`class Developer {
  constructor() {
    this.name = "Shivam Dhuri";
    this.skills = ["React", 
      "TypeScript", 
      "Node.js"
    ];
    this.isLearning = true;
  }

  code() {
    return "Building amazing web experiences";
  }

  async life() {
    await this.code();
    await this.learn();
    return this.repeat();
  }
}`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;