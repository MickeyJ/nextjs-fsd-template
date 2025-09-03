'use client';

import * as SliderPrimitive from '@radix-ui/react-slider';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type ComponentPropsWithoutRef, type ComponentRef } from 'react';
import { cn } from '@/shared/lib/utils';

const sliderVariants = cva('relative flex w-full touch-none select-none items-center', {
  variants: {
    variant: {
      default:
        '[&_[data-radix-slider-track]]:bg-neutral-200 [&_[data-radix-slider-range]]:bg-primary-500 [&_[data-radix-slider-thumb]]:border-primary-500 [&_[data-radix-slider-thumb]:focus-visible]:ring-primary-500',
      secondary:
        '[&_[data-radix-slider-track]]:bg-neutral-200 [&_[data-radix-slider-range]]:bg-secondary-500 [&_[data-radix-slider-thumb]]:border-secondary-500 [&_[data-radix-slider-thumb]:focus-visible]:ring-secondary-500',
      success:
        '[&_[data-radix-slider-track]]:bg-neutral-200 [&_[data-radix-slider-range]]:bg-success-500 [&_[data-radix-slider-thumb]]:border-success-500 [&_[data-radix-slider-thumb]:focus-visible]:ring-success-500',
      warning:
        '[&_[data-radix-slider-track]]:bg-neutral-200 [&_[data-radix-slider-range]]:bg-warning-500 [&_[data-radix-slider-thumb]]:border-warning-500 [&_[data-radix-slider-thumb]:focus-visible]:ring-warning-500',
      danger:
        '[&_[data-radix-slider-track]]:bg-neutral-200 [&_[data-radix-slider-range]]:bg-error-500 [&_[data-radix-slider-thumb]]:border-error-500 [&_[data-radix-slider-thumb]:focus-visible]:ring-error-500',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export type SliderProps = ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & VariantProps<typeof sliderVariants>;

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
      <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 bg-neutral-50 ring-offset-neutral-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
    </SliderPrimitive.Root>
  )
);

Slider.displayName = SliderPrimitive.Root.displayName;
