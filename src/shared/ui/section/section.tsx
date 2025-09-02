'use client';

import { forwardRef, useRef } from 'react';
import { motion, useInView, type HTMLMotionProps } from 'motion/react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/utils';

const sectionVariants = cva('', {
  variants: {
    padding: {
      none: 'p-0',
      xs: 'p-2 sm:p-4',
      sm: 'p-4 sm:p-6',
      md: 'p-6 sm:p-8',
      lg: 'p-8 sm:p-10 lg:p-12',
      xl: 'p-12 sm:p-12 lg:p-14',
    },
  },
  defaultVariants: {
    padding: 'sm',
  },
});

export interface SectionProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'onDrag' | 'onDragEnd' | 'onDragStart'>,
    VariantProps<typeof sectionVariants> {
  animate?: boolean;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, padding, animate = false, children, ...props }, ref) => {
    const internalRef = useRef<HTMLElement>(null);
    const isInView = useInView(internalRef, { once: true, margin: '-100px' });
    const elementRef = ref || internalRef;

    if (animate) {
      const motionProps: HTMLMotionProps<'section'> = {
        ref: elementRef as React.Ref<HTMLElement>,
        initial: { opacity: 0, y: 20 },
        animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
        transition: { duration: 0.6, ease: 'easeOut' },
        className: cn(sectionVariants({ padding }), className),
        children,
      };

      return <motion.section {...motionProps} />;
    }

    return (
      <section
        ref={elementRef}
        className={cn(sectionVariants({ padding }), className)}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = 'Section';
