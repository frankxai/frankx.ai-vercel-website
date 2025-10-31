# FrankX.AI Component Library Specifications
## Developer Implementation Guide with Code Examples

---

## TABLE OF CONTENTS

1. Component Architecture Overview
2. Base UI Components
3. Section Components
4. Layout Components
5. Animation Variants
6. Utility Functions
7. Implementation Examples
8. Accessibility Patterns

---

## 1. COMPONENT ARCHITECTURE OVERVIEW

### 1.1 Design System Integration

```typescript
// Design tokens from Tailwind config
const theme = {
  colors: {
    brand: {
      purple: '#6B46C1',
      blue: '#00D4FF',
      gold: '#FFD700',
      charcoal: '#1A1A2E',
      white: '#F7F7F7',
    },
    products: {
      primary: '#00D4FF',
      secondary: '#8B5FBF',
      accent: '#00FFE0',
    },
    communities: {
      primary: '#6B46C1',
      secondary: '#FFD700',
    },
    platforms: {
      primary: '#1A1A2E',
      secondary: '#00D4FF',
    },
  },
  spacing: {
    '1': '4px',
    '2': '8px',
    '3': '12px',
    '4': '16px',
    '6': '24px',
    '8': '32px',
    // ... etc
  },
};
```

### 1.2 Component Hierarchy

```
/components
  /ui (Atomic components)
    ├─ Button.tsx
    ├─ Card.tsx
    ├─ Input.tsx
    ├─ Badge.tsx
    ├─ Modal.tsx
    └─ Dropdown.tsx

  /sections (Page sections)
    ├─ Hero.tsx
    ├─ SocialProof.tsx
    ├─ Philosophy.tsx
    ├─ Products.tsx
    ├─ Communities.tsx
    ├─ Platforms.tsx
    ├─ Resources.tsx
    ├─ BlogPreview.tsx
    └─ FinalCTA.tsx

  /layouts (Persistent elements)
    ├─ Navigation.tsx
    ├─ MegaMenu.tsx
    ├─ MobileMenu.tsx
    └─ Footer.tsx

  /animations (Framer Motion variants)
    ├─ variants.ts
    └─ hooks.ts
```

---

## 2. BASE UI COMPONENTS

### 2.1 Button Component

```tsx
// components/ui/Button.tsx
import { motion } from 'framer-motion';
import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-gradient-to-r from-brand-purple to-brand-purple-light text-white shadow-purple hover:shadow-purple-lg hover:-translate-y-0.5 focus:ring-brand-purple/30',
    secondary: 'border-2 border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white focus:ring-brand-purple/30',
    ghost: 'text-brand-charcoal relative hover:text-brand-purple after:absolute after:bottom-2 after:left-6 after:right-6 after:h-0.5 after:bg-brand-purple after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-8 py-4 text-base',
    lg: 'px-10 py-5 text-lg',
  };

  return (
    <motion.button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <LoadingSpinner className="mr-2" />
      ) : leftIcon ? (
        <span className="mr-2">{leftIcon}</span>
      ) : null}

      {children}

      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </motion.button>
  );
};

// Loading spinner component
const LoadingSpinner = ({ className = '' }) => (
  <svg
    className={`animate-spin h-5 w-5 ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);
```

**Usage Examples:**

```tsx
// Primary CTA
<Button variant="primary" size="lg">
  Start Creating →
</Button>

// Secondary action
<Button variant="secondary" size="md">
  Learn More
</Button>

// Ghost link-style
<Button variant="ghost" size="sm">
  Explore Communities
</Button>

// With icon
<Button variant="primary" rightIcon={<ArrowRight />}>
  Join Now
</Button>

// Loading state
<Button variant="primary" isLoading>
  Submitting...
</Button>
```

### 2.2 Card Component

```tsx
// components/ui/Card.tsx
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export interface CardProps {
  variant?: 'product' | 'community' | 'platform' | 'default';
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  isHoverable?: boolean;
}

export const Card = ({
  variant = 'default',
  children,
  className = '',
  onClick,
  isHoverable = true,
}: CardProps) => {
  const baseStyles = 'bg-white rounded-3xl p-8 shadow-md transition-all duration-400 border overflow-hidden relative';

  const variants = {
    product: 'border-products-primary/20 hover:shadow-blue-lg',
    community: 'border-communities-primary/15 hover:shadow-purple-lg',
    platform: 'bg-brand-charcoal border-platforms-secondary/30 text-white',
    default: 'border-gray-200 hover:shadow-lg',
  };

  const hoverStyles = isHoverable ? 'hover:-translate-y-2 cursor-pointer' : '';

  return (
    <motion.div
      className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${className}`}
      onClick={onClick}
      whileHover={isHoverable ? { y: -8 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Top accent bar (appears on hover) */}
      <motion.div
        className={`absolute top-0 left-0 right-0 h-1 ${
          variant === 'product' ? 'bg-gradient-to-r from-products-primary to-products-accent' :
          variant === 'community' ? 'bg-gradient-to-r from-communities-primary to-communities-secondary' :
          variant === 'platform' ? 'bg-gradient-to-r from-platforms-secondary to-products-primary' :
          'bg-gradient-to-r from-brand-purple to-brand-blue'
        }`}
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />

      {children}
    </motion.div>
  );
};

// Sub-components
export const CardIcon = ({ icon, variant = 'default' }: { icon: ReactNode; variant?: CardProps['variant'] }) => {
  const bgColors = {
    product: 'bg-products-primary/10',
    community: 'bg-communities-primary/10',
    platform: 'bg-platforms-secondary/20',
    default: 'bg-gray-100',
  };

  return (
    <div className={`w-16 h-16 rounded-2xl ${bgColors[variant || 'default']} flex items-center justify-center mb-5 relative`}>
      {icon}
    </div>
  );
};

export const CardTitle = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <h3 className={`text-2xl font-bold font-heading mb-3 ${className}`}>
    {children}
  </h3>
);

export const CardDescription = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <p className={`text-base leading-relaxed text-gray-600 mb-4 ${className}`}>
    {children}
  </p>
);

export const CardFeatureList = ({ features }: { features: string[] }) => (
  <ul className="space-y-2 mb-6">
    {features.map((feature, index) => (
      <li key={index} className="flex items-start text-sm">
        <CheckIcon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
        <span>{feature}</span>
      </li>
    ))}
  </ul>
);

export const CardFooter = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`mt-auto pt-4 border-t border-gray-100 ${className}`}>
    {children}
  </div>
);

// Icon components (replace with actual icon library)
const CheckIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);
```

**Usage Example:**

```tsx
<Card variant="product">
  <CardIcon
    icon={<CircuitBoardIcon />}
    variant="product"
  />
  <CardTitle>Vibe OS</CardTitle>
  <CardDescription>
    Your personal operating system for life design and productivity
  </CardDescription>
  <CardFeatureList
    features={[
      'Daily rituals and routines',
      'Goal tracking system',
      'Habit formation tools',
      'Reflection prompts',
    ]}
  />
  <CardFooter>
    <Button variant="secondary" size="sm">
      Learn More →
    </Button>
  </CardFooter>
</Card>
```

### 2.3 Input Component

```tsx
// components/ui/Input.tsx
import { InputHTMLAttributes, forwardRef, ReactNode } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, rightIcon, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            className={`
              w-full h-14 px-5 ${leftIcon ? 'pl-12' : ''} ${rightIcon ? 'pr-12' : ''}
              border-2 rounded-xl
              text-base
              transition-all duration-300
              ${error
                ? 'border-red-500 focus:border-red-600 focus:ring-4 focus:ring-red-500/10'
                : 'border-gray-200 focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/10'
              }
              disabled:bg-gray-50 disabled:cursor-not-allowed
              ${className}
            `}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              error ? `${props.id}-error` : helperText ? `${props.id}-helper` : undefined
            }
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p id={`${props.id}-error`} className="mt-2 text-sm text-red-600 flex items-center">
            <AlertIcon className="w-4 h-4 mr-1" />
            {error}
          </p>
        )}

        {helperText && !error && (
          <p id={`${props.id}-helper`} className="mt-2 text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

const AlertIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
  </svg>
);
```

**Usage Example:**

```tsx
<Input
  id="email"
  type="email"
  label="Email Address"
  placeholder="you@example.com"
  required
  leftIcon={<EmailIcon />}
  helperText="We'll never share your email."
/>

<Input
  id="search"
  type="search"
  placeholder="Search..."
  leftIcon={<SearchIcon />}
/>

<Input
  id="password"
  type="password"
  label="Password"
  error="Password must be at least 8 characters"
/>
```

### 2.4 Badge Component

```tsx
// components/ui/Badge.tsx
import { ReactNode } from 'react';

export interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'purple' | 'blue' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}: BadgeProps) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full';

  const variants = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    purple: 'bg-brand-purple/10 text-brand-purple',
    blue: 'bg-products-primary/10 text-products-primary',
    gold: 'bg-communities-secondary/10 text-communities-secondary',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
};
```

**Usage Examples:**

```tsx
<Badge variant="purple">New</Badge>
<Badge variant="success">Active</Badge>
<Badge variant="gold" size="lg">Premium</Badge>
```

---

## 3. SECTION COMPONENTS

### 3.1 Hero Section

```tsx
// components/sections/Hero.tsx
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ConstellationBackground } from '@/components/animations/ConstellationBackground';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30">
      {/* Animated background */}
      <ConstellationBackground />

      <div className="container mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left column: Text content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Headline */}
          <motion.h1
            className="text-6xl lg:text-7xl font-bold font-heading leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent">
              Empowering Generative Creators
            </span>
            <br />
            Through Soul-Aligned AI
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-xl text-gray-600 mb-6 max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Transform your creative vision into reality with AI-powered tools,
            enterprise expertise, and conscious community.
          </motion.p>

          {/* Tagline */}
          <motion.p
            className="text-lg font-accent italic text-brand-gold border-l-4 border-brand-gold pl-5 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Oracle AI Architect turned AI Music Creator
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Button variant="primary" size="lg">
              Start Creating →
            </Button>
            <Button variant="secondary" size="lg">
              Explore Communities
            </Button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="mt-16 flex items-center text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              ↓
            </motion.div>
            <span className="ml-2">Scroll to explore</span>
          </motion.div>
        </motion.div>

        {/* Right column: Visual */}
        <motion.div
          className="relative lg:h-[600px]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          {/* Placeholder for 3D illustration or Lottie animation */}
          <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-3xl flex items-center justify-center">
            <p className="text-gray-400">[Hero Visual: Constellation + Waveform + AI Nodes Animation]</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
```

### 3.2 Products Section

```tsx
// components/sections/Products.tsx
import { motion } from 'framer-motion';
import { Card, CardIcon, CardTitle, CardDescription, CardFeatureList, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const products = [
  {
    id: 'vibe-os',
    icon: '🎯',
    title: 'Vibe OS',
    description: 'Your personal operating system for life design and productivity',
    features: [
      'Daily rituals and routines',
      'Goal tracking system',
      'Habit formation tools',
      'Reflection prompts',
    ],
    price: 'FREE',
    badge: 'Popular',
  },
  {
    id: 'gen-creator-os',
    icon: '⚡',
    title: 'Gen Creator OS',
    description: 'End-to-end workflow automation for content creators and generative artists',
    features: [
      'AI workflow builder',
      'Content pipelines',
      'Publishing automation',
      'Asset management',
    ],
    price: '$29/month',
    badge: 'New',
  },
  {
    id: 'agentic-creator-os',
    icon: '🤖',
    title: 'Agentic Creator OS',
    description: 'Advanced multi-agent orchestration for enterprise creators',
    features: [
      'Agent team management',
      'Complex automation',
      'API integrations',
      'Enterprise support',
    ],
    price: '$99/month',
    badge: 'Pro',
  },
];

export const Products = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-blue-50/20 to-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        {/* Circuit board pattern SVG */}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm uppercase tracking-wider text-products-primary font-semibold mb-3">
            PRODUCTS
          </p>
          <h2 className="text-5xl font-bold font-heading mb-4">
            Intelligent Operating Systems for Creators
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From personal productivity to advanced agentic workflows,
            build your creative empire with purpose-built systems.
          </p>
        </motion.div>

        {/* Product cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
            >
              <Card variant="product">
                {product.badge && (
                  <div className="absolute top-6 right-6">
                    <Badge variant="blue">{product.badge}</Badge>
                  </div>
                )}

                <CardIcon
                  icon={<span className="text-3xl">{product.icon}</span>}
                  variant="product"
                />

                <CardTitle>{product.title}</CardTitle>
                <CardDescription>{product.description}</CardDescription>

                <CardFeatureList features={product.features} />

                <CardFooter className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-brand-gold">
                    {product.price}
                  </span>
                  <Button variant="secondary" size="sm">
                    Learn More →
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View all link */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Button variant="ghost">
            View All Products →
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
```

### 3.3 Communities Section

```tsx
// components/sections/Communities.tsx
import { motion } from 'framer-motion';
import { Card, CardIcon, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const communities = [
  {
    id: 'starlight-hub',
    icon: '⭐',
    title: 'Starlight Hub',
    description: 'Intelligence and consciousness community for awakened creators',
    stats: ['2,500+ members', 'Daily discussions'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'ai-academy',
    icon: '📚',
    title: 'AI Academy',
    description: 'Master AI fundamentals from prompting to deployment',
    stats: ['5,000+ students', '40+ courses'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'ai-architect-academy',
    icon: '🏢',
    title: 'AI Architect Academy',
    description: 'Enterprise AI architecture and Oracle AI expertise',
    stats: ['500+ architects', 'Enterprise tools'],
    color: 'from-gray-700 to-gray-900',
  },
  {
    id: 'ai-music-academy',
    icon: '🎵',
    title: 'AI Music Academy',
    description: 'Create chart-topping music with AI-powered tools and techniques',
    stats: ['3,000+ musicians', 'Weekly workshops'],
    color: 'from-purple-500 to-blue-500',
  },
  {
    id: 'velora',
    icon: '🔮',
    title: 'Velora',
    description: '[Description needed for Velora community]',
    stats: ['[Stats needed]', '[Stats needed]'],
    color: 'from-pink-500 to-purple-500',
  },
  {
    id: 'arcanea',
    icon: '🎨',
    title: 'Arcanea',
    description: 'Creative AI suite with Luminor agents and 6 academies',
    stats: ['1,000+ creators', '6 AI academies'],
    color: 'from-indigo-500 via-purple-500 to-pink-500',
  },
];

export const Communities = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-purple-50/20 to-white relative">
      {/* Constellation background pattern */}
      <ConstellationPattern />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm uppercase tracking-wider text-brand-purple font-semibold mb-3">
            COMMUNITIES
          </p>
          <h2 className="text-5xl font-bold font-heading mb-4">
            Learn. Create. Connect.
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thriving communities of creators, architects, and seekers
            pushing the boundaries of AI and consciousness.
          </p>
        </motion.div>

        {/* Community cards - 2x3 grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {communities.map((community, index) => (
            <motion.div
              key={community.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Card variant="community" className="h-full">
                {/* Icon with gradient background */}
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${community.color} flex items-center justify-center mb-6 shadow-lg`}>
                  <span className="text-4xl">{community.icon}</span>
                </div>

                <CardTitle className="text-brand-purple">
                  {community.title}
                </CardTitle>

                <CardDescription>
                  {community.description}
                </CardDescription>

                {/* Stats */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {community.stats.map((stat, i) => (
                    <div key={i} className="flex items-center text-sm text-gray-600">
                      <span className="mr-1">{i === 0 ? '🌟' : '💬'}</span>
                      {stat}
                    </div>
                  ))}
                </div>

                <Button variant="primary" size="sm" className="w-full">
                  Join Community →
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Constellation pattern component (simplified)
const ConstellationPattern = () => (
  <div className="absolute inset-0 opacity-10">
    {/* SVG constellation pattern */}
  </div>
);
```

---

## 4. LAYOUT COMPONENTS

### 4.1 Navigation Component

```tsx
// components/layouts/Navigation.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { MegaMenu } from './MegaMenu';
import { MobileMenu } from './MobileMenu';

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md'
            : 'bg-white/70 backdrop-blur-sm'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent">
                FRANKX.AI
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link href="/blog" className="nav-link">
                Blog
              </Link>
              <Link href="/resources" className="nav-link">
                Resources
              </Link>

              {/* Mega menu triggers */}
              <div
                className="relative"
                onMouseEnter={() => setActiveMegaMenu('products')}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <button className="nav-link flex items-center">
                  Products
                  <ChevronDown className="ml-1 w-4 h-4" />
                </button>
                {activeMegaMenu === 'products' && (
                  <MegaMenu type="products" />
                )}
              </div>

              <div
                className="relative"
                onMouseEnter={() => setActiveMegaMenu('communities')}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <button className="nav-link flex items-center">
                  Communities
                  <ChevronDown className="ml-1 w-4 h-4" />
                </button>
                {activeMegaMenu === 'communities' && (
                  <MegaMenu type="communities" />
                )}
              </div>

              <div
                className="relative"
                onMouseEnter={() => setActiveMegaMenu('platforms')}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <button className="nav-link flex items-center">
                  Platforms
                  <ChevronDown className="ml-1 w-4 h-4" />
                </button>
                {activeMegaMenu === 'platforms' && (
                  <MegaMenu type="platforms" />
                )}
              </div>
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Button variant="primary" size="sm">
                Contact
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};

// Icon components
const ChevronDown = ({ className }: { className: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const MenuIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);
```

### 4.2 MegaMenu Component

```tsx
// components/layouts/MegaMenu.tsx
import { motion } from 'framer-motion';
import Link from 'next/link';

interface MegaMenuProps {
  type: 'products' | 'communities' | 'platforms';
}

const menuContent = {
  products: {
    title: 'PRODUCTS - Intelligent Operating Systems',
    items: [
      {
        id: 'vibe-os',
        title: 'Vibe OS',
        description: 'Personal operating system for creators',
        icon: '🎯',
        href: '/products/vibe-os',
      },
      {
        id: 'gen-creator-os',
        title: 'Gen Creator OS',
        description: 'Generative workflow system',
        icon: '⚡',
        href: '/products/gen-creator-os',
      },
      {
        id: 'agentic-creator-os',
        title: 'Agentic Creator OS',
        description: 'Advanced automation',
        icon: '🤖',
        href: '/products/agentic-creator-os',
      },
    ],
  },
  communities: {
    title: 'COMMUNITIES - Learn, Create, Connect',
    items: [
      {
        id: 'starlight-hub',
        title: 'Starlight Hub',
        description: 'Intelligence & consciousness',
        icon: '⭐',
        href: '/communities/starlight-hub',
      },
      {
        id: 'ai-academy',
        title: 'AI Academy',
        description: 'AI fundamentals',
        icon: '📚',
        href: '/communities/ai-academy',
      },
      {
        id: 'ai-architect-academy',
        title: 'AI Architect Academy',
        description: 'Enterprise architecture',
        icon: '🏢',
        href: '/communities/ai-architect-academy',
      },
      {
        id: 'ai-music-academy',
        title: 'AI Music Academy',
        description: 'AI music production',
        icon: '🎵',
        href: '/communities/ai-music-academy',
      },
      {
        id: 'velora',
        title: 'Velora',
        description: 'Community description',
        icon: '🔮',
        href: '/communities/velora',
      },
      {
        id: 'arcanea',
        title: 'Arcanea',
        description: 'Creative AI suite',
        icon: '🎨',
        href: '/communities/arcanea',
      },
    ],
  },
  platforms: {
    title: 'PLATFORMS - Developer & Intelligence Infrastructure',
    items: [
      {
        id: 'arcanea-studio',
        title: 'Arcanea Studio',
        description: 'Developer portal and API platform',
        icon: '💻',
        href: '/platforms/arcanea-studio',
      },
      {
        id: 'starlight-studio',
        title: 'Starlight Intelligence Studio',
        description: 'Intelligence platform',
        icon: '🧠',
        href: '/platforms/starlight-intelligence-studio',
      },
    ],
  },
};

export const MegaMenu = ({ type }: MegaMenuProps) => {
  const content = menuContent[type];

  return (
    <motion.div
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-screen max-w-4xl"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
        <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-6">
          {content.title}
        </p>

        <div className={`grid ${type === 'platforms' ? 'grid-cols-2' : 'grid-cols-3'} gap-4`}>
          {content.items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group p-4 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start">
                <span className="text-2xl mr-3">{item.icon}</span>
                <div>
                  <h4 className="font-semibold text-gray-900 group-hover:text-brand-purple transition-colors mb-1">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {item.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100">
          <Link
            href={`/${type}`}
            className="text-sm text-brand-purple hover:text-brand-blue font-semibold"
          >
            → View All {type.charAt(0).toUpperCase() + type.slice(1)}
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
```

---

## 5. ANIMATION VARIANTS

### 5.1 Common Animation Variants

```typescript
// components/animations/variants.ts
import { Variants } from 'framer-motion';

// Fade in + slide up (most common)
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

// Fade in + slide from left
export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

// Fade in + slide from right
export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

// Scale in (for icons, images)
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.34, 1.56, 0.64, 1], // Back easing
    },
  },
};

// Stagger container (for lists)
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Stagger item
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

// Card hover effect
export const cardHover: Variants = {
  rest: {
    y: 0,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  },
  hover: {
    y: -8,
    boxShadow: '0 16px 48px rgba(107, 70, 193, 0.15)',
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

// Button ripple effect
export const buttonRipple: Variants = {
  initial: {
    scale: 0,
    opacity: 0.5,
  },
  animate: {
    scale: 2,
    opacity: 0,
    transition: {
      duration: 0.6,
    },
  },
};
```

### 5.2 Custom Hooks for Animations

```typescript
// components/animations/hooks.ts
import { useEffect, useState } from 'react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

// Scroll reveal hook
export const useScrollReveal = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return { ref, isInView };
};

// Parallax scroll hook
export const useParallax = (speed: number = 0.5) => {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.pageYOffset * speed);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return offsetY;
};

// Reduced motion preference
export const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
};
```

**Usage Example:**

```tsx
import { motion } from 'framer-motion';
import { useScrollReveal, usePrefersReducedMotion } from '@/components/animations/hooks';
import { fadeInUp } from '@/components/animations/variants';

export const SomeSection = () => {
  const { ref, isInView } = useScrollReveal();
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={prefersReducedMotion ? {} : fadeInUp}
    >
      <h2>Content appears when scrolled into view</h2>
    </motion.section>
  );
};
```

---

## 6. ACCESSIBILITY PATTERNS

### 6.1 Skip to Content Link

```tsx
// components/layouts/SkipToContent.tsx
export const SkipToContent = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-brand-purple focus:text-white focus:rounded-lg focus:shadow-lg"
    >
      Skip to main content
    </a>
  );
};

// In layout.tsx or main navigation
<SkipToContent />
<Navigation />
<main id="main-content">
  {children}
</main>
```

### 6.2 Focus Management

```tsx
// utils/focus.ts
export const trapFocus = (element: HTMLElement) => {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

  const handleTab = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  };

  element.addEventListener('keydown', handleTab);

  return () => {
    element.removeEventListener('keydown', handleTab);
  };
};
```

### 6.3 ARIA Live Regions

```tsx
// components/ui/LiveRegion.tsx
export const LiveRegion = ({ message, type = 'polite' }: { message: string; type?: 'polite' | 'assertive' }) => {
  return (
    <div
      role="status"
      aria-live={type}
      aria-atomic="true"
      className="sr-only"
    >
      {message}
    </div>
  );
};

// Usage example (form submission)
const [liveMessage, setLiveMessage] = useState('');

const handleSubmit = async () => {
  setLiveMessage('Submitting form...');
  // ... submit logic
  setLiveMessage('Form submitted successfully!');
};

return (
  <>
    <form onSubmit={handleSubmit}>
      {/* form fields */}
    </form>
    <LiveRegion message={liveMessage} />
  </>
);
```

---

## 7. IMPLEMENTATION EXAMPLES

### 7.1 Complete Page Example

```tsx
// app/page.tsx (Homepage)
import { Navigation } from '@/components/layouts/Navigation';
import { Footer } from '@/components/layouts/Footer';
import { Hero } from '@/components/sections/Hero';
import { SocialProof } from '@/components/sections/SocialProof';
import { Philosophy } from '@/components/sections/Philosophy';
import { Products } from '@/components/sections/Products';
import { Communities } from '@/components/sections/Communities';
import { Platforms } from '@/components/sections/Platforms';
import { Resources } from '@/components/sections/Resources';
import { BlogPreview } from '@/components/sections/BlogPreview';
import { FinalCTA } from '@/components/sections/FinalCTA';

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <Hero />
        <SocialProof />
        <Philosophy />
        <Products />
        <Communities />
        <Platforms />
        <Resources />
        <BlogPreview />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
```

### 7.2 Tailwind Config

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: '#6B46C1',
          'purple-light': '#8B5FBF',
          'purple-dark': '#4A2C7B',
          blue: '#00D4FF',
          cyan: '#00FFE0',
          gold: '#FFD700',
          charcoal: '#1A1A2E',
          'charcoal-light': '#2A2A3E',
          white: '#F7F7F7',
        },
        products: {
          primary: '#00D4FF',
          secondary: '#8B5FBF',
          accent: '#00FFE0',
        },
        communities: {
          primary: '#6B46C1',
          secondary: '#FFD700',
        },
        platforms: {
          primary: '#1A1A2E',
          secondary: '#00D4FF',
        },
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        accent: ['Playfair Display', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      boxShadow: {
        'purple': '0 4px 16px rgba(107, 70, 193, 0.3)',
        'purple-lg': '0 8px 24px rgba(107, 70, 193, 0.4)',
        'blue': '0 4px 16px rgba(0, 212, 255, 0.3)',
        'blue-lg': '0 16px 48px rgba(0, 212, 255, 0.15)',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
```

### 7.3 Global CSS

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  /* Import fonts */
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Inter:wght@400;500;600&family=Playfair+Display:ital,wght@0,600;1,600&display=swap');

  /* Root variables */
  :root {
    --space-unit: 4px;
  }

  /* Smooth scrolling */
  html {
    scroll-behavior: smooth;
  }

  /* Respect reduced motion */
  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }

    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  /* Base typography */
  body {
    @apply font-body text-gray-900 antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-heading font-bold;
  }
}

@layer components {
  /* Navigation link styles */
  .nav-link {
    @apply text-gray-700 hover:text-brand-purple transition-colors duration-300 font-medium text-sm;
  }

  /* Focus visible styles (better than default) */
  *:focus-visible {
    @apply outline-none ring-4 ring-brand-purple/30 ring-offset-2;
  }

  /* Screen reader only (accessible but hidden) */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  .sr-only.focus:not(:focus):not(:focus-within) {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
}

@layer utilities {
  /* Text gradient utility */
  .text-gradient-purple-blue {
    @apply bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent;
  }

  /* Container utility (if not using Tailwind's built-in) */
  .container {
    @apply max-w-7xl mx-auto px-6;
  }
}
```

---

## 8. FINAL NOTES FOR DEVELOPERS

### 8.1 Implementation Checklist

**Before Starting:**
- [ ] Review all three documents (Design System, Landing Page Architecture, Strategic Recommendations)
- [ ] Set up Next.js 14+ project with App Router
- [ ] Install dependencies (Tailwind, Framer Motion, Radix UI, React Hook Form)
- [ ] Configure Tailwind with design tokens
- [ ] Set up ESLint and Prettier for code quality

**Phase 1 (MVP):**
- [ ] Build component library (buttons, cards, inputs)
- [ ] Implement navigation (desktop + mobile)
- [ ] Build all homepage sections
- [ ] Add animations (scroll reveals, hovers)
- [ ] Optimize images and assets
- [ ] Accessibility audit (keyboard nav, screen readers)
- [ ] Performance testing (Lighthouse 90+)
- [ ] Cross-browser testing

**Phase 2 (Content):**
- [ ] Build detail pages (products, communities, platforms)
- [ ] Integrate CMS (Sanity or Contentful)
- [ ] Set up blog infrastructure
- [ ] Add search functionality
- [ ] Email signup integration
- [ ] Analytics implementation

**Phase 3 (Advanced):**
- [ ] User authentication
- [ ] Interactive demos
- [ ] A/B testing infrastructure
- [ ] Marketing automation
- [ ] Community features

### 8.2 Performance Optimization Tips

1. **Image Optimization:**
   - Use next/image for automatic optimization
   - WebP format with JPEG fallback
   - Lazy load below-fold images

2. **Code Splitting:**
   - Lazy load heavy components
   - Dynamic imports for animations
   - Separate vendor bundles

3. **Font Loading:**
   - Use next/font for optimized font loading
   - Preload critical fonts
   - Font subsetting (Latin only)

4. **Animation Performance:**
   - Use CSS transforms (not margin/padding)
   - Use will-change sparingly
   - Disable complex animations on low-end devices

### 8.3 Testing Strategy

**Unit Tests:**
- Test utility functions
- Test component rendering
- Test form validation logic

**Integration Tests:**
- Test navigation flows
- Test form submissions
- Test search functionality

**E2E Tests:**
- Test critical user journeys
- Test conversion funnels
- Test across browsers

**Accessibility Tests:**
- Automated: Axe, Lighthouse
- Manual: Screen reader testing
- Keyboard navigation testing

### 8.4 Deployment

**Recommended Platform: Vercel**
- Automatic deployments from Git
- Preview deployments for PRs
- Edge network (fast globally)
- Built-in analytics
- Easy environment variables

**Pre-deployment:**
- Run production build locally
- Check for console errors
- Verify all links work
- Test on real devices
- Run Lighthouse audit

---

**END OF COMPONENT SPECIFICATIONS DOCUMENT**

This comprehensive guide provides everything developers need to implement the FrankX.AI design system and landing page with high-quality, accessible, and performant code.
