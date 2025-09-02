import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/utils';

const containerVariants = cva('mx-auto w-full', {
  variants: {
    size: {
      xs: 'max-w-xl',
      sm: 'max-w-2xl',
      md: 'max-w-3xl',
      lg: 'max-w-4xl',
      xl: 'max-w-5xl',
      full: 'max-w-full',
    },
    padding: {
      none: 'p-0',
      sm: 'p-4 sm:p-6',
      md: 'p-6 sm:p-8',
      lg: 'p-8 sm:p-10 lg:p-12',
      xl: 'p-12 sm:p-12 lg:p-14',
    },
  },
  defaultVariants: {
    size: 'lg',
    padding: 'sm',
  },
});

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof containerVariants> {}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(({ className, size, padding, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(containerVariants({ size, padding }), className)}
      {...props}
    />
  );
});

Container.displayName = 'Container';
