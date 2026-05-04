import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import Navigation from '@/components/Navigation';
import DottedGrid from '@/components/DottedGrid';
import Footer from '@/sections/Footer';
import { Check, Sparkles, Zap, Crown, Building2, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const packages = [
  {
    name: 'Standard',
    price: '$299',
    description: 'Perfect for creators and small businesses getting started with professional editing.',
    icon: Sparkles,
    featured: false,
    features: [
      'Up to 5 minutes final video',
      '2 revision rounds',
      '3-5 day delivery',
      'Basic color correction',
      'Standard transitions',
      'Background music',
      'HD export (1080p)',
    ],
  },
  {
    name: 'Premium',
    price: '$599',
    description: 'For brands and creators who want cinematic quality and faster turnaround.',
    icon: Zap,
    featured: true,
    features: [
      'Up to 15 minutes final video',
      '3 revision rounds',
      '2-3 day delivery',
      'Advanced color grading',
      'Custom transitions & effects',
      'Sound design included',
      '4K export',
      'Motion graphics',
      'Priority support',
    ],
  },
  {
    name: 'Agency',
    price: '$1,499',
    description: 'Full-service video production for agencies and enterprise clients.',
    icon: Building2,
    featured: false,
    features: [
      'Unlimited video length',
      'Unlimited revisions',
      '1-2 day delivery',
      'Cinematic color grade',
      'Full VFX & compositing',
      'Custom sound design',
      '4K + RAW delivery',
      'Motion graphics package',
      'Dedicated project manager',
      'Source files included',
    ],
  },
];

const monthlyAddon = {
  name: 'Monthly Retainer',
  price: '$2,999/mo',
  description: 'Ongoing video editing support for content-heavy brands and creators.',
  icon: Crown,
  features: [
    'Up to 20 videos per month',
    'Unlimited revisions',
    '48-hour turnaround',
    'Dedicated editor',
    'Brand style guide',
    'Priority queue',
    'Weekly strategy calls',
    'Analytics reporting',
  ],
};

export default function Pricing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.pricing-title',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.pricing-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.pricing-grid', start: 'top 85%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleStartProject = (pkgName: string) => {
    navigate(`/start-project?package=${pkgName.toLowerCase()}`);
  };

  return (
    <div className="relative min-h-screen bg-black">
      <DottedGrid />
      <Navigation />

      <main ref={sectionRef} className="relative z-10 pt-32 pb-20">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <span className="pricing-title opacity-0 text-xs tracking-[0.3em] uppercase text-[#7C3AED] font-medium">
            Pricing
          </span>
          <h1 className="pricing-title opacity-0 mt-4 text-4xl sm:text-5xl font-bold text-white">
            Transparent Pricing
          </h1>
          <p className="pricing-title opacity-0 mt-4 text-white/40 max-w-lg mx-auto">
            No hidden fees. No surprises. Just premium work at fair prices. Pick a package and let us get started.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="pricing-grid grid md:grid-cols-3 gap-6 mb-8">
            {packages.map((pkg, i) => (
              <div
                key={i}
                onClick={() => setSelectedPackage(selectedPackage === pkg.name ? null : pkg.name)}
                className={`pricing-card opacity-0 glass rounded-2xl p-8 transition-all duration-500 cursor-pointer ${
                  pkg.featured
                    ? 'border-[#7C3AED]/40 md:scale-105 md:-translate-y-2 glow-purple'
                    : 'hover:border-white/20'
                } ${selectedPackage === pkg.name ? 'border-[#7C3AED]/60' : ''}`}
              >
                {pkg.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#7C3AED] rounded-full text-xs font-medium text-white">
                    Most Popular
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    pkg.featured ? 'bg-[#7C3AED]/20' : 'bg-white/5'
                  }`}>
                    <pkg.icon className={`w-5 h-5 ${pkg.featured ? 'text-[#7C3AED]' : 'text-white/60'}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{pkg.name}</h3>
                </div>

                <div className="mb-4">
                  <span className="text-3xl font-bold text-white">{pkg.price}</span>
                  <span className="text-white/30 text-sm">/project</span>
                </div>

                <p className="text-sm text-white/40 mb-6 leading-relaxed">{pkg.description}</p>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, fi) => (
                    <li key={fi} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#7C3AED] mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/60">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={(e) => { e.stopPropagation(); handleStartProject(pkg.name); }}
                  className={`w-full py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                    pkg.featured
                      ? 'btn-primary'
                      : 'btn-secondary'
                  }`}
                >
                  Start Project
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Monthly Retainer */}
          <div
            onClick={() => setSelectedPackage(selectedPackage === monthlyAddon.name ? null : monthlyAddon.name)}
            className={`pricing-card opacity-0 glass rounded-2xl p-8 transition-all duration-500 cursor-pointer ${
              selectedPackage === monthlyAddon.name ? 'border-[#7C3AED]/60' : 'hover:border-white/20'
            }`}
          >
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#7C3AED]/20 flex items-center justify-center">
                    <monthlyAddon.icon className="w-5 h-5 text-[#7C3AED]" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{monthlyAddon.name}</h3>
                </div>
                <div className="mb-2">
                  <span className="text-3xl font-bold text-white">{monthlyAddon.price}</span>
                </div>
                <p className="text-sm text-white/40 leading-relaxed">{monthlyAddon.description}</p>
                <button
                  onClick={(e) => { e.stopPropagation(); handleStartProject('monthly'); }}
                  className="btn-primary mt-6 w-full flex items-center justify-center gap-2"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="md:col-span-2">
                <div className="grid sm:grid-cols-2 gap-3">
                  {monthlyAddon.features.map((feature, fi) => (
                    <div key={fi} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#7C3AED] flex-shrink-0" />
                      <span className="text-sm text-white/60">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-7xl mx-auto px-6 mt-20 text-center">
          <p className="text-white/30 text-sm">
            Not sure which package fits your needs?{' '}
            <Link to="/start-project" className="text-[#7C3AED] hover:text-[#7C3AED]/80 transition-colors">
              Start a project and we will recommend the best option.
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
