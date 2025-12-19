
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { BEATS } from '../constants';
import BeatCard from './BeatCard';
import { Beat } from '../types';

interface BeatStoreProps {
  onBeatStateChange: (isPlaying: boolean) => void;
}

const BeatStore: React.FC<BeatStoreProps> = ({ onBeatStateChange }) => {
  const [currentBeat, setCurrentBeat] = useState<Beat | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [beatToBuy, setBeatToBuy] = useState<Beat | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = (beat: Beat) => {
    if (currentBeat?.id === beat.id) {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play();
        setIsPlaying(true);
      }
    } else {
      setCurrentBeat(beat);
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.src = beat.previewUrl;
        audioRef.current.play();
      }
    }
  };

  const openPurchaseConfirm = (beat: Beat) => {
    setBeatToBuy(beat);
    setIsConfirmOpen(true);
  };

  const confirmPurchase = () => {
    // Logic for actual purchase would go here
    setIsConfirmOpen(false);
    setBeatToBuy(null);
    alert(`Deploying ${beatToBuy?.title} to your library... Secure the perimeter!`);
  };

  useEffect(() => {
    onBeatStateChange(isPlaying);
  }, [isPlaying, onBeatStateChange]);

  const filteredBeats = useMemo(() => {
    return BEATS.filter(beat => {
      const matchesSearch = beat.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          beat.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = selectedTag ? beat.tags.some(tag => tag.toLowerCase() === selectedTag.toLowerCase()) : true;
      return matchesSearch && matchesTag;
    });
  }, [searchTerm, selectedTag]);

  return (
    <section id="beats" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#22c55e 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-6 md:space-y-0">
          <div>
            <h2 className="font-syncopate text-3xl font-black text-white mb-2 uppercase tracking-tighter">
              BEAT <span className="text-green-500">ARSENAL</span>
            </h2>
            <div className="h-1 w-24 bg-green-500 mb-6"></div>
            
            {/* Search Input */}
            <div className="relative max-w-md">
              <input 
                type="text"
                placeholder="SEARCH INTEL..."
                className="w-full bg-slate-900 border border-slate-800 focus:border-green-500 text-white font-rajdhani text-sm py-3 pl-12 pr-4 outline-none transition-all military-border"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {['TRAP', 'HIP-HOP', 'PHONK'].map(tag => (
              <button 
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={`px-6 py-2 border font-syncopate text-[10px] tracking-widest transition-all uppercase ${selectedTag === tag ? 'border-green-500 text-green-500 bg-green-500/10' : 'border-slate-800 text-slate-400 hover:border-green-500/50'}`}
              >
                {tag}
              </button>
            ))}
            {selectedTag && (
              <button 
                onClick={() => setSelectedTag(null)}
                className="px-4 py-2 text-[10px] font-syncopate text-red-500 hover:text-red-400 tracking-widest uppercase"
              >
                RESET
              </button>
            )}
          </div>
        </div>

        {filteredBeats.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBeats.map(beat => (
              <BeatCard 
                key={beat.id} 
                beat={beat} 
                onPlay={handlePlay}
                isPlaying={isPlaying && currentBeat?.id === beat.id}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border border-dashed border-slate-800 bg-slate-900/50">
            <p className="font-syncopate text-slate-500 text-xs tracking-[0.3em] uppercase">No Assets Found in This Sector</p>
          </div>
        )}

        <audio 
          ref={audioRef} 
          onEnded={() => setIsPlaying(false)}
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
        />
      </div>

      {/* Confirmation Modal */}
      {isConfirmOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm" onClick={() => setIsConfirmOpen(false)}></div>
          <div className="relative bg-slate-900 border border-green-500 p-8 max-w-md w-full military-border shadow-[0_0_50px_rgba(34,197,94,0.2)]">
            <h3 className="font-syncopate text-xl text-white mb-4 uppercase">AUTHORIZE DEPLOYMENT?</h3>
            <p className="font-rajdhani text-slate-400 mb-8 leading-relaxed">
              Confirm purchase of <span className="text-white font-bold">{beatToBuy?.title}</span> license. This operation is high-priority and cannot be reversed.
            </p>
            <div className="flex space-x-4">
              <button 
                onClick={confirmPurchase}
                className="flex-1 bg-green-600 hover:bg-green-500 text-white font-syncopate text-[10px] py-3 btn-military uppercase tracking-widest"
              >
                CONFIRM DEPLOY
              </button>
              <button 
                onClick={() => setIsConfirmOpen(false)}
                className="flex-1 border border-slate-700 hover:border-slate-500 text-slate-400 font-syncopate text-[10px] py-3 uppercase tracking-widest"
              >
                ABORT
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Mini Player */}
      {currentBeat && (
        <div className="fixed bottom-0 left-0 w-full z-50 bg-slate-900/95 backdrop-blur-lg border-t border-green-500/50 py-4 transform animate-slide-up">
          <div className="container mx-auto px-6 flex items-center justify-between">
            <div className="flex items-center space-x-4 flex-1">
              <div className="relative">
                <img src={currentBeat.imageUrl} alt={currentBeat.title} className="w-12 h-12 object-cover military-border" />
                <div className="absolute inset-0 bg-green-500/20 animate-pulse"></div>
              </div>
              <div>
                <div className="text-[10px] text-green-500 font-syncopate tracking-widest flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  TRANSMITTING
                </div>
                <div className="font-syncopate font-bold text-white text-xs uppercase tracking-tight">{currentBeat.title}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-6 flex-1 justify-center">
              <button onClick={() => handlePlay(currentBeat)} className="text-white hover:text-green-400 transition-colors transform hover:scale-110">
                {isPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </button>
            </div>

            <div className="flex-1 flex justify-end">
              <button 
                onClick={() => openPurchaseConfirm(currentBeat)}
                className="bg-green-600 px-6 py-2 text-[10px] font-syncopate tracking-widest font-bold btn-military hover:bg-green-500 transition-colors shadow-[0_0_15px_rgba(34,197,94,0.3)] uppercase"
              >
                PURCHASE LICENSE
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BeatStore;
