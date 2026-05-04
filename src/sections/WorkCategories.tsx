import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    title: 'Reels & Shorts',
    slug: 'reels',
    description: 'Fast-paced, scroll-stopping short-form content optimized for Instagram, TikTok, and YouTube Shorts.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=450&fit=crop',
    count: 200,
  },
  {
    title: 'Brand Films',
    slug: 'brand_films',
    description: 'Cinematic brand stories that connect emotionally with your audience and elevate your brand identity.',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=450&fit=crop',
    count: 85,
  },
  {
    title: 'Color Grading',
    slug: 'color_grading',
    description: 'Professional color correction and cinematic color grading that gives your footage a premium, filmic look.',
    image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&h=450&fit=crop',
    count: 150,
  },
  {
    title: 'Motion Graphics',
    slug: 'motion_graphics',
    description: 'Dynamic motion graphics, kinetic typography, and visual effects that make your content stand out.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=450&fit=crop',
    count: 120,
  },
];

export default function WorkCategories() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.work-title',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );

      gsap.fromTo(
        '.work-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.15,
          scrollTrigger: { trigger: '.work-grid', start: 'top 80%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={sectionRef} className="relative py-32">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#7C3AED]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <span className="work-title opacity-0 text-xs tracking-[0.3em] uppercase text-[#7C3AED] font-medium">
            Portfolio
          </span>
          <h2 className="work-title opacity-0 mt-4 text-3xl sm:text-4xl font-bold text-white">
            What I Create
          </h2>
          <p className="work-title opacity-0 mt-4 text-white/40 max-w-lg">
            Specialized in video editing and motion design across multiple formats and industries.
          </p>
        </div>

        <div className="work-grid grid sm:grid-cols-2 gap-6">
          {categories.map((cat, i) => (
            <div
              key={i}
              onClick={() => navigate(`/category/${cat.slug}`)}
              className="work-card opacity-0 group relative rounded-2xl overflow-hidden cursor-pointer"
            >
              {/* Image */}
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#7C3AED]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-[#7C3AED] transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-sm text-white/50 max-w-xs line-clamp-2 group-hover:text-white/70 transition-colors">
                      {cat.description}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xs text-white/30">{cat.count}+ projects</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
