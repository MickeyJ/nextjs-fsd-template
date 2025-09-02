# Next.js Super Template: Enterprise-Grade Full-Stack Architecture

A comprehensive guide to building a production-ready Next.js 15 application with Feature-Sliced Design architecture, Payload CMS 3.0, and modern development practices.

## Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Project Setup](#project-setup)
4. [Architecture: Feature-Sliced Design](#architecture-feature-sliced-design)
5. [Configuration Files](#configuration-files)
6. [Development Scripts](#development-scripts)
7. [Testing Infrastructure](#testing-infrastructure)
8. [Payload CMS Integration](#payload-cms-integration)
9. [Styling with Tailwind CSS 4.0](#styling-with-tailwind-css-40)
10. [Animation Strategy](#animation-strategy)
11. [Code Quality & Linting](#code-quality--linting)
12. [Image Optimization](#image-optimization)
13. [Project Structure](#project-structure)
14. [Environment Variables](#environment-variables)
15. [Deployment](#deployment)

## Overview

This template provides a battle-tested architecture for building scalable Next.js applications with:

- **Feature-Sliced Design (FSD)** for maintainable architecture
- **Payload CMS 3.0** for headless content management
- **TypeScript strict mode** for type safety
- **Tailwind CSS 4.0** with design tokens
- **Comprehensive testing** with Vitest
- **Automated workflows** with Husky and lint-staged

## Tech Stack

```json
{
  "framework": "Next.js 15.4.6",
  "runtime": "React 19.1.0",
  "language": "TypeScript 5.x",
  "cms": "Payload CMS 3.52.0",
  "database": "PostgreSQL (via Neon)",
  "styling": "Tailwind CSS 4.0",
  "animation": "Framer Motion (motion) + GSAP",
  "testing": "Vitest + React Testing Library",
  "deployment": "Vercel"
}
```

## Project Setup

### 1. Initialize Project

```bash
# Create new project directory
npx create-next-app@latest . --typescript --tailwind --app
```

### 2. Install Dependencies

```bash
npm install \
  @payloadcms/db-postgres \
  @payloadcms/richtext-lexical \
  clsx \
  gsap \
  motion \
  payload \
  sharp \
  tailwind-merge \
  radix-ui \
  class-variance-authority


npm install -D \
  @testing-library/dom \
  @testing-library/jest-dom \
  @testing-library/react \
  @testing-library/user-event \
  @typescript-eslint/parser \
  @vitejs/plugin-react \
  dotenv \
  eslint-config-prettier \
  eslint-plugin-import \
  eslint-plugin-prettier \
  eslint-plugin-simple-import-sort \
  husky \
  jsdom \
  lint-staged \
  prettier \
  vite-tsconfig-paths \
  vitest
```

### 3. Add scripts to `package.json`

```json
"scripts": {
    "prebuild": "npm run optimize-images",
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage",
    "test:shared": "vitest run src/shared",
    "test:entities": "vitest run src/entities",
    "test:features": "vitest run src/features",
    "test:widgets": "vitest run src/widgets",
    "test:views": "vitest run src/views",
    "optimize-images": "npx tsx scripts/optimize-images.ts",
    "payload": "payload",
    "seed": "npx tsx seed/index.ts",
    "generate:types": "payload generate:types",
    "generate:graphql": "payload generate:graphql-schema",
    "prepare": "husky"
  },
```

## Architecture: Feature-Sliced Design

FSD is a modular architecture pattern that organizes code by business features and layers:

### Layer Structure

```
src/
├── app/                 # Application layer (Next.js app router)
│   ├── (website)/       # Public routes - main website
│   ├── (admin)/         # Admin app portal
│   ├── (client)/        # Client, Customer, Member app portal
│   └── (payload)/       # CMS admin routes
├── views/               # Page-level components
├── widgets/             # Complex composite UI blocks
├── features/            # Business logic features
├── entities/            # Domain models and their UI
└── shared/              # Reusable utilities and components
```

### Layer Rules

1. **Dependency flow**: App → Views → Widgets → Features → Entities → Shared
2. **No circular dependencies**: Lower layers cannot import from higher layers
3. **Slice isolation**: Slices within a layer should be independent
4. **Public API**: Each slice exports through an index file

### Example Feature Structure

```
src/features/contact-form/
├── api/                 # API interactions
│   └── send-contact.ts
├── model/               # Business logic
│   └── validation.ts
├── ui/                  # UI components
│   ├── ContactForm.tsx
│   └── ContactForm.test.tsx
└── index.ts             # Public exports
```

## Configuration Files

### TypeScript Configuration (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@payload-config": ["./payload.config.ts"],
      "@payload-types": ["./src/shared/types/payload/payload-types.ts"],
      "@/*": ["./src/*"],
      "@/app/*": ["./src/app/*"],
      "@/views/*": ["./src/views/*"],
      "@/features/*": ["./src/features/*"],
      "@/entities/*": ["./src/entities/*"],
      "@/shared/*": ["./src/shared/*"],
      "@/widgets/*": ["./src/widgets/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Next.js Configuration (`next.config.ts`)

```typescript
import { withPayload } from '@payloadcms/next/withPayload';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/api/media/**',
      },
      {
        protocol: 'https',
        hostname: 'yourdomain.com',
        pathname: '/api/media/**',
      },
    ],
  },
};

export default withPayload(nextConfig);
```

### ESLint Configuration (`eslint.config.mjs`)

```javascript
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
    plugins: ['next', 'prettier', 'simple-import-sort', 'import'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: './tsconfig.json',
      tsconfigRootDir: import.meta.dirname,
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
    rules: {
      'prettier/prettier': ['error'],
      'linebreak-style': 'off',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'warn',
    },
    ignorePatterns: ['.next/', 'node_modules/', 'build/', 'dist/', '.turbo/', '*.config.js', '*.config.mjs'],
  }),
];

export default eslintConfig;
```

### Prettier Configuration (`.prettierrc.json`)

```json
{
  "semi": true,
  "trailingComma": "all",
  "singleQuote": true,
  "printWidth": 120,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

### Vitest Configuration (`vitest.config.ts`)

```typescript
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/__test__/setup.ts'],
  },
});
```

### PostCSS Configuration (`postcss.config.mjs`)

```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

## Development Scripts

### Image Optimization Script (`scripts/optimize-images.ts`)

```typescript
// scripts/optimize-images.ts
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Icon size configurations for favicon
const iconSizes = {
  'favicon-16x16.png': 16,
  'favicon-32x32.png': 32,
  'favicon-48x48.png': 48,
  'apple-touch-icon.png': 180,
  'android-chrome-192x192.png': 192,
  'android-chrome-512x512.png': 512,
  'icon-192.png': 192,
  'icon-512.png': 512,
};

// Supported image extensions
const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'];

// Ensure directory exists
const ensureDir = (dirPath: string) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Generate favicon icons from source
const generateFaviconIcons = async (sourcePath: string, outputDir: string) => {
  console.log(`\n🎨 Generating favicon icons...`);
  console.log(`   Source: ${sourcePath}`);
  console.log(`   Output: ${outputDir}`);

  try {
    ensureDir(outputDir);
    const generatedFiles = [];

    // Load the source image
    const sourceBuffer = await sharp(sourcePath).toBuffer();

    // Generate each icon size
    for (const [filename, size] of Object.entries(iconSizes)) {
      console.log(`   Creating ${filename} (${size}x${size})...`);
      try {
        await sharp(sourceBuffer)
          .resize(size, size, {
            fit: 'contain',
            background: { r: 255, g: 255, b: 255, alpha: 0 },
          })
          .png()
          .toFile(path.join(outputDir, filename));
        generatedFiles.push(filename);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error(`   ⚠️  Failed to create ${filename}:`, err.message);
      }
    }

    // Special handling for favicon.ico (multi-size)
    console.log(`   Creating favicon.ico...`);
    try {
      const favicon32 = await sharp(sourceBuffer).resize(32, 32).png().toBuffer();
      fs.writeFileSync(path.join(outputDir, 'favicon.ico'), favicon32);
      generatedFiles.push('favicon.ico');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(`   ⚠️  Failed to create favicon.ico:`, err.message);
    }

    console.log(`✅ Generated ${generatedFiles.length} favicon icons`);
    return generatedFiles;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(`❌ Error generating favicon icons:`, error.message);
    throw error;
  }
};

// Optimize regular images
const optimizeImage = async (sourcePath: string, outputPath: string) => {
  const ext = path.extname(sourcePath).toLowerCase();
  const filename = path.basename(sourcePath);

  console.log(`   Optimizing ${filename}...`);

  try {
    const image = sharp(sourcePath);
    const metadata = await image.metadata();

    // Skip SVGs - just copy them
    if (ext === '.svg') {
      fs.copyFileSync(sourcePath, outputPath);
      return;
    }

    // Configure optimization based on format
    let optimized = image;

    // Resize if image is too large (max 2000px on longest side)
    if (metadata.width > 2000 || metadata.height > 2000) {
      optimized = optimized.resize(2000, 2000, {
        fit: 'inside',
        withoutEnlargement: true,
      });
    }

    // Apply format-specific optimizations
    switch (ext) {
      case '.jpg':
      case '.jpeg':
        await optimized.jpeg({ quality: 85, progressive: true }).toFile(outputPath);
        break;

      case '.png':
        await optimized.png({ quality: 90, compressionLevel: 9 }).toFile(outputPath);
        break;

      case '.webp':
        await optimized.webp({ quality: 85 }).toFile(outputPath);
        break;

      case '.gif':
        // For GIFs, just copy as Sharp doesn't handle animated GIFs well
        fs.copyFileSync(sourcePath, outputPath);
        break;

      default:
        // For unknown formats, try to convert to JPEG
        await optimized.jpeg({ quality: 85, progressive: true }).toFile(outputPath.replace(ext, '.jpg'));
    }

    console.log(`   ✅ Optimized ${filename}`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(`   ⚠️  Failed to optimize ${filename}:`, error.message);
  }
};

// Main function
const processImages = async () => {
  try {
    console.log('🚀 Starting image processing...\n');

    const assetsDir = './assets';
    const publicDir = './public';
    const iconsDir = './public/icons';

    // Check if assets directory exists
    if (!fs.existsSync(assetsDir)) {
      console.error(`❌ Assets directory not found: ${assetsDir}`);
      return;
    }

    // Ensure output directories exist
    ensureDir(publicDir);
    ensureDir(iconsDir);

    // Get all files in assets directory
    const files = fs.readdirSync(assetsDir);
    const imageFiles = files.filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return imageExtensions.includes(ext);
    });

    console.log(`Found ${imageFiles.length} images in ${assetsDir}\n`);

    // Process each image
    for (const file of imageFiles) {
      const sourcePath = path.join(assetsDir, file);

      // Check if it's the favicon
      if (file === 'favicon.png') {
        await generateFaviconIcons(sourcePath, iconsDir);
      } else {
        // Regular image optimization
        const outputPath = path.join(publicDir, file);
        await optimizeImage(sourcePath, outputPath);
      }
    }

    console.log('\n🎉 All images processed successfully!');
    console.log('\n📝 Results:');
    console.log('   - Optimized images are in /public');
    console.log('   - Favicon icons are in /public/icons');
  } catch (error) {
    console.error('\n❌ Failed to process images:', error);
  }
};

// Run it
processImages();
```

## Testing Infrastructure

### Test Setup File (`src/__test__/setup.ts`)

```typescript
// src/__test__/setup.ts
import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';
import React from 'react';
import { afterAll, afterEach, beforeAll, vi } from 'vitest';

// Cleanup after each test
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    pathname: '/',
    query: {},
    asPath: '/',
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
  useParams: () => ({}),
}));

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: vi.fn().mockImplementation((props: { src: string; alt: string }) => {
    return React.createElement('img', props);
  }),
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock scrollTo
window.scrollTo = vi.fn() as () => void;

// Setup global test timeout
vi.setConfig({ testTimeout: 10000 });

// Suppress console errors in tests (optional - remove if you want to see errors)
const originalError = console.error;
beforeAll(() => {
  console.error = (...args: Parameters<typeof console.error>) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning: ReactDOM.render') || args[0].includes('Warning: useLayoutEffect'))
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
```

### Testing Strategy by Layer

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage

# Layer-specific testing
npm run test:shared    # Target: 90%+ coverage
npm run test:entities  # Target: 80%+ coverage
npm run test:features  # Target: 70%+ coverage
npm run test:widgets   # Target: 60%+ coverage
npm run test:views     # E2E tests for critical paths
```

## Payload CMS Integration

### Payload Configuration (`payload.config.ts`)

```typescript
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { buildConfig } from 'payload';
import sharp from 'sharp';

// Collections from FSD entities layer
import Media from './src/entities/media/model/collection';
import Projects from './src/entities/project/model/collection';
import Users from './src/entities/user/model/collection';

export default buildConfig({
  admin: { user: 'users' },
  collections: [Users, Projects, Media],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve('src', 'shared', 'types', 'payload', 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
});
```

### Example Collection (`src/entities/user/model/collection.ts`)

```typescript
import type { CollectionConfig } from 'payload';

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Viewer', value: 'viewer' },
      ],
      defaultValue: 'viewer',
      required: true,
    },
  ],
};

export default Users;
```

### Example Media Collection (`src/entities/media/model/collection.ts`)

```typescript
import type { CollectionConfig } from 'payload';

const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 432,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
    },
  ],
};

export default Media;
```

### Type Generation

```bash
# Generate TypeScript types from Payload collections
npm run generate:types

# Generate GraphQL schema
npm run generate:graphql
```

## Styling with Tailwind CSS 4.0

### Main CSS File (`src/app/globals.css`)

```css
@import 'tailwindcss';

@theme {
  /* Custom theme tokens */
  --font-family-sans: 'Inter', system-ui, sans-serif;
  --font-family-mono: 'Fira Code', monospace;

  /* Custom colors */
  --color-primary: #2563eb;
  --color-secondary: #7c3aed;
  --color-accent: #f59e0b;

  /* Custom spacing */
  --spacing-section: 5rem;
  --spacing-container: 1.5rem;
}

@layer base {
  html {
    @apply antialiased;
  }

  body {
    @apply text-gray-900 bg-white;
  }
}

@layer utilities {
  .container {
    @apply mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl;
  }

  .section {
    @apply py-16 md:py-24 lg:py-32;
  }
}
```

## Animation Strategy

### Framer Motion Example

```typescript
// src/widgets/hero/ui/HeroSection.tsx
'use client';

import { motion } from 'motion/react';

export function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="section"
    >
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-4xl font-bold"
      >
        Welcome to Next.js Super Template
      </motion.h1>
    </motion.section>
  );
}
```

### GSAP Integration

```typescript
// src/shared/hooks/useGSAP.ts
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export function useGSAP(callback: () => void, deps: React.DependencyList = []) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      callback();
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, deps);

  return ref;
}
```

## Code Quality & Linting

### Husky Setup

```bash
# Initialize Husky
npx husky init

# Add pre-commit hook
echo "npx lint-staged" > .husky/pre-commit
```

### Lint-staged Configuration

Already configured in `package.json`:

```json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{js,jsx,json,css,md}": ["prettier --write"]
  }
}
```

## Project Structure

### Complete Directory Structure

```
my-nextjs-app/
├── .husky/                  # Git hooks
├── .next/                   # Next.js build output
├── assets/                  # Source images for optimization
├── media/                   # Uploaded media files
├── node_modules/
├── public/                  # Static files
│   └── icons/               # Generated favicons
├── scripts/                 # Build scripts
│   └── optimize-images.ts
├── seed/                    # Database seeding
│   └── index.ts
├── src/
│   ├── __test__/            # Test setup
│   │   └── setup.ts
│   ├── app/                 # Next.js app router
│   │   ├── (website)/     # Public routes
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── (admin)/      # Admin portal
│   │   │   └── design/
│   │   │       └── page.tsx
│   │   ├── (client)/      # Client portal
│   │   │   └── login/
│   │   │       └── page.tsx

│   │   ├── (payload)/       # CMS routes
│   │   │   ├── cms/
│   │   │   │   └── [[...segments]]/
│   │   │   │       └── page.tsx
│   │   │   └── api/
│   │   │       ├── [...slug]/
│   │   │       │   └── route.ts
│   │   │       └── graphql/
│   │   │           └── route.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── not-found.tsx
│   ├── entities/            # Domain models
│   │   ├── media/
│   │   │   ├── api/
│   │   │   ├── model/
│   │   │   │   └── collection.ts
│   │   │   ├── ui/
│   │   │   └── index.ts
│   │   ├── project/
│   │   │   ├── api/
│   │   │   ├── model/
│   │   │   │   └── collection.ts
│   │   │   ├── ui/
│   │   │   └── index.ts
│   │   └── user/
│   │       ├── api/
│   │       ├── model/
│   │       │   └── collection.ts
│   │       ├── ui/
│   │       └── index.ts
│   ├── features/            # Business features
│   │   └── contact-form/
│   │       ├── api/
│   │       │   └── send-contact.ts
│   │       ├── model/
│   │       │   └── validation.ts
│   │       ├── ui/
│   │       │   ├── ContactForm.tsx
│   │       │   └── ContactForm.test.tsx
│   │       └── index.ts
│   ├── shared/              # Shared utilities
│   │   ├── api/
│   │   ├── config/
│   │   ├── hooks/
│   │   ├── lib/
│   │   │   └── utils.ts
│   │   ├── types/
│   │   │   └── payload/
│   │   │       └── payload-types.ts
│   │   └── ui/
│   │       ├── button/
│   │       │   ├── Button.tsx
│   │       │   ├── Button.test.tsx
│   │       │   └── index.ts
│   │       └── index.ts
│   ├── views/               # Page components
│   │   ├── home/
│   │   │   ├── ui/
│   │   │   │   └── HomePage.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   └── widgets/             # Complex UI blocks
│       ├── header/
│       │   ├── ui/
│       │   │   ├── Header.tsx
│       │   │   └── Header.test.tsx
│       │   └── index.ts
│       ├── footer/
│       │   ├── ui/
│       │   │   └── Footer.tsx
│       │   └── index.ts
│       └── hero/
│           ├── ui/
│           │   └── HeroSection.tsx
│           └── index.ts
├── .env.local               # Local environment variables
├── .env.production          # Production environment variables
├── .gitignore
├── .prettierignore
├── .prettierrc.json
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── payload.config.ts
├── postcss.config.mjs
├── README.md
├── tsconfig.json
├── vercel.json
└── vitest.config.ts
```

## Environment Variables

### `.env.local`

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/myapp

# Payload CMS
PAYLOAD_SECRET=your-secret-key-min-32-chars

# Next.js
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

### `.env.production`

```bash
# Database (Neon)
DATABASE_URL=postgresql://user:password@ep-cool-darkness-123456.us-east-2.aws.neon.tech/myapp

# Payload CMS
PAYLOAD_SECRET=your-production-secret-key-min-32-chars

# Next.js
NEXT_PUBLIC_SERVER_URL=https://yourdomain.com
```

## Deployment

### Deployment Steps

1. **Push to GitHub**

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/your-repo.git
git branch -m main
git push -u origin main
```

2. **Deploy to Vercel**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

3. **Database Setup (Neon)**

- Create account at neon.tech
- Create new project
- Copy connection string to environment variables
- Run migrations: `npm run payload migrate`

## Best Practices

### 1. FSD Architecture Guidelines

- Keep layer dependencies unidirectional
- Export public API through index files
- Colocate tests with components
- Separate business logic from UI

### 2. TypeScript Best Practices

- Enable strict mode
- Use type inference where possible
- Avoid `any` type
- Define proper interfaces for props

### 3. Performance Optimization

- Use Next.js Image component
- Implement proper code splitting
- Optimize bundle size (<250KB initial JS)
- Target Core Web Vitals: LCP <2.5s, INP <200ms

### 4. Testing Strategy

- Write tests for critical user paths
- Mock external dependencies
- Use testing-library best practices
- Maintain coverage targets by layer

### 5. Code Quality

- Run linting before commits
- Use consistent formatting
- Follow naming conventions
- Document complex logic

## Common Commands Reference

```bash
# Development
npm run dev                  # Start dev server
npm run build                # Build for production
npm run start                # Start production server

# Code Quality
npm run lint                 # Check linting
npm run lint:fix             # Fix linting issues

# Testing
npm run test                 # Run all tests
npm run test:watch           # Watch mode
npm run test:coverage        # Coverage report

# Payload CMS
npm run generate:types       # Generate TypeScript types
npm run seed                 # Seed database

# Images
npm run optimize-images      # Optimize images

# Git Hooks
npm run prepare              # Setup Husky
```

## Troubleshooting

### Common Issues and Solutions

1. **TypeScript Errors**
   - Run `npm run generate:types` after changing Payload collections
   - Check path aliases in tsconfig.json

2. **Build Failures**
   - Clear .next folder: `rm -rf .next`
   - Clear node_modules: `rm -rf node_modules && npm install`

3. **Database Connection**
   - Verify DATABASE_URL format
   - Check network connectivity
   - Ensure SSL is configured for production

4. **Image Optimization**
   - Ensure Sharp is installed: `npm install sharp`
   - Check assets folder exists before running optimize script

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Payload CMS Documentation](https://payloadcms.com/docs)
- [Feature-Sliced Design](https://feature-sliced.design)
- [Tailwind CSS 4.0](https://tailwindcss.com)
- [Framer Motion](https://motion.dev)
- [Vitest](https://vitest.dev)

## License

MIT

---

This template provides a production-ready foundation for building scalable Next.js applications with modern best practices and enterprise-grade architecture.
