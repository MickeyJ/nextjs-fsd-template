'use client';

import * as SwitchPrimitive from '@radix-ui/react-switch';
import { motion } from 'motion/react';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type ComponentPropsWithoutRef, type ComponentRef } from 'react';
import { cn } from '@/shared/lib/utils';

const switchVariants = cva(
  'peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-gray-200 data-[state=checked]:bg-primary-500 focus-visible:ring-primary-500',
        secondary: 'bg-gray-200 data-[state=checked]:bg-secondary-500 focus-visible:ring-secondary-500',
        success: 'bg-gray-200 data-[state=checked]:bg-green-500 focus-visible:ring-green-500',
        warning: 'bg-gray-200 data-[state=checked]:bg-yellow-500 focus-visible:ring-yellow-500',
        danger: 'bg-gray-200 data-[state=checked]:bg-red-500 focus-visible:ring-red-500',
      },
      size: {
        sm: 'h-5 w-9',
        md: 'h-6 w-11',
        lg: 'h-7 w-14',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const switchThumbVariants = cva(
  'pointer-events-none block rounded-full bg-white shadow-lg ring-0',
  {
    variants: {
      size: {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const getThumbTranslateX = (size: 'sm' | 'md' | 'lg' | null | undefined, checked: boolean) => {
  const translateValues = {
    sm: checked ? 16 : 2,
    md: checked ? 20 : 2,
    lg: checked ? 32 : 2,
  };
  return translateValues[size || 'md'];
};

export type SwitchProps = ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> &
  VariantProps<typeof switchVariants>;

export const Switch = forwardRef<ComponentRef<typeof SwitchPrimitive.Root>, SwitchProps>(
  ({ className, variant, size, ...props }, ref) => (
    <SwitchPrimitive.Root
      className={cn(switchVariants({ variant, size }), className)}
      {...props}
      ref={ref}
    >
      <SwitchPrimitive.Thumb asChild>
        <motion.span
          className={cn(switchThumbVariants({ size }))}
          animate={{ x: getThumbTranslateX(size, props.checked || false) }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
          }}
        />
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  )
);

Switch.displayName = SwitchPrimitive.Root.displayName;