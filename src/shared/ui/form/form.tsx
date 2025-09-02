'use client';

import * as FormPrimitive from '@radix-ui/react-form';
import { forwardRef, type ComponentPropsWithoutRef, type ComponentRef } from 'react';
import { cn } from '@/shared/lib/utils';

const Form = FormPrimitive.Root;

const FormField = forwardRef<
  ComponentRef<typeof FormPrimitive.Field>,
  ComponentPropsWithoutRef<typeof FormPrimitive.Field>
>(({ className, ...props }, ref) => (
  <FormPrimitive.Field
    ref={ref}
    className={cn('space-y-2', className)}
    {...props}
  />
));
FormField.displayName = FormPrimitive.Field.displayName;

const FormLabel = forwardRef<
  ComponentRef<typeof FormPrimitive.Label>,
  ComponentPropsWithoutRef<typeof FormPrimitive.Label>
>(({ className, ...props }, ref) => (
  <FormPrimitive.Label
    ref={ref}
    className={cn('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70', className)}
    {...props}
  />
));
FormLabel.displayName = FormPrimitive.Label.displayName;

const FormControl = forwardRef<
  ComponentRef<typeof FormPrimitive.Control>,
  ComponentPropsWithoutRef<typeof FormPrimitive.Control>
>(({ ...props }, ref) => (
  <FormPrimitive.Control ref={ref} {...props} />
));
FormControl.displayName = FormPrimitive.Control.displayName;

const FormMessage = forwardRef<
  ComponentRef<typeof FormPrimitive.Message>,
  ComponentPropsWithoutRef<typeof FormPrimitive.Message>
>(({ className, children, ...props }, ref) => (
  <FormPrimitive.Message
    ref={ref}
    className={cn('text-sm font-medium text-red-500', className)}
    {...props}
  >
    {children}
  </FormPrimitive.Message>
));
FormMessage.displayName = FormPrimitive.Message.displayName;

const FormValidityState = FormPrimitive.ValidityState;
const FormSubmit = FormPrimitive.Submit;

export {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  FormValidityState,
  FormSubmit,
};

export type FormProps = ComponentPropsWithoutRef<typeof FormPrimitive.Root>;
export type FormFieldProps = ComponentPropsWithoutRef<typeof FormPrimitive.Field>;
export type FormLabelProps = ComponentPropsWithoutRef<typeof FormPrimitive.Label>;
export type FormControlProps = ComponentPropsWithoutRef<typeof FormPrimitive.Control>;
export type FormMessageProps = ComponentPropsWithoutRef<typeof FormPrimitive.Message>;