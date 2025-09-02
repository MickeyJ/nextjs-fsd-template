## Custom Components

### General Guidelines

1. **Build on HTML primitives or Radix components where possible**
2. **Use CVA for all variant management**
3. **Include proper TypeScript types with exported interfaces**
4. **Support ref forwarding with `forwardRef`**
5. **Add loading and error states where applicable**
6. **Follow accessibility best practices (ARIA labels, keyboard navigation)**
7. **Implement asChild using Slot only if the component needs polymorphism**

### Component-Specific Instructions

```bash
# shared/ui (custom components)
src/shared/ui/button/button.tsx
src/shared/ui/container/container.tsx
src/shared/ui/section/section.tsx
src/shared/ui/loading/loading.tsx
src/shared/ui/skeleton/skeleton.tsx
src/shared/ui/card/card.tsx
src/shared/ui/input/input.tsx
src/shared/ui/select/select.tsx
src/shared/ui/search-select/search-select.tsx
src/shared/ui/textarea/textarea.tsx
src/shared/ui/calendar/calendar.tsx # react-day-picker
src/shared/ui/time-picker-input/time-picker-input.tsx
src/shared/ui/image-upload/image-upload.tsx
src/shared/ui/password-input/password-input.tsx # use Input component with toggle password visibility
```

#### Button

Already implemented - use as reference pattern. Key points:

- Uses Slot for asChild implementation
- Motion animations only when asChild=false
- Full TypeScript discriminated union for props

#### Container, Section

_These component are already written but need to be fixed to follow the csv component pattern!_

Layout components with responsive max-widths:

```tsx
const containerVariants = cva('mx-auto px-4', {
  variants: {
    size: {
      sm: 'max-w-3xl',
      md: 'max-w-5xl',
      lg: 'max-w-7xl',
      full: 'max-w-full',
    },
    padding: {
      none: 'px-0',
      sm: 'px-4',
      md: 'px-6',
      lg: 'px-8',
    },
  },
  defaultVariants: {
    size: 'lg',
    padding: 'md',
  },
});
```

#### Card

Composite component pattern (multiple exports):

```tsx
// Compound component structure
const Card = forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(cardVariants(), className)}
    {...props}
  />
));

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(/* ... */);
const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(/* ... */);
const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(/* ... */);
const CardContent = forwardRef<HTMLDivElement, CardContentProps>(/* ... */);
const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(/* ... */);

// Export as properties on Card
Card.Header = CardHeader;
Card.Title = CardTitle;
// etc...

export { Card };
```

#### Input, Textarea

Build on native HTML elements with CVA variants:

- Error states with red borders
- Disabled states with reduced opacity
- Focus states with ring
- Support icons for Input (use slots pattern, not asChild)

#### Loading

Multiple loading patterns:

```tsx
const loadingVariants = cva('', {
  variants: {
    variant: {
      spinner: 'animate-spin rounded-full border-2 border-current border-t-transparent',
      dots: 'flex space-x-1',
      pulse: 'animate-pulse',
    },
    size: {
      sm: 'h-4 w-4',
      md: 'h-8 w-8',
      lg: 'h-12 w-12',
    },
  },
});
```

#### Skeleton

Shimmer effect with Motion:

```tsx
<motion.div
  className="bg-gradient-to-r from-transparent via-white/20 to-transparent"
  animate={{
    x: ['-100%', '100%'],
  }}
  transition={{
    duration: 1.5,
    repeat: Infinity,
    ease: 'linear',
  }}
/>
```

#### Calendar

Use `react-day-picker` v9:

```tsx
import { DayPicker } from 'react-day-picker';
// Style with Tailwind classes
// Export as compound component with Calendar.Root, Calendar.Day, etc.
```

#### TimePickerInput

Build on Input with time validation:

- Format as HH:MM
- Support 12/24 hour formats
- Validate time ranges

#### ImageUpload

Comprehensive upload component:

```tsx
// Use react-dropzone
// Include: drag state, preview, progress bar, error states
// Support multiple/single file modes
```

#### PasswordInput

Wrapper around Input with visibility toggle:

```tsx
const [isVisible, setIsVisible] = useState(false);
const Icon = isVisible ? Eye : EyeOff;

return (
  <div className="relative">
    <Input
      type={isVisible ? 'text' : 'password'}
      {...props}
    />
    <button
      type="button"
      onClick={() => setIsVisible(!isVisible)}
      className="absolute right-2 top-1/2 -translate-y-1/2"
    >
      <Icon className="h-4 w-4" />
    </button>
  </div>
);
```

#### Select (Custom)

**NAMING CONFLICT**: You have this AND Radix Select. Options:

1. Name this `SelectCustom` or `SelectSearch`
2. Name Radix version `SelectMenu`
3. Combine both into one component with a `searchable` prop

For searchable select, consider using `cmdk` library with Popover.

#### SearchSelect

Combine search with select functionality:

```tsx
// Option 1: Use cmdk library
import { Command } from 'cmdk';

// Option 2: Build on Radix Popover + Input
// Include: search input, filtered results, keyboard navigation
```

## File Structure

```
src/shared/ui/container/
├── container.tsx       # Component implementation
├── container.test.tsx  # Tests
├── index.ts         # Barrel export
```

## Critical Implementation Notes

### Tailwind v4 Specifics

- NO `tailwind.config.js` - all config in CSS
- Use `@theme` directive for design tokens
- Use `@utility` for custom utilities (not @layer)
- Native CSS cascade layers (not Tailwind's @layer)

### Motion + Radix Gotchas

1. **Exit animations REQUIRE `forceMount` + `AnimatePresence`**
2. **Portal components need forceMount on Portal AND Content/Overlay**
3. **Transform origin matters for scale animations (set it explicitly)**
4. **Use `pointer-events-none` on overlays during exit**

### TypeScript Patterns

```tsx
// Discriminated unions for asChild
type PropsWithMotion = BaseProps & HTMLMotionProps<'div'> & { asChild?: false };
type PropsWithSlot = BaseProps & ComponentPropsWithoutRef<'div'> & { asChild: true };
type Props = PropsWithMotion | PropsWithSlot;
```

### Performance Checklist

- [ ] Lazy load heavy components (Calendar, ImageUpload)
- [ ] Use CSS transforms over layout properties
- [ ] Memoize expensive computations
- [ ] Virtualize long lists in Select/SearchSelect
- [ ] Use `will-change` sparingly for animations

### Accessibility Must-Haves

- [ ] All interactive elements focusable
- [ ] Escape key closes modals
- [ ] Arrow keys for navigation where expected
- [ ] Proper ARIA labels and descriptions
- [ ] Focus trapped in modals
- [ ] Focus restored after modal closes
- [ ] Announce dynamic content changes

## Common Mistakes to Avoid

1. **Forgetting `forceMount`** when using Motion exit animations with Radix
2. **Using motion.div without `asChild`** on Radix components (won't work)
3. **Not controlling `open` state** when using AnimatePresence
4. **Conflicting component names** (Select appears twice)
5. **Expecting Form to provide inputs** (it doesn't)
6. **Using @layer in Tailwind v4** (use @utility instead)
7. **Not type-casting restProps** when using discriminated unions
8. **Forgetting to export types** from barrel exports
9. **Using Motion for height animations** (use CSS with Radix variables)
10. **Not wrapping icons with AccessibleIcon** when used alone
