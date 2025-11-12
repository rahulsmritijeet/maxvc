'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import toast from 'react-hot-toast';

export default function VentureCard({ venture, index }) {
  const { theme } = useTheme();
  const [pulse, setPulse] = useState(venture.pulse || 0);
  const [hasInvested, setHasInvested] = useState(false);

  const handlePulse = () => {
    const ventures = JSON.parse(localStorage.getItem('ventures') || '[]');
    const idx = ventures.findIndex(v => v.id === venture.id);
    if (idx !== -1) {
      ventures[idx].pulse = (ventures[idx].pulse || 0) + 1;
      localStorage.setItem('ventures', JSON.stringify(ventures));
      setPulse(ventures[idx].pulse);
      toast.success('Pulse amplified!');
    }
  };

  const handleInvest = () => {
    if (hasInvested) {
      toast.error('Already invested');
      return;
    }
    
    const profile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    if (!profile.email) {
      toast.error('Please create a profile first');
      return;
    }

    const ventures = JSON.parse(localStorage.getItem('ventures') || '[]');
    const idx = ventures.findIndex(v => v.id === venture.id);
    if (idx !== -1) {
      if (!ventures[idx].investors) ventures[idx].investors = [];
      ventures[idx].investors.push({
        name: profile.name,
        email: profile.email,
        timestamp: Date.now()
      });
      localStorage.setItem('ventures', JSON.stringify(ventures));
      setHasInvested(true);
      toast.success('Investment interest registered!');
    }
  };

  const getStageColor = () => {
    const colors = {
      'Idea': 'from-yellow-400 to-orange-500',
      'Prototype': 'from-blue-400 to-indigo-500',
      'MVP': 'from-green-400 to-emerald-500',
      'Growth': 'from-purple-400 to-pink-500',
      'Scale': 'from-red-400 to-rose-500'
    };
    return colors[venture.stage] || 'from-gray-400 to-gray-500';
  };

  return (
    <div 
      className={`glass rounded-2xl p-6 hover-lift transition-all ${theme === 'neon' ? 'neon-border' : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex justify-between items-start mb-4">
        <span className={`px-3 py-1 text-xs rounded-full bg-gradient-to-r ${getStageColor()} text-white font-semibold`}>
          {venture.stage}
        </span>
        <span className="theme-text-secondary text-sm">{venture.sector}</span>
      </div>

      <h3 className="text-2xl font-bold mb-2 gradient-text">{venture.title}</h3>
      <p className="theme-text-secondary mb-4">{venture.tagline}</p>
      
      <div className="space-y-2 mb-6">
        <div className="flex justify-between text-sm">
          <span className="theme-text-secondary">Team Size</span>
          <span>{venture.teamSize}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="theme-text-secondary">Location</span>
          <span>{venture.location}</span>
        </div>
        {venture.fundingTarget && (
          <div className="flex justify-between text-sm">
            <span className="theme-text-secondary">Seeking</span>
            <span className="font-semibold">{venture.fundingTarget}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-2xl font-bold theme-accent">{pulse}</div>
          <div className="text-xs theme-text-secondary">pulse</div>
        </div>
        
        <button
          onClick={handlePulse}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:scale-105 transition-transform"
        >
          Amplify
        </button>
      </div>

      <div className="pt-4 border-t theme-border space-y-3">
        <button
          onClick={handleInvest}
          disabled={hasInvested}
          className={`w-full py-2 rounded-lg font-semibold transition-all ${
            hasInvested 
              ? 'bg-green-500/20 text-green-500 cursor-not-allowed' 
              : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:scale-105'
          }`}
        >
          {hasInvested ? 'Interest Registered' : 'Invest'}
        </button>
        
        <div className="text-sm">
          <span className="theme-text-secondary">Founded by </span>
          <span className="font-semibold">{venture.founder}</span>
        </div>
        
        {venture.investors && venture.investors.length > 0 && (
          <div className="text-xs theme-text-secondary">
            {venture.investors.length} investor{venture.investors.length > 1 ? 's' : ''} interested
          </div>
        )}
      </div>
    </div>
  );
}