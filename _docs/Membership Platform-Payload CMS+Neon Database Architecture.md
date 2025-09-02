# Membership Platform: Payload CMS + Neon Database Architecture

## Overview

Building a Next.js membership management platform using Payload CMS for both content management AND user authentication, with Neon PostgreSQL as the single database.

## Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **CMS/Backend**: Payload CMS 3.0
- **Database**: Neon PostgreSQL (single database for everything)
- **Authentication**: Payload's built-in auth (no Supabase Auth needed)
- **Payments**: Stripe
- **File Storage**: Cloudflare R2 or S3

## Key Architecture Decision: One User System

Using a SINGLE Users collection in Payload that handles:

- CMS admin access
- Staff access
- Member authentication
- All user types determined by `role` field

## Database Structure (All in Neon)

```
Neon PostgreSQL Database
├── Payload-managed tables
│   ├── users (auth-enabled, handles all user types)
│   ├── events
│   ├── membership_types
│   ├── payments
│   ├── event_registrations
│   ├── media
│   └── pages
└── Custom tables (if needed via direct SQL)
```

## User Roles & Access

```typescript
role: 'admin'; // Full CMS access
role: 'staff'; // Limited CMS access
role: 'board'; // Board member privileges
role: 'member'; // Regular member (no CMS access)
role: 'guest'; // Limited access
```

## Setup Steps

### 1. Initialize Payload with Neon

```bash
npx create-payload-app@latest my-membership-platform
# Choose: PostgreSQL
# Enter: Your Neon connection string
```

### 2. Environment Variables

```env
DATABASE_URL=postgresql://user:pass@ep-xxx.neon.tech/neondb?sslmode=require
PAYLOAD_SECRET=your-secret-here
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

### 3. Payload Config

```typescript
// payload.config.ts
import { buildConfig } from 'payload/config';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';

export default buildConfig({
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
  editor: lexicalEditor({}),
  collections: [
    Users, // Handles ALL authentication
    Events,
    MembershipTypes,
    Payments,
  ],
});
```

### 4. Users Collection (Simplified)

```typescript
export const Users: CollectionConfig = {
  slug: 'users',
  auth: true, // Enables authentication
  fields: [
    {
      name: 'role',
      type: 'select',
      options: ['admin', 'staff', 'member'],
      defaultValue: 'member',
    },
    {
      name: 'membership',
      type: 'group',
      fields: [
        // membership status, type, dates, etc.
      ],
    },
    // ... other fields
  ],
  access: {
    admin: ({ req: { user } }) => user?.role === 'admin',
    read: ({ req: { user } }) => {
      if (user?.role === 'admin') return true;
      return { id: { equals: user.id } }; // Users read own data
    },
  },
};
```

## Authentication Flow

### Admin/Staff Login

- Navigate to `/admin`
- Use Payload's built-in admin UI
- Access based on `role` field

### Member Login (Custom Frontend)

```typescript
// app/login/page.tsx
const response = await fetch('/api/users/login', {
  method: 'POST',
  body: JSON.stringify({ email, password }),
});
```

### Member Portal

```typescript
// app/members/dashboard/page.tsx
import { getPayloadClient } from '@/lib/payload';

export default async function Dashboard() {
  const payload = await getPayloadClient();
  const { user } = await payload.auth();

  if (!user || user.role === 'guest') {
    redirect('/login');
  }

  // Show member dashboard
}
```

## Why This Architecture?

### Benefits

1. **Single Database**: No complexity of managing multiple databases
2. **One Auth System**: No need for Supabase Auth or separate member system
3. **Unified User Management**: Admins and members in same table
4. **Built-in Admin UI**: Payload provides complete CMS interface
5. **Type Safety**: Full TypeScript with generated types
6. **Cost Effective**: Neon free tier + managed hosting ~$50/month

### What Payload Provides Out-of-Box

- Complete authentication (login, register, forgot password, email verification)
- Admin panel for content management
- REST and GraphQL APIs automatically
- Image optimization and uploads
- Access control and permissions
- Webhooks and hooks for custom logic
- Email sending configuration

### What You Build

- Member-facing frontend (Next.js pages)
- Custom member portal UI
- Stripe payment integration
- Platform-specific features

## Migration from Other Systems

- Import data via Payload's Local API
- Direct SQL access to Neon for complex migrations
- Can run both systems in parallel during transition

## Common Commands

```bash
# Generate TypeScript types
npm run payload generate:types

# Create/run migrations
npm run payload migrate:create
npm run payload migrate

# Development
npm run dev
```

## Next Steps

1. Set up Neon database
2. Initialize Payload project
3. Create Users collection with roles
4. Build member-facing pages in Next.js
5. Integrate Stripe for payments
6. Deploy to Vercel

## Key Insight

**Don't use separate systems for CMS users and members.** Payload can handle both with a single Users collection using role-based access control. This dramatically simplifies the architecture while providing all needed functionality.
