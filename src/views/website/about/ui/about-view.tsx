// src/views/about/ui/about-view.tsx
'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Container } from '@/shared/ui/container/container';
import { Section } from '@/shared/ui/section/section';
import { Badge } from '@/shared/ui/badge/badge';
import { Card } from '@/shared/ui/card/card';
import { Button } from '@/shared/ui/button/button';
import Link from 'next/link';

const timeline = [
  {
    period: '2006-2010',
    title: 'The Foundation Years',
    highlights: [
      'Established as 501(c)(4) non-profit',
      'Launched monthly mixer tradition',
      'Started annual softball league',
      'First volunteer partnership with CAPSLO',
    ],
  },
  {
    period: '2011-2015',
    title: 'Expansion Era',
    highlights: [
      'Grew to 200+ members',
      'Added professional development seminars',
      'Launched mentorship program',
      'Established SLO Chamber partnership',
    ],
  },
  {
    period: '2016-2020',
    title: 'Digital Transformation',
    highlights: [
      'Built online member directory',
      'Created Community Board platform',
      'Virtual events during pandemic',
      'Reached 400 members',
    ],
  },
  {
    period: '2021-Present',
    title: 'New Heights',
    highlights: ['Record 500+ members', 'Hybrid event model', 'Expanded partner network', 'Youth leadership programs'],
  },
];

const impactStats = [
  { value: 18, label: 'Years of Service', suffix: '' },
  { value: 500, label: 'Active Members', suffix: '+' },
  { value: 1200, label: 'Events Hosted', suffix: '+' },
  { value: 10000, label: 'Volunteer Hours', suffix: '+' },
  { value: 250000, label: 'Raised for Local Causes', suffix: '+', prefix: '$' },
];

export function WebsiteAboutView() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <>
      {/* Hero Section */}
      <Section
        ref={heroRef}
        className="relative min-h-[60vh] flex items-center primary-gradient-to-br overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{ y }}
        >
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center" />
        </motion.div>

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ opacity }}
          >
            <Badge
              variant="secondary"
              className="mb-4"
            >
              Since 2006
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-bold text-neutral-950 mb-6">Building Community Since 2006</h1>
            <p className="text-xl text-neutral-800 max-w-3xl">
              From 12 founding members to 500+ strong, YPNG has been connecting SLO's ambitious young professionals for
              nearly two decades.
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* The Beginning */}
      <Section className="py-20">
        <Container>
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-8">The Beginning</h2>
              <div className="prose prose-lg max-w-none text-neutral-600">
                <p className="mb-6">
                  In 2006, a group of twelve young professionals noticed something missing in San Luis Obispo. While our
                  city offered incredible quality of life, natural beauty, and a thriving Cal Poly community, there
                  wasn't a dedicated space for young professionals to connect, grow, and give back.
                </p>
                <p className="mb-6">
                  What started as informal happy hours at Novo quickly grew into something bigger. By year's end, we had
                  50 members and a mission: to enrich the lives of young professionals through professional development,
                  community involvement, and meaningful connections.
                </p>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Timeline */}
      <Section className="py-20 bg-neutral-50">
        <Container>
          <h2 className="text-center mb-12">Our Evolution</h2>
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {timeline.map((era, index) => (
                <motion.div
                  key={era.period}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center">
                        <span className="text-sm font-bold text-primary-600">{index + 1}</span>
                      </div>
                      <div>
                        <h3>{era.title}</h3>
                        <p className="text-sm text-neutral-700">{era.period}</p>
                      </div>
                    </div>
                    <ul className="space-y-2 leading-tight">
                      {era.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex items-end justify-start gap-2"
                        >
                          <span className="text-primary-600 text-md mt-1">•</span>
                          <span className="text-neutral-600 text-sm">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Impact Stats */}
      <Section className="py-20">
        <Container>
          <h2 className="text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
            {impactStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="text-3xl lg:text-4xl font-bold text-primary-600 mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 + 0.2 }}
                  viewport={{ once: true }}
                >
                  {stat.prefix}
                  {stat.value.toLocaleString()}
                  {stat.suffix}
                </motion.div>
                <p className="text-sm text-neutral-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="py-20 bg-primary-400">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-neutral-950 mb-4">Be Part of Our Story</h2>
            <p className="text-lg text-neutral-800 mb-8 max-w-2xl mx-auto">
              Join us as we continue building SLO's premier professional network for the next generation.
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                asChild
              >
                <Link href="/membership">Become a Member</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
              >
                <Link href="/board">Meet the Board</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
