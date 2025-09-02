'use client';

import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/utils';

const textareaVariants = cva(
  'flex w-full rounded-md border bg-neutral-50 px-3 py-2 text-sm ring-offset-neutral-50 transition-colors resize-y placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:resize-none',
  {
    variants: {
      variant: {
        default: 'border-neutral-300 focus-visible:ring-primary-500',
        error: 'border-error-500 focus-visible:ring-error-500',
        success: 'border-success-500 focus-visible:ring-success-500',
      },
      size: {
        sm: 'min-h-[60px] text-xs',
        md: 'min-h-[80px]',
        lg: 'min-h-[120px] text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, variant, size, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(textareaVariants({ variant, size }), className)}
      {...props}
    />
  );
});

Textarea.displayName = 'Textarea';

export { Textarea };
