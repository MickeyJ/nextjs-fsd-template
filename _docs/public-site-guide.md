# YPNG Public Website - Complete Specification & Content Strategy

## Design System Foundation

### Brand Identity

- **Primary Color**: `#1E3A8A` (Deep Navy) - Professional trust
- **Secondary Color**: `#F97316` (Vibrant Orange) - Energy and youth
- **Accent Color**: `#10B981` (Fresh Green) - Growth and community
- **Neutral Palette**: Gray scale from `globals.css`
- **Typography**:
  - Headers: Inter (already in template)
  - Body: System stack with fallbacks
  - Display: Plus Jakarta Sans for special sections

### Motion Strategy

```typescript
// Reuse existing animations.ts patterns
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};
```

---

## 1. Homepage (`/`)

### Hero Section

**Content Structure:**

```
Headline: "Where SLO's Future Leaders Connect"
Subheadline: "Join 500+ young professionals building careers, community, and connections in San Luis Obispo"
Primary CTA: "Become a Member - $25/month"
Secondary CTA: "Explore Upcoming Events"
```

**Visual Elements:**

- Background: Rotating images from recent events (stored in Payload Media collection)
- Overlay: Gradient mesh with animated particles (using Motion)
- Member count ticker: Real-time from Payload

**Payload Collections Needed:**

```typescript
// hero-content global
{
  headline: text,
  subheadline: richText,
  primaryCTA: {
    text: string,
    link: string,
    style: 'primary' | 'secondary'
  },
  backgroundImages: relationship to Media[],
  stats: {
    members: number,
    events: number,
    volunteerHours: number
  }
}
```

**Component Structure:**

```tsx
// widgets/hero/ui/hero-section.tsx
<section className="relative min-h-[90vh] flex items-center">
  <AnimatedBackground images={heroContent.backgroundImages} />
  <Container
    size="xl"
    className="relative z-10"
  >
    <motion.div className="max-w-4xl">
      <Badge>501(c)(4) Non-Profit</Badge>
      <H1 className="text-5xl lg:text-7xl">{headline}</H1>
      <MemberTicker count={stats.members} />
      <CTAButtons />
    </motion.div>
  </Container>
  <ScrollIndicator />
</section>
```

### Upcoming Events Section

**Content:**

- Section Title: "This Week in YPNG"
- 3 featured upcoming events
- View all events link

**Event Card Content Example:**

```
Title: "Monthly Mixer at The Station"
Date: Thursday, November 21
Time: 5:30 PM - 7:30 PM
Location: The Station SLO
Price: Free for Members | $10 Non-Members
Attendees: 47 registered (showing 5 avatars + count)
Quick Description: "Join us for November's mixer at SLO's newest rooftop venue..."
```

**Layout:**

```tsx
<Section className="py-20 bg-gray-50">
  <Container>
    <SectionHeader
      title="This Week in YPNG"
      action={{ text: 'View All Events', href: '/events' }}
    />
    <div className="grid lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard
          key={event.id}
          {...event}
          showAttendees
        />
      ))}
    </div>
  </Container>
</Section>
```

### Member Benefits Section

**Content:**

```
Title: "Why Join YPNG?"
Subtitle: "Unlock exclusive benefits and join SLO's most active professional network"

Benefits:
1. Exclusive Events
   - Member-only mixers and workshops
   - Priority registration for limited events
   - Special pricing on all paid events

2. Professional Network
   - Access to 500+ member directory
   - Direct messaging with members
   - Industry-specific groups

3. Partner Perks
   - SLO Chamber membership included
   - 20% off at The Pad Climbing
   - Discounts at 15+ local businesses

4. Community Board
   - Post job opportunities
   - Find roommates and housing
   - Buy/sell marketplace
   - Professional recommendations

5. Recreation & Fun
   - Priority softball league registration
   - Member game nights
   - Wine tasting groups
   - Hiking and outdoor adventures

6. Leadership Opportunities
   - Join committees
   - Lead volunteer initiatives
   - Board positions available
   - Host your own events
```

**Interactive Element:**

```tsx
// Flip cards that show member testimonials on hover
<div className="grid md:grid-cols-3 gap-8">
  {benefits.map((benefit) => (
    <FlipCard
      front={
        <BenefitIcon
          icon={benefit.icon}
          title={benefit.title}
        />
      }
      back={
        <Testimonial
          quote={benefit.testimonial}
          member={benefit.member}
        />
      }
    />
  ))}
</div>
```

### Social Proof Section

**Content:**

```
Recent Member Spotlight:
"YPNG transformed my experience moving to SLO. Within a month, I had a solid friend group, found my apartment through the community board, and even landed a new job through a connection at a mixer!"
- Sarah Chen, Marketing Manager at MindBody
```

**Partner Logos:**

- SLO Chamber
- Cal Poly
- The Tribune
- Visit SLO CAL
- MindBody
- Promega
- Downtown SLO

### Call to Action Section

**Content:**

```
Headline: "Ready to Level Up Your Network?"
Subtext: "Join before November 30th and get your first month for $15"
CTA: "Start Your Membership"
Alternative: "Not ready? Try a free event first →"
```

---

## 2. About Section

### Our Story (`/about`)

**Hero Content:**

```
Headline: "Building Community Since 2006"
Tagline: "From 12 founding members to 500+ strong, YPNG has been connecting SLO's ambitious young professionals for nearly two decades."
```

**Main Content:**

```markdown
## The Beginning

In 2006, a group of twelve young professionals noticed something missing in San Luis Obispo. While our city offered incredible quality of life, natural beauty, and a thriving Cal Poly community, there wasn't a dedicated space for young professionals to connect, grow, and give back.

What started as informal happy hours at Novo quickly grew into something bigger. By year's end, we had 50 members and a mission: to enrich the lives of young professionals through professional development, community involvement, and meaningful connections.

## Our Evolution

**2006-2010: The Foundation Years**

- Established as 501(c)(4) non-profit
- Launched monthly mixer tradition
- Started annual softball league
- First volunteer partnership with CAPSLO

**2011-2015: Expansion Era**

- Grew to 200+ members
- Added professional development seminars
- Launched mentorship program
- Established SLO Chamber partnership

**2016-2020: Digital Transformation**

- Built online member directory
- Created Community Board platform
- Virtual events during pandemic
- Reached 400 members

**2021-Present: New Heights**

- Record 500+ members
- Hybrid event model
- Expanded partner network
- Youth leadership programs

## Our Impact

[Animated Counters]

- 18 Years of Service
- 500+ Active Members
- 1,200+ Events Hosted
- 10,000+ Volunteer Hours
- $250,000+ Raised for Local Causes
```

**Payload Structure:**

```typescript
// about-page global
{
  hero: {
    title: text,
    subtitle: richText,
    image: Media
  },
  timeline: array of {
    period: string,
    title: string,
    highlights: string[]
  },
  impactStats: array of {
    value: number,
    label: string,
    suffix?: string
  }
}
```

### Meet the Board (`/board`)

**Hero:**

```
"The Leaders Behind YPNG"
"Our volunteer board members dedicate their time and expertise to growing SLO's premier young professionals network"
```

**Board Member Cards - Example Content:**

```
President - Michael Rodriguez
Senior Project Manager, RRM Design Group

"Leading YPNG combines my passion for community building with professional development. Every event we host creates ripple effects throughout SLO."

Committee: Executive
Term: 2024-2026
LinkedIn | Email

---

Vice President - Jennifer Park
Director of Marketing, Visit SLO CAL

"YPNG gave me my start in SLO five years ago. Now I'm paying it forward by helping other young professionals find their place here."

Committee: Executive, Events
Term: 2024-2026
LinkedIn | Email

[Continue for all 12 board positions...]
```

**Call to Action:**

```
Join Our Leadership Team
We're currently seeking passionate individuals for several board and committee positions:
- Treasurer (Board Position)
- Volunteer Coordinator
- Social Media Manager
- Events Committee Members

Contact us at board@ypng.org to learn more
```

### Community Partners (`/partners`)

**Tiered Display:**

```
PLATINUM PARTNERS ($10,000+)
- SLO Chamber of Commerce
  Partnership includes member benefits, event sponsorship, and professional development programs

- The Pad Climbing & Fitness
  Exclusive member discounts and quarterly team-building events

GOLD PARTNERS ($5,000+)
- Promega Corporation
- French Hospital Medical Center
- Pacific Gas and Electric Company

SILVER PARTNERS ($2,500+)
- SLO Brew Rock
- Madonna Inn
- Central Coast Aquarium
- MINDBODY

COMMUNITY PARTNERS
- CAPSLO
- United Way SLO
- SLO Food Bank
- Woods Humane Society
```

**Partner Benefits Table:**

```
| Benefit | Platinum | Gold | Silver |
|---------|----------|------|--------|
| Logo on website | ✓ | ✓ | ✓ |
| Event speaking opportunities | 4/year | 2/year | 1/year |
| Sponsored mixer hosting | ✓ | ✓ | - |
| Job board priority | ✓ | ✓ | ✓ |
| Member directory access | ✓ | - | - |
```

---

## 3. Events Section

### Events Calendar (`/events`)

**Filtering UI:**

```tsx
// Features section with filter sidebar
<div className="flex gap-8">
  <aside className="w-64 hidden lg:block">
    <EventFilters
      categories={['Mixers', 'Professional', 'Social', 'Volunteer']}
      priceRanges={['Free', 'Member Only', 'Paid']}
      locations={venues}
    />
  </aside>
  <main className="flex-1">
    <EventViewToggle views={['calendar', 'list', 'map']} />
    <EventsGrid events={filteredEvents} />
  </main>
</div>
```

**Recurring Events Content:**

```
MONTHLY MIXERS
Every 3rd Thursday | 5:30-7:30 PM | Rotating Venues
Our signature networking events rotate through SLO's best venues. Free for members, $10 for guests.

COFFEE CONNECTS
Every 2nd Wednesday | 7:30-8:30 AM | Scout Coffee
Start your day with casual networking. Perfect for early birds!

WOMEN IN BUSINESS
1st Tuesday Monthly | 6:00-7:30 PM | Various
Empowering female professionals through mentorship and connection.

VOLUNTEER SATURDAYS
Last Saturday Monthly | 9:00 AM-12:00 PM | Various
Give back to SLO while meeting like-minded professionals.
```

### Individual Event Page (`/events/[slug]`)

**Example Event - Full Content:**

```
NOVEMBER MIXER: ROOFTOP SEASON FINALE
The Station SLO | Thursday, November 21, 2024

[Hero Image: Sunset rooftop view with people mingling]

Join us for November's mixer at The Station's spectacular rooftop bar! As we head into the holiday season, this is your last chance to enjoy an outdoor mixer before winter.

EVENT DETAILS
📅 Thursday, November 21, 2024
⏰ 5:30 PM - 7:30 PM
📍 The Station SLO
   1009 Monterey St, San Luis Obispo, CA 93401
   [Embedded Map]

PRICING
Members: FREE
Non-Members: $10
Includes: First drink + appetizers

WHAT TO EXPECT
- Welcome drink ticket (beer, wine, or well drinks)
- Gourmet appetizer spread by The Station
- Structured networking activities (optional)
- Sunset views from SLO's newest rooftop
- Prize raffle at 6:45 PM

WHO'S COMING (67 Registered)
[Avatar grid of registered attendees]
Industries attending: Tech (23%), Healthcare (18%), Finance (15%), Marketing (12%), Other (32%)

PARKING & TRANSPORTATION
- Street parking available (free after 6 PM)
- Structure parking at 919 Palm ($5 flat rate)
- Uber/Lyft drop-off zone on Monterey St
- Bike racks available

RSVP NOW [Button]
Add to Calendar | Share Event
```

**Payload Event Schema:**

```typescript
{
  title: string,
  slug: string,
  eventType: 'mixer' | 'professional' | 'social' | 'volunteer',
  date: date,
  startTime: string,
  endTime: string,
  venue: relationship to Venues,
  description: richText,
  image: Media,
  pricing: {
    member: number,
    nonMember: number
  },
  capacity: number,
  registrations: relationship to EventRegistrations[],
  includes: string[],
  parkingInfo: richText,
  hosts: relationship to Users[]
}
```

---

## 4. Membership Page (`/membership`)

**Hero Section:**

```
"Invest in Your Professional Future"
"For less than a coffee date per week, unlock SLO's most valuable professional network"
```

**Pricing Cards:**

```
MONTHLY MEMBERSHIP
$25/month
✓ Cancel anytime
✓ No setup fees
✓ Instant access
[Start Monthly]

ANNUAL MEMBERSHIP
$240/year (Save $60!)
✓ 2 months free
✓ Priority event registration
✓ Annual member gift
✓ Best value
[Start Annual] - MOST POPULAR badge
```

**Detailed Benefits:**

```
EXCLUSIVE ACCESS
✓ Member-only events (4+ per month)
✓ Online member directory with direct messaging
✓ Community board for jobs, housing, and services
✓ Priority registration for limited events
✓ Member pricing on all paid events (save 50%+)

PARTNER PERKS ($500+ VALUE)
✓ SLO Chamber of Commerce membership included ($325 value)
✓ 20% off monthly membership at The Pad ($20/month value)
✓ 15% off at 12+ downtown restaurants
✓ Discounted wine tastings at 5 local wineries
✓ Free admission to partner events

PROFESSIONAL DEVELOPMENT
✓ Monthly skill-building workshops
✓ Quarterly leadership seminars
✓ Access to mentor network
✓ Resume review services
✓ LinkedIn headshot events

RECREATION & SOCIAL
✓ Softball league priority registration
✓ Monthly social activities (game nights, hikes, wine tastings)
✓ Member-only happy hours
✓ Annual gala invitation
✓ Summer BBQ series

COMMUNITY IMPACT
✓ Organized volunteer opportunities
✓ Leadership positions available
✓ Committee participation
✓ Vote in board elections
✓ Shape YPNG's future
```

**Social Proof:**

```
"The best $25 I spend each month. I've made lifelong friends, found my dream job through a connection, and even met my business partner at a YPNG event."
- Alex Thompson, Founder of SLO Tech Startup

"Moving to SLO from SF, YPNG was my instant community. Within weeks, I had a friend group, professional contacts, and felt truly at home."
- Priya Patel, Senior Analyst at Promega
```

**FAQs:**

```
Q: Can I try an event before joining?
A: Absolutely! Most events are open to non-members for a small fee. We recommend attending a monthly mixer to get a feel for our community.

Q: What ages are typical members?
A: While "young professional" is in our name, we welcome professionals of all ages. Our members range from 21 to 45, with most between 25-35.

Q: Can my company purchase memberships?
A: Yes! We offer corporate packages for 5+ employees. Contact corporate@ypng.org for pricing.

Q: How do I cancel?
A: Cancel anytime through your member portal or email membership@ypng.org. No questions asked.
```

---

## 5. Get Involved Section

### Volunteer (`/volunteer`)

**Hero:**

```
"Give Back. Grow Together."
"Join 200+ YPNG members making a difference in SLO County"
```

**Current Opportunity Spotlight:**

```
NOVEMBER: TURKEY TROT VOLUNTEER TEAM
SLO Food Bank | Saturday, November 23 | 8:00 AM - 12:00 PM

Help distribute Thanksgiving meals to 500+ families in need. We need 30 volunteers for sorting, packing, and distribution.

What We'll Do:
- Sort donated food items
- Pack Thanksgiving meal boxes
- Load cars during distribution
- Share joy with our community

What to Bring:
- Closed-toe shoes
- Water bottle
- Work gloves (optional)
- Your energy and smile!

[Sign Up Now - 18/30 spots filled]
```

**Partner Organizations Grid:**

```
CAPSLO
Fighting poverty through service and advocacy
Commitment: Monthly food bank shifts
Impact: 500+ meals served monthly

CENTRAL COAST AQUARIUM
Marine education and conservation
Commitment: Quarterly beach cleanups
Impact: 2,000 lbs plastic removed annually

WOODS HUMANE SOCIETY
Animal rescue and adoption services
Commitment: Weekly dog walking
Impact: 100+ animals socialized monthly

[6 more organizations...]
```

### Softball (`/softball`)

**Season Information:**

```
SPRING 2025 CO-ED SOFTBALL LEAGUE

Season Starts: Week of March 3, 2025
Registration Opens: January 15 (Members get early access January 8)
Games: Thursdays, 6:30 PM & 7:45 PM
Location: Sinsheimer Park Fields 1 & 2
Cost: $65 per player (includes jersey)

LEAGUE FORMAT
- 10-week regular season
- Single elimination playoffs
- Co-ed rules (minimum 4 women per team)
- All skill levels welcome
- End-of-season party & awards

2024 SEASON HIGHLIGHTS
[Photo gallery of teams, games, and celebrations]
- 12 teams
- 150+ players
- Champions: The Base Invaders
- MVP: Jordan Mitchell
- Best Team Spirit: Pitch Please

FAQ
Q: Do I need experience?
A: Not at all! Half our players are beginners. It's about fun, not competition.

Q: Can I join without a team?
A: Yes! We'll place you on a team needing players.

Q: What equipment do I need?
A: Just a glove. We provide bats, balls, and bases.
```

### Community Board Preview (`/community`)

**Teaser Layout:**

```
[Blurred background of actual posts]

UNLOCK THE COMMUNITY BOARD
See what members are sharing:

JOBS
"Marketing Director position at..." [LOCKED]
"Seeking freelance developer for..." [LOCKED]

HOUSING
"2BR apartment near downtown..." [LOCKED]
"Looking for roommate in..." [LOCKED]

MARKETPLACE
"Selling barely used Peloton..." [LOCKED]
"Free desk, perfect for..." [LOCKED]

[Become a Member to Access]
```

### Sponsorship (`/sponsors`)

**B2B Focused Content:**

```
PARTNER WITH YPNG
Reach 500+ motivated young professionals in SLO County

WHO ARE OUR MEMBERS?
- Average age: 29
- College educated: 87%
- Average income: $75,000+
- Industries: Tech (25%), Healthcare (20%), Finance (15%), Marketing (15%), Other (25%)
- Decision makers: 45% manager level or above

SPONSORSHIP OPPORTUNITIES

Event Sponsorships
- Monthly Mixers: $500-$1,000
- Annual Gala: $5,000 (Title sponsor)
- Professional Development Series: $2,500
- Volunteer Events: $250

Annual Partnerships
Platinum ($10,000+): Full benefits + exclusivity in your industry
Gold ($5,000+): Major event sponsorships + member perks
Silver ($2,500+): Event sponsorships + logo placement
Bronze ($1,000+): Logo placement + member discounts

WHAT PARTNERS SAY
"Our YPNG partnership delivers incredible ROI. We've hired 6 members and seen 30% increase in young professional customers."
- The Pad Climbing & Fitness

READY TO CONNECT?
Contact: partnerships@ypng.org
Download: Partnership Prospectus (PDF)
```

---

## 6. Contact Page (`/contact`)

**Content Layout:**

```
GET IN TOUCH

General Inquiries
info@ypng.org
We'll respond within 24 hours

Membership Questions
membership@ypng.org
Current members: login to your portal for faster service

Partnership & Sponsorship
partnerships@ypng.org
Download our partnership prospectus

Board & Leadership
board@ypng.org
Interested in joining? We'd love to hear from you!

Event Information
events@ypng.org
For speaker requests and event partnerships

Volunteer Coordination
volunteer@ypng.org
Erika Anderson, Volunteer Coordinator

FIND US ON SOCIAL
[Social media icons with follower counts]
Instagram: @ypngslo (2.3K)
LinkedIn: /company/ypng-slo (1.8K)
Facebook: /YPNGSLO (3.1K)

MAILING ADDRESS
YPNG
PO Box 13212
San Luis Obispo, CA 93406
```

---

## Global Components

### Header Navigation

```tsx
// Sticky header with transparency on scroll
<Header className="fixed top-0 z-50 transition-all">
  <Container>
    <nav className="flex justify-between items-center py-4">
      <Logo />
      <DesktopNav>
        <NavItem
          href="/about"
          dropdown={aboutSubmenu}
        >
          About
        </NavItem>
        <NavItem href="/events">Events</NavItem>
        <NavItem href="/membership">Membership</NavItem>
        <NavItem
          href="/volunteer"
          dropdown={getInvolvedSubmenu}
        >
          Get Involved
        </NavItem>
      </DesktopNav>
      <div className="flex gap-4">
        <Button
          variant="ghost"
          href="/member/login"
        >
          Login
        </Button>
        <Button
          variant="primary"
          href="/join"
        >
          Join Now
        </Button>
      </div>
      <MobileMenuToggle />
    </nav>
  </Container>
</Header>
```

### Footer

```tsx
// Rich footer with newsletter signup
<Footer className="bg-gray-900 text-white pt-16 pb-8">
  <Container>
    <NewsletterSignup />
    <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-12">
      <BrandColumn />
      <QuickLinks />
      <MemberResources />
      <Connect />
      <Partners />
    </div>
    <Separator />
    <Copyright />
  </Container>
</Footer>
```

---

## Payload CMS Collections

### Required Collections

1. **Events**
   - Full event management
   - Registration tracking
   - Recurring event support

2. **Members** (extends Users)
   - Profile information
   - Membership status
   - Payment history

3. **EventRegistrations**
   - Links members to events
   - Payment status
   - Check-in tracking

4. **Partners**
   - Tier levels
   - Benefits
   - Logo and description

5. **BoardMembers**
   - Profile info
   - Position
   - Term dates

6. **Venues**
   - Location info
   - Capacity
   - Parking details

7. **Testimonials**
   - Member quotes
   - Photo
   - Use context

8. **VolunteerOpportunities**
   - Organization
   - Date/time
   - Sign-ups

### Global Configs

1. **SiteSettings**
   - Contact info
   - Social links
   - Membership pricing

2. **HomePage**
   - Hero content
   - Featured events
   - Stats

3. **AboutPage**
   - Timeline
   - Impact stats
   - Mission/vision

---

## Performance Considerations

### Critical Optimizations

```typescript
// Use static generation for marketing pages
export const revalidate = 3600; // 1 hour

// Dynamic imports for heavy components
const EventMap = dynamic(() => import('@/widgets/event-map'), {
  loading: () => <MapSkeleton />,
  ssr: false
});

// Image optimization
<Image
  src={event.image}
  alt={event.title}
  width={800}
  height={400}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  priority={index < 3}
/>
```

### SEO Metadata

```typescript
export const metadata: Metadata = {
  title: 'YPNG - Young Professionals Networking Group | San Luis Obispo',
  description:
    'Join 500+ young professionals building careers and community in SLO. Monthly mixers, professional development, volunteer opportunities, and more.',
  openGraph: {
    images: ['/og-image.jpg'],
    locale: 'en_US',
    type: 'website',
  },
};
```

---

## Mobile-First Responsive Patterns

```tsx
// Consistent responsive utilities
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
  {/* Mobile: Stack | Tablet: 2 cols | Desktop: 3 cols */}
</div>

// Touch-friendly CTAs
<Button size="lg" className="w-full sm:w-auto min-h-[44px]">
  Join Now
</Button>

// Collapsible filters on mobile
<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline" className="lg:hidden">
      <FilterIcon /> Filters
    </Button>
  </SheetTrigger>
  <SheetContent>
    <EventFilters />
  </SheetContent>
</Sheet>
```

---

## Launch Checklist

### Phase 1 - Core Public Site

- [ ] Homepage with all sections
- [ ] About pages (Story, Board, Partners)
- [ ] Events calendar and individual pages
- [ ] Membership page with Stripe integration
- [ ] Basic contact form
- [ ] Mobile responsive design
- [ ] SEO optimization

### Phase 2 - Enhanced Features

- [ ] Member login system
- [ ] Event registration flow
- [ ] Newsletter integration
- [ ] Partner portal
- [ ] Advanced filtering
- [ ] Analytics setup

### Phase 3 - Full Platform

- [ ] Complete member portal
- [ ] Community board
- [ ] Admin dashboard
- [ ] Automated emails
- [ ] Reporting tools
- [ ] Mobile app consideration
