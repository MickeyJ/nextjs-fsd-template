'use client';

import * as ProgressPrimitive from '@radix-ui/react-progress';
import { motion } from 'motion/react';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type ComponentPropsWithoutRef, type ComponentRef } from 'react';
import { cn } from '@/shared/lib/utils';

const progressVariants = cva('relative h-4 w-full overflow-hidden rounded-full bg-neutral-200', {
  variants: {
    variant: {
      default: '[&>div]:bg-primary-500',
      secondary: '[&>div]:bg-secondary-500',
      success: '[&>div]:bg-green-500',
      warning: '[&>div]:bg-yellow-500',
      danger: '[&>div]:bg-error-500',
    },
    size: {
      sm: 'h-2',
      md: 'h-4',
      lg: 'h-6',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

export type ProgressProps = ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> &
  VariantProps<typeof progressVariants>;

export const Progress = forwardRef<ComponentRef<typeof ProgressPrimitive.Root>, ProgressProps>(
  ({ className, value, variant, size, ...props }, ref) => (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(progressVariants({ variant, size }), className)}
      {...props}
    >
      <ProgressPrimitive.Indicator asChild>
        <motion.div
          className="h-full w-full flex-1 transition-all"
          initial={{ width: 0 }}
          animate={{ width: `${value || 0}%` }}
          transition={{
            duration: 0.5,
            ease: 'easeOut',
          }}
        />
      </ProgressPrimitive.Indicator>
    </ProgressPrimitive.Root>
  )
);

Progress.displayName = ProgressPrimitive.Root.displayName;
