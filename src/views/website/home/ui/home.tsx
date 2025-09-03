// src/views/home/ui/home-view.tsx
import { mockEvents, mockStats } from '@/shared/lib/mock-data';
import { WebsiteHomeHero } from '@/widgets/website';
import { WebsiteHomeEvents } from '@/widgets/website';
import { WebsiteHomeBenefits } from '@/widgets/website';
import { WebsiteHomeSocialProof } from '@/widgets/website';
import { WebsiteHomeCta } from '@/widgets/website';

export async function WebsiteHomeView() {
  return (
    <>
      <WebsiteHomeHero stats={mockStats} />
      <WebsiteHomeEvents events={mockEvents.slice(0, 3)} />
      <WebsiteHomeBenefits />
      <WebsiteHomeSocialProof />
      <WebsiteHomeCta />
    </>
  );
}
