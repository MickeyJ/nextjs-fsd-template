// src/widgets/events/ui/events-section.tsx
'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Button } from '@/shared/ui/button/button';
import { Card } from '@/shared/ui/card/card';
import { Container } from '@/shared/ui/container/container';
import { Section } from '@/shared/ui/section/section';
import { Badge } from '@/shared/ui/badge/badge';

interface Event {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  location: string;
  pricing: {
    member: number;
    nonMember: number;
  };
  attendees: number;
  eventType: string;
}

export function WebsiteHomeEvents({ events }: { events: Event[] }) {
  return (
    <Section className="py-20 bg-neutral-0">
      <Container>
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-2">This Week in YPNG</h2>
            <p className="text-neutral-600">Don't miss out on upcoming events</p>
          </div>
          <Button
            variant="link"
            asChild
          >
            <Link href="/events">View All Events →</Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <Badge
                    variant={event.eventType === 'mixer' ? 'default' : 'secondary'}
                    className="mb-4"
                  >
                    {event.eventType}
                  </Badge>

                  <h3 className="text-xl font-semibold mb-3">{event.title}</h3>

                  <div className="space-y-2 text-sm text-neutral-600 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {event.date.toLocaleDateString()} at {event.startTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{event.attendees} registered</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <div>
                      <span className="text-sm text-neutral-500">Members: </span>
                      <span className="font-semibold">
                        {event.pricing.member === 0 ? 'Free' : `$${event.pricing.member}`}
                      </span>
                    </div>
                    <Button
                      variant="link"
                      size="sm"
                      asChild
                    >
                      <Link href={`/events/${event.id}`}>RSVP</Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
