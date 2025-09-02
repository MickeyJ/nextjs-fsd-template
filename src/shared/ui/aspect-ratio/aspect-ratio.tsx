'use client';

import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio';
import { forwardRef, type ComponentPropsWithoutRef, type ComponentRef } from 'react';

export type AspectRatioProps = ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root>;

export const AspectRatio = forwardRef<ComponentRef<typeof AspectRatioPrimitive.Root>, AspectRatioProps>(
  (props, ref) => (
    <AspectRatioPrimitive.Root
      ref={ref}
      {...props}
    />
  )
);

AspectRatio.displayName = AspectRatioPrimitive.Root.displayName;
