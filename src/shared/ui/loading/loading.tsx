'use client';

import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/utils';
import { motion } from 'motion/react';

const loadingVariants = cva('', {
  variants: {
    variant: {
      spinner: 'animate-spin rounded-full border-2 border-current border-t-transparent',
      dots: 'flex space-x-1',
      pulse: 'animate-pulse rounded-md bg-current',
      bars: 'flex space-x-1',
    },
    size: {
      sm: '',
      md: '',
      lg: '',
      xl: '',
    },
  },
  compoundVariants: [
    {
      variant: 'spinner',
      size: 'sm',
      className: 'h-4 w-4',
    },
    {
      variant: 'spinner',
      size: 'md',
      className: 'h-6 w-6',
    },
    {
      variant: 'spinner',
      size: 'lg',
      className: 'h-8 w-8',
    },
    {
      variant: 'spinner',
      size: 'xl',
      className: 'h-12 w-12',
    },
    {
      variant: 'pulse',
      size: 'sm',
      className: 'h-4 w-4',
    },
    {
      variant: 'pulse',
      size: 'md',
      className: 'h-6 w-6',
    },
    {
      variant: 'pulse',
      size: 'lg',
      className: 'h-8 w-8',
    },
    {
      variant: 'pulse',
      size: 'xl',
      className: 'h-12 w-12',
    },
  ],
  defaultVariants: {
    variant: 'spinner',
    size: 'md',
  },
});

const dotVariants = {
  sm: 'h-1 w-1',
  md: 'h-1.5 w-1.5',
  lg: 'h-2 w-2',
  xl: 'h-3 w-3',
};

const barVariants = {
  sm: 'h-3 w-0.5',
  md: 'h-4 w-1',
  lg: 'h-6 w-1.5',
  xl: 'h-8 w-2',
};

export interface LoadingProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof loadingVariants> {
  label?: string;
}

export const Loading = forwardRef<HTMLDivElement, LoadingProps>(
  ({ className, variant, size = 'md', label, ...props }, ref) => {
    if (variant === 'dots') {
      return (
        <div
          ref={ref}
          className={cn('flex items-center space-x-1', className)}
          role="status"
          aria-label={label || 'Loading'}
          {...props}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className={cn('rounded-full bg-current', dotVariants[size || 'md'])}
              animate={{
                y: [0, -4, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
                ease: 'easeInOut',
              }}
            />
          ))}
          {label && <span className="sr-only">{label}</span>}
        </div>
      );
    }

    if (variant === 'bars') {
      return (
        <div
          ref={ref}
          className={cn('flex items-center space-x-1', className)}
          role="status"
          aria-label={label || 'Loading'}
          {...props}
        >
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className={cn('rounded-sm bg-current', barVariants[size || 'md'])}
              animate={{
                scaleY: [0.5, 1, 0.5],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.1,
                ease: 'easeInOut',
              }}
            />
          ))}
          {label && <span className="sr-only">{label}</span>}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(loadingVariants({ variant, size }), className)}
        role="status"
        aria-label={label || 'Loading'}
        {...props}
      >
        {label && <span className="sr-only">{label}</span>}
      </div>
    );
  }
);

Loading.displayName = 'Loading';
