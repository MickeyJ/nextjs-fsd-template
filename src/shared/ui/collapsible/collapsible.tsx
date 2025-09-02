'use client';

import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { forwardRef, type ComponentPropsWithoutRef, type ComponentRef } from 'react';
import { cn } from '@/shared/lib/utils';

const Collapsible = CollapsiblePrimitive.Root;

const CollapsibleTrigger = CollapsiblePrimitive.Trigger;

const CollapsibleContent = forwardRef<
  ComponentRef<typeof CollapsiblePrimitive.Content>,
  ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <CollapsiblePrimitive.Content
    ref={ref}
    className={cn(
      'overflow-hidden transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
      className
    )}
    {...props}
  >
    {children}
  </CollapsiblePrimitive.Content>
));
CollapsibleContent.displayName = CollapsiblePrimitive.Content.displayName;

export { Collapsible, CollapsibleTrigger, CollapsibleContent };

export type CollapsibleProps = ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root>;
export type CollapsibleTriggerProps = ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Trigger>;
export type CollapsibleContentProps = ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>;