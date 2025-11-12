'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    expertise: '',
    location: 'Mumbai',
    role: 'founder',
    linkedin: '',
    twitter: ''
  });

  useEffect(() => {
    const saved = localStorage.getItem('userProfile');
    if (saved) {
      const data = JSON.parse(saved);
      setProfile(data);
      setFormData(data);
    } else {
      setIsEditing(true);
    }
  }, []);

  const handleSave = () => {
    if (!formData.name || !formData.email) {
      toast.error('Name and email are required');
      return;
    }
    
    localStorage.setItem('userProfile', JSON.stringify(formData));
    setProfile(formData);
    setIsEditing(false);
    toast.success('Profile updated successfully');
    
    if (!profile) {
      router.push('/create');
    }
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isEditing) {
    return (
      <div className="theme-bg theme-text min-h-screen py-12">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-8">{profile ? 'Edit Profile' : 'Create Your Profile'}</h1>
          
          <div className="glass rounded-2xl p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 theme-text-secondary">Full Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl theme-bg-secondary theme-text border theme-border focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="Ravi Sharma"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 theme-text-secondary">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-xl theme-bg-secondary theme-text border theme-border focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="ravi@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 theme-text-secondary">Role</label>
                <select
                  className="w-full px-4 py-3 rounded-xl theme-bg-secondary theme-text border theme-border focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.role}
                  onChange={(e) => updateField('role', e.target.value)}
                >
                  <option value="founder">Founder</option>
                  <option value="investor">Investor</option>
                  <option value="mentor">Mentor</option>
                  <option value="developer">Developer</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 theme-text-secondary">Location</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl theme-bg-secondary theme-text border theme-border focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.location}
                  onChange={(e) => updateField('location', e.target.value)}
                  placeholder="Mumbai, Maharashtra"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2 theme-text-secondary">Bio</label>
                <textarea
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl theme-bg-secondary theme-text border theme-border focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.bio}
                  onChange={(e) => updateField('bio', e.target.value)}
                  placeholder="Tell us about yourself..."
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2 theme-text-secondary">Expertise</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl theme-bg-secondary theme-text border theme-border focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.expertise}
                  onChange={(e) => updateField('expertise', e.target.value)}
                  placeholder="AI/ML, Product Design, Growth Marketing"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 theme-text-secondary">LinkedIn</label>
                <input
                  type="url"
                  className="w-full px-4 py-3 rounded-xl theme-bg-secondary theme-text border theme-border focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.linkedin}
                  onChange={(e) => updateField('linkedin', e.target.value)}
                  placeholder="https://linkedin.com/in/..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 theme-text-secondary">Twitter</label>
                <input
                  type="url"
                  className="w-full px-4 py-3 rounded-xl theme-bg-secondary theme-text border theme-border focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.twitter}
                  onChange={(e) => updateField('twitter', e.target.value)}
                  placeholder="https://twitter.com/..."
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="flex-1 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover-lift"
              >
                Save Profile
              </button>
              {profile && (
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setFormData(profile);
                  }}
                  className="px-6 py-3 rounded-xl border theme-border theme-text font-semibold hover-lift"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="theme-bg theme-text min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No profile yet</h2>
          <button
            onClick={() => setIsEditing(true)}
            className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold"
          >
            Create Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="theme-bg theme-text min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-6">
        <div className="glass rounded-2xl p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">{profile.name}</h1>
              <p className="theme-text-secondary">{profile.email}</p>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 rounded-xl border theme-border theme-text font-semibold hover-lift"
            >
              Edit Profile
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-2 theme-text-secondary">Role</h3>
              <p className="capitalize">{profile.role}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 theme-text-secondary">Location</h3>
              <p>{profile.location}</p>
            </div>
            <div className="md:col-span-2">
              <h3 className="font-semibold mb-2 theme-text-secondary">Bio</h3>
              <p>{profile.bio || 'No bio provided'}</p>
            </div>
            <div className="md:col-span-2">
              <h3 className="font-semibold mb-2 theme-text-secondary">Expertise</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {(profile.expertise || '').split(',').map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-full theme-bg-secondary text-sm">
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex gap-4 mt-8">
            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" className="theme-accent hover:underline">
                LinkedIn
              </a>
            )}
            {profile.twitter && (
              <a href={profile.twitter} target="_blank" className="theme-accent hover:underline">
                Twitter
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}