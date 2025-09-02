'use client';

import * as SliderPrimitive from '@radix-ui/react-slider';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type ComponentPropsWithoutRef, type ComponentRef } from 'react';
import { cn } from '@/shared/lib/utils';

const sliderVariants = cva(
  'relative flex w-full touch-none select-none items-center',
  {
    variants: {
      variant: {
        default: '[&_[data-radix-slider-track]]:bg-gray-200 [&_[data-radix-slider-range]]:bg-primary-500 [&_[data-radix-slider-thumb]]:border-primary-500 [&_[data-radix-slider-thumb]:focus-visible]:ring-primary-500',
        secondary: '[&_[data-radix-slider-track]]:bg-gray-200 [&_[data-radix-slider-range]]:bg-secondary-500 [&_[data-radix-slider-thumb]]:border-secondary-500 [&_[data-radix-slider-thumb]:focus-visible]:ring-secondary-500',
        success: '[&_[data-radix-slider-track]]:bg-gray-200 [&_[data-radix-slider-range]]:bg-green-500 [&_[data-radix-slider-thumb]]:border-green-500 [&_[data-radix-slider-thumb]:focus-visible]:ring-green-500',
        warning: '[&_[data-radix-slider-track]]:bg-gray-200 [&_[data-radix-slider-range]]:bg-yellow-500 [&_[data-radix-slider-thumb]]:border-yellow-500 [&_[data-radix-slider-thumb]:focus-visible]:ring-yellow-500',
        danger: '[&_[data-radix-slider-track]]:bg-gray-200 [&_[data-radix-slider-range]]:bg-red-500 [&_[data-radix-slider-thumb]]:border-red-500 [&_[data-radix-slider-thumb]:focus-visible]:ring-red-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export type SliderProps = ComponentPropsWithoutRef<typeof SliderPrimitive.Root> &
  VariantProps<typeof sliderVariants>;

export const Slider = forwardRef<ComponentRef<typeof SliderPrimitive.Root>, SliderProps>(
  ({ className, variant, ...props }, ref) => (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(sliderVariants({ variant }), className)}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full">
        <SliderPrimitive.Range className="absolute h-full" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 bg-white ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
    </SliderPrimitive.Root>
  )
);

Slider.displayName = SliderPrimitive.Root.displayName;