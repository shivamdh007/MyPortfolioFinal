import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { socialLinks } from '../../data/social';

interface SocialLinksProps {
  className?: string;
  iconSize?: number;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ className = '', iconSize = 20 }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className={`flex items-center gap-4 ${className}`}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {socialLinks.map((social) => {
        const Icon = Icons[social.icon as keyof typeof Icons];
        
        return (
          <motion.a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-dark-500 dark:text-light-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300"
            variants={item}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={social.name}
          >
            <Icon size={iconSize} />
          </motion.a>
        );
      })}
    </motion.div>
  );
};

export default SocialLinks;