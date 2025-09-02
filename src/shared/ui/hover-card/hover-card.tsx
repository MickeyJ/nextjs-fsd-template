'use client';

import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import { AnimatePresence, motion } from 'motion/react';
import { forwardRef, type ComponentPropsWithoutRef, type ComponentRef } from 'react';
import { cn } from '@/shared/lib/utils';

const HoverCard = HoverCardPrimitive.Root;
const HoverCardTrigger = HoverCardPrimitive.Trigger;
const HoverCardPortal = HoverCardPrimitive.Portal;

const HoverCardContent = forwardRef<
  ComponentRef<typeof HoverCardPrimitive.Content>,
  ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content asChild sideOffset={sideOffset} align={align}>
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'z-50 w-64 rounded-md border border-gray-200 bg-white p-4 text-gray-900 shadow-md outline-none',
        className
      )}
      {...props}
    />
  </HoverCardPrimitive.Content>
));
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

export { HoverCard, HoverCardTrigger, HoverCardContent, HoverCardPortal };

export type HoverCardProps = ComponentPropsWithoutRef<typeof HoverCardPrimitive.Root>;
export type HoverCardTriggerProps = ComponentPropsWithoutRef<typeof HoverCardPrimitive.Trigger>;
export type HoverCardContentProps = ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>;