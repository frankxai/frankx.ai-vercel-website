# FrankX.AI UI Component Library

Production-grade, accessible UI components with glassmorphic design system.

## 🎨 Design Philosophy

All components follow the FrankX.AI dual-spectrum design system:
- **Tech Spectrum**: Emerald/Cyan for AI and technical content
- **Soul Spectrum**: Amber/Gold for personal transformation content
- **Glassmorphic styling** with backdrop blur and subtle borders
- **WCAG AAA accessibility** with proper ARIA labels and keyboard navigation
- **Dark/Light mode** support (use ThemeToggle component)

## 📦 Components

### Form Components

#### Input
Multi-variant text input with password toggle, icons, and error states.

```tsx
import { Input } from '@/components/ui/Input'

// Basic text input
<Input placeholder="Enter your email" />

// Password input with toggle
<Input type="password" placeholder="Password" />

// With error state
<Input
  error
  helperText="This field is required"
  placeholder="Username"
/>

// With left icon
<Input
  icon={<Mail className="w-4 h-4" />}
  iconPosition="left"
  placeholder="Email address"
/>

// All input types supported
<Input type="email" />
<Input type="number" />
<Input type="tel" />
<Input type="url" />
<Input type="search" />
```

#### Textarea
Auto-resizing multi-line text input.

```tsx
import { Textarea } from '@/components/ui/Textarea'

// Basic textarea
<Textarea placeholder="Enter your message" />

// Auto-resize
<Textarea autoResize placeholder="Auto-expanding textarea" />

// With error
<Textarea
  error
  helperText="Message is too short"
  minLength={10}
/>
```

#### Checkbox
Accessible checkbox with glassmorphic styling.

```tsx
import { Checkbox } from '@/components/ui/Checkbox'

<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <label htmlFor="terms">Accept terms and conditions</label>
</div>

// Controlled
<Checkbox
  checked={isChecked}
  onCheckedChange={setIsChecked}
  id="newsletter"
/>
```

#### RadioGroup
Radio button group for single selection.

```tsx
import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup'

<RadioGroup defaultValue="option1" onValueChange={setValue}>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option1" id="option1" />
    <label htmlFor="option1">Option 1</label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option2" id="option2" />
    <label htmlFor="option2">Option 2</label>
  </div>
</RadioGroup>
```

#### Switch
Toggle switch component.

```tsx
import { Switch } from '@/components/ui/Switch'

<div className="flex items-center space-x-2">
  <Switch id="airplane-mode" />
  <label htmlFor="airplane-mode">Airplane Mode</label>
</div>

// Controlled
<Switch
  checked={isEnabled}
  onCheckedChange={setIsEnabled}
/>
```

#### Select
Dropdown select menu.

```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select'

<Select onValueChange={setValue}>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light">Light</SelectItem>
    <SelectItem value="dark">Dark</SelectItem>
    <SelectItem value="system">System</SelectItem>
  </SelectContent>
</Select>
```

#### Form with React Hook Form
Complete form integration with validation.

```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/Input'
import { Checkbox } from '@/components/ui/Checkbox'

const formSchema = z.object({
  username: z.string().min(2, 'Username must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  terms: z.boolean().refine((val) => val === true, 'You must accept the terms'),
})

function MyForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      terms: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="johndoe" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Accept terms and conditions</FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <button type="submit">Submit</button>
      </form>
    </Form>
  )
}
```

---

### Feedback Components

#### Toaster (Toast Notifications)
Non-blocking notifications using Sonner.

```tsx
// 1. Add to your root layout (already done in app/layout.tsx)
import { Toaster } from '@/components/ui/Toaster'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}

// 2. Use anywhere in your app
import { toast } from 'sonner'

// Success
toast.success('Creator account created!')

// Error
toast.error('Failed to save changes')

// Info
toast.info('New AI tool available')

// Warning
toast.warning('Your session will expire soon')

// Loading/Promise
toast.promise(
  fetch('/api/save'),
  {
    loading: 'Saving...',
    success: 'Saved successfully!',
    error: 'Failed to save',
  }
)

// With action button
toast('Event created', {
  action: {
    label: 'Undo',
    onClick: () => console.log('Undo'),
  },
})

// Custom duration
toast.success('Quick message', { duration: 2000 })

// Dismiss all
toast.dismiss()
```

#### Dialog/Modal
Accessible modal dialogs.

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/Dialog'

<Dialog>
  <DialogTrigger asChild>
    <button>Open Dialog</button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <button variant="outline">Cancel</button>
      <button>Confirm</button>
    </DialogFooter>
  </DialogContent>
</Dialog>

// Controlled dialog
const [open, setOpen] = useState(false)

<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogTitle>Controlled Dialog</DialogTitle>
  </DialogContent>
</Dialog>
```

---

### Navigation Components

#### DropdownMenu
Context menus with keyboard navigation.

```tsx
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
  DropdownMenuShortcut,
} from '@/components/ui/DropdownMenu'

<DropdownMenu>
  <DropdownMenuTrigger>
    <button>Open Menu</button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      Profile
      <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Log out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

// With checkboxes
<DropdownMenu>
  <DropdownMenuTrigger>Options</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuCheckboxItem checked={showBookmarks}>
      Show Bookmarks
    </DropdownMenuCheckboxItem>
    <DropdownMenuCheckboxItem checked={showReading}>
      Show Reading List
    </DropdownMenuCheckboxItem>
  </DropdownMenuContent>
</DropdownMenu>
```

#### Command Palette
⌘K style command menu.

```tsx
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
} from '@/components/ui/CommandPalette'

function SearchDialog() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            Calendar
            <CommandShortcut>⌘C</CommandShortcut>
          </CommandItem>
          <CommandItem>Search Emoji</CommandItem>
          <CommandItem>Calculator</CommandItem>
        </CommandGroup>
        <CommandGroup heading="Settings">
          <CommandItem>Profile</CommandItem>
          <CommandItem>Billing</CommandItem>
          <CommandItem>Settings</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
```

#### ThemeToggle
Light/Dark/System theme switcher.

```tsx
import { ThemeToggle } from '@/components/ui/ThemeToggle'

// Already added to NavigationMega component
<ThemeToggle />
```

---

### Display Components

#### Skeleton Loaders
Loading placeholders with pulse animation.

```tsx
import {
  Skeleton,
  SkeletonCard,
  SkeletonButton,
  SkeletonAvatar,
  SkeletonText,
} from '@/components/ui/Skeleton'

// Generic skeleton
<Skeleton className="h-12 w-full" />

// Preset skeletons
<SkeletonCard />
<SkeletonButton />
<SkeletonAvatar />
<SkeletonText lines={5} />

// Custom skeleton layout
<div className="space-y-4">
  <Skeleton className="h-12 w-12 rounded-full" />
  <Skeleton className="h-4 w-3/4" />
  <Skeleton className="h-4 w-1/2" />
</div>
```

#### Testimonial
Creator testimonials with glassmorphic design.

```tsx
import { Testimonial, TestimonialGrid } from '@/components/ui/Testimonial'

// Single testimonial
<Testimonial
  quote="FrankX.AI transformed how I create music with AI. The results are incredible!"
  author={{
    name: "Sarah Chen",
    role: "Music Producer",
    company: "Frequency Labs",
    avatar: "/avatars/sarah.jpg"
  }}
  rating={5}
  beforeAfter={{
    before: "Struggled to create consistent AI music",
    after: "Released 50+ AI-generated tracks"
  }}
  featured
/>

// Testimonial grid
<TestimonialGrid
  testimonials={[
    {
      quote: "Amazing platform!",
      author: { name: "John", role: "Creator" },
      rating: 5,
    },
    {
      quote: "Life-changing tools.",
      author: { name: "Maria", role: "Artist" },
      rating: 5,
    },
  ]}
  columns={3}
/>
```

---

## 🎨 Styling Guidelines

All components use the glassmorphic design system:

```tsx
// Background
bg-white/5 backdrop-blur-sm

// Border
border border-white/10

// Hover
hover:border-white/20 hover:bg-white/10

// Focus (emerald for tech, amber for soul)
focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50

// Error states
border-red-500/50 text-red-400

// Success states
border-emerald-500/30 text-emerald-400
```

---

## ♿ Accessibility

All components follow WCAG AAA standards:
- Proper ARIA labels
- Keyboard navigation
- Focus management
- Screen reader support
- Touch-friendly (44px minimum touch targets)
- Reduced motion support

---

## 🧪 Testing

All components have comprehensive test coverage:

```bash
# Run tests
npm test

# Run tests in watch mode
npm test:watch

# Run coverage
npm test:coverage
```

See test files in `/tests/components/` for examples.

---

## 📚 Next Steps

1. **Add more form components**: DatePicker, FileUpload, MultiSelect
2. **Set up Storybook**: Interactive component documentation
3. **Visual regression testing**: Chromatic or Percy
4. **Add more variants**: Size variants (sm, md, lg, xl)
5. **Animation presets**: More motion variants

---

## 💡 Usage Tips

### Form Validation
Use Zod for type-safe validation:

```bash
npm install zod @hookform/resolvers
```

### Toast Best Practices
- Use `toast.success` for completed actions
- Use `toast.promise` for async operations
- Keep messages short (< 50 characters)
- Use action buttons sparingly

### Accessibility
- Always provide labels for form fields
- Use semantic HTML
- Test with keyboard navigation
- Test with screen readers

---

## 🚀 Performance

All components are optimized for performance:
- Lazy loading for modals
- Virtualized lists (use with large datasets)
- Optimized animations (GPU-accelerated)
- Tree-shaking enabled

---

For questions or issues, see the [State-of-the-Art Roadmap](../../docs/STATE_OF_ART_ROADMAP.md).
