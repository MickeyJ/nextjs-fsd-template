// src/widgets/hero/ui/hero-section.tsx
'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { Badge } from '@/shared/ui/badge/badge';
import { Button } from '@/shared/ui/button/button';
import { Container } from '@/shared/ui/container/container';

interface WebsiteHomeHeroProps {
  stats: {
    members: number;
    events: number;
    volunteerHours: number;
  };
}

export function WebsiteHomeHero({ stats }: WebsiteHomeHeroProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden primary-gradient-to-br">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center" />
      </div>

      <Container
        size="xl"
        className="relative z-10"
      >
        <motion.div
          className="max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl lg:text-7xl font-bold text-neutral-950 mb-6">Where SLO's Future Leaders Connect</h1>

          <p className="text-xl lg:text-2xl text-neutral-800 mb-8">
            Join {stats.members}+ young professionals building careers, community, and connections in San Luis Obispo
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Button
              size="lg"
              variant="secondary"
              asChild
            >
              <Link href="/membership">Become a Member - $25/month</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
            >
              <Link href="/events">Explore Upcoming Events</Link>
            </Button>
          </div>

          <motion.div
            className="flex gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div>
              <p className="text-3xl font-bold text-neutral-950">{stats.members}+</p>
              <p className="text-sm text-neutral-600">Active Members</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-neutral-950">{stats.events}+</p>
              <p className="text-sm text-neutral-600">Events Hosted</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-neutral-950">{stats.volunteerHours.toLocaleString()}</p>
              <p className="text-sm text-neutral-600">Volunteer Hours</p>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
