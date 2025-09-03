// src/views/board/ui/board-view.tsx
'use client';

import { motion } from 'motion/react';
// import { SiLinkerd } from '@icons-pack/react-simple-icons';
import { Linkedin, Mail } from 'lucide-react';
import { Container } from '@/shared/ui/container/container';
import { Section } from '@/shared/ui/section/section';
import { Card, CardContent, CardHeader } from '@/shared/ui/card/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar/avatar';
import { Badge } from '@/shared/ui/badge/badge';
import { Button } from '@/shared/ui/button/button';
import Link from 'next/link';
import { mockBoardMembers } from '@/shared/lib/mock-data';
import Image from 'next/image';

const boardPositions = [
  {
    title: 'Marketing Director',
    description: 'The Marketing Director is responsible for the overall marketing strategy and implementation of YPNG.',
  },
  {
    title: 'Events Director',
    description: 'The Events Director is responsible for the overall events strategy and implementation of YPNG.',
  },
];

const committeeRoles = [
  {
    title: 'Volunteer Coordinator',
    description:
      'The Volunteer Coordinator is responsible for the overall volunteer strategy and implementation of YPNG.',
  },
  {
    title: 'Social Media Manager',
    description:
      'The Social Media Manager is responsible for the overall social media strategy and implementation of YPNG.',
  },
  {
    title: 'Events Committee Members',
    description:
      'The Events Committee Members are responsible for the overall events strategy and implementation of YPNG.',
  },
];

export function WebsiteBoardMembersView() {
  return (
    <>
      {/* Hero Section */}
      <Section className="relative min-h-[30vh] flex items-center primary-gradient-to-br overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center" />
        </div>

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-neutral-950 mb-6">The Leaders Behind YPNG</h1>
            <p className="text-xl text-neutral-800 max-w-3xl">
              Our volunteer board members dedicate their time and expertise to growing SLO's premier young professionals
              network
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* Board Members Grid */}
      <Section className="py-20">
        <Container size="full">
          <div className="grid grid-cols-1 2xl:grid-cols-2 gap-8">
            {mockBoardMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col-reverse md:flex-row gap-6">
                      {/* Larger image on the left if even index */}
                      <div
                        className={`flex-shrink-0 order last ${index % 2 === 1 ? 'md:order-last' : 'md:order-first'}`}
                      >
                        <div className="relative w-64 h-64 lg:w-80 lg:h-80 rounded-lg overflow-hidden bg-neutral-200">
                          <Image
                            src={member.profileImage}
                            alt={`${member.firstName} ${member.lastName}`}
                            fill
                            className="object-cover transition-transform duration-7 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority
                            // unoptimized
                          />
                        </div>
                      </div>

                      {/* Content on the right if odd index */}
                      <div
                        className={`flex-1 space-y-3 order-first ${index % 2 === 1 ? ' md:order-first' : 'md:order-last'}`}
                      >
                        <div>
                          <h3 className="text-xl font-bold text-neutral-900">
                            {member.position} - {member.firstName} {member.lastName}
                          </h3>
                          <p className="font-medium text-neutral-700 mt-1">{member.title}</p>
                          <p className="text-sm text-neutral-600">{member.company}</p>
                        </div>

                        <p className="text-neutral-700 text-sm leading-relaxed">{member.bio}</p>

                        <div className="pt-3 space-y-1">
                          <p className="text-xs text-neutral-500">Committee: {member.committee}</p>
                          <p className="text-xs text-neutral-500">Term: {member.term}</p>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            asChild
                          >
                            <Link
                              href={member.linkedIn}
                              target="_blank"
                            >
                              <Linkedin className="w-4 h-4 mr-1" />
                              LinkedIn
                            </Link>
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            asChild
                          >
                            <Link href={`mailto:${member.firstName.toLowerCase()}@ypng.org`}>
                              <Mail className="w-4 h-4 mr-1" />
                              Email
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Join the Board CTA */}
      <Section className="py-20 bg-neutral-50">
        <Container>
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8 lg:p-12 text-center">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">Join Our Leadership Team</h2>
              <p className="text-lg text-neutral-600 mb-6">
                We're currently seeking passionate individuals for several board and committee positions:
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-8 text-left max-w-2xl mx-auto">
                <div className="flex flex-col items-center justify-center p-4 bg-neutral-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-neutral-900">Board Positions</h4>
                    <ul className="mt-2 space-y-1 text-sm text-neutral-600">
                      {boardPositions.map((position) => (
                        <li key={position.title}>• {position.title}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-neutral-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-neutral-900">Committee Roles</h4>
                    <ul className="mt-2 space-y-1 text-sm text-neutral-600">
                      {committeeRoles.map((role) => (
                        <li key={role.title}>• {role.title}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <Button
                size="lg"
                className="bg-secondary-400 hover:bg-secondary-500 text-neutral-950"
                asChild
              >
                <Link href="mailto:info@ypng.org">Contact Us to Learn More</Link>
              </Button>
            </CardContent>
          </Card>
        </Container>
      </Section>
    </>
  );
}
