'use client';

import { Slot } from '@radix-ui/react-slot';
import { type HTMLMotionProps, motion } from 'motion/react';
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/utils'; // Your cn utility (usually clsx + tailwind-merge)

export const buttonVariants = cva(
  // Base classes
  'relative inline-flex items-center justify-center font-medium border-2 border-transparent transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary:
          'bg-primary-400 text-btn-light hover:bg-primary-500 active:bg-primary-600 focus-visible:ring-primary-500',
        primaryInverted:
          'bg-neutral-50 text-primary-500 hover:bg-neutral-100 active:bg-primary-700 active:text-btn-light focus-visible:ring-primary-500',
        secondary:
          'bg-secondary-400 text-btn-light hover:bg-secondary-500 active:bg-secondary-600 focus-visible:ring-secondary-500',
        neutral:
          'bg-neutral-500 text-btn-light hover:bg-neutral-600 active:bg-neutral-700 focus-visible:ring-neutral-500',
        outline:
          'border-neutral-300 bg-transparent hover:bg-neutral-50 active:bg-neutral-100 focus-visible:ring-neutral-500',
        accent:
          'border-accent-500 text-accent-500 bg-transparent hover:bg-accent-100 active:bg-accent-100 focus-visible:ring-accent-500',
        ghost:
          'bg-transparent text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200 focus-visible:ring-neutral-500',
        destructive: 'bg-error-500 text-btn-light hover:bg-error-600 active:bg-error-700 focus-visible:ring-error-500',
        link: 'text-primary-500 underline-offset-4 hover:underline',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm rounded-md gap-1.5',
        md: 'px-4 py-2 text-base rounded-lg gap-2',
        lg: 'px-6 py-3 text-lg rounded-lg gap-2.5',
        icon: 'h-10 w-10 rounded-lg', // For icon-only buttons
      },
      // You can add more variant categories
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

// Extract the variant props type from CVA
type ButtonVariantProps = VariantProps<typeof buttonVariants>;

// Base props without the variant props (since CVA handles those)
type BaseButtonProps = {
  children: ReactNode;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  asChild?: boolean;
};

// When asChild is false, we use motion props
type ButtonWithMotionProps = BaseButtonProps &
  ButtonVariantProps &
  Omit<HTMLMotionProps<'button'>, 'children'> & { asChild?: false };

// When asChild is true, we use regular button props
type ButtonWithSlotProps = BaseButtonProps &
  ButtonVariantProps &
  ComponentPropsWithoutRef<'button'> & { asChild: true };

export type ButtonProps = ButtonWithMotionProps | ButtonWithSlotProps;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    className,
    variant,
    size,
    fullWidth,
    children,
    isLoading = false,
    leftIcon,
    rightIcon,
    disabled,
    asChild = false,
    ...restProps
  } = props;

  const content = isLoading ? (
    <>
      <span className="absolute inset-0 flex items-center justify-center">
        <svg
          className="animate-spin h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      </span>
      <span className="invisible">
        {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </span>
    </>
  ) : (
    <>
      {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
    </>
  );

  // When using asChild, render Slot with regular button props
  if (asChild) {
    const Comp = Slot;
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        disabled={disabled || isLoading}
        {...(restProps as ComponentPropsWithoutRef<'button'>)}
      >
        {children}
      </Comp>
    );
  }

  // Regular motion button with animations
  return (
    <motion.button
      ref={ref}
      className={cn(buttonVariants({ variant, size, fullWidth, className }))}
      disabled={disabled || isLoading}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
      {...(restProps as HTMLMotionProps<'button'>)}
    >
      {content}
    </motion.button>
  );
});

Button.displayName = 'Button';

// ================================
// Example Usage
// ================================
// // With motion animations (asChild is false/undefined)
// <Button
//   variant="primary"
//   whileHover={{ scale: 1.05 }} // ✅ Motion props work
// >
//   Click me
// </Button>

// // With asChild (no motion props)
// <Button asChild variant="primary">
//   <Link href="/about">About</Link>
// </Button>

// // If you want animations with asChild, wrap the child in motion
// <Button asChild variant="primary">
//   <motion.a
//     href="/about"
//     whileHover={{ scale: 1.05 }}
//   >
//     About
//   </motion.a>
// </Button>
// ================================
