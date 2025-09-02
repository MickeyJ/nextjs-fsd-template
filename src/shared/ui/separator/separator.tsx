'use client';

import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type ComponentPropsWithoutRef, type ComponentRef } from 'react';
import { cn } from '@/shared/lib/utils';

const separatorVariants = cva('shrink-0 bg-gray-200', {
  variants: {
    orientation: {
      horizontal: 'h-[1px] w-full',
      vertical: 'h-full w-[1px]',
    },
    decorative: {
      true: '',
      false: '',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    decorative: true,
  },
});

export type SeparatorProps = ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> &
  VariantProps<typeof separatorVariants>;

export const Separator = forwardRef<ComponentRef<typeof SeparatorPrimitive.Root>, SeparatorProps>(
  ({ className, orientation = 'horizontal', decorative = true, ...props }, ref) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(separatorVariants({ orientation, decorative }), className)}
      {...props}
    />
  )
);

Separator.displayName = SeparatorPrimitive.Root.displayName;
