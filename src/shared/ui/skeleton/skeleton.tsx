'use client';

import { forwardRef } from 'react';
import { motion } from 'motion/react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/utils';

const skeletonVariants = cva('relative overflow-hidden rounded-md bg-neutral-200', {
  variants: {
    variant: {
      default: '',
      shimmer: 'isolate',
      pulse: 'animate-pulse',
    },
  },
  defaultVariants: {
    variant: 'shimmer',
  },
});

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof skeletonVariants> {}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(({ className, variant, ...props }, ref) => {
  const isShimmer = variant === 'shimmer';

  return (
    <div
      ref={ref}
      className={cn(skeletonVariants({ variant }), className)}
      {...props}
    >
      {isShimmer && (
        <motion.div
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-neutral-50/20 to-transparent"
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      )}
    </div>
  );
});

Skeleton.displayName = 'Skeleton';
