'use client';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Circle } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type ComponentPropsWithoutRef, type ComponentRef } from 'react';
import { cn } from '@/shared/lib/utils';

const radioGroupVariants = cva('grid gap-2', {
  variants: {
    orientation: {
      horizontal: 'grid-flow-col',
      vertical: 'grid-flow-row',
    },
  },
  defaultVariants: {
    orientation: 'vertical',
  },
});

const radioGroupItemVariants = cva(
  'aspect-square h-5 w-5 rounded-full border-2 text-primary-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
  {
    variants: {
      variant: {
        default: 'border-gray-300 data-[state=checked]:border-primary-500 focus-visible:ring-primary-500',
        secondary: 'border-gray-300 data-[state=checked]:border-secondary-500 focus-visible:ring-secondary-500',
        destructive: 'border-gray-300 data-[state=checked]:border-red-500 focus-visible:ring-red-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export type RadioGroupProps = ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> &
  VariantProps<typeof radioGroupVariants>;

export const RadioGroup = forwardRef<ComponentRef<typeof RadioGroupPrimitive.Root>, RadioGroupProps>(
  ({ className, orientation, ...props }, ref) => {
    return (
      <RadioGroupPrimitive.Root
        className={cn(radioGroupVariants({ orientation }), className)}
        {...props}
        ref={ref}
      />
    );
  }
);

RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

export type RadioGroupItemProps = ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> &
  VariantProps<typeof radioGroupItemVariants>;

export const RadioGroupItem = forwardRef<ComponentRef<typeof RadioGroupPrimitive.Item>, RadioGroupItemProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <RadioGroupPrimitive.Item
        ref={ref}
        className={cn(radioGroupItemVariants({ variant }), className)}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
          <div className="h-2 w-2 rounded-full bg-current transition-transform scale-0 data-[state=checked]:scale-100" />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
    );
  }
);

RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;