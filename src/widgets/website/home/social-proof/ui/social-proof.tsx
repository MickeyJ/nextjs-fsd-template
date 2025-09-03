// src/widgets/social-proof/ui/social-proof-section.tsx
'use client';

import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/shared/ui/avatar/avatar';
import { Container } from '@/shared/ui/container/container';
import { Section } from '@/shared/ui/section/section';
import { Card, CardContent, CardHeader } from '@/shared/ui/card/card';

const testimonial = {
  quote:
    'YPNG transformed my experience moving to SLO. Within a month, I had a solid friend group, found my apartment through the community board, and even landed a new job through a connection at a mixer!',
  author: 'Sarah Chen',
  role: 'Marketing Manager at MindBody',
  image: '/images/members/sarah-chen.jpg',
};

const partners = [
  { name: 'SLO Chamber', logo: '/logos/slo-chamber.svg' },
  { name: 'Cal Poly', logo: '/logos/cal-poly.svg' },
  { name: 'The Tribune', logo: '/logos/tribune.svg' },
  { name: 'Visit SLO CAL', logo: '/logos/visit-slo.svg' },
  { name: 'MindBody', logo: '/logos/mindbody.svg' },
  { name: 'Promega', logo: '/logos/promega.svg' },
  { name: 'Downtown SLO', logo: '/logos/downtown-slo.svg' },
];

export function WebsiteHomeSocialProof() {
  return (
    <Section className="py-20 bg-neutral-0">
      <Container>
        {/* Testimonial */}
        <div className="max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-center mb-8">Recent Member Spotlight</h2>
            <Card>
              <CardHeader className="relative">
                <Quote className="absolute top-0 left-0 w-8 h-8 text-primary-950/50" />
              </CardHeader>
              <CardContent className="p-8 lg:p-12">
                <div className="flex flex-col lg:flex-row gap-8 items-center">
                  <div className="flex-shrink-0">
                    <Avatar className="w-24 h-24">
                      <AvatarFallback className="bg-gradient-to-br from-primary-400 to-secondary-400 text-neutral-950 text-2xl font-bold">
                        SC
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-1">
                    <p className="text-lg lg:text-xl text-neutral-700 mb-6 italic leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                    <div className="border-l-4 border-primary pl-4">
                      <p className="font-semibold text-neutral-900">{testimonial.author}</p>
                      <p className="text-sm text-neutral-600">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Partner Logos */}
        <div className="text-center mb-8">
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">Our Partners</h3>
          <p className="text-neutral-600">Connecting with SLO's leading organizations</p>
        </div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 items-center justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              className="group cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <div className="h-16 flex items-center justify-center p-2 rounded-lg bg-neutral-100 shadow-sm group-hover:shadow-md transition-shadow">
                <span className="text-sm font-medium text-neutral-600 group-hover:text-primary-600 transition-colors">
                  {partner.name}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
