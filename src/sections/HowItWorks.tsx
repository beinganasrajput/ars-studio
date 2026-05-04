import { useEffect, useRef } from 'react';
import { Layout, Wallet, Zap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: Layout,
    number: '01',
    title: 'Pick Your Style',
    description: 'Browse my portfolio and choose the editing style that matches your vision — cinematic, fast-paced, or clean and minimal.',
  },
  {
    icon: Wallet,
    number: '02',
    title: 'Set Your Budget',
    description: 'Select a package that fits your needs. Transparent pricing with no hidden fees — you always know what you are getting.',
  },
  {
    icon: Zap,
    number: '03',
    title: 'Get Your Edit',
    description: 'I handle everything from structure to color grade. Review drafts, request revisions, and receive your final delivery.',
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.process-title',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.process-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.2,
          scrollTrigger: {
            trigger: '.process-cards',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#7C3AED]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="process-title opacity-0 text-xs tracking-[0.3em] uppercase text-[#7C3AED] font-medium">
            How It Works
          </span>
          <h2 className="process-title opacity-0 mt-4 text-3xl sm:text-4xl font-bold text-white">
            Simple Process, Powerful Results
          </h2>
          <p className="process-title opacity-0 mt-4 text-white/40 max-w-lg mx-auto">
            Three steps to transform your raw footage into polished, professional content.
          </p>
        </div>

        <div className="process-cards grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div
              key={i}
              className="process-card opacity-0 glass rounded-2xl p-8 hover:border-[#7C3AED]/30 transition-all duration-500 group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center group-hover:bg-[#7C3AED]/20 transition-colors">
                  <step.icon className="w-5 h-5 text-[#7C3AED]" />
                </div>
                <span className="text-4xl font-bold text-white/5 group-hover:text-[#7C3AED]/10 transition-colors">
                  {step.number}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">{step.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
