import { useState, useRef, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import Navigation from '@/components/Navigation';
import DottedGrid from '@/components/DottedGrid';
import { trpc } from '@/providers/trpc';
import {
  ArrowRight, ArrowLeft, Check, Film, Palette, Clock,
  MessageSquare, User, Mail, Phone, Send, Sparkles, Package
} from 'lucide-react';
import gsap from 'gsap';

type ProjectType = 'single' | 'bulk' | 'monthly';
type PackageType = 'standard' | 'premium' | 'agency' | 'monthly' | 'custom';
type CategoryType = 'showreel' | 'reels' | 'brand_films' | 'ads' | 'documentary' | 'color_grading' | 'motion_graphics';

const categories: { value: CategoryType; label: string }[] = [
  { value: 'reels', label: 'Reels & Shorts' },
  { value: 'brand_films', label: 'Brand Films' },
  { value: 'ads', label: 'Ads & Commercials' },
  { value: 'color_grading', label: 'Color Grading' },
  { value: 'motion_graphics', label: 'Motion Graphics' },
  { value: 'documentary', label: 'Documentary' },
  { value: 'showreel', label: 'Showreel' },
];

const moods = [
  'Cinematic', 'Fast-paced', 'Minimal', 'Energetic',
  'Emotional', 'Professional', 'Fun', 'Dark & Moody',
];

export default function StartProject() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const preselectedPkg = searchParams.get('package') as PackageType | null;

  const [formData, setFormData] = useState({
    projectType: 'single' as ProjectType,
    package: (preselectedPkg || 'standard') as PackageType,
    category: 'reels' as CategoryType,
    title: '',
    referenceLink: '',
    mood: '',
    budget: 500,
    deliveryDays: 5,
    revisions: 3,
    name: '',
    email: '',
    phone: '',
    whatsapp: '',
    notes: '',
  });

  const createProject = trpc.project.create.useMutation({
    onSuccess: () => setSubmitted(true),
  });

  useEffect(() => {
    gsap.fromTo(
      '.form-container',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );
  }, []);

  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [step]);

  const updateField = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    createProject.mutate({
      title: formData.title || `${formData.category} Project`,
      package: formData.package,
      projectType: formData.projectType,
      category: formData.category,
      budget: formData.budget,
      deliveryDays: formData.deliveryDays,
      notes: formData.notes,
      referenceLink: formData.referenceLink,
      mood: formData.mood,
    });
  };

  const steps = [
    { label: 'Type', icon: Package },
    { label: 'Style', icon: Palette },
    { label: 'Delivery', icon: Clock },
    { label: 'Details', icon: User },
  ];

  if (submitted) {
    return (
      <div className="relative min-h-screen bg-black">
        <DottedGrid />
        <Navigation />
        <main className="relative z-10 flex items-center justify-center min-h-screen px-6">
          <div className="glass rounded-2xl p-12 max-w-md w-full text-center">
            <div className="w-16 h-16 rounded-full bg-[#7C3AED]/20 flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-[#7C3AED]" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Project Submitted!</h2>
            <p className="text-white/50 mb-2">
              Thank you, {formData.name || 'there'}! Your project has been received.
            </p>
            <p className="text-white/30 text-sm mb-8">
              I will review your requirements and get back to you within 24 hours via email or WhatsApp.
            </p>
            <div className="flex flex-col gap-3">
              <button onClick={() => navigate('/')} className="btn-primary">
                Back to Home
              </button>
              <button onClick={() => navigate('/dashboard')} className="btn-secondary">
                View Dashboard
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black">
      <DottedGrid />
      <Navigation />

      <main className="relative z-10 pt-28 pb-20 px-6">
        <div className="form-container opacity-0 max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <span className="text-xs tracking-[0.3em] uppercase text-[#7C3AED] font-medium">
              Start Your Project
            </span>
            <h1 className="mt-3 text-3xl font-bold text-white">
              {preselectedPkg
                ? `You selected: ${preselectedPkg.charAt(0).toUpperCase() + preselectedPkg.slice(1)} Package`
                : 'Tell Me About Your Project'}
            </h1>
          </div>

          {/* Stepper */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                    i === step
                      ? 'bg-[#7C3AED]/20 border border-[#7C3AED]/40'
                      : i < step
                      ? 'bg-[#7C3AED]/10 border border-[#7C3AED]/20'
                      : 'bg-white/5 border border-white/5'
                  }`}
                >
                  <s.icon className={`w-4 h-4 ${i <= step ? 'text-[#7C3AED]' : 'text-white/30'}`} />
                  <span className={`text-xs font-medium ${i <= step ? 'text-white' : 'text-white/30'}`}>
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-8 h-px ${i < step ? 'bg-[#7C3AED]/40' : 'bg-white/10'}`} />
                )}
              </div>
            ))}
          </div>

          {/* Form Card */}
          <div
            ref={formRef}
            className="glass rounded-2xl p-8"
          >
            {/* Step 0: Project Type */}
            {step === 0 && (
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-white mb-3 block">Project Type</label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['single', 'bulk', 'monthly'] as ProjectType[]).map((type) => (
                      <button
                        key={type}
                        onClick={() => updateField('projectType', type)}
                        className={`p-4 rounded-xl border transition-all duration-300 ${
                          formData.projectType === type
                            ? 'border-[#7C3AED] bg-[#7C3AED]/10'
                            : 'border-white/10 bg-white/5 hover:border-white/20'
                        }`}
                      >
                        <Film className={`w-5 h-5 mx-auto mb-2 ${
                          formData.projectType === type ? 'text-[#7C3AED]' : 'text-white/40'
                        }`} />
                        <span className={`text-sm font-medium capitalize ${
                          formData.projectType === type ? 'text-white' : 'text-white/50'
                        }`}>
                          {type === 'single' ? 'Single Video' : type === 'bulk' ? 'Bulk Project' : 'Monthly'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-white mb-3 block">Package</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {(['standard', 'premium', 'agency', 'custom'] as PackageType[]).map((pkg) => (
                      <button
                        key={pkg}
                        onClick={() => updateField('package', pkg)}
                        className={`p-3 rounded-xl border transition-all duration-300 ${
                          formData.package === pkg
                            ? 'border-[#7C3AED] bg-[#7C3AED]/10'
                            : 'border-white/10 bg-white/5 hover:border-white/20'
                        }`}
                      >
                        <span className={`text-sm font-medium capitalize ${
                          formData.package === pkg ? 'text-white' : 'text-white/50'
                        }`}>
                          {pkg}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-white mb-3 block">Project Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => updateField('title', e.target.value)}
                    placeholder="e.g., Product Launch Video"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#7C3AED]/50 transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Step 1: Style */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-white mb-3 block">Category</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {categories.map((cat) => (
                      <button
                        key={cat.value}
                        onClick={() => updateField('category', cat.value)}
                        className={`p-3 rounded-xl border transition-all duration-300 ${
                          formData.category === cat.value
                            ? 'border-[#7C3AED] bg-[#7C3AED]/10'
                            : 'border-white/10 bg-white/5 hover:border-white/20'
                        }`}
                      >
                        <span className={`text-sm ${
                          formData.category === cat.value ? 'text-white' : 'text-white/50'
                        }`}>
                          {cat.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-white mb-3 block">Mood / Style</label>
                  <div className="flex flex-wrap gap-2">
                    {moods.map((mood) => (
                      <button
                        key={mood}
                        onClick={() => updateField('mood', mood)}
                        className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
                          formData.mood === mood
                            ? 'border-[#7C3AED] bg-[#7C3AED]/10 text-white'
                            : 'border-white/10 bg-white/5 text-white/50 hover:border-white/20'
                        }`}
                      >
                        <span className="text-sm">{mood}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-white mb-3 block">Reference Link (Optional)</label>
                  <input
                    type="url"
                    value={formData.referenceLink}
                    onChange={(e) => updateField('referenceLink', e.target.value)}
                    placeholder="Paste a video link that inspired you"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#7C3AED]/50 transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Delivery */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-white mb-3 block">
                    Budget Range: <span className="text-[#7C3AED]">${formData.budget}</span>
                  </label>
                  <input
                    type="range"
                    min={100}
                    max={5000}
                    step={100}
                    value={formData.budget}
                    onChange={(e) => updateField('budget', parseInt(e.target.value))}
                    className="w-full accent-[#7C3AED]"
                  />
                  <div className="flex justify-between text-xs text-white/30 mt-1">
                    <span>$100</span>
                    <span>$5,000+</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-white mb-3 block">
                    Delivery Time: <span className="text-[#7C3AED]">{formData.deliveryDays} days</span>
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={30}
                    step={1}
                    value={formData.deliveryDays}
                    onChange={(e) => updateField('deliveryDays', parseInt(e.target.value))}
                    className="w-full accent-[#7C3AED]"
                  />
                  <div className="flex justify-between text-xs text-white/30 mt-1">
                    <span>1 day</span>
                    <span>30 days</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-white mb-3 block">Revisions Needed</label>
                  <div className="flex gap-3">
                    {[1, 2, 3, 5].map((num) => (
                      <button
                        key={num}
                        onClick={() => updateField('revisions', num)}
                        className={`flex-1 py-3 rounded-xl border transition-all duration-300 ${
                          formData.revisions === num
                            ? 'border-[#7C3AED] bg-[#7C3AED]/10'
                            : 'border-white/10 bg-white/5 hover:border-white/20'
                        }`}
                      >
                        <span className={`text-sm font-medium ${
                          formData.revisions === num ? 'text-white' : 'text-white/50'
                        }`}>
                          {num}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-white mb-3 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-white/40" />
                    Additional Notes
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => updateField('notes', e.target.value)}
                    placeholder="Any specific requirements, brand guidelines, or ideas..."
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#7C3AED]/50 transition-colors resize-none"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Contact Details */}
            {step === 3 && (
              <div className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-white mb-2 flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-white/40" /> Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      placeholder="Your name"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#7C3AED]/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-white mb-2 flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-white/40" /> Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      placeholder="your@email.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#7C3AED]/50 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-white mb-2 flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-white/40" /> Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      placeholder="+1 234 567 890"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#7C3AED]/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-white mb-2 flex items-center gap-2">
                      <MessageSquare className="w-3.5 h-3.5 text-white/40" /> WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={formData.whatsapp}
                      onChange={(e) => updateField('whatsapp', e.target.value)}
                      placeholder="+1 234 567 890"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#7C3AED]/50 transition-colors"
                    />
                  </div>
                </div>

                {/* Summary */}
                <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
                  <h4 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#7C3AED]" />
                    Project Summary
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="text-white/40">Type: <span className="text-white/70 capitalize">{formData.projectType}</span></div>
                    <div className="text-white/40">Package: <span className="text-white/70 capitalize">{formData.package}</span></div>
                    <div className="text-white/40">Category: <span className="text-white/70">{categories.find(c => c.value === formData.category)?.label}</span></div>
                    <div className="text-white/40">Budget: <span className="text-white/70">${formData.budget}</span></div>
                    <div className="text-white/40">Delivery: <span className="text-white/70">{formData.deliveryDays} days</span></div>
                    <div className="text-white/40">Revisions: <span className="text-white/70">{formData.revisions}</span></div>
                    {formData.mood && (
                      <div className="text-white/40">Mood: <span className="text-white/70">{formData.mood}</span></div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
              <button
                onClick={() => setStep(Math.max(0, step - 1))}
                disabled={step === 0}
                className={`flex items-center gap-2 text-sm transition-all duration-300 ${
                  step === 0 ? 'text-white/20 cursor-not-allowed' : 'text-white/60 hover:text-white'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              {step < 3 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  className="btn-primary flex items-center gap-2"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={createProject.isPending}
                  className="btn-primary flex items-center gap-2 disabled:opacity-50"
                >
                  {createProject.isPending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit & Book Call
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
