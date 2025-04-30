import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import * as THREE from 'three';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';
import { projects } from '../../data/projects';
import { Project } from '../../types';
import { useTheme } from '../../context/ThemeContext';

type ProjectCategory = 'All' | 'Web' | 'IoT' | 'Java';

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const categories: ProjectCategory[] = ['All', 'Web', 'IoT', 'Java'];
  
  const filteredProjects = projects.filter(
    project => activeCategory === 'All' || project.category.includes(activeCategory)
  );

  useEffect(() => {
    if (!containerRef.current) return;

    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Create animated cubes
    const cubes: THREE.Mesh[] = [];
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshPhongMaterial({
      color: isDark ? 0x6366f1 : 0x4338ca,
      transparent: true,
      opacity: 0.3,
      wireframe: true,
    });

    for (let i = 0; i < 20; i++) {
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.position.x = (Math.random() - 0.5) * 20;
      cube.position.y = (Math.random() - 0.5) * 20;
      cube.position.z = (Math.random() - 0.5) * 20;
      cube.rotation.x = Math.random() * Math.PI;
      cube.rotation.y = Math.random() * Math.PI;
      cubes.push(cube);
      scene.add(cube);
    }

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    camera.position.z = 15;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      cubes.forEach((cube) => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
      });

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
  
  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };
  
  const closeProjectModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };
  
  return (
    <section id="projects" className="py-20 bg-light-200 dark:bg-dark-900 relative overflow-hidden">
      {/* Background Animation Container */}
      <div 
        ref={containerRef} 
        className="absolute inset-0 z-0"
        style={{ opacity: 0.3 }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionTitle 
          title="My Projects" 
          subtitle="A selection of my recent work and personal projects."
          centered
        />
        
        <div className="flex justify-center flex-wrap gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all backdrop-blur-sm
                ${activeCategory === category
                  ? 'bg-primary-500 text-white'
                  : 'bg-light-100/80 dark:bg-dark-700/80 text-dark-600 dark:text-light-300 hover:bg-light-300/80 dark:hover:bg-dark-600/80'
                }`}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              onClick={() => openProjectModal(project)}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-dark-800 dark:text-light-100 mb-2">
                  {project.title}
                </h3>
                <p className="text-dark-600 dark:text-light-300 mb-4 line-clamp-2">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span 
                      key={tech}
                      className="text-xs font-medium py-1 px-2 rounded-full bg-light-200/80 dark:bg-dark-700/80 text-dark-600 dark:text-light-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-xs font-medium py-1 px-2 rounded-full bg-light-200/80 dark:bg-dark-700/80 text-dark-600 dark:text-light-300">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  icon="ExternalLink"
                  onClick={(e) => {
                    e.stopPropagation();
                    openProjectModal(project);
                  }}
                >
                  View Details
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="fixed inset-0 z-50 bg-dark-900/80 backdrop-blur-sm flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeProjectModal}
            >
              <motion.div
                className="bg-white/90 dark:bg-dark-800/90 backdrop-blur-sm rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', damping: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="h-64 sm:h-80 overflow-hidden">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-dark-800 dark:text-light-100">
                      {selectedProject.title}
                    </h3>
                    <button 
                      onClick={closeProjectModal}
                      className="p-1 rounded-full bg-light-200/80 dark:bg-dark-700/80 text-dark-500 dark:text-light-400 hover:bg-light-300/80 dark:hover:bg-dark-600/80 transition-colors"
                    >
                      <Icons.X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <p className="text-dark-600 dark:text-light-300 mb-6">
                    {selectedProject.longDescription || selectedProject.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-dark-800 dark:text-light-100 mb-2">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <span 
                          key={tech}
                          className="text-sm font-medium py-1 px-2.5 rounded-full bg-light-200/80 dark:bg-dark-700/80 text-dark-600 dark:text-light-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    {selectedProject.github && (
                      <Button
                        href={selectedProject.github}
                        target="_blank"
                        variant="outline"
                        icon="Github"
                      >
                        View Code
                      </Button>
                    )}
                    
                    {selectedProject.demo && (
                      <Button
                        href={selectedProject.demo}
                        target="_blank"
                        variant="primary"
                        icon="ExternalLink"
                      >
                        Live Demo
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;