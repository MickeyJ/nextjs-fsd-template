'use client';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { AnimatePresence, motion } from 'motion/react';
import { Check } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type ComponentPropsWithoutRef, type ComponentRef } from 'react';
import { cn } from '@/shared/lib/utils';

const checkboxVariants = cva(
  'peer h-5 w-5 shrink-0 rounded border-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
  {
    variants: {
      variant: {
        default:
          'border-neutral-300 data-[state=checked]:bg-primary-500 data-[state=checked]:border-primary-500 focus-visible:ring-primary-500',
        secondary:
          'border-neutral-300 data-[state=checked]:bg-secondary-500 data-[state=checked]:border-secondary-500 focus-visible:ring-secondary-500',
        destructive:
          'border-neutral-300 data-[state=checked]:bg-error-500 data-[state=checked]:border-error-500 focus-visible:ring-error-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export type CheckboxProps = ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> &
  VariantProps<typeof checkboxVariants>;

export const Checkbox = forwardRef<ComponentRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ className, variant, ...props }, ref) => (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(checkboxVariants({ variant }), className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center text-neutral-50">
        <AnimatePresence>
          {props.checked !== false && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 30,
                duration: 0.2,
              }}
            >
              <Check
                className="h-3.5 w-3.5"
                strokeWidth={3}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
);

Checkbox.displayName = CheckboxPrimitive.Root.displayName;
