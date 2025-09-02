'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import { AnimatePresence, motion } from 'motion/react';
import { forwardRef, type ComponentPropsWithoutRef, type ComponentRef } from 'react';
import { cn } from '@/shared/lib/utils';

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverPortal = PopoverPrimitive.Portal;
const PopoverAnchor = PopoverPrimitive.Anchor;

const PopoverContent = forwardRef<
  ComponentRef<typeof PopoverPrimitive.Content>,
  ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, children }, ref) => (
  <PopoverPrimitive.Content asChild sideOffset={sideOffset} align={align} forceMount>
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'z-50 w-72 rounded-md border border-gray-200 bg-white p-4 text-gray-900 shadow-md outline-none',
        className
      )}
    >
      {children}
    </motion.div>
  </PopoverPrimitive.Content>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent, PopoverPortal, PopoverAnchor };

export type PopoverProps = ComponentPropsWithoutRef<typeof PopoverPrimitive.Root>;
export type PopoverTriggerProps = ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>;
export type PopoverContentProps = ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>;