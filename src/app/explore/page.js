'use client';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { fetchVentures, amplifyPulse } from '@/lib/kv-store';
import toast from 'react-hot-toast';

const sectorFilters = [
  { id: 'all', label: 'All Sectors', glow: 'cyan' },
  { id: 'AI/ML', label: 'AI/ML', glow: 'blue' },
  { id: 'FinTech', label: 'FinTech', glow: 'green' },
  { id: 'HealthTech', label: 'HealthTech', glow: 'red' },
  { id: 'EdTech', label: 'EdTech', glow: 'yellow' },
  { id: 'SpaceTech', label: 'SpaceTech', glow: 'purple' },
  { id: 'CleanTech', label: 'CleanTech', glow: 'emerald' }
];

export default function ExploreVentures() {
  const [ventures, setVentures] = useState([]);
  const [filteredVentures, setFilteredVentures] = useState([]);
  const [activeSector, setActiveSector] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    loadVentures();
    initializeMatrix();
  }, []);

  useEffect(() => {
    if (activeSector === 'all') {
      setFilteredVentures(ventures);
    } else {
      setFilteredVentures(ventures.filter(v => v.sector === activeSector));
    }
  }, [activeSector, ventures]);

  const loadVentures = async () => {
    setIsLoading(true);
    try {
      const data = await fetchVentures();
      setVentures(data);
      setFilteredVentures(data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load ventures');
    } finally {
      setIsLoading(false);
    }
  };

  const initializeMatrix = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0F0';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 35);
    return () => clearInterval(interval);
  };

  const handlePulse = async (ventureId) => {
    try {
      await amplifyPulse(ventureId);
      toast.success('Pulse amplified!');
      loadVentures();
    } catch (err) {
      console.error(err);
    }
  };

  const getStageColor = (stage) => {
    const colors = {
      'Ideation': 'from-yellow-500 to-orange-500',
      'Prototype': 'from-blue-500 to-cyan-500',
      'Validation': 'from-purple-500 to-pink-500',
      'Scaling': 'from-green-500 to-emerald-500'
    };
    return colors[stage] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <canvas
        ref={canvasRef}
        className="fixed inset-0 opacity-10 pointer-events-none"
      />

      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20 pointer-events-none" />

      <div className="relative z-10">
        <nav className="border-b border-cyan-500/30 backdrop-blur-md bg-black/50 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold">
                <span className="text-cyan-400">Cyber</span>
                <span className="text-purple-400">Sculptors</span>
              </Link>
              <Link href="/create">
                <button className="px-6 py-2 border border-cyan-500 text-cyan-400 rounded-full hover:bg-cyan-500/20 transition-all">
                  + Add Venture
                </button>
              </Link>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h1 className="text-7xl md:text-8xl font-bold mb-4">
              <span className="inline-block animate-pulse bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                INNOVATION
              </span>
              <br />
              <span className="text-5xl md:text-6xl text-gray-400">
                MATRIX
              </span>
            </h1>
            <p className="text-cyan-400 text-xl font-mono mt-4">
              &lt;ventures&gt;{filteredVentures.length}&lt;/ventures&gt;
            </p>
          </div>

          <div className="flex justify-center gap-3 mb-12 flex-wrap">
            {sectorFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveSector(filter.id)}
                className={`px-6 py-2 rounded-full border-2 transition-all duration-300 ${
                  activeSector === filter.id
                    ? `bg-${filter.glow}-500/20 border-${filter.glow}-400 shadow-lg shadow-${filter.glow}-500/50`
                    : 'border-gray-700 hover:border-gray-500'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-cyan-500 rounded-full animate-ping" />
                <div className="w-20 h-20 border-4 border-purple-500 rounded-full animate-ping absolute top-0 animation-delay-200" />
                <div className="w-20 h-20 border-4 border-pink-500 rounded-full animate-ping absolute top-0 animation-delay-400" />
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVentures.map((venture, idx) => (
                <div
                  key={venture.id}
                  className="group relative"
                  onMouseEnter={() => setHoveredCard(venture.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    animation: `slideInUp 0.5s ease-out ${idx * 0.05}s both`
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                  
                  <div className="relative bg-gray-900/80 backdrop-blur-md border border-gray-800 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300">
                    {venture.coverImage && (
                      <div className="h-48 overflow-hidden bg-gradient-to-br from-purple-900 to-blue-900">
                        <img 
                          src={venture.coverImage}
                          alt={venture.title}
                          className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                      </div>
                    )}

                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <span className={`px-3 py-1 text-xs rounded-full bg-gradient-to-r ${getStageColor(venture.stage)} text-white font-semibold`}>
                          {venture.stage}
                        </span>
                        {venture.seeking && (
                          <span className="px-3 py-1 text-xs rounded-full bg-green-500/20 border border-green-500 text-green-400 animate-pulse">
                            FUNDING
                          </span>
                        )}
                      </div>

                      <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
                        {venture.title}
                      </h3>

                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {venture.tagline}
                      </p>

                      <div className="mb-4">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            {venture.location}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                            </svg>
                            {venture.teamSize}
                          </span>
                        </div>
                      </div>

                      {hoveredCard === venture.id && (
                        <div className="mb-4 overflow-hidden">
                          <p className="text-xs text-gray-300 line-clamp-3">
                            {venture.description}
                          </p>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                        <div className="flex items-center gap-2">
                          <div className="text-2xl font-bold text-purple-400">
                            {venture.pulse || 0}
                          </div>
                          <span className="text-xs text-gray-500">pulse</span>
                        </div>

                        <button
                          onClick={() => handlePulse(venture.id)}
                          className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-lg hover:from-cyan-500 hover:to-purple-500 transition-all transform hover:scale-105 font-semibold flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          Amplify
                        </button>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-800">
                        <p className="text-xs text-gray-500">Founded by</p>
                        <p className="text-sm text-cyan-400">{venture.founderName}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && filteredVentures.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">
                <svg className="w-24 h-24 mx-auto text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <p className="text-2xl text-gray-500">No ventures in this sector yet</p>
              <p className="text-gray-600 mt-2">Be the first to launch one!</p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        
        .line-clamp-3 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
      `}</style>
    </div>
  );
}