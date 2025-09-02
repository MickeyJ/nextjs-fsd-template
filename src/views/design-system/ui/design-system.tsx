'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ChevronRight,
  Home,
  Settings,
  User,
  Mail,
  Calendar,
  Search,
  Bell,
  Check,
  X,
  AlertCircle,
  Info,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Download,
  Upload,
  Edit,
  Trash,
  Copy,
  Share,
  Heart,
  Star,
  ArrowRight,
  Menu,
  Plus,
  Minus,
  RefreshCw,
  Loader2,
  Github,
  Moon,
  Sun,
} from 'lucide-react';

// Import all UI components
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Checkbox } from '@/shared/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group';
import { SelectMenu, SelectMenuContent, SelectMenuItem, SelectMenuTrigger, SelectMenuValue } from '@/shared/ui/select';
import { Switch } from '@/shared/ui/switch';
import { Textarea } from '@/shared/ui/textarea';
import { Badge } from '@/shared/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/shared/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Progress } from '@/shared/ui/progress';
import { Separator } from '@/shared/ui/separator';
import { Slider } from '@/shared/ui/slider';
import { Skeleton } from '@/shared/ui/skeleton';
import { Toggle } from '@/shared/ui/toggle';
import { ToggleGroup, ToggleGroupItem } from '@/shared/ui/toggle-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/ui/accordion';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/shared/ui/collapsible';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/shared/ui/alert-dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui/tooltip';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/shared/ui/hover-card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/shared/ui/dropdown-menu';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
} from '@/shared/ui/context-menu';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/shared/ui/menubar';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/shared/ui/navigation-menu';
import { ScrollArea } from '@/shared/ui/scroll-area';
import { Toolbar, ToolbarButton, ToolbarSeparator, ToolbarToggleGroup, ToolbarToggleItem } from '@/shared/ui/toolbar';
import { useToast, toast } from '@/shared/ui/toast';
import { Toaster } from '@/shared/ui/toast';
import { Form, FormControl, FormField, FormLabel, FormMessage } from '@/shared/ui/form';
import { Section, SectionProps } from '@/shared/ui/section';
import { Container, ContainerProps } from '@/shared/ui/container';
import { Loading } from '@/shared/ui/loading';
import { Calendar as CalendarComponent } from '@/shared/ui/calendar';
import { TimePickerInput } from '@/shared/ui/time-picker-input';
import { ImageUpload } from '@/shared/ui/image-upload';
import { PasswordInput } from '@/shared/ui/password-input';
import { SearchSelect } from '@/shared/ui/search-select';

export default function DesignSystem() {
  const [darkMode, setDarkMode] = useState(false);
  const [progress, setProgress] = useState(60);
  const [sliderValue, setSliderValue] = useState([50]);
  const [switchOn, setSwitchOn] = useState(false);
  const [checked, setChecked] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState('option1');
  const [toggleValue, setToggleValue] = useState('bold');

  const showToast = () => {
    toast({
      title: 'Toast Notification',
      description: 'This is a toast notification example.',
    });
  };

  const colors = [
    { name: 'Primary', base: 'primary' },
    { name: 'Secondary', base: 'secondary' },
    { name: 'Accent', base: 'accent' },
    { name: 'Success', base: 'success' },
    { name: 'Warning', base: 'warning' },
    { name: 'Error', base: 'error' },
    { name: 'Info', base: 'info' },
    { name: 'Neutral', base: 'neutral' },
  ];

  const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-neutral-50 text-neutral-900 transition-colors">
        <Toaster />

        <main className="container mx-auto px-6 py-12 space-y-16">
          {/* Color Palette Section */}
          <section>
            <h2 className="text-2xl font-bebas-neue tracking-wider mb-8">Color Palette</h2>
            <div className="space-y-8">
              {colors.map((color) => (
                <div key={color.name}>
                  <h3 className="text-lg font-semibold mb-4">{color.name}</h3>
                  <div className="grid grid-cols-11 gap-2">
                    {shades.map((shade) => (
                      <div
                        key={shade}
                        className="text-center"
                      >
                        <div
                          className={`h-16 rounded-lg bg-${color.base}-${shade} mb-2 ring-1 ring-neutral-200`}
                          style={{
                            backgroundColor: `var(--ypng-color-${color.base}-${shade})`,
                          }}
                        />
                        <span className="text-xs text-neutral-600">{shade}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Typography Section */}
          <section>
            <h2 className="text-2xl font-bebas-neue tracking-wider mb-8">Typography</h2>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <h1 className="text-5xl font-bebas-neue">Heading 1 - header font</h1>
                  <p className="text-neutral-600">text-5xl font-bebas-neue</p>
                </div>
                <Separator />
                <div>
                  <h2 className="text-4xl font-bebas-neue">Heading 2 - header font</h2>
                  <p className="text-neutral-600">text-4xl font-bebas-neue</p>
                </div>
                <Separator />
                <div>
                  <h3 className="text-3xl font-bebas-neue">Heading 3 - header font</h3>
                  <p className="text-neutral-600">text-3xl font-bebas-neue</p>
                </div>
                <Separator />
                <div>
                  <p className="text-lg font-quicksand">Body Text Large - body font</p>
                  <p className="text-neutral-600">text-lg font-quicksand</p>
                </div>
                <Separator />
                <div>
                  <p className="text-base font-quicksand">Body Text Base - body font</p>
                  <p className="text-neutral-600">text-base font-quicksand</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-quicksand">Body Text Small - body font</p>
                  <p className="text-neutral-600">text-sm font-quicksand</p>
                </div>
                <Separator />
                <div>
                  <code className="font-mono bg-neutral-100 px-2 py-1 rounded">Monospace Code Font</code>
                  <p className="font-mono text-neutral-600 mt-2">font-mono</p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Buttons Section */}
          <section>
            <h2 className="text-2xl font-bebas-neue tracking-wider mb-8">Buttons</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Button Variants</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-4">
                    <Button variant="primary">Primary</Button>
                    <Button variant="primaryInverted">Primary Inverted</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="accent">Accent</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Button Sizes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap items-center gap-4">
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                    <Button size="lg">Large</Button>
                    <Button size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Button States</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-4">
                    <Button>Normal</Button>
                    <Button disabled>Disabled</Button>
                    <Button isLoading>Loading</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Button with Icons</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-4">
                    <Button leftIcon={<Download className="h-4 w-4" />}>Download</Button>
                    <Button rightIcon={<ArrowRight className="h-4 w-4" />}>Continue</Button>
                    <Button
                      leftIcon={<Github className="h-4 w-4" />}
                      rightIcon={<ChevronRight className="h-4 w-4" />}
                    >
                      View on GitHub
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Form Controls Section */}
          <section>
            <h2 className="text-2xl font-bebas-neue tracking-wider mb-8">Form Controls</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Input Fields</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="text">Text Input</Label>
                    <Input
                      type="text"
                      id="text"
                      placeholder="Enter text..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Input</Label>
                    <Input
                      type="email"
                      id="email"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password Input</Label>
                    <PasswordInput
                      id="password"
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="disabled">Disabled Input</Label>
                    <Input
                      type="text"
                      id="disabled"
                      placeholder="Disabled"
                      disabled
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Textarea</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Type your message here..."
                      rows={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="disabled-textarea">Disabled Textarea</Label>
                    <Textarea
                      id="disabled-textarea"
                      placeholder="Disabled"
                      disabled
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Checkboxes & Switches</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={checked}
                      onCheckedChange={(checkedState) => {
                        if (typeof checkedState === 'boolean') {
                          setChecked(checkedState);
                        }
                      }}
                    />
                    <Label htmlFor="terms">Accept terms and conditions</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="disabled-checkbox"
                      disabled
                    />
                    <Label htmlFor="disabled-checkbox">Disabled checkbox</Label>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <Label htmlFor="airplane-mode">Airplane Mode</Label>
                    <Switch
                      id="airplane-mode"
                      checked={switchOn}
                      onCheckedChange={setSwitchOn}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="disabled-switch">Disabled Switch</Label>
                    <Switch
                      id="disabled-switch"
                      disabled
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Radio Groups</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup
                    value={selectedRadio}
                    onValueChange={setSelectedRadio}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="option1"
                        id="option1"
                      />
                      <Label htmlFor="option1">Option 1</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="option2"
                        id="option2"
                      />
                      <Label htmlFor="option2">Option 2</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="option3"
                        id="option3"
                      />
                      <Label htmlFor="option3">Option 3</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="disabled"
                        id="disabled-radio"
                        disabled
                      />
                      <Label htmlFor="disabled-radio">Disabled option</Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Select Menu</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Choose an option</Label>
                    <SelectMenu>
                      <SelectMenuTrigger>
                        <SelectMenuValue placeholder="Select an option" />
                      </SelectMenuTrigger>
                      <SelectMenuContent>
                        <SelectMenuItem value="light">Light</SelectMenuItem>
                        <SelectMenuItem value="dark">Dark</SelectMenuItem>
                        <SelectMenuItem value="system">System</SelectMenuItem>
                      </SelectMenuContent>
                    </SelectMenu>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sliders</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Volume: {sliderValue[0]}%</Label>
                    <Slider
                      value={sliderValue}
                      onValueChange={setSliderValue}
                      max={100}
                      step={1}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Disabled Slider</Label>
                    <Slider
                      defaultValue={[50]}
                      max={100}
                      step={1}
                      disabled
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Feedback Components */}
          <section>
            <h2 className="text-2xl font-bebas-neue tracking-wider mb-8">Feedback Components</h2>
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Alerts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Default Alert</AlertTitle>
                    <AlertDescription>This is a default alert with an informational message.</AlertDescription>
                  </Alert>
                  <Alert className="border-success-500 bg-success-50">
                    <CheckCircle className="h-4 w-4 text-success-600" />
                    <AlertTitle>Success!</AlertTitle>
                    <AlertDescription>Your operation completed successfully.</AlertDescription>
                  </Alert>
                  <Alert className="border-warning-500 bg-warning-50">
                    <AlertTriangle className="h-4 w-4 text-warning-600" />
                    <AlertTitle>Warning</AlertTitle>
                    <AlertDescription>Please review this important information.</AlertDescription>
                  </Alert>
                  <Alert className="border-error-500 bg-error-50">
                    <XCircle className="h-4 w-4 text-error-600" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>Something went wrong. Please try again.</AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Progress & Loading</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => setProgress(Math.max(0, progress - 10))}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => setProgress(Math.min(100, progress + 10))}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <p className="text-sm font-medium">Loading States</p>
                    <div className="flex items-center gap-4">
                      <Loader2 className="h-6 w-6 animate-spin text-primary-500" />
                      <RefreshCw className="h-6 w-6 animate-spin text-secondary-500" />
                      <div className="h-6 w-6 border-2 border-accent-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <p className="text-sm font-medium">Skeleton Loading</p>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Badges</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge className="bg-success-500 text-neutral-50">Success</Badge>
                    <Badge className="bg-warning-500 text-neutral-50">Warning</Badge>
                    <Badge className="bg-info-500 text-neutral-50">Info</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Navigation Components */}
          <section>
            <h2 className="text-2xl font-bebas-neue tracking-wider mb-8">Navigation Components</h2>
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Tabs</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs
                    defaultValue="account"
                    className="w-full"
                  >
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="account">Account</TabsTrigger>
                      <TabsTrigger value="password">Password</TabsTrigger>
                      <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>
                    <TabsContent
                      value="account"
                      className="mt-4"
                    >
                      <p className="text-sm text-neutral-600">
                        Make changes to your account here. Click save when you're done.
                      </p>
                    </TabsContent>
                    <TabsContent
                      value="password"
                      className="mt-4"
                    >
                      <p className="text-sm text-neutral-600">
                        Change your password here. After saving, you'll be logged out.
                      </p>
                    </TabsContent>
                    <TabsContent
                      value="settings"
                      className="mt-4"
                    >
                      <p className="text-sm text-neutral-600">Manage your application settings and preferences here.</p>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Accordion</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full"
                  >
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Is it accessible?</AccordionTrigger>
                      <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Is it styled?</AccordionTrigger>
                      <AccordionContent>
                        Yes. It comes with default styles that matches the other components' aesthetic.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>Is it animated?</AccordionTrigger>
                      <AccordionContent>
                        Yes. It's animated by default, but you can disable it if you prefer.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Interactive Components */}
          <section>
            <h2 className="text-2xl font-bebas-neue tracking-wider mb-8">Interactive Components</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Toggles & Toggle Groups</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Toggle aria-label="Toggle italic">
                      <Settings className="h-4 w-4" />
                    </Toggle>
                    <Toggle
                      aria-label="Toggle bold"
                      pressed
                    >
                      <Bell className="h-4 w-4" />
                    </Toggle>
                    <Toggle
                      aria-label="Toggle strikethrough"
                      disabled
                    >
                      <User className="h-4 w-4" />
                    </Toggle>
                  </div>
                  <Separator />
                  <ToggleGroup
                    type="single"
                    value={toggleValue}
                    onValueChange={setToggleValue}
                  >
                    <ToggleGroupItem
                      value="bold"
                      aria-label="Toggle bold"
                    >
                      <strong>B</strong>
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="italic"
                      aria-label="Toggle italic"
                    >
                      <em>I</em>
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="underline"
                      aria-label="Toggle underline"
                    >
                      <u>U</u>
                    </ToggleGroupItem>
                  </ToggleGroup>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Avatars</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Avatar>
                      <AvatarFallback>AB</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="https://github.com/vercel.png" />
                      <AvatarFallback>VC</AvatarFallback>
                    </Avatar>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tooltips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                        >
                          <Info className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>This is a helpful tooltip</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline">Hover me</Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Another tooltip example</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Hover Cards</CardTitle>
                </CardHeader>
                <CardContent>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button variant="link">@younGPNG</Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="flex justify-between space-x-4">
                        <Avatar>
                          <AvatarFallback>YP</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <h4 className="text-sm font-semibold">Young Professional Networking Group</h4>
                          <p className="text-sm">Building connections and opportunities for young professionals.</p>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Overlays & Modals */}
          <section>
            <h2 className="text-2xl font-bebas-neue tracking-wider mb-8">Overlays & Modals</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* <Card>
                <CardHeader>
                  <CardTitle>Dialog</CardTitle>
                </CardHeader>
                <CardContent>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Open Dialog</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently delete your account and remove your data
                          from our servers.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button>Continue</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card> */}

              {/* <Card>
                <CardHeader>
                  <CardTitle>Alert Dialog</CardTitle>
                </CardHeader>
                <CardContent>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">Delete Account</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your account and remove your data
                          from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-error-500 hover:bg-error-600">Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardContent>
              </Card> */}

              <Card>
                <CardHeader>
                  <CardTitle>Popover</CardTitle>
                </CardHeader>
                <CardContent>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">Open Popover</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Dimensions</h4>
                          <p className="text-sm text-neutral-500">Set the dimensions for the layer.</p>
                        </div>
                        <div className="grid gap-2">
                          <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="width">Width</Label>
                            <Input
                              id="width"
                              defaultValue="100%"
                              className="col-span-2 h-8"
                            />
                          </div>
                          <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="height">Height</Label>
                            <Input
                              id="height"
                              defaultValue="25px"
                              className="col-span-2 h-8"
                            />
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Menus Section */}
          <section>
            <h2 className="text-2xl font-bebas-neue tracking-wider mb-8">Menus</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Dropdown Menu</CardTitle>
                </CardHeader>
                <CardContent>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">Open Menu</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Bell className="mr-2 h-4 w-4" />
                        <span>Notifications</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-error-600">
                        <X className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Context Menu</CardTitle>
                </CardHeader>
                <CardContent>
                  <ContextMenu>
                    <ContextMenuTrigger className="flex h-[150px] w-full items-center justify-center rounded-md border border-dashed border-neutral-300 text-sm">
                      Right click here
                    </ContextMenuTrigger>
                    <ContextMenuContent className="w-64">
                      <ContextMenuItem>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy
                      </ContextMenuItem>
                      <ContextMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </ContextMenuItem>
                      <ContextMenuItem>
                        <Share className="mr-2 h-4 w-4" />
                        Share
                      </ContextMenuItem>
                      <ContextMenuItem className="text-error-600">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </ContextMenuItem>
                    </ContextMenuContent>
                  </ContextMenu>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Menubar</CardTitle>
                </CardHeader>
                <CardContent>
                  <Menubar>
                    <MenubarMenu>
                      <MenubarTrigger>File</MenubarTrigger>
                      <MenubarContent>
                        <MenubarItem>New Tab</MenubarItem>
                        <MenubarItem>New Window</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>Share</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>Print</MenubarItem>
                      </MenubarContent>
                    </MenubarMenu>
                    <MenubarMenu>
                      <MenubarTrigger>Edit</MenubarTrigger>
                      <MenubarContent>
                        <MenubarItem>Undo</MenubarItem>
                        <MenubarItem>Redo</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>Cut</MenubarItem>
                        <MenubarItem>Copy</MenubarItem>
                        <MenubarItem>Paste</MenubarItem>
                      </MenubarContent>
                    </MenubarMenu>
                    <MenubarMenu>
                      <MenubarTrigger>View</MenubarTrigger>
                      <MenubarContent>
                        <MenubarItem>Zoom In</MenubarItem>
                        <MenubarItem>Zoom Out</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>Full Screen</MenubarItem>
                      </MenubarContent>
                    </MenubarMenu>
                  </Menubar>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Toolbar</CardTitle>
                </CardHeader>
                <CardContent>
                  <Toolbar>
                    <ToolbarButton>
                      <Edit className="h-4 w-4" />
                    </ToolbarButton>
                    <ToolbarButton>
                      <Copy className="h-4 w-4" />
                    </ToolbarButton>
                    <ToolbarSeparator />
                    <ToolbarToggleGroup type="single">
                      <ToolbarToggleItem value="bold">
                        <strong>B</strong>
                      </ToolbarToggleItem>
                      <ToolbarToggleItem value="italic">
                        <em>I</em>
                      </ToolbarToggleItem>
                      <ToolbarToggleItem value="underline">
                        <u>U</u>
                      </ToolbarToggleItem>
                    </ToolbarToggleGroup>
                  </Toolbar>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Custom Components */}
          <section>
            <h2 className="mb-8">Custom Components</h2>

            <div className="grid grid-cols-1 gap-8  mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Container</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {['full', 'xl', 'lg', 'md', 'sm', 'xs'].map((size) => (
                    <Container
                      key={size + 'container'}
                      size={size as ContainerProps['size'] | undefined}
                      className="bg-neutral-100 rounded text-center"
                    >
                      <h4>{size}</h4>
                    </Container>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Section</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {['xl', 'lg', 'md', 'sm', 'xs', 'none'].map((size) => (
                    <Section
                      key={size + 'section'}
                      padding={size as SectionProps['padding'] | undefined}
                      className="bg-neutral-100 rounded text-center"
                    >
                      <h4>{size}</h4>
                    </Section>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Loading States</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Loading
                      variant="spinner"
                      size="sm"
                    />
                    <Loading
                      variant="spinner"
                      size="md"
                    />
                    <Loading
                      variant="spinner"
                      size="lg"
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <Loading
                      variant="dots"
                      size="md"
                    />
                    <Loading
                      variant="bars"
                      size="md"
                    />
                    <Loading
                      variant="pulse"
                      size="md"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Password Input</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Basic Password</Label>
                    <PasswordInput placeholder="Enter password" />
                  </div>
                  <div className="space-y-2">
                    <Label>Password with Strength Indicator</Label>
                    <PasswordInput
                      placeholder="Enter password"
                      showStrength
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Calendar</CardTitle>
                </CardHeader>
                <CardContent>
                  <CalendarComponent />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Time Picker</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <TimePickerInput
                    placeholder="Select time"
                    format="12"
                  />
                  <TimePickerInput
                    placeholder="Select time (24h)"
                    format="24"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Image Upload</CardTitle>
                </CardHeader>
                <CardContent>
                  <ImageUpload
                    maxFiles={3}
                    accept={{
                      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
                    }}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Search Select</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <SearchSelect
                    placeholder="Select an option"
                    options={[
                      { label: 'Option 1', value: '1', description: 'First option' },
                      { label: 'Option 2', value: '2', description: 'Second option' },
                      { label: 'Option 3', value: '3', description: 'Third option' },
                    ]}
                  />
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Layout Components */}
          <section>
            <h2 className="text-2xl font-bebas-neue tracking-wider mb-8">Layout Components</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Scroll Area</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[200px] w-full rounded-md border">
                    <div className="space-y-4">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div key={i}>
                          <h4 className="text-sm font-medium">Item {i + 1}</h4>
                          <p className="text-sm text-neutral-500">
                            This is a scrollable item with some content that demonstrates the scroll area component.
                          </p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Collapsible</CardTitle>
                </CardHeader>
                <CardContent>
                  <Collapsible>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between"
                      >
                        Toggle Content
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-4">
                      <div className="rounded-md border px-4 py-3 text-sm">
                        This is the collapsible content. It can be expanded or collapsed.
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Separator</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Horizontal Separator</h4>
                    <Separator />
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm">Left</span>
                    <Separator
                      orientation="vertical"
                      className="h-6"
                    />
                    <span className="text-sm">Right</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Toast Notification</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button onClick={showToast}>Show Toast</Button>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Animation Showcase */}
          <section>
            <h2 className="text-2xl font-bebas-neue tracking-wider mb-8">Animations</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <motion.div
                    className="p-4 bg-primary-100 rounded-lg text-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Scale
                  </motion.div>
                  <motion.div
                    className="p-4 bg-secondary-100 rounded-lg text-center"
                    whileHover={{ rotate: 5 }}
                  >
                    Rotate
                  </motion.div>
                  <motion.div
                    className="p-4 bg-accent-100 rounded-lg text-center"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    Bounce
                  </motion.div>
                  <motion.div
                    className="p-4 bg-success-100 rounded-lg text-center"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    Pulse
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </TooltipProvider>
  );
}
