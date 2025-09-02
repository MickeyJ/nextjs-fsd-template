# Radix Component Implementation Guide

## Overview

This guide provides instructions for implementing a comprehensive UI component library using Radix UI primitives, Tailwind CSS v4, Motion (Framer Motion), and Class Variance Authority (CVA). All components follow the FSD (Feature-Sliced Design) architecture with barrel exports.

**Note: you are not to create tests yet**

Component file list:

```bash
# shared/ui (radix-ui components)
src/shared/ui/accordion/accordion.tsx
src/shared/ui/alert-dialog/alert-dialog.tsx
src/shared/ui/aspect-ratio/aspect-ratio.tsx
src/shared/ui/avatar/avatar.tsx
src/shared/ui/checkbox/checkbox.tsx
src/shared/ui/collapsible/collapsible.tsx
src/shared/ui/context-menu/context-menu.tsx
src/shared/ui/dialog/dialog.tsx
src/shared/ui/dropdown-menu/dropdown-menu.tsx
src/shared/ui/form/form.tsx
src/shared/ui/hover-card/hover-card.tsx
src/shared/ui/label/label.tsx
src/shared/ui/menubar/menubar.tsx
src/shared/ui/navigation-menu/navigation-menu.tsx
src/shared/ui/popover/popover.tsx
src/shared/ui/progress/progress.tsx
src/shared/ui/radio-group/radio-group.tsx
src/shared/ui/scroll-area/scroll-area.tsx
src/shared/ui/select/select.tsx
src/shared/ui/separator/separator.tsx
src/shared/ui/slider/slider.tsx
src/shared/ui/switch/switch.tsx
src/shared/ui/tabs/tabs.tsx
src/shared/ui/toast/toast.tsx
src/shared/ui/toggle/toggle.tsx
src/shared/ui/toggle-group/toggle-group.tsx
src/shared/ui/toolbar/toolbar.tsx
src/shared/ui/tooltip/tooltip.tsx
src/shared/ui/icons/index.tsx
```

## Core Principles & Tech Stack

### Technologies

- **Radix UI**: Headless, accessible component primitives (`radix-ui` package)
- **Tailwind CSS v4**: Utility-first CSS (CSS-only configuration, no JS config)
- **Motion**: Animation library (formerly Framer Motion) - `motion/react`
- **CVA**: Type-safe variant management - `class-variance-authority`
- **Lucide React**: Icon library - `lucide-react`
- **TypeScript**: Full type safety with discriminated unions for props

**Example: [src/shared/ui/button/button.tsx](../src/shared/ui/button/button.tsx)**

### Key Patterns

#### 1. CVA for Variants

All components with visual variants use CVA for type-safe, maintainable styling:

```tsx
const componentVariants = cva('base-classes', {
  variants: {
    variant: { primary: '...', secondary: '...' },
    size: { sm: '...', md: '...', lg: '...' },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});
```

#### 2. The asChild Pattern - TWO DIFFERENT APPROACHES

##### For CUSTOM Components (Button, Card, etc.)

When WE implement asChild in our custom components, we use Radix's Slot:

```tsx
// In our custom Button component
if (asChild) {
  // Slot merges props onto child - NO motion animations here
  return <Slot {...props}>{children}</Slot>;
}
// Only get motion animations when asChild is false
return <motion.button whileHover={{...}} {...props}>{content}</motion.button>;
```

**Important**: When `asChild=true` in custom components, you LOSE motion animations unless the child itself is a motion component.

##### For RADIX Components (Dialog, Popover, etc.)

Radix components already have asChild built-in. We use it to add motion:

```tsx
// Radix handles asChild internally - we ADD motion via child
<Dialog.Content asChild>
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    {children}
  </motion.div>
</Dialog.Content>
```

**Important**: Setting `asChild=true` on Radix components lets us wrap with motion.div to GET animations.

#### 3. Motion Exit Animations with Radix

For exit animations to work with Radix components that use Portal:

```tsx
const [open, setOpen] = useState(false);

// MUST use AnimatePresence + forceMount
<AnimatePresence>
  {open && (
    <Dialog.Portal forceMount>
      <Dialog.Overlay
        asChild
        forceMount
      >
        <motion.div exit={{ opacity: 0 }} />
      </Dialog.Overlay>
      <Dialog.Content
        asChild
        forceMount
      >
        <motion.div exit={{ scale: 0.95 }}>{children}</motion.div>
      </Dialog.Content>
    </Dialog.Portal>
  )}
</AnimatePresence>;
```

**Critical**: Without `forceMount`, exit animations won't work because Radix removes the DOM element immediately.

#### 4. Barrel Exports

Each component folder has an `index.ts` for clean imports:

```tsx
// component/index.ts
export { ComponentName } from './component-name';
export type { ComponentNameProps } from './component-name';
```

## Radix-Based Components

### Implementation Pattern

Each Radix component should:

1. Import from the single `radix-ui` package
2. Add custom styling with CVA
3. Use Motion for animations (wrap with motion.div using asChild)
4. Maintain Radix's accessibility features
5. Export both component and types

### Important Naming Conflicts

- **Select**: You have both a custom Select and want to use Radix Select. Name the Radix version `SelectMenu` or `SelectField` to avoid conflicts.
- **Form**: Radix Form does NOT provide input components - it only provides validation primitives (Field, Label, Message). Use it WITH your custom Input/Textarea components.

### Component List with Specific Guidelines

#### Dialog, Alert Dialog, Popover, Hover Card, Tooltip

**Motion Pattern with Exit Animations**:

```tsx
// Parent component controls open state
const [open, setOpen] = useState(false);

return (
  <Component.Root
    open={open}
    onOpenChange={setOpen}
  >
    <Component.Trigger>Open</Component.Trigger>

    <AnimatePresence>
      {open && (
        <Component.Portal forceMount>
          <Component.Overlay
            asChild
            forceMount
          >
            <motion.div
              className="fixed inset-0 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          </Component.Overlay>
          <Component.Content
            asChild
            forceMount
          >
            <motion.div
              className="fixed top-1/2 left-1/2"
              initial={{ opacity: 0, scale: 0.95, x: '-50%', y: '-50%' }}
              animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
              exit={{ opacity: 0, scale: 0.95, x: '-50%', y: '-50%' }}
            >
              {/* Your content here */}
            </motion.div>
          </Component.Content>
        </Component.Portal>
      )}
    </AnimatePresence>
  </Component.Root>
);
```

**Note**: The x/y translations maintain centering during animation.

#### Accordion, Collapsible

**Use CSS animations** (Motion not needed for height):

```tsx
// In your CSS
@keyframes accordion-down {
  from { height: 0; }
  to { height: var(--radix-accordion-content-height); }
}

@keyframes accordion-up {
  from { height: var(--radix-accordion-content-height); }
  to { height: 0; }
}

// In component
<Accordion.Content
  className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up"
/>
```

Radix provides the CSS variable `--radix-accordion-content-height` automatically.

#### Dropdown Menu, Context Menu, Menubar

**Simple Motion pattern** (no exit animations needed for menus):

```tsx
<DropdownMenu.Content asChild>
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className={cn(
      menuContentVariants({
        /* CVA variants */
      })
    )}
  >
    <DropdownMenu.Item className={cn(menuItemVariants({ variant: 'default' }))}>Edit</DropdownMenu.Item>
    <DropdownMenu.Item className={cn(menuItemVariants({ variant: 'danger' }))}>Delete</DropdownMenu.Item>
  </motion.div>
</DropdownMenu.Content>
```

#### Navigation Menu

**Special case**: Has built-in animation support. Use CSS transitions rather than Motion.

#### Tabs

**Motion for active indicator** with layoutId:

```tsx
<Tabs.List>
  {tabs.map((tab) => (
    <Tabs.Trigger
      key={tab.value}
      value={tab.value}
      className="relative"
    >
      {tab.label}
      {value === tab.value && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 bg-primary-100 rounded"
          transition={{ type: 'spring', duration: 0.5 }}
        />
      )}
    </Tabs.Trigger>
  ))}
</Tabs.List>
```

#### Progress

**Motion for smooth updates**:

```tsx
<Progress.Root>
  <Progress.Indicator asChild>
    <motion.div
      className="h-full bg-primary"
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    />
  </Progress.Indicator>
</Progress.Root>
```

#### Switch, Checkbox

**Micro-interactions for state changes**:

```tsx
// For Switch thumb
<Switch.Thumb asChild>
  <motion.div
    className="block h-5 w-5 bg-white rounded-full"
    animate={{ x: checked ? 20 : 0 }}
    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
  />
</Switch.Thumb>

// For Checkbox icon
<AnimatePresence>
  {checked && (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ duration: 0.1 }}
    >
      <Check className="h-4 w-4" />
    </motion.div>
  )}
</AnimatePresence>
```

#### Radio Group

**CSS transitions** are sufficient (no Motion needed):

```tsx
<RadioGroup.Indicator className="flex items-center justify-center">
  <div className="h-2 w-2 rounded-full bg-current transition-transform scale-0 data-[state=checked]:scale-100" />
</RadioGroup.Indicator>
```

#### Form

**IMPORTANT**: Radix Form does NOT provide Input, Textarea, or Select components!
It provides:

- `Form.Root` - Form wrapper
- `Form.Field` - Field wrapper with validation
- `Form.Label` - Accessible label
- `Form.Control` - Where YOUR input goes
- `Form.Message` - Validation messages

Usage with your custom Input:

```tsx
<Form.Field name="email">
  <Form.Label>Email</Form.Label>
  <Form.Control asChild>
    <Input
      type="email"
      required
    />{' '}
    {/* YOUR custom Input component */}
  </Form.Control>
  <Form.Message match="valueMissing">Email is required</Form.Message>
  <Form.Message match="typeMismatch">Invalid email</Form.Message>
</Form.Field>
```

or

```tsx
<FormField name="email">
  <FormLabel>Email</FormLabel>
  <FormControl asChild>
    <Input
      type="email"
      required
    />{' '}
    {/* YOUR custom Input component */}
  </FormControl>
  <FormMessage match="valueMissing">Email is required</FormMessage>
  <FormMessage match="typeMismatch">Invalid email</FormMessage>
</FormField>
```

### AccessibleIcon

Makes icons accessible to screen readers
Create `src/shared/ui/icons/index.tsx` with most common icons pre-wrapped like so:

```tsx
// src/shared/ui/icons/index.tsx
import * as AccessibleIcon from '@radix-ui/react-accessible-icon';
import { Search, X, Menu, ChevronDown, Check, Eye, EyeOff, Loader2, AlertCircle, Info } from 'lucide-react';

// Pre-wrapped accessible versions
export const SearchIcon = ({ label = 'Search', ...props }) => (
  <AccessibleIcon.Root label={label}>
    <Search {...props} />
  </AccessibleIcon.Root>
);

export const CloseIcon = ({ label = 'Close', ...props }) => (
  <AccessibleIcon.Root label={label}>
    <X {...props} />
  </AccessibleIcon.Root>
);

export const LoadingIcon = ({ label = 'Loading', ...props }) => (
  <AccessibleIcon.Root label={label}>
    <Loader2
      className="animate-spin"
      {...props}
    />
  </AccessibleIcon.Root>
);

...
```

#### Components That Don't Need Motion

- **Aspect Ratio**: Pure layout, no animation needed
- **Avatar**: Use CSS transitions for fallback states
- **Label**: Static text component
- **Separator**: Visual divider only
- **Scroll Area**: Uses native scrolling
- **Slider**: Radix handles dragging internally
- **Toggle, Toggle Group**: CSS transitions are sufficient
- **Toolbar**: Container component
- **Toast**: Use CSS animations or a custom provider with Motion

## Utilities (for reference only)

### VisuallyHidden

Hide content visually but keep for screen readers:

```tsx
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

// For icon-only buttons
<button className="p-2">
  <Settings className="h-4 w-4" />
  <VisuallyHidden.Root>Open settings</VisuallyHidden.Root>
</button>

// For form labels you want to hide
<VisuallyHidden.Root asChild>
  <label htmlFor="search">Search</label>
</VisuallyHidden.Root>
```

### Portal

Renders children in different DOM location:

```tsx
import * as Portal from '@radix-ui/react-portal';

// Usually not used directly - Radix components handle this
// But useful for custom modals/tooltips
<Portal.Root container={document.getElementById('modal-root')}>
  <div className="fixed inset-0">{children}</div>
</Portal.Root>;
```

### Slot

Merges props onto child element. Used for asChild pattern:

```tsx
import { Slot } from '@radix-ui/react-slot';

// In your custom component
function Button({ asChild, ...props }) {
  const Comp = asChild ? Slot : 'button';
  return <Comp {...props} />;
}

// Usage
<Button asChild>
  <a href="/home">Home</a> {/* a tag gets all button props */}
</Button>;
```

### DirectionProvider

Provides text direction context (LTR/RTL):

```tsx
import * as Direction from '@radix-ui/react-direction';

// Wrap your app or sections
<Direction.Provider dir="rtl">
  <App /> {/* All Radix components inside will respect RTL */}
</Direction.Provider>;
```

## File Structure

```
src/shared/ui/dialog/
├── dialog.tsx       # Component implementation
├── dialog.test.tsx  # Tests (DO NOT CREATE TESTS YET)
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
