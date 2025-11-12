'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const sectors = ['AI/ML', 'FinTech', 'HealthTech', 'EdTech', 'AgriTech', 'SpaceTech', 'CleanTech', 'DeepTech', 'ConsumerTech', 'Logistics'];
const stages = ['Idea', 'Prototype', 'MVP', 'Growth', 'Scale'];

export default function CreateVenture() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [profile, setProfile] = useState(null);
  const [venture, setVenture] = useState({
    title: '',
    tagline: '',
    description: '',
    sector: 'AI/ML',
    stage: 'Idea',
    fundingTarget: '',
    teamSize: '1-5',
    website: '',
    pitch: '',
    vision: ''
  });

  useEffect(() => {
    const userProfile = localStorage.getItem('userProfile');
    if (!userProfile) {
      toast.error('Please create your profile first');
      router.push('/profile');
    } else {
      setProfile(JSON.parse(userProfile));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!venture.title || !venture.tagline || !venture.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    
    const ventureData = {
      ...venture,
      id: `v_${Date.now()}`,
      founder: profile.name,
      founderEmail: profile.email,
      location: profile.location,
      timestamp: Date.now(),
      pulse: 0,
      investors: []
    };

    const existing = JSON.parse(localStorage.getItem('ventures') || '[]');
    existing.push(ventureData);
    localStorage.setItem('ventures', JSON.stringify(existing));
    
    toast.success('Venture launched successfully!');
    router.push('/explore');
  };

  const update = (field, value) => {
    setVenture(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="theme-bg theme-text min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold gradient-text mb-4">Launch Your Venture</h1>
          <p className="theme-text-secondary text-lg">Transform your vision into reality</p>
        </div>

        <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2 theme-text-secondary">Venture Name*</label>
              <input
                type="text"
                required
                maxLength="60"
                className="w-full px-4 py-3 rounded-xl theme-bg-secondary theme-text border theme-border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                value={venture.title}
                onChange={(e) => update('title', e.target.value)}
                placeholder="Enter a memorable name"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2 theme-text-secondary">Tagline*</label>
              <input
                type="text"
                required
                maxLength="120"
                className="w-full px-4 py-3 rounded-xl theme-bg-secondary theme-text border theme-border focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={venture.tagline}
                onChange={(e) => update('tagline', e.target.value)}
                placeholder="One line that captures your essence"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 theme-text-secondary">Sector*</label>
              <select
                className="w-full px-4 py-3 rounded-xl theme-bg-secondary theme-text border theme-border focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={venture.sector}
                onChange={(e) => update('sector', e.target.value)}
              >
                {sectors.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 theme-text-secondary">Current Stage*</label>
              <select
                className="w-full px-4 py-3 rounded-xl theme-bg-secondary theme-text border theme-border focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={venture.stage}
                onChange={(e) => update('stage', e.target.value)}
              >
                {stages.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 theme-text-secondary">Team Size</label>
              <select
                className="w-full px-4 py-3 rounded-xl theme-bg-secondary theme-text border theme-border focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={venture.teamSize}
                onChange={(e) => update('teamSize', e.target.value)}
              >
                <option value="1-5">1-5 members</option>
                <option value="6-20">6-20 members</option>
                <option value="21-50">21-50 members</option>
                <option value="50+">50+ members</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 theme-text-secondary">Funding Target</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl theme-bg-secondary theme-text border theme-border focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={venture.fundingTarget}
                onChange={(e) => update('fundingTarget', e.target.value)}
                placeholder="INR 50L seed round"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2 theme-text-secondary">Description*</label>
              <textarea
                required
                rows="4"
                maxLength="500"
                className="w-full px-4 py-3 rounded-xl theme-bg-secondary theme-text border theme-border focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                value={venture.description}
                onChange={(e) => update('description', e.target.value)}
                placeholder="What problem are you solving?"
              />
              <p className="text-sm theme-text-secondary mt-1">{venture.description.length}/500</p>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2 theme-text-secondary">Your Vision</label>
              <textarea
                rows="3"
                className="w-full px-4 py-3 rounded-xl theme-bg-secondary theme-text border theme-border focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                value={venture.vision}
                onChange={(e) => update('vision', e.target.value)}
                placeholder="Where do you see this in 5 years?"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2 theme-text-secondary">Website</label>
              <input
                type="url"
                className="w-full px-4 py-3 rounded-xl theme-bg-secondary theme-text border theme-border focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={venture.website}
                onChange={(e) => update('website', e.target.value)}
                placeholder="https://..."
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-bold text-lg hover-lift disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {submitting ? 'Launching...' : 'Launch Venture'}
          </button>
        </form>
      </div>
    </div>
  );
}