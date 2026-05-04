import { useEffect, useRef } from 'react';
import { Clock, RefreshCw, Shield, TrendingUp } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    icon: Clock,
    title: 'Fast Delivery',
    description: 'Standard delivery in 3-5 days. Rush delivery available for tight deadlines.',
  },
  {
    icon: RefreshCw,
    title: 'Free Revisions',
    description: 'Up to 3 rounds of revisions included. Your satisfaction is the priority.',
  },
  {
    icon: Shield,
    title: 'Secure Process',
    description: 'Your files are handled with complete confidentiality. Secure cloud delivery.',
  },
  {
    icon: TrendingUp,
    title: 'Results Driven',
    description: 'Every edit is optimized for engagement — not just aesthetics, but performance.',
  },
];

export default function WhyARS() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.why-title',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );

      gsap.fromTo(
        '.why-card',
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, duration: 0.6, stagger: 0.1,
          scrollTrigger: { trigger: '.why-grid', start: 'top 80%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32">
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#7C3AED]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <span className="why-title opacity-0 text-xs tracking-[0.3em] uppercase text-[#7C3AED] font-medium">
              Why ARS
            </span>
            <h2 className="why-title opacity-0 mt-4 text-3xl sm:text-4xl font-bold text-white leading-tight">
              Not Just an Editor —{' '}
              <span className="text-[#7C3AED]">A Creative Partner</span>
            </h2>
            <p className="why-title opacity-0 mt-6 text-white/50 leading-relaxed max-w-md">
              I do not just cut clips together. I study your brand, understand your audience, and craft videos that actually perform. Every project gets the same attention to detail — whether it is a single reel or a full brand campaign.
            </p>

            <div className="why-title opacity-0 mt-8">
              <img
                src="/profile-pic.png"
                alt="Anas Rajput"
                className="w-16 h-16 rounded-full border-2 border-[#7C3AED]/50 object-cover"
              />
              <div className="mt-3">
                <div className="text-sm font-medium text-white">Anas Rajput</div>
                <div className="text-xs text-white/40">Founder & Lead Editor, ARS Studio</div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="why-grid grid sm:grid-cols-2 gap-4">
            {reasons.map((reason, i) => (
              <div
                key={i}
                className="why-card opacity-0 glass rounded-xl p-6 hover:border-[#7C3AED]/30 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#7C3AED]/10 flex items-center justify-center mb-4 group-hover:bg-[#7C3AED]/20 transition-colors">
                  <reason.icon className="w-5 h-5 text-[#7C3AED]" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-2">{reason.title}</h3>
                <p className="text-xs text-white/40 leading-relaxed">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
