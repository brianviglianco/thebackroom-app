import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/home/HeroSection';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        
        {/* Placeholder sections - to be built out */}
        <div className="space-lg" />
        
        <section className="max-w-[1440px] mx-auto px-12">
          <div className="eyebrow">Coming Soon</div>
          <h2 className="section-title mt-2 mb-6">Full Site Under Construction</h2>
          <p className="text-cream-secondary max-w-xl leading-relaxed">
            We&apos;re building the ultimate resource for Football Manager tactics.
            Structured reviews, real win rates, and match data from the community.
            Not hype — evidence.
          </p>
        </section>
        
        <div className="space-lg" />
      </main>
      <Footer />
    </>
  );
}
