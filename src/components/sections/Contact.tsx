import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin } from 'lucide-react';
import * as THREE from 'three';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';
import SocialLinks from '../common/SocialLinks';
import { useTheme } from '../../context/ThemeContext';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
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

    // Create waves effect
    const waveGeometry = new THREE.PlaneGeometry(100, 100, 50, 50);
    const waveMaterial = new THREE.MeshPhongMaterial({
      color: isDark ? 0x6366f1 : 0x4338ca,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });

    const waves = new THREE.Mesh(waveGeometry, waveMaterial);
    waves.rotation.x = -Math.PI / 2;
    waves.position.y = -10;
    scene.add(waves);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    camera.position.z = 50;
    camera.position.y = 20;
    camera.lookAt(0, 0, 0);

    // Animation
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      const positions = waves.geometry.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const z = positions.getZ(i);
        const y = Math.sin((x + time) * 0.3) * Math.cos((z + time) * 0.3) * 2;
        positions.setY(i, y);
      }
      positions.needsUpdate = true;

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
  
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    }, 1500);
  };
  
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'shivam2329@outlook.com',
      link: 'mailto:shivam.example@gmail.com'
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+91 9130876312',
      link: 'tel:+919130876312'
    },
    {
      icon: MapPin,
      title: 'Location',
      content: 'Sindhudurg, India',
      link: 'https://maps.google.com/?q=Sindhudurg,India'
    }
  ];
  
  return (
    <section id="contact" className="py-20 bg-light-200 dark:bg-dark-900 relative overflow-hidden">
      {/* Background Animation Container */}
      <div 
        ref={containerRef} 
        className="absolute inset-0 z-0"
        style={{ opacity: 0.3 }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionTitle 
          title="Get In Touch" 
          subtitle="Have a question or want to work together? Feel free to contact me!"
          centered
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {submitStatus === 'success' ? (
              <div className="bg-success-50/80 dark:bg-success-900/20 backdrop-blur-sm border border-success-200 dark:border-success-800 rounded-lg p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-success-100 dark:bg-success-900/30 rounded-full mb-4">
                  <Send className="w-8 h-8 text-success-500" />
                </div>
                <h3 className="text-xl font-bold text-success-800 dark:text-success-300 mb-2">Message Sent Successfully!</h3>
                <p className="text-success-700 dark:text-success-400 mb-4">Thank you for reaching out. I'll get back to you as soon as possible.</p>
                <Button
                  variant="outline"
                  onClick={() => setSubmitStatus('idle')}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm rounded-lg shadow-md p-6 md:p-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-dark-700 dark:text-light-300 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-md border ${
                        errors.name 
                          ? 'border-error-500 focus:ring-error-500 focus:border-error-500' 
                          : 'border-light-400 dark:border-dark-600 focus:ring-primary-500 focus:border-primary-500'
                      } bg-light-100/50 dark:bg-dark-700/50 text-dark-800 dark:text-light-100 focus:outline-none focus:ring-2 transition-all`}
                      placeholder="Your name"
                    />
                    {errors.name && <p className="mt-1 text-sm text-error-500">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-dark-700 dark:text-light-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-md border ${
                        errors.email 
                          ? 'border-error-500 focus:ring-error-500 focus:border-error-500' 
                          : 'border-light-400 dark:border-dark-600 focus:ring-primary-500 focus:border-primary-500'
                      } bg-light-100/50 dark:bg-dark-700/50 text-dark-800 dark:text-light-100 focus:outline-none focus:ring-2 transition-all`}
                      placeholder="Your email"
                    />
                    {errors.email && <p className="mt-1 text-sm text-error-500">{errors.email}</p>}
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-medium text-dark-700 dark:text-light-300 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-md border ${
                      errors.subject 
                        ? 'border-error-500 focus:ring-error-500 focus:border-error-500' 
                        : 'border-light-400 dark:border-dark-600 focus:ring-primary-500 focus:border-primary-500'
                    } bg-light-100/50 dark:bg-dark-700/50 text-dark-800 dark:text-light-100 focus:outline-none focus:ring-2 transition-all`}
                    placeholder="Subject"
                  />
                  {errors.subject && <p className="mt-1 text-sm text-error-500">{errors.subject}</p>}
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-dark-700 dark:text-light-300 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full px-4 py-2 rounded-md border ${
                      errors.message 
                        ? 'border-error-500 focus:ring-error-500 focus:border-error-500' 
                        : 'border-light-400 dark:border-dark-600 focus:ring-primary-500 focus:border-primary-500'
                    } bg-light-100/50 dark:bg-dark-700/50 text-dark-800 dark:text-light-100 focus:outline-none focus:ring-2 transition-all`}
                    placeholder="Your message"
                  />
                  {errors.message && <p className="mt-1 text-sm text-error-500">{errors.message}</p>}
                </div>
                
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  icon="Send"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            )}
          </motion.div>
          
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm rounded-lg shadow-md p-6 md:p-8 h-full flex flex-col">
              <h3 className="text-2xl font-bold text-dark-800 dark:text-light-100 mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-6 mb-8">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.link}
                    target={info.title === 'Location' ? '_blank' : undefined}
                    rel={info.title === 'Location' ? 'noopener noreferrer' : undefined}
                    className="flex items-start group"
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900 flex items-center justify-center mr-4 mt-1 group-hover:bg-primary-200 dark:group-hover:bg-primary-800 transition-colors">
                      <info.icon className="w-6 h-6 text-primary-500" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-dark-800 dark:text-light-100 mb-1">
                        {info.title}
                      </h4>
                      <p className="text-dark-600 dark:text-light-300 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
                        {info.content}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
              
              <div className="mt-auto">
                <h4 className="text-lg font-semibold text-dark-800 dark:text-light-100 mb-4">
                  Follow Me
                </h4>
                <SocialLinks iconSize={24} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;