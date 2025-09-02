'use client';

import * as ToolbarPrimitive from '@radix-ui/react-toolbar';
import { forwardRef, type ComponentPropsWithoutRef, type ComponentRef } from 'react';
import { cn } from '@/shared/lib/utils';

const Toolbar = forwardRef<
  ComponentRef<typeof ToolbarPrimitive.Root>,
  ComponentPropsWithoutRef<typeof ToolbarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <ToolbarPrimitive.Root
    ref={ref}
    className={cn('flex items-center gap-1', className)}
    {...props}
  />
));
Toolbar.displayName = ToolbarPrimitive.Root.displayName;

const ToolbarButton = forwardRef<
  ComponentRef<typeof ToolbarPrimitive.Button>,
  ComponentPropsWithoutRef<typeof ToolbarPrimitive.Button>
>(({ className, ...props }, ref) => (
  <ToolbarPrimitive.Button
    ref={ref}
    className={cn(
      'inline-flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium ring-offset-neutral-50 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-neutral-100 data-[state=on]:text-neutral-900',
      className
    )}
    {...props}
  />
));
ToolbarButton.displayName = ToolbarPrimitive.Button.displayName;

const ToolbarSeparator = forwardRef<
  ComponentRef<typeof ToolbarPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof ToolbarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ToolbarPrimitive.Separator
    ref={ref}
    className={cn('mx-2 h-5 w-[1px] bg-neutral-200', className)}
    {...props}
  />
));
ToolbarSeparator.displayName = ToolbarPrimitive.Separator.displayName;

const ToolbarLink = forwardRef<
  ComponentRef<typeof ToolbarPrimitive.Link>,
  ComponentPropsWithoutRef<typeof ToolbarPrimitive.Link>
>(({ className, ...props }, ref) => (
  <ToolbarPrimitive.Link
    ref={ref}
    className={cn(
      'inline-flex h-10 items-center justify-center rounded-md px-3 text-sm font-medium ring-offset-neutral-50 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-neutral-100 data-[state=on]:text-neutral-900',
      className
    )}
    {...props}
  />
));
ToolbarLink.displayName = ToolbarPrimitive.Link.displayName;

const ToolbarToggleGroup = ToolbarPrimitive.ToggleGroup;

const ToolbarToggleItem = forwardRef<
  ComponentRef<typeof ToolbarPrimitive.ToggleItem>,
  ComponentPropsWithoutRef<typeof ToolbarPrimitive.ToggleItem>
>(({ className, ...props }, ref) => (
  <ToolbarPrimitive.ToggleItem
    ref={ref}
    className={cn(
      'inline-flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium ring-offset-neutral-50 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-neutral-100 data-[state=on]:text-neutral-900',
      className
    )}
    {...props}
  />
));
ToolbarToggleItem.displayName = ToolbarPrimitive.ToggleItem.displayName;

export { Toolbar, ToolbarButton, ToolbarSeparator, ToolbarLink, ToolbarToggleGroup, ToolbarToggleItem };

export type ToolbarProps = ComponentPropsWithoutRef<typeof ToolbarPrimitive.Root>;
export type ToolbarButtonProps = ComponentPropsWithoutRef<typeof ToolbarPrimitive.Button>;
export type ToolbarSeparatorProps = ComponentPropsWithoutRef<typeof ToolbarPrimitive.Separator>;
export type ToolbarLinkProps = ComponentPropsWithoutRef<typeof ToolbarPrimitive.Link>;
export type ToolbarToggleGroupProps = ComponentPropsWithoutRef<typeof ToolbarPrimitive.ToggleGroup>;
export type ToolbarToggleItemProps = ComponentPropsWithoutRef<typeof ToolbarPrimitive.ToggleItem>;
