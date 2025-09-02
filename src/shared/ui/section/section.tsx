// src/shared/ui/section/section.tsx
'use client';

import { motion, useInView } from 'motion/react';
import { type ReactNode, useRef } from 'react';

export interface SectionProps {
  children: ReactNode;
  className?: string;
  animate?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  id?: string;
}

export function Section({ children, className = '', animate = false, padding = 'lg', id }: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const paddingStyles = {
    none: '',
    sm: 'py-8 sm:py-12',
    md: 'py-12 sm:py-16',
    lg: 'py-16 sm:py-20 lg:py-24',
    xl: 'py-20 sm:py-28 lg:py-32',
  };

  const MotionSection = motion.section;
  const paddingClass = paddingStyles[padding];
  const combinedClassName = `${paddingClass} ${className}`;

  if (animate) {
    return (
      <MotionSection
        ref={ref}
        id={id}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={combinedClassName}
      >
        {children}
      </MotionSection>
    );
  }

  return (
    <section
      ref={ref}
      id={id}
      className={combinedClassName}
    >
      {children}
    </section>
  );
}
