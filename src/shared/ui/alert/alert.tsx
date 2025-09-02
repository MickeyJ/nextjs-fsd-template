'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/shared/lib/utils';

const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4',
  {
    variants: {
      variant: {
        default: 'border-neutral-200 bg-neutral-50 text-neutral-950 [&>svg]:text-neutral-950',
        destructive: 'border-error-500/50 bg-error-50 text-error-600 [&>svg]:text-error-600',
        success: 'border-success-500/50 bg-success-50 text-success-700 [&>svg]:text-success-600',
        warning: 'border-warning-500/50 bg-warning-50 text-warning-700 [&>svg]:text-warning-600',
        info: 'border-info-500/50 bg-info-50 text-info-700 [&>svg]:text-info-600',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const Alert = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
);
Alert.displayName = 'Alert';

const AlertTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h6
      ref={ref}
      className={cn('mb-1 leading-none', className)}
      {...props}
    />
  )
);
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('text-sm [&_p]:leading-relaxed', className)}
      {...props}
    />
  )
);
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };

export type AlertProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>;
export type AlertTitleProps = HTMLAttributes<HTMLHeadingElement>;
export type AlertDescriptionProps = HTMLAttributes<HTMLParagraphElement>;
