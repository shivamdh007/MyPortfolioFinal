import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import * as THREE from 'three';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';
import { useTheme } from '../../context/ThemeContext';

const Resume: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    if (!containerRef.current) return;

    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Create floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const count = 1500;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 50;
      positions[i + 1] = (Math.random() - 0.5) * 50;
      positions[i + 2] = (Math.random() - 0.5) * 50;

      colors[i] = Math.random();
      colors[i + 1] = Math.random();
      colors[i + 2] = Math.random();
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    camera.position.z = 30;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      particles.rotation.x += 0.0005;
      particles.rotation.y += 0.0005;
      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [isDark]);

  const experiences = [
    {
      id: 1,
      role: 'PROJECT lEAD',
      company: 'SSPM COE',
      period: '2025 - Present',
      description: 'Working on various projects, focusing on fullstack development and team Leadership.',
      responsibilities: [
        'Developing and maintaining responsive web applications using various technologies',
        'Define project goals, timelines, and allocate tasks to team members.',
        'Guide and motivate team members, ensure active participation, and resolve conflicts. ',
        'Ensure proper documentation of progress, methodologies, and final report preparation.',
        'Identify and resolve technical or organizational challenges quickly.',
      
      ]
    }
  ];

  const education = [
    {
      id: 1,
      degree: 'Higher Secondary Certificate',
      institution: 'Shree Pancham Khemraj Mahavidhyalaya SAWANTWADI ',
      period: '2021 - 2023',
      description: 'Specialized in science and mathematics with distinction.'
    }
  ];

  return (
    <section id="resume" className="py-20 bg-white dark:bg-dark-800 relative overflow-hidden">
      {/* Background Animation Container */}
      <div 
        ref={containerRef} 
        className="absolute inset-0 z-0"
        style={{ opacity: 0.3 }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <SectionTitle 
            title="Resume" 
            subtitle="My professional experience and qualifications."
            className="mb-0"
          />
          
          <Button
            href="/Shivam_Resume (4).pdf"
            download
            variant="primary"
            icon="FileDown"
            className="mt-6 md:mt-0"
          >
            Download Resume
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Experience Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-dark-800 dark:text-light-100 mb-6 flex items-center">
              <span className="inline-block p-2 mr-3 rounded-full bg-primary-100 dark:bg-primary-900">
                <Download className="w-5 h-5 text-primary-500" />
              </span>
              Experience
            </h3>
            
            <div className="space-y-8">
              {experiences.map((exp) => (
                <div 
                  key={exp.id}
                  className="bg-light-100/80 dark:bg-dark-700/80 backdrop-blur-sm p-6 rounded-lg shadow-md border-l-4 border-primary-500"
                >
                  <div className="flex flex-wrap justify-between items-start mb-2">
                    <h4 className="text-xl font-bold text-dark-800 dark:text-light-100">
                      {exp.role}
                    </h4>
                    <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-300 text-sm font-medium rounded-full">
                      {exp.period}
                    </span>
                  </div>
                  
                  <p className="text-primary-600 dark:text-primary-400 font-medium mb-3">
                    {exp.company}
                  </p>
                  
                  <p className="text-dark-600 dark:text-light-300 mb-4">
                    {exp.description}
                  </p>
                  
                  <h5 className="font-semibold text-dark-700 dark:text-light-200 mb-2">
                    Key Responsibilities:
                  </h5>
                  
                  <ul className="list-disc list-inside space-y-1 text-dark-600 dark:text-light-300">
                    {exp.responsibilities.map((resp, index) => (
                      <li key={index}>{resp}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Education & Skills Section */}
          <div className="space-y-8">
            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-dark-800 dark:text-light-100 mb-6 flex items-center">
                <span className="inline-block p-2 mr-3 rounded-full bg-secondary-100 dark:bg-secondary-900">
                  <Download className="w-5 h-5 text-secondary-500" />
                </span>
                Education
              </h3>
              
              <div className="space-y-6">
                {education.map((edu) => (
                  <div 
                    key={edu.id}
                    className="bg-light-100/80 dark:bg-dark-700/80 backdrop-blur-sm p-6 rounded-lg shadow-md border-l-4 border-secondary-500"
                  >
                    <div className="flex flex-wrap justify-between items-start mb-2">
                      <h4 className="text-xl font-bold text-dark-800 dark:text-light-100">
                        {edu.degree}
                      </h4>
                      <span className="px-2 py-1 bg-secondary-100 dark:bg-secondary-900 text-secondary-800 dark:text-secondary-300 text-sm font-medium rounded-full">
                        {edu.period}
                      </span>
                    </div>
                    
                    <p className="text-secondary-600 dark:text-secondary-400 font-medium mb-3">
                      {edu.institution}
                    </p>
                    
                    <p className="text-dark-600 dark:text-light-300">
                      {edu.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Additional Skills & Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-dark-800 dark:text-light-100 mb-6 flex items-center">
                <span className="inline-block p-2 mr-3 rounded-full bg-accent-100 dark:bg-accent-900">
                  <Download className="w-5 h-5 text-accent-500" />
                </span>
                Certifications & Achievements
              </h3>
              
              <div className="bg-light-100/80 dark:bg-dark-700/80 backdrop-blur-sm p-6 rounded-lg shadow-md border-l-4 border-accent-500">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-accent-500 mt-2 mr-2"></div>
                    <div>
                      <h4 className="font-semibold text-dark-800 dark:text-light-100">
                      Career Essentials in Software Development
                      </h4>
                      <p className="text-dark-600 dark:text-light-300">
                        Completed advanced training in Software Development and modern web development principles .
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-accent-500 mt-2 mr-2"></div>
                    <div>
                      <h4 className="font-semibold text-dark-800 dark:text-light-100">
                      JavaScript By Infosys
                      </h4>
                      <p className="text-dark-600 dark:text-light-300">
                        Certification in building scalable applications with JavaScript.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-accent-500 mt-2 mr-2"></div>
                    <div>
                      <h4 className="font-semibold text-dark-800 dark:text-light-100">
                        Web Accessibility Champion
                      </h4>
                      <p className="text-dark-600 dark:text-light-300">
                        Recognized for implementing comprehensive accessibility improvements across multiple projects.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-accent-500 mt-2 mr-2"></div>
                    <div>
                      <h4 className="font-semibold text-dark-800 dark:text-light-100">
                        Project Competition Winner
                      </h4>
                      <p className="text-dark-600 dark:text-light-300">
                        First place in Project Presention Organigzes By Science Club SSPM'S COE.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;