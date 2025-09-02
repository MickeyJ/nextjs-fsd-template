'use client';

import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type ComponentPropsWithoutRef, type ComponentRef } from 'react';
import { cn } from '@/shared/lib/utils';

const toggleGroupVariants = cva(
  'inline-flex items-center justify-center rounded-md',
  {
    variants: {
      variant: {
        default: 'bg-gray-100',
        outline: 'border border-gray-300',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const toggleGroupItemVariants = cva(
  'inline-flex items-center justify-center text-sm font-medium transition-colors hover:bg-gray-200 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-white data-[state=on]:text-gray-900 data-[state=on]:shadow-sm',
  {
    variants: {
      variant: {
        default: '',
        outline: '',
      },
      size: {
        sm: 'h-8 px-2',
        md: 'h-10 px-3',
        lg: 'h-11 px-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export type ToggleGroupProps = ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
  VariantProps<typeof toggleGroupVariants>;

export const ToggleGroup = forwardRef<ComponentRef<typeof ToggleGroupPrimitive.Root>, ToggleGroupProps>(
  ({ className, variant, children, ...props }, ref) => (
    <ToggleGroupPrimitive.Root
      ref={ref}
      className={cn(toggleGroupVariants({ variant }), className)}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Root>
  )
);

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

export type ToggleGroupItemProps = ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
  VariantProps<typeof toggleGroupItemVariants>;

export const ToggleGroupItem = forwardRef<ComponentRef<typeof ToggleGroupPrimitive.Item>, ToggleGroupItemProps>(
  ({ className, variant, size, ...props }, ref) => (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(toggleGroupItemVariants({ variant, size }), className)}
      {...props}
    />
  )
);

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;