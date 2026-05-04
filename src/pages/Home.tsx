import Navigation from '@/components/Navigation';
import DottedGrid from '@/components/DottedGrid';
import Hero from '@/sections/Hero';
import HowItWorks from '@/sections/HowItWorks';
import WorkCategories from '@/sections/WorkCategories';
import WhyARS from '@/sections/WhyARS';
import Footer from '@/sections/Footer';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black">
      <DottedGrid />
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <HowItWorks />
        <WorkCategories />
        <WhyARS />
        <Footer />
      </main>
    </div>
  );
}
