import { useNavigate } from 'react-router';
import Navigation from '@/components/Navigation';
import DottedGrid from '@/components/DottedGrid';
import Footer from '@/sections/Footer';
import { Play, ArrowRight, Filter } from 'lucide-react';
import { useState } from 'react';

const categories = [
  { slug: 'reels', label: 'Reels & Shorts', count: 200 },
  { slug: 'brand_films', label: 'Brand Films', count: 85 },
  { slug: 'ads', label: 'Ads & Commercials', count: 150 },
  { slug: 'color_grading', label: 'Color Grading', count: 150 },
  { slug: 'motion_graphics', label: 'Motion Graphics', count: 120 },
  { slug: 'documentary', label: 'Documentary', count: 40 },
  { slug: 'showreel', label: 'Showreels', count: 60 },
];

const portfolioItems = [
  { title: 'Luxury Brand Film', category: 'brand_films', client: 'Maison Luxe', style: 'Cinematic', image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=450&fit=crop' },
  { title: 'Fitness App Reel', category: 'reels', client: 'FitPro', style: 'Fast-paced', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=450&fit=crop' },
  { title: 'Tech Product Launch', category: 'ads', client: 'NexGen', style: 'Clean', image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800&h=450&fit=crop' },
  { title: 'Travel Documentary', category: 'documentary', client: 'Wanderlust', style: 'Story-driven', image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=450&fit=crop' },
  { title: 'Restaurant Brand Film', category: 'brand_films', client: 'Gusto', style: 'Warm', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=450&fit=crop' },
  { title: 'Fashion Color Grade', category: 'color_grading', client: 'Vogue Edit', style: 'Teal & Orange', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=450&fit=crop' },
  { title: 'SaaS Explainer', category: 'motion_graphics', client: 'CloudSync', style: 'Modern', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop' },
  { title: 'Agency Showreel', category: 'showreel', client: 'Pixel Agency', style: 'High-energy', image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&h=450&fit=crop' },
  { title: 'Crypto Ad Campaign', category: 'ads', client: 'BlockVault', style: 'Futuristic', image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=450&fit=crop' },
];

export default function Portfolio() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filtered = activeFilter === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeFilter);

  return (
    <div className="relative min-h-screen bg-black">
      <DottedGrid />
      <Navigation />

      <main className="relative z-10 pt-28 pb-20">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <span className="text-xs tracking-[0.3em] uppercase text-[#7C3AED] font-medium">Portfolio</span>
          <h1 className="mt-3 text-3xl md:text-4xl font-bold text-white">Selected Work</h1>
          <p className="mt-3 text-white/40 max-w-lg">
            A curated selection of projects across different styles and industries. Each one crafted with attention to detail and purpose.
          </p>
        </div>

        {/* Filters */}
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            <Filter className="w-4 h-4 text-white/30 flex-shrink-0" />
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all duration-300 ${
                activeFilter === 'all'
                  ? 'bg-[#7C3AED]/20 border border-[#7C3AED]/40 text-white'
                  : 'bg-white/5 border border-white/10 text-white/50 hover:border-white/20'
              }`}
            >
              All Work
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveFilter(cat.slug)}
                className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all duration-300 ${
                  activeFilter === cat.slug
                    ? 'bg-[#7C3AED]/20 border border-[#7C3AED]/40 text-white'
                    : 'bg-white/5 border border-white/10 text-white/50 hover:border-white/20'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, i) => (
              <div
                key={i}
                onClick={() => navigate(`/category/${item.category}`)}
                className="group relative rounded-2xl overflow-hidden cursor-pointer glass hover:border-[#7C3AED]/30 transition-all duration-500"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute inset-0 bg-[#7C3AED]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-[#7C3AED]/30 flex items-center justify-center backdrop-blur-sm">
                      <Play className="w-5 h-5 text-white ml-1" />
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-white group-hover:text-[#7C3AED] transition-colors">
                      {item.title}
                    </h3>
                    <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-[#7C3AED] group-hover:translate-x-1 transition-all" />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-white/30">{item.client}</span>
                    <span className="text-xs text-[#7C3AED]/60">{item.style}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-white/40">No projects in this category yet.</p>
            </div>
          )}
        </div>

        {/* Category Cards */}
        <div className="max-w-7xl mx-auto px-6 mt-20">
          <h2 className="text-lg font-semibold text-white mb-6">Browse by Category</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <div
                key={cat.slug}
                onClick={() => navigate(`/category/${cat.slug}`)}
                className="glass rounded-xl p-5 cursor-pointer hover:border-[#7C3AED]/30 transition-all duration-300 group"
              >
                <h3 className="text-sm font-medium text-white group-hover:text-[#7C3AED] transition-colors mb-1">
                  {cat.label}
                </h3>
                <p className="text-xs text-white/30">{cat.count}+ projects</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
