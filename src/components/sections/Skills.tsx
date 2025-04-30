import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  ArcElement,
} from 'chart.js';
import { Radar, Doughnut } from 'react-chartjs-2';
import SectionTitle from '../common/SectionTitle';
import { skills } from '../../data/skills';
import { useTheme } from '../../context/ThemeContext';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Skills: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 100;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.2,
      color: isDark ? 0x6366f1 : 0x4338ca,
      transparent: true,
      opacity: 0.6,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    particlesRef.current = particlesMesh;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      if (particlesRef.current) {
        particlesRef.current.rotation.x += 0.0005;
        particlesRef.current.rotation.y += 0.0005;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !renderer || !camera) return;

      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, [isDark]);

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  // Prepare data for radar chart
  const radarData = {
    labels: ['Frontend', 'Backend', 'Tools'].map(cat => 
      skillsByCategory[cat]?.map(skill => skill.name) || []
    ).flat(),
    datasets: [{
      label: 'Skill Level',
      data: ['Frontend', 'Backend', 'Tools'].map(cat => 
        skillsByCategory[cat]?.map(skill => skill.level) || []
      ).flat(),
      backgroundColor: isDark ? 'rgba(99, 102, 241, 0.2)' : 'rgba(99, 102, 241, 0.2)',
      borderColor: isDark ? 'rgba(99, 102, 241, 1)' : 'rgba(99, 102, 241, 1)',
      borderWidth: 2,
      pointBackgroundColor: isDark ? '#6366f1' : '#6366f1',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: isDark ? '#6366f1' : '#6366f1',
    }]
  };

  // Prepare data for doughnut charts
  const prepareDonutData = (category: string) => ({
    labels: skillsByCategory[category]?.map(skill => skill.name) || [],
    datasets: [{
      data: skillsByCategory[category]?.map(skill => skill.level) || [],
      backgroundColor: [
        'rgba(99, 102, 241, 0.8)',
        'rgba(14, 184, 166, 0.8)',
        'rgba(249, 115, 22, 0.8)',
        'rgba(139, 92, 246, 0.8)',
        'rgba(34, 197, 94, 0.8)',
        'rgba(245, 158, 11, 0.8)',
      ],
      borderColor: isDark ? '#1f2937' : '#ffffff',
      borderWidth: 2,
    }]
  });

  const chartOptions = {
    scales: {
      r: {
        angleLines: {
          color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        grid: {
          color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        pointLabels: {
          color: isDark ? '#e5e7eb' : '#1f2937',
          font: {
            size: 10
          }
        },
        ticks: {
          color: isDark ? '#e5e7eb' : '#1f2937',
          backdropColor: 'transparent',
        }
      }
    },
    plugins: {
      legend: {
        display: false,
      }
    }
  };

  const donutOptions = {
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: isDark ? '#e5e7eb' : '#1f2937',
          font: {
            size: 12
          }
        }
      }
    },
    cutout: '70%',
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <section id="skills" className="py-20 bg-white dark:bg-dark-800 relative overflow-hidden">
      {/* Background Animation Container */}
      <div 
        ref={containerRef} 
        className="absolute inset-0 z-0"
        style={{ opacity: 0.3 }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionTitle 
          title="My Skills" 
          subtitle="A comprehensive overview of my technical expertise"
          centered
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          {/* Radar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-light-100/80 dark:bg-dark-700/80 backdrop-blur-sm p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-bold text-dark-800 dark:text-light-100 mb-6 text-center">
              Overall Skill Distribution
            </h3>
            <div className="h-[400px] w-full flex items-center justify-center">
              <Radar data={radarData} options={chartOptions} />
            </div>
          </motion.div>

          {/* Category Charts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {['Frontend', 'Backend'].map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-light-100/80 dark:bg-dark-700/80 backdrop-blur-sm p-6 rounded-lg shadow-lg"
              >
                <h3 className="text-lg font-bold text-dark-800 dark:text-light-100 mb-4 text-center">
                  {category} Skills
                </h3>
                <div className="h-[200px] relative">
                  <Doughnut data={prepareDonutData(category)} options={donutOptions} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;