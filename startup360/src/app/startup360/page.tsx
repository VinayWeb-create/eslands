import { ChevronRight } from 'lucide-react';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { AgencyVsEcosystem } from '@/components/startup360/compare/AgencyVsEcosystem';
import { FinalCta } from '@/components/startup360/cta/FinalCta';
import { EcosystemOS } from '@/components/startup360/ecosystem/EcosystemOS';
import { GrowthEngine } from '@/components/startup360/engine/GrowthEngine';
import { FaqSection } from '@/components/startup360/faq/FaqSection';
import { Hero } from '@/components/startup360/hero/Hero';
import { IndustrySolutions } from '@/components/startup360/industries/IndustrySolutions';
import { StartupJourney } from '@/components/startup360/journey/StartupJourney';
import { SuccessRoadmap } from '@/components/startup360/roadmap/SuccessRoadmap';
import { ServicesExplorer } from '@/components/startup360/services/ServicesExplorer';
import { WhyOnebridge } from '@/components/startup360/why/WhyOnebridge';
import { breadcrumbItems, startup360JsonLd, startup360Metadata } from '@/lib/seo';

export const metadata = startup360Metadata;

/**
 * Startup360 — server component shell. Each section is a client island;
 * metadata + JSON-LD render on the server for crawlers.
 */
export default function Startup360Page() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(startup360JsonLd()).replace(/</g, '\\u003c') }}
      />
      <ScrollProgress />
      <SiteHeader />
      <main id="main" className="relative">
        <nav aria-label="Breadcrumb" className="absolute inset-x-0 top-[78px] z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ol className="flex flex-wrap items-center gap-1 text-xs text-subtle">
            {breadcrumbItems.map((b, i) => (
              <li key={b.url} className="flex items-center gap-1">
                {i < breadcrumbItems.length - 1 ? (
                  <>
                    <a href={b.url} className="hover:text-fg">
                      {b.name}
                    </a>
                    <ChevronRight className="size-3" aria-hidden />
                  </>
                ) : (
                  <span aria-current="page" className="text-muted">
                    {b.name}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <Hero />
        <StartupJourney />
        <EcosystemOS />
        <AgencyVsEcosystem />
        <ServicesExplorer />
        <GrowthEngine />
        <IndustrySolutions />
        <SuccessRoadmap />
        <WhyOnebridge />
        <FaqSection />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
