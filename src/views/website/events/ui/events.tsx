// src/views/website/events/ui/events.tsx
'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, List, Map, Filter, Search } from 'lucide-react';
import { Container } from '@/shared/ui/container/container';
import { Section } from '@/shared/ui/section/section';
import { Card, CardContent } from '@/shared/ui/card/card';
import { Button } from '@/shared/ui/button/button';
import { Input } from '@/shared/ui/input/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs/tabs';
import { Badge } from '@/shared/ui/badge/badge';
import {
  SelectMenu,
  SelectMenuContent,
  SelectMenuItem,
  SelectMenuTrigger,
  SelectMenuValue,
} from '@/shared/ui/select/select';
import { Checkbox } from '@/shared/ui/checkbox/checkbox';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/shared/ui/sheet';
import Link from 'next/link';
import { mockEvents } from '@/shared/lib/mock-data';

// Add more mock events
const allEvents = [
  ...mockEvents,
  {
    id: '4',
    title: 'Coffee Connects',
    slug: 'coffee-connects-november',
    eventType: 'social',
    date: new Date('2024-11-13'),
    startTime: '7:30 AM',
    endTime: '8:30 AM',
    location: 'Scout Coffee',
    description: 'Start your day with casual networking. Perfect for early birds!',
    image: '/images/events/coffee.jpg',
    pricing: { member: 0, nonMember: 5 },
    capacity: 20,
    attendees: 12,
    featured: false,
  },
  {
    id: '5',
    title: 'Women in Business',
    slug: 'women-in-business-november',
    eventType: 'professional',
    date: new Date('2024-11-05'),
    startTime: '6:00 PM',
    endTime: '7:30 PM',
    location: 'Madonna Inn',
    description: 'Empowering female professionals through mentorship and connection.',
    image: '/images/events/women-business.jpg',
    pricing: { member: 0, nonMember: 15 },
    capacity: 40,
    attendees: 35,
    featured: false,
  },
];

const eventCategories = ['All', 'Mixers', 'Professional', 'Social', 'Volunteer'];
const priceRanges = ['All', 'Free', 'Member Only', 'Paid'];
const venues = ['All', 'The Station SLO', 'Scout Coffee', 'Madonna Inn', 'SLO Chamber', 'SLO Food Bank'];

export function WebsiteEventsView() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');
  const [selectedVenue, setSelectedVenue] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'calendar' | 'map'>('list');

  // Filter events
  const filteredEvents = allEvents.filter((event) => {
    if (selectedCategory !== 'All' && !event.eventType.toLowerCase().includes(selectedCategory.toLowerCase()))
      return false;
    if (selectedPrice === 'Free' && event.pricing.member !== 0) return false;
    if (selectedPrice === 'Member Only' && event.pricing.nonMember === event.pricing.member) return false;
    if (selectedPrice === 'Paid' && event.pricing.nonMember === 0) return false;
    if (selectedVenue !== 'All' && event.location !== selectedVenue) return false;
    if (searchQuery && !event.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-400 py-16">
        <Container>
          <h1 className="text-4xl lg:text-5xl font-bold text-neutral-950 mb-4">Upcoming Events</h1>
          <p className="text-lg text-neutral-100">Connect, learn, and grow with SLO's young professionals</p>
        </Container>
      </section>

      <Section className="py-8">
        <Container size="full">
          {/* Search and View Toggle */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <Input
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Mobile Filter Toggle */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="lg:hidden"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Events</SheetTitle>
                </SheetHeader>
                <div className="space-y-6 mt-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Category</label>
                    <SelectMenu
                      value={selectedCategory}
                      onValueChange={setSelectedCategory}
                    >
                      <SelectMenuTrigger>
                        <SelectMenuValue />
                      </SelectMenuTrigger>
                      <SelectMenuContent>
                        {eventCategories.map((cat) => (
                          <SelectMenuItem
                            key={cat}
                            value={cat}
                          >
                            {cat}
                          </SelectMenuItem>
                        ))}
                      </SelectMenuContent>
                    </SelectMenu>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Price</label>
                    <SelectMenu
                      value={selectedPrice}
                      onValueChange={setSelectedPrice}
                    >
                      <SelectMenuTrigger>
                        <SelectMenuValue />
                      </SelectMenuTrigger>
                      <SelectMenuContent>
                        {priceRanges.map((range) => (
                          <SelectMenuItem
                            key={range}
                            value={range}
                          >
                            {range}
                          </SelectMenuItem>
                        ))}
                      </SelectMenuContent>
                    </SelectMenu>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Venue</label>
                    <SelectMenu
                      value={selectedVenue}
                      onValueChange={setSelectedVenue}
                    >
                      <SelectMenuTrigger>
                        <SelectMenuValue />
                      </SelectMenuTrigger>
                      <SelectMenuContent>
                        {venues.map((venue) => (
                          <SelectMenuItem
                            key={venue}
                            value={venue}
                          >
                            {venue}
                          </SelectMenuItem>
                        ))}
                      </SelectMenuContent>
                    </SelectMenu>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* View Mode Toggle */}
            <Tabs
              value={viewMode}
              onValueChange={(v) => setViewMode(v as any)}
              className="w-auto"
            >
              <TabsList>
                <TabsTrigger value="list">
                  <List className="w-4 h-4" />
                </TabsTrigger>
                <TabsTrigger value="calendar">
                  <Calendar className="w-4 h-4" />
                </TabsTrigger>
                <TabsTrigger value="map">
                  <Map className="w-4 h-4" />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex gap-8">
            {/* Desktop Filters Sidebar */}
            <aside className="w-64 hidden lg:block">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Filters</h3>

                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Category</label>
                      <div className="space-y-2">
                        {eventCategories.map((cat) => (
                          <label
                            key={cat}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <Checkbox
                              checked={selectedCategory === cat}
                              onCheckedChange={() => setSelectedCategory(cat)}
                            />
                            <span className="text-sm">{cat}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Price</label>
                      <div className="space-y-2">
                        {priceRanges.map((range) => (
                          <label
                            key={range}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <Checkbox
                              checked={selectedPrice === range}
                              onCheckedChange={() => setSelectedPrice(range)}
                            />
                            <span className="text-sm">{range}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Venue</label>
                      <SelectMenu
                        value={selectedVenue}
                        onValueChange={setSelectedVenue}
                      >
                        <SelectMenuTrigger>
                          <SelectMenuValue />
                        </SelectMenuTrigger>
                        <SelectMenuContent>
                          {venues.map((venue) => (
                            <SelectMenuItem
                              key={venue}
                              value={venue}
                            >
                              {venue}
                            </SelectMenuItem>
                          ))}
                        </SelectMenuContent>
                      </SelectMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recurring Events */}
              <Card className="mt-6">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Recurring Events</h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="font-medium">Monthly Mixers</p>
                      <p className="text-neutral-600">3rd Thursday, 5:30 PM</p>
                    </div>
                    <div>
                      <p className="font-medium">Coffee Connects</p>
                      <p className="text-neutral-600">2nd Wednesday, 7:30 AM</p>
                    </div>
                    <div>
                      <p className="font-medium">Volunteer Saturdays</p>
                      <p className="text-neutral-600">Last Saturday, 9:00 AM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </aside>

            {/* Events Grid */}
            <main className="flex-1">
              {viewMode === 'list' && (
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="h-full hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-3">
                            <Badge variant={event.eventType === 'mixer' ? 'default' : 'secondary'}>
                              {event.eventType}
                            </Badge>
                            <span className="text-sm text-neutral-500">{event.attendees} attending</span>
                          </div>

                          <h3 className="text-xl font-semibold mb-2">{event.title}</h3>

                          <div className="space-y-2 text-sm text-neutral-600 mb-4">
                            <p>
                              📅 {event.date.toLocaleDateString()} at {event.startTime}
                            </p>
                            <p>📍 {event.location}</p>
                            <p>
                              💵 Members: {event.pricing.member === 0 ? 'Free' : `$${event.pricing.member}`} |
                              Non-Members: ${event.pricing.nonMember}
                            </p>
                          </div>

                          <p className="text-neutral-700mb-4 line-clamp-2">{event.description}</p>

                          <Button
                            className="w-full bg-secondary-400 hover:bg-secondary-500 text-neutral-950"
                            asChild
                          >
                            <Link href={`/events/${event.slug}`}>View Details & RSVP</Link>
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}

              {viewMode === 'calendar' && (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Calendar className="w-16 h-16 mx-auto mb-4 text-neutral-400" />
                    <p className="text-neutral-600">Calendar view coming soon!</p>
                  </CardContent>
                </Card>
              )}

              {viewMode === 'map' && (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Map className="w-16 h-16 mx-auto mb-4 text-neutral-400" />
                    <p className="text-neutral-600">Map view coming soon!</p>
                  </CardContent>
                </Card>
              )}
            </main>
          </div>
        </Container>
      </Section>
    </>
  );
}
