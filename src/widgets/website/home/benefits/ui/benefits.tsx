// src/widgets/benefits/ui/benefits-section.tsx
'use client';

import { motion } from 'motion/react';
import { Users, Calendar, Trophy, Briefcase, Heart, Sparkles } from 'lucide-react';
import { Container } from '@/shared/ui/container';
import { Section } from '@/shared/ui/section';
import { Card } from '@/shared/ui/card';

const benefits = [
  {
    icon: Calendar,
    title: 'Exclusive Events',
    description: 'Member-only mixers, priority registration, and special pricing on all events',
    testimonial: 'The monthly mixers alone are worth the membership!',
  },
  {
    icon: Users,
    title: 'Professional Network',
    description: 'Access to 500+ member directory with direct messaging',
    testimonial: 'I found my co-founder through YPNG connections',
  },
  {
    icon: Trophy,
    title: 'Partner Perks',
    description: 'SLO Chamber membership included plus discounts at 15+ businesses',
    testimonial: 'The partner discounts save me $100+ monthly',
  },
  {
    icon: Briefcase,
    title: 'Community Board',
    description: 'Post jobs, find housing, buy/sell, and get recommendations',
    testimonial: 'Found my apartment in 2 days through the board',
  },
  {
    icon: Heart,
    title: 'Recreation & Fun',
    description: 'Softball league, game nights, wine tastings, and outdoor adventures',
    testimonial: 'Best softball league in SLO - so much fun!',
  },
  {
    icon: Sparkles,
    title: 'Leadership',
    description: "Join committees, lead initiatives, and shape YPNG's future",
    testimonial: 'Being on the events committee changed my career',
  },
];

export function WebsiteHomeBenefits() {
  return (
    <Section className="py-20">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">Why Join YPNG?</h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Unlock exclusive benefits and join SLO's most active professional network
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Card className="h-full p-6 hover:shadow-lg transition-all group">
                  <div className="bg-primary-200 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-300 transition-colors">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-neutral-600 mb-4">{benefit.description}</p>
                  <p className="text-sm italic text-neutral-500">"{benefit.testimonial}"</p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
