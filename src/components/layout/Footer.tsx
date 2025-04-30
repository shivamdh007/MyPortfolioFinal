import React from 'react';
import SocialLinks from '../common/SocialLinks';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-10 bg-light-100 dark:bg-dark-800 border-t border-light-300 dark:border-dark-700">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-dark-800 dark:text-light-100 mb-2">Shivam Dhuri</h3>
            <p className="text-dark-500 dark:text-light-400">Web Developer & Designer</p>
          </div>
          
          <SocialLinks />
          
          <div className="text-center md:text-right">
            <p className="text-sm text-dark-500 dark:text-light-400">
              &copy; {currentYear} All rights reserved
            </p>
            <p className="text-sm text-dark-400 dark:text-light-500 mt-1">
              Designed & Built with ❤️
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;