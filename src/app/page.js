'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';

const metrics = [
  { value: 2847, label: 'Active Ventures', growth: '+23%' },
  { value: 12500, label: 'Innovators', growth: '+67%' },
  { value: 450, label: 'Investments Made', growth: '+142%' },
  { value: 89, label: 'Cities Connected', growth: '+31%' }
];

export default function HomePage() {
  const { theme } = useTheme();
  const [loaded, setLoaded] = useState(false);
  const [counters, setCounters] = useState(metrics.map(() => 0));

  useEffect(() => {
    setLoaded(true);
    const intervals = metrics.map((metric, idx) => {
      const increment = metric.value / 50;
      return setInterval(() => {
        setCounters(prev => {
          const newCounters = [...prev];
          if (newCounters[idx] < metric.value) {
            newCounters[idx] = Math.min(newCounters[idx] + increment, metric.value);
          }
          return newCounters;
        });
      }, 30);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <div className="theme-bg theme-text">
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6">
          <div className={`text-center ${loaded ? 'slide-up' : 'opacity-0'}`}>
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              <span className="block">Digital India's</span>
              <span className="gradient-text">Innovation Engine</span>
            </h1>
            
            <p className="text-xl theme-text-secondary max-w-3xl mx-auto leading-relaxed mb-12">
              Connecting visionaries, founders, and investors to build the next wave 
              of breakthrough ventures shaping Bharat's digital future.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/profile" className="px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover-lift">
                Create Your Profile
              </Link>
              <Link href="/explore" className={`px-8 py-4 rounded-full border-2 theme-border theme-text font-semibold hover-lift ${theme === 'neon' ? 'neon-border' : ''}`}>
                Explore Ventures
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mt-24">
            {metrics.map((metric, idx) => (
              <div key={idx} className={`p-6 rounded-2xl glass hover-lift ${theme === 'neon' ? 'neon-border' : ''}`}>
                <div className="text-3xl font-bold theme-accent">
                  {Math.floor(counters[idx]).toLocaleString()}
                </div>
                <div className="theme-text-secondary mt-1">{metric.label}</div>
                <div className="text-sm text-green-500 mt-2">{metric.growth} this month</div>
              </div>
            ))}
          </div>

          <div className="mt-24 text-center">
            <h2 className="text-4xl font-bold mb-12">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: '01', title: 'Build Your Profile', desc: 'Showcase your expertise, vision, and track record' },
                { step: '02', title: 'Launch or Discover', desc: 'Create ventures or explore investment opportunities' },
                { step: '03', title: 'Connect & Grow', desc: 'Network with founders, mentors, and investors' }
              ].map((item, idx) => (
                <div key={idx} className="text-left">
                  <div className="text-5xl font-bold theme-accent mb-4">{item.step}</div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="theme-text-secondary">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}