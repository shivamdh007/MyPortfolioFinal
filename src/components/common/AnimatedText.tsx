import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ 
  text, 
  className = '',
  once = false,
}) => {
  // Split text into words
  const words = text.split(' ');
  
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: 0.12, 
        delayChildren: 0.04 * i 
      },
    }),
  };
  
  const child = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };
  
  return (
    <motion.div
      style={{ overflow: 'hidden' }}
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          style={{ display: 'inline-block', marginRight: '0.25em' }}
          variants={child}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimatedText;