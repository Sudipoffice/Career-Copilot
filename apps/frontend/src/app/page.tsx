import { SiteHeader } from '@/components/layout/site-header';
import { Hero } from '@/components/landing/hero';
import { HowItWorks } from '@/components/landing/how-it-works';
import { Features } from '@/components/landing/features';
import { Stats } from '@/components/landing/stats';
import { FeatureShowcase } from '@/components/landing/feature-showcase';
import { QuestionsPreview } from '@/components/landing/questions-preview';
import { StudyPlanPreview } from '@/components/landing/study-plan-preview';
import { FAQ } from '@/components/landing/faq';
import { CTABanner } from '@/components/landing/cta-banner';
import { Footer } from '@/components/landing/footer';

export default function HomePage() {
  return (
    <main>
      <SiteHeader />
      <Hero />
      <HowItWorks />
      <Features />
      <Stats />
      <FeatureShowcase />
      <QuestionsPreview />
      <StudyPlanPreview />
      <FAQ />
      <CTABanner />
      <Footer />
    </main>
  );
}
