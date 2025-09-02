'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { type HTMLAttributes } from 'react';
import { cn } from '@/shared/lib/utils';

const badgeVariants = cva(
  'select-none inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-neutral-900 text-neutral-50',
        secondary: 'border-transparent bg-neutral-100 text-neutral-900',
        destructive: 'border-transparent bg-error-500 text-neutral-50',
        outline: 'text-neutral-950',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
