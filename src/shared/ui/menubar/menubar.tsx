'use client';

import * as MenubarPrimitive from '@radix-ui/react-menubar';
import { motion } from 'motion/react';
import { Check, ChevronRight, Circle } from 'lucide-react';
import { forwardRef, type ComponentPropsWithoutRef, type ComponentRef } from 'react';
import { cn } from '@/shared/lib/utils';

const MenubarMenu = MenubarPrimitive.Menu;
const MenubarGroup = MenubarPrimitive.Group;
const MenubarPortal = MenubarPrimitive.Portal;
const MenubarSub = MenubarPrimitive.Sub;
const MenubarRadioGroup = MenubarPrimitive.RadioGroup;

const Menubar = forwardRef<
  ComponentRef<typeof MenubarPrimitive.Root>,
  ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn('flex h-10 items-center space-x-1 rounded-md border border-gray-200 bg-white p-1', className)}
    {...props}
  />
));
Menubar.displayName = MenubarPrimitive.Root.displayName;

const MenubarTrigger = forwardRef<
  ComponentRef<typeof MenubarPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      'flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-gray-100 focus:text-gray-900 data-[state=open]:bg-gray-100 data-[state=open]:text-gray-900',
      className
    )}
    {...props}
  />
));
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName;

const MenubarContent = forwardRef<
  ComponentRef<typeof MenubarPrimitive.Content>,
  ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(({ className, align = 'start', alignOffset = -4, sideOffset = 8, ...props }, ref) => (
  <MenubarPrimitive.Portal>
    <MenubarPrimitive.Content asChild align={align} alignOffset={alignOffset} sideOffset={sideOffset}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
          'z-50 min-w-[12rem] overflow-hidden rounded-md border border-gray-200 bg-white p-1 text-gray-900 shadow-md',
          className
        )}
        {...props}
      />
    </MenubarPrimitive.Content>
  </MenubarPrimitive.Portal>
));
MenubarContent.displayName = MenubarPrimitive.Content.displayName;

const MenubarItem = forwardRef<
  ComponentRef<typeof MenubarPrimitive.Item>,
  ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-gray-100 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      inset && 'pl-8',
      className
    )}
    {...props}
  />
));
MenubarItem.displayName = MenubarPrimitive.Item.displayName;

const MenubarSeparator = forwardRef<
  ComponentRef<typeof MenubarPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator ref={ref} className={cn('-mx-1 my-1 h-px bg-gray-200', className)} {...props} />
));
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName;

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarGroup,
  MenubarPortal,
  MenubarSub,
  MenubarRadioGroup,
};