import { useParams, useNavigate } from 'react-router';
import Navigation from '@/components/Navigation';
import DottedGrid from '@/components/DottedGrid';
import Footer from '@/sections/Footer';
import { ArrowLeft, Play, ArrowRight } from 'lucide-react';

const categoryData: Record<string, {
  title: string;
  description: string;
  videoCount: number;
  startingPrice: string;
  videos: { title: string; duration: string; style: string }[];
}> = {
  reels: {
    title: 'Reels & Shorts',
    description: 'Fast-paced, scroll-stopping short-form content optimized for Instagram Reels, TikTok, and YouTube Shorts. Designed for maximum engagement in the first 3 seconds.',
    videoCount: 200,
    startingPrice: '$149',
    videos: [
      { title: 'Fashion Brand Reel', duration: '0:30', style: 'Fast-paced' },
      { title: 'Product Launch', duration: '0:45', style: 'Cinematic' },
      { title: 'Behind the Scenes', duration: '0:60', style: 'Authentic' },
      { title: 'Tutorial Reel', duration: '0:30', style: 'Clean' },
      { title: 'Event Highlights', duration: '0:45', style: 'Energetic' },
    ],
  },
  brand_films: {
    title: 'Brand Films',
    description: 'Cinematic brand stories that connect emotionally with your audience. From company culture videos to product documentaries — crafted to elevate your brand identity.',
    videoCount: 85,
    startingPrice: '$599',
    videos: [
      { title: 'Company Culture Film', duration: '2:30', style: 'Cinematic' },
      { title: 'Product Documentary', duration: '3:00', style: 'Story-driven' },
      { title: 'Founder Story', duration: '4:00', style: 'Emotional' },
      { title: 'Brand Manifesto', duration: '1:30', style: 'Powerful' },
      { title: 'Customer Story', duration: '2:00', style: 'Authentic' },
    ],
  },
  ads: {
    title: 'Ads & Commercials',
    description: 'High-performing video ads optimized for conversions. Facebook, Instagram, YouTube, and TikTok ads that stop the scroll and drive action.',
    videoCount: 150,
    startingPrice: '$299',
    videos: [
      { title: 'Facebook Ad', duration: '0:30', style: 'Direct' },
      { title: 'YouTube Pre-roll', duration: '0:15', style: 'Hook-based' },
      { title: 'Instagram Story Ad', duration: '0:15', style: 'Vertical' },
      { title: 'TikTok Spark Ad', duration: '0:30', style: 'Native' },
      { title: 'Product Demo Ad', duration: '0:45', style: 'Clean' },
    ],
  },
  color_grading: {
    title: 'Color Grading',
    description: 'Professional color correction and cinematic color grading. Transform flat footage into stunning, filmic visuals with a consistent look across all your content.',
    videoCount: 150,
    startingPrice: '$199',
    videos: [
      { title: 'Cinematic Look', duration: 'Project', style: 'Teal & Orange' },
      { title: 'Warm Tones', duration: 'Project', style: 'Golden Hour' },
      { title: 'Cool Mood', duration: 'Project', style: 'Blue Grade' },
      { title: 'Vintage Film', duration: 'Project', style: 'Retro' },
      { title: 'High Contrast', duration: 'Project', style: 'Dramatic' },
    ],
  },
  motion_graphics: {
    title: 'Motion Graphics',
    description: 'Dynamic motion graphics, kinetic typography, logo animations, and visual effects. Make your brand visuals stand out with custom animated elements.',
    videoCount: 120,
    startingPrice: '$249',
    videos: [
      { title: 'Logo Animation', duration: '0:10', style: 'Modern' },
      { title: 'Title Sequence', duration: '0:30', style: 'Cinematic' },
      { title: 'Explainer Graphics', duration: '1:00', style: 'Clean' },
      { title: 'Social Media Pack', duration: 'Various', style: 'Trendy' },
      { title: 'Lower Thirds Set', duration: 'Various', style: 'Professional' },
    ],
  },
  documentary: {
    title: 'Documentary',
    description: 'Long-form documentary editing with compelling narrative structure. Interviews, B-roll weaving, and emotional pacing that keeps viewers engaged.',
    videoCount: 40,
    startingPrice: '$899',
    videos: [
      { title: 'Short Documentary', duration: '10:00', style: 'Narrative' },
      { title: 'Interview Edit', duration: '8:00', style: 'Conversational' },
      { title: 'Travel Doc', duration: '15:00', style: 'Cinematic' },
      { title: 'Event Coverage', duration: '20:00', style: 'Dynamic' },
      { title: 'Mini Series', duration: 'Series', style: 'Serialized' },
    ],
  },
  showreel: {
    title: 'Showreels',
    description: 'Impactful showreels that showcase your best work. Fast-paced montages with perfect sync to music — designed to leave a lasting impression.',
    videoCount: 60,
    startingPrice: '$399',
    videos: [
      { title: 'Portfolio Reel', duration: '1:30', style: 'Dynamic' },
      { title: 'Demo Reel', duration: '2:00', style: 'High-energy' },
      { title: 'Year in Review', duration: '3:00', style: 'Emotional' },
      { title: 'Agency Reel', duration: '1:00', style: 'Premium' },
      { title: 'Personal Brand Reel', duration: '1:30', style: 'Cinematic' },
    ],
  },
};

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const category = slug ? categoryData[slug] : null;

  if (!category) {
    return (
      <div className="relative min-h-screen bg-black">
        <DottedGrid />
        <Navigation />
        <main className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Category Not Found</h1>
            <button onClick={() => navigate('/')} className="btn-primary">Back to Home</button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black">
      <DottedGrid />
      <Navigation />

      <main className="relative z-10 pt-28 pb-20">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <button
            onClick={() => navigate('/portfolio')}
            className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </button>

          <div className="glass rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#7C3AED]/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-xs tracking-[0.3em] uppercase text-[#7C3AED] font-medium">Category</span>
                <span className="text-xs text-white/30">{category.videoCount}+ projects delivered</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{category.title}</h1>
              <p className="text-white/50 max-w-2xl leading-relaxed mb-6">{category.description}</p>

              <div className="flex flex-wrap items-center gap-4">
                <div className="glass rounded-xl px-4 py-2">
                  <span className="text-xs text-white/40">Starting from</span>
                  <span className="text-lg font-bold text-white ml-2">{category.startingPrice}</span>
                </div>
                <button
                  onClick={() => navigate(`/start-project?category=${slug}`)}
                  className="btn-primary flex items-center gap-2"
                >
                  Create Something Like This
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Video Grid */}
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-lg font-semibold text-white mb-6">Example Work</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.videos.map((video, i) => (
              <div
                key={i}
                className="glass rounded-2xl overflow-hidden group cursor-pointer hover:border-[#7C3AED]/30 transition-all duration-500"
              >
                <div className="aspect-video bg-black relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/10 to-transparent" />
                  <div className="w-14 h-14 rounded-full bg-[#7C3AED]/20 flex items-center justify-center group-hover:bg-[#7C3AED]/40 transition-colors">
                    <Play className="w-5 h-5 text-[#7C3AED] ml-1" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-medium text-white mb-1">{video.title}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-white/30">{video.duration}</span>
                    <span className="text-xs text-[#7C3AED]/60">{video.style}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-7xl mx-auto px-6 mt-16">
          <div className="glass rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold text-white mb-2">Ready to create?</h3>
            <p className="text-white/40 mb-6">Start your {category.title.toLowerCase()} project today.</p>
            <button
              onClick={() => navigate(`/start-project?category=${slug}`)}
              className="btn-primary"
            >
              Start Your Project
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
