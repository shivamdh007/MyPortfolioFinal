import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import SectionTitle from '../common/SectionTitle';
import { timelineData } from '../../data/timeline';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-light-200 dark:bg-dark-900 relative">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5 dark:opacity-3"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-light-200/95 via-light-200/98 to-light-200 dark:from-dark-900/95 dark:via-dark-900/98 dark:to-dark-900" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionTitle 
          title="About Me" 
          subtitle="My journey, experiences, and what drives me as a developer."
          centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
          <motion.div 
            className="md:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-dark-800 dark:text-light-100 mb-4">
              Personal Info
            </h3>
            <p className="text-dark-600 dark:text-light-300 leading-relaxed mb-6">
              I'm a passionate web developer with a strong focus on creating clean, efficient, and user-friendly web applications. My journey in web development started with curiosity and has evolved into a professional career.
            </p>
            <p className="text-dark-600 dark:text-light-300 leading-relaxed mb-6">
              When I'm not coding, you might find me playing tabla, enjoying a game of badminton, or exploring new technologies. I believe in continuous learning and constantly pushing my boundaries.
            </p>
            <div className="flex flex-col gap-4 text-dark-700 dark:text-light-200">
              <div className="flex items-center gap-2">
                <Icons.Mail className="text-primary-500 w-5 h-5" />
                <span>shivam.b.dhuri@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Icons.MapPin className="text-primary-500 w-5 h-5" />
                <span>Sindhudurg, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Icons.Briefcase className="text-primary-500 w-5 h-5" />
                <span>Full Stack Developer</span>
              </div>
              <div className="flex items-center gap-2">
                <Icons.GraduationCap className="text-primary-500 w-5 h-5" />
                <span>B.E. AIML & Computer Science</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-dark-800 dark:text-light-100 mb-6">
              My Journey
            </h3>
            
            <div className="relative border-l-2 border-primary-400 dark:border-primary-600 pl-8 pb-6 space-y-10">
              {timelineData.map((item, index) => {
                const Icon = Icons[item.icon as keyof typeof Icons] || Icons.Circle;
                
                return (
                  <motion.div 
                    key={index}
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="absolute -left-10 mt-1.5 w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-primary-500" />
                    </div>
                    <div className="mb-1 flex items-center">
                      <span className="py-1 px-2.5 rounded-full text-xs font-semibold bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200">
                        {item.year}
                      </span>
                    </div>
                    <h4 className="text-xl font-bold text-dark-800 dark:text-light-100 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-dark-600 dark:text-light-300">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;