import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { ArrowRight, Play } from 'lucide-react';
import gsap from 'gsap';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-label',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.hero-title',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.4, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.hero-sub',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.6, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.hero-supporting',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.8, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.hero-cta',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.hero-card',
        { opacity: 0, scale: 0.9, x: 50 },
        { opacity: 1, scale: 1, x: 0, duration: 1.2, delay: 0.5, ease: 'power3.out' }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Mouse-tracking glow effect on the video card
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 30;
      card.style.setProperty('--glow-x', `${x}px`);
      card.style.setProperty('--glow-y', `${y}px`);
    };

    card.addEventListener('mousemove', handleMouseMove);
    return () => card.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-[#7C3AED]/10" />
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[#7C3AED]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#7C3AED]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Column */}
          <div ref={leftRef} className="space-y-6">
            <div className="hero-label opacity-0">
              <span className="text-xs tracking-[0.3em] uppercase text-white/40 font-medium">
                ARS Studio
              </span>
            </div>

            <h1 className="hero-title opacity-0">
              <span className="block text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05]">
                Anas Rajput
              </span>
            </h1>

            <p className="hero-sub opacity-0 text-lg sm:text-xl text-white/70 max-w-md leading-relaxed">
              Cinematic video editing and motion design built to elevate your brand.
            </p>

            <p className="hero-supporting opacity-0 text-sm text-white/40 max-w-sm">
              From reels to brand films — everything is designed with purpose.
            </p>

            <div className="hero-cta opacity-0 flex flex-wrap gap-4 pt-4">
              <Link
                to="/start-project"
                className="btn-primary inline-flex items-center gap-2 group"
              >
                Start Your Project
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <button
                onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-secondary inline-flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                View Portfolio
              </button>
            </div>

            {/* Stats */}
            <div className="hero-cta opacity-0 flex gap-8 pt-8 border-t border-white/5">
              <div>
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-xs text-white/40 uppercase tracking-wider">Projects</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">120+</div>
                <div className="text-xs text-white/40 uppercase tracking-wider">Clients</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#7C3AED]">4.9</div>
                <div className="text-xs text-white/40 uppercase tracking-wider">Rating</div>
              </div>
            </div>
          </div>

          {/* Right Column — Video Portal */}
          <div className="hero-card opacity-0 relative">
            <div
              ref={cardRef}
              className="relative rounded-2xl overflow-hidden"
              style={{
                boxShadow: 'inset 0 0 60px rgba(124, 58, 237, 0.15), 0 0 80px rgba(124, 58, 237, 0.2)',
                transform: 'translate(var(--glow-x, 0px), var(--glow-y, 0px))',
                transition: 'transform 0.3s ease-out',
              }}
            >
              {/* Glass frame */}
              <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none z-10" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#7C3AED]/5 to-transparent pointer-events-none z-10" />

              {/* Video */}
              <video
                ref={videoRef}
                src="/hero-video.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full aspect-video object-cover rounded-2xl"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none z-10" />

              {/* Floating badge */}
              <div className="absolute bottom-4 left-4 z-20 glass rounded-lg px-3 py-2 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-white/80 font-medium">Available for projects</span>
              </div>
            </div>

            {/* Floating decorative elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#7C3AED]/20 rounded-full blur-xl pointer-events-none" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#7C3AED]/10 rounded-full blur-2xl pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
