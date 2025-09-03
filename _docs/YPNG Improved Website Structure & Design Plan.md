# YPNG Improved Website Structure & Design Plan

## Overview

A modern, member-first platform with three distinct experiences:

1. **Public Website** - Marketing & information portal
2. **Member Portal** - Personalized member experience
3. **Staff/Board Portal** - Administrative dashboard

---

## Design Philosophy

### Core Principles

- **Mobile-First**: 70% of young professionals browse on mobile
- **Speed**: Every page loads in <200ms
- **Simplicity**: Maximum 3 clicks to any action
- **Visual**: Modern, Instagram-worthy design
- **Inclusive**: Accessibility built-in (WCAG 2.1 AA)

### Visual Design Language

- **Colors**:
  - Primary: Deep Navy (#1a365d)
  - Accent: Vibrant Coral (#ff6b6b)
  - Success: Fresh Green (#48bb78)
  - Background: Off-white (#fafafa)
  - Text: Charcoal (#2d3748)
- **Typography**:
  - Headers: Modern sans-serif (Inter or Plus Jakarta Sans)
  - Body: Clean, readable (16px minimum)
  - Accent: Bold weight for CTAs
- **Components**:
  - Rounded corners (8-12px)
  - Soft shadows for depth
  - Micro-animations on hover
  - Glass-morphism for cards
  - Gradient accents

---

## 1. PUBLIC WEBSITE STRUCTURE

### Navigation Header

```
[YPNG Logo] | About ▼ | Events | Membership | Get Involved ▼ | [Member Login] [Join Now]
             └─ Our Story     └─ Calendar       └─ Volunteer
                The Board        Mixers           Softball
                Partners         Workshops        Community Board
                                Past Events        Sponsorship
```

### Homepage (/)

**Hero Section**

- Full-width video/image carousel of events
- Overlaid text: "Where San Luis Obispo's Future Leaders Connect"
- Two CTAs: "Join Now" (primary) | "Explore Events" (secondary)
- Member count ticker: "Join 500+ Young Professionals"

**Social Proof Bar**

- Scrolling logos of partner organizations
- "Proud partners with SLO Chamber, The Pad, and more"

**Upcoming Events Grid** (3 featured)

- Event cards with image, date, title
- "View All Events →" link

**Membership Benefits**

- Interactive flip cards showing benefits
- Price comparison (Non-member vs Member)
- Single CTA: "Become a Member for $X/month"

**Community Spotlight**

- Recent member testimonial with photo
- Board member feature
- Latest Instagram posts (API integration)

**Volunteer CTA Section**

- Split screen: Image + Text
- "Give Back to Your Community"
- Current volunteer opportunity featured

### About Section

#### Our Story (/about)

**Layout**: Magazine-style article

- Hero image of group event
- Founded story with timeline
- Mission/Vision in bold callout boxes
- Impact numbers (animated counters):
  - Members served
  - Events hosted
  - Volunteer hours
  - Dollars raised for community

#### Meet the Board (/board)

**Layout**: Modern team grid

- Interactive cards with:
  - Professional photo
  - Name & board position
  - Company/role
  - Fun fact (on hover)
  - LinkedIn link
- "Join Our Board" CTA section at bottom

#### Partners (/partners)

**Layout**: Logo garden + case studies

- Tiered partner display (Platinum, Gold, Silver)
- Partner benefits breakdown
- Success stories/testimonials
- "Become a Partner" form

### Events Hub (/events)

**Hero**: Calendar View Toggle

- Month view | List view | Map view options

**Filters Sidebar** (collapsible on mobile)

- Event type (Mixer, Workshop, Social, Volunteer)
- Date range
- Price (Free, Member-only, Paid)
- Location

**Event Cards**

- Image thumbnail
- Date badge
- Title & location
- Price (Member/Non-member)
- Quick RSVP button
- Attendee avatars (First 5 + count)

**Individual Event Page** (/events/[slug])

- Hero image
- Event details sidebar:
  - Date & time
  - Location with map
  - Price tiers
  - RSVP button (sticky on mobile)
- Description
- Speaker/host info
- What to expect
- Attendee list (members only preview)
- Related events

### Membership (/membership)

**Pricing Cards** (2 options)

1. **Monthly**: $25/month
2. **Annual**: $240/year (Save $60!)

Each card shows:

- ✓ All member benefits
- ✓ Payment method icons
- CTA: "Start Membership"

**Benefits Deep Dive**

- Tabbed sections:
  - Exclusive Events
  - Partner Discounts
  - Networking Tools
  - Professional Development

**FAQs**

- Expandable accordion
- Categories: Membership, Events, Payments, Account

**Corporate Memberships**

- Separate section for companies
- Bulk pricing tiers
- Contact form for custom quotes

### Get Involved

#### Volunteer (/volunteer)

**Hero**: Current month's opportunity

- Large image
- Organization partner
- Date & time
- One-click signup

**Ongoing Opportunities**

- Grid of partner organizations
- Each shows:
  - Logo
  - Mission snippet
  - Commitment level
  - "Learn More" link

#### Softball (/softball)

**Layout**: Sports-themed design

- Season schedule
- Team registration
- League standings
- Photo gallery
- Registration form

#### Community Board (/community-board)

**Public Preview**

- Sample posts (blurred for non-members)
- "Join to Access Full Board" CTA
- Categories: Jobs, Housing, Recommendations, Discussions

#### Sponsorship (/sponsorship)

**B2B focused page**

- Sponsorship tiers
- Benefits matrix
- Past sponsor logos
- ROI/demographics data
- Contact form

### Contact (/contact)

**Split Layout**

- Left: Contact form
  - Name, email, subject, message
  - "How did you hear about us?" dropdown
- Right: Contact info
  - Email, phone
  - Mailing address
  - Social media links
  - Office hours (if applicable)

---

## 2. MEMBER PORTAL STRUCTURE

### Post-Login Dashboard (/member/dashboard)

**Welcome Header**

- "Welcome back, [Name]!"
- Membership status badge (Active/Expiring/Expired)
- Days until renewal (if applicable)

**Quick Actions Grid** (4 tiles)

1. Browse Events → /member/events
2. Member Directory → /member/directory
3. Community Board → /member/community
4. Update Profile → /member/profile

**Your Upcoming Events**

- Horizontal scroll of registered events
- Add to calendar buttons

**Member Spotlight**

- Featured member of the month
- New member introductions

**Community Feed**

- Recent posts from community board
- Upcoming volunteer opportunities
- Board announcements

### Member Events (/member/events)

Enhanced version of public events with:

- Member pricing automatically shown
- One-click RSVP (no payment if included)
- Attendee list visible
- Event chat/comments
- Exclusive member events highlighted

### Member Directory (/member/directory)

**Search Bar** with filters:

- Industry
- Company
- Skills
- Interests
- Board members

**Member Grid**

- Photo, name, title, company
- Quick connect button
- View profile link

**Individual Profile** (/member/directory/[id])

- Professional info
- Bio
- Contact (if permitted)
- Social links
- Shared connections
- Message button

### Community Board (/member/community)

**Categories** (tabs):

- **Jobs**: Post/browse opportunities
- **Housing**: Roommates, rentals
- **Marketplace**: Buy/sell/trade
- **Recommendations**: Local services
- **Discussions**: General topics

**Each Post**:

- Title, description, images
- Author with verification badge
- Comment thread
- Save/share buttons
- Report inappropriate content

### Profile Management (/member/profile)

**Tabs**:

1. **Personal Info**
   - Name, photo, bio
   - Contact details
   - Social links
   - Privacy settings

2. **Professional**
   - Company, title
   - Industry, skills
   - LinkedIn integration
   - Directory visibility

3. **Membership**
   - Current plan
   - Payment method
   - Billing history
   - Upgrade/downgrade options

4. **Preferences**
   - Email notifications
   - Event reminders
   - Newsletter subscription
   - Communication preferences

5. **Connections**
   - Saved members
   - Event buddies
   - Blocked users

---

## 3. STAFF/BOARD PORTAL STRUCTURE

### Admin Dashboard (/admin/dashboard)

**KPI Cards** (real-time)

- Active members (with trend)
- Monthly revenue (with goal progress)
- Event attendance rate
- Member retention rate

**Quick Actions**

- Create Event
- Send Announcement
- Add Member
- Generate Report
- View Support Tickets

**Activity Feed**

- New member signups
- Recent payments
- Event registrations
- Support requests
- System alerts

### Member Management (/admin/members)

**Members Table**

- Search/filter capabilities
- Columns: Name, Status, Type, Joined, Last Active, Actions
- Bulk actions: Export, Email, Update status

**Member Detail** (/admin/members/[id])

- Full profile view
- Membership history
- Payment records
- Event attendance
- Notes/tags
- Admin actions: Edit, Suspend, Refund

### Event Management (/admin/events)

**Events Calendar**

- Create/edit events
- Duplicate past events
- Attendance tracking
- Revenue per event

**Event Creation Flow**

1. Basic info (title, date, location)
2. Pricing (member/non-member)
3. Capacity & registration
4. Description & images
5. Email announcement
6. Publish

**Check-in System** (/admin/events/[id]/checkin)

- QR code scanner
- Manual search
- Walk-in registration
- Attendance export

### Financial Dashboard (/admin/finance)

**Revenue Overview**

- Monthly recurring revenue
- Event revenue
- Sponsorship income
- Graphs and trends

**Payments**

- Recent transactions
- Failed payments
- Refund requests
- Stripe integration

**Reports**

- Membership growth
- Revenue by source
- Tax documents
- Custom date ranges

### Communications (/admin/communications)

**Email Campaigns**

- Template library
- Segment builder
- A/B testing
- Schedule/send
- Analytics

**Announcements**

- Website banner
- Member portal notice
- Push notifications
- Social media integration

### Board Tools (/admin/board)

**Meeting Management**

- Agenda builder
- Minutes archive
- Document library
- Voting system

**Strategic Planning**

- Goal tracking
- Initiative management
- Budget planning
- Committee assignments

---

## User Flows

### New Visitor → Member

```
Homepage → Membership Page → Sign Up Form → Payment → Welcome Email → First Login → Onboarding Tour → Dashboard
```

### Member Event Registration

```
Login → Events → Select Event → Confirm Registration → Add to Calendar → Receive Reminder → Check In
```

### Volunteer Signup

```
Homepage → Volunteer → Select Opportunity → Member Login/Join → Confirm Participation → Receive Details
```

### Board Member Admin Flow

```
Admin Login → Dashboard → Create Event → Set Details → Publish → Monitor Registrations → Check-in → Post-Event Report
```

---

## Footer Structure (All Pages)

### Column 1: Organization

- YPNG Logo
- Tagline
- 501(c)(3) Badge
- Copyright

### Column 2: Quick Links

- About Us
- Events Calendar
- Become a Member
- Volunteer
- Contact

### Column 3: Member Resources

- Member Login
- Member Benefits
- Community Board
- FAQs
- Privacy Policy

### Column 4: Connect

- Newsletter Signup
- Social Media Icons
- Email: info@ypng.org
- Phone: (805) 710-6302

### Column 5: Partners

- SLO Chamber logo
- SBDC logo
- Key sponsor logos
- "Become a Partner" link

---

## Mobile-Specific Considerations

### Navigation

- Hamburger menu with smooth slide-out
- Bottom navigation bar for member portal:
  - Dashboard | Events | Community | Directory | Profile

### Touch Optimizations

- Minimum 44px touch targets
- Swipe gestures for image galleries
- Pull-to-refresh on feeds
- Sticky CTAs on scroll

### Progressive Web App Features

- Offline event viewing
- Push notifications
- Home screen installation
- Calendar integration

---

## Performance Targets

### Page Load Times

- Homepage: <1.5s
- Event pages: <1s
- Member dashboard: <2s
- Admin portal: <2.5s

### Core Web Vitals

- LCP: <2.5s
- FID: <100ms
- CLS: <0.1

### Optimization Strategies

- Image lazy loading
- CDN for static assets
- Database query optimization
- Redis caching for common queries
- Static generation for public pages

---

## Accessibility Requirements

- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader compatibility
- High contrast mode
- Focus indicators
- Alt text for all images
- Proper heading hierarchy
- Form labels and errors

---

## Analytics & Tracking

### Key Metrics

- Member acquisition cost
- Lifetime value
- Event attendance rates
- Feature adoption
- Page engagement
- Conversion funnels

### Tools

- Google Analytics 4
- Hotjar for heatmaps
- Custom event tracking
- A/B testing framework

---

## Implementation Priority

### Phase 1 (MVP)

1. Public homepage
2. Basic membership signup
3. Member login/dashboard
4. Event listing & registration
5. Payment processing

### Phase 2

1. Member directory
2. Community board
3. Admin dashboard
4. Email system
5. Enhanced profiles

### Phase 3

1. Advanced analytics
2. Mobile app
3. Volunteer management
4. Board tools
5. Partner portal

---

## Success Metrics

### Year 1 Goals

- 500+ active members
- 80% member retention
- 50+ events hosted
- <2% payment failure rate
- 4.5+ star member satisfaction

### Engagement Targets

- 60% monthly active members
- 3+ events attended per member/year
- 30% volunteer participation
- 25% community board usage
- 90% profile completion
