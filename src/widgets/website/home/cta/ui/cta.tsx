// src/widgets/cta/ui/cta-section.tsx
'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/shared/ui/button/button';
import { Container } from '@/shared/ui/container/container';
import { Section } from '@/shared/ui/section/section';

export function WebsiteHomeCta() {
  return (
    <Section className="py-20 primary-gradient-to-br-invert">
      <Container>
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-neutral-950 mb-4">Ready to Level Up Your Network?</h2>
          <p className="text-lg lg:text-xl text-neutral-600 mb-8">
            Join before November 30th and get your first month for $15
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="lg"
              asChild
            >
              <Link href="/membership">
                Start Your Membership
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="link"
              asChild
            >
              <Link href="/events">Not ready? Try a free event first →</Link>
            </Button>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
