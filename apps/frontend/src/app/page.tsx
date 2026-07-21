import { Navbar } from '@/components/landing/navbar';
import { Hero } from '@/components/landing/hero';
import { HowItWorks } from '@/components/landing/how-it-works';
import { Features } from '@/components/landing/features';
import { Stats } from '@/components/landing/stats';
import { FeatureShowcase } from '@/components/landing/feature-showcase';
import { QuestionsPreview } from '@/components/landing/questions-preview';
import { StudyPlanPreview } from '@/components/landing/study-plan-preview';
import { Roadmap } from '@/components/landing/roadmap';
import { FAQ } from '@/components/landing/faq';
import { CTABanner } from '@/components/landing/cta-banner';
import { Footer } from '@/components/landing/footer';

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <Stats />
      <FeatureShowcase />
      <QuestionsPreview />
      <StudyPlanPreview />
      <Roadmap />
      <FAQ />
      <CTABanner />
      <Footer />
    </main>
  );
}
