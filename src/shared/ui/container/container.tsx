import type { HTMLAttributes, ReactNode } from 'react';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export function Container({ children, className = '', size = 'lg', ...props }: ContainerProps) {
  const sizes = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-7xl',
    xl: 'max-w-[1440px]',
    full: 'max-w-full',
  };

  const baseClasses = 'mx-auto w-full px-4 sm:px-6 lg:px-8';
  const sizeClass = sizes[size];
  const combinedClassName = `${baseClasses} ${sizeClass} ${className}`;

  return (
    <div
      className={combinedClassName}
      {...props}
    >
      {children}
    </div>
  );
}
