import React from 'react';
import AnimatedText from './AnimatedText';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  centered = false,
  className = '',
}) => {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''} ${className}`}>
      <AnimatedText
        text={title}
        className="text-3xl md:text-4xl font-bold font-heading text-dark-800 dark:text-light-100 mb-2"
        once
      />
      {subtitle && (
        <p className="text-lg text-dark-500 dark:text-light-400 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className={`h-1 w-20 bg-primary-500 mt-4 rounded ${centered ? 'mx-auto' : ''}`} />
    </div>
  );
};

export default SectionTitle;