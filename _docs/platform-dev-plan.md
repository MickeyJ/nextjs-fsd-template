# Membership Platform Development Plan

## Critical Architecture Decision: User/Member Structure

### The Problem

You're a board member, admin, AND a member. The current setup has overlapping concerns:

- `users` collection has auth + tons of member fields
- `members` collection also has auth
- This creates confusion about where data lives

### Recommended Solution: Linked Collections

```typescript
// USERS Collection - ONLY for authentication/access
{
  email: "you@example.com",
  password: "hashed",
  role: "admin", // admin | staff | user
  memberId: "member_123", // LINK to members collection
  canAccessCMS: true,
}

// MEMBERS Collection - ALL member data (no auth)
{
  id: "member_123",
  userId: "user_456", // LINK back to users
  firstName: "John",
  lastName: "Doe",
  memberNumber: "2024-001",
  boardPosition: "treasurer", // null for non-board
  membershipType: "annual",
  membershipStatus: "active",
  joinDate: "2024-01-01",
  // ... all other member fields
}
```

### Why This Works

- **Single login** via `users` collection
- **All member data** in `members` collection
- **Board members** are members with `boardPosition` field
- **Admins** are users with `role: 'admin'`
- **You can be both** - admin access via user role, member benefits via linked member record

## Development Phases

### Phase 1: Fix the Data Model

#### Clean up Users collection

- Remove all member-specific fields
- Keep only: email, password, role, memberId, sessions
- Add `canAccessCMS` boolean for CMS access

#### Update Members collection

- Remove auth capability
- Add `userId` relationship field
- Add `boardPosition` field for board members
- Move all member fields here from users

#### Create migration/sync logic

- When user registers → create linked member record
- When admin creates member → optionally create user account

### Phase 2: Authentication System

#### Registration Flow

```
/register
├── Create user account (users collection)
├── Create linked member record (members collection)
├── Set default membershipStatus: 'pending'
├── Send welcome email
└── Redirect to membership selection
```

#### Login Flow

```
/login
├── Authenticate against users collection
├── Load linked member data
├── Check membershipStatus
├── Redirect based on status:
    ├── pending → /membership/select
    ├── expired → /membership/renew
    └── active → /dashboard
```

#### Admin Access

```
/cms
├── Check user.role === 'admin' || user.canAccessCMS
├── Load Payload admin UI
└── Access based on role permissions
```

### Phase 3: Membership Management

#### Membership Selection/Purchase

```
/membership/select
├── Display MembershipTypes from collection
├── Show pricing and benefits
├── Stripe checkout integration
└── Post-payment webhook handling
```

#### Payment Processing

```
Stripe Webhook
├── Verify webhook signature
├── Find member by email/customerId
├── Update membershipStatus: 'active'
├── Set membershipExpiry date
├── Create payment record
└── Send confirmation email
```

#### Member Dashboard

```
/dashboard
├── Membership status card
├── Renewal reminder (if expiring soon)
├── Upcoming events
├── Quick actions
└── Payment history
```

### Phase 4: Event Management

#### Event Listing

```
/events
├── List upcoming events
├── Filter by category/date
├── Show member vs non-member pricing
└── Registration button/status
```

#### Event Registration

```
/events/[slug]/register
├── Check membership status
├── Apply member discount
├── Guest registration option
├── Payment if required
└── Confirmation email
```

#### Event Check-in (Admin)

```
/admin/events/[id]/checkin
├── List registrations
├── Search by name/email
├── Mark attendance
├── Walk-in registration
└── Export attendee list
```

### Phase 5: Admin Features

#### Member Management

```
/admin/members
├── List all members
├── Filter by status/type
├── Edit member details
├── Manual payment recording
├── Bulk actions (export, email)
└── Membership reports
```

#### Financial Dashboard

```
/admin/finance
├── Revenue overview
├── Outstanding dues
├── Payment history
├── Stripe reconciliation
└── Export for accounting
```

#### Communications

```
/admin/communications
├── Email blast to members
├── SMS notifications (optional)
├── Event reminders
└── Renewal reminders
```

### Phase 6: Member Features

#### Member Directory

```
/members
├── Searchable directory (if enabled)
├── Member profiles
├── Board member identification
└── Contact permissions
```

#### Member Profile

```
/profile
├── Edit personal info
├── Privacy settings
├── Payment methods
├── Email preferences
└── Download membership card
```

### Phase 7: Reports & Analytics

#### Membership Reports

- Active members by type
- Growth trends
- Retention rates
- Demographic breakdowns

#### Event Reports

- Attendance trends
- Revenue per event
- Popular event types
- No-show rates

#### Financial Reports

- Revenue by source
- Outstanding balances
- Payment method breakdown
- Forecasting

## Technical Implementation Details

### API Routes Structure

```
/api/
├── auth/
│   ├── login
│   ├── logout
│   ├── register
│   └── reset-password
├── members/
│   ├── profile
│   ├── update
│   └── directory
├── events/
│   ├── list
│   ├── register
│   └── cancel
├── payments/
│   ├── checkout
│   ├── webhook
│   └── history
└── admin/
    ├── members
    ├── events
    └── reports
```

### Key Libraries/Services

#### Already Installed

- Payload CMS (content management)
- Stripe (payments)
- Neon (database)

#### Recommended Additions

- `react-hook-form` + `zod` (form handling)
- `resend` or `sendgrid` (email)
- `react-query` or `swr` (data fetching)
- `date-fns` (date manipulation)
- `recharts` (dashboards)

### Security Considerations

#### Authentication

- Secure session management
- Password requirements
- Rate limiting on login
- Two-factor auth (optional)

#### Data Protection

- Role-based access control
- API route protection
- Input validation
- SQL injection prevention

#### Payment Security

- Stripe webhook verification
- PCI compliance (via Stripe)
- Secure storage of customer IDs
- Audit trail for transactions

### Deployment Considerations

#### Environment Variables

```env
# Core
DATABASE_URL=
PAYLOAD_SECRET=
NEXTAUTH_SECRET=

# Stripe
STRIPE_PUBLIC_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Email
EMAIL_FROM=
EMAIL_API_KEY=

# App
NEXT_PUBLIC_APP_URL=
```

#### Infrastructure

- Vercel for hosting
- Neon for database
- Cloudflare R2/S3 for file storage
- Stripe for payments
- Email service (Resend/SendGrid)

## Next Immediate Steps

1. **Fix User/Member architecture** - Decide on the linked collections approach
2. **Build basic auth** - Login, register, logout
3. **Create member dashboard** - Show membership status
4. **Implement Stripe checkout** - For membership purchase
5. **Add event registration** - Basic event signup flow

## Questions to Answer

1. **Board Structure**: What board positions exist? What special permissions do they need?
2. **Membership Types**: What are your actual membership tiers and prices?
3. **Event Types**: Free events? Paid events? Member-only events?
4. **Payment Schedule**: Monthly? Annual? Both?
5. **Grace Period**: How long after expiry before losing access?
6. **Guest Policy**: Can members bring guests to events?
7. **Refund Policy**: How to handle refunds/cancellations?
