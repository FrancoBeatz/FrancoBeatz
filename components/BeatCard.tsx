
import React, { useState, useMemo } from 'react';
import { Beat } from '../types';

interface BeatCardProps {
  beat: Beat;
  onPlay: (beat: Beat) => void;
  isPlaying: boolean;
  isActive: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  onSeek: (time: number) => void;
  onVolumeChange: (volume: number) => void;
  onAddToCart: (beat: Beat) => void;
  isAddedToCart: boolean;
  rating: number;
  onRate: (id: string, val: number) => void;
}

const BeatCard: React.FC<BeatCardProps> = ({ 
  beat, 
  onPlay, 
  isPlaying, 
  isActive,
  currentTime,
  duration,
  volume,
  onSeek,
  onVolumeChange,
  onAddToCart,
  isAddedToCart,
  rating,
  onRate
}) => {
  const [showToast, setShowToast] = useState(false);

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleShare = () => {
    const url = `${window.location.origin}/beat/${beat.id}`;
    navigator.clipboard.writeText(url);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  // SoundCloud style waveform bars
  const waveBars = useMemo(() => {
    const bars = [];
    const seed = beat.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    for (let i = 0; i < 60; i++) {
      const height = 15 + Math.abs(Math.sin(seed + i * 0.3) * 75);
      bars.push(height);
    }
    return bars;
  }, [beat.id]);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={`group relative military-border bg-slate-900/60 backdrop-blur-md overflow-hidden border border-slate-800 transition-all duration-700 hover:border-[#ff5500]/50 hover:shadow-[0_0_40px_rgba(255,85,0,0.15)] ${isActive ? 'ring-2 ring-[#ff5500]/30' : ''}`}>
      {/* HUD Toast */}
      <div className={`absolute top-0 left-0 w-full bg-[#ff5500] text-white font-mono text-[9px] py-1 text-center z-40 transition-transform duration-500 pointer-events-none ${showToast ? 'translate-y-0' : '-translate-y-full'}`}>
        INTEL LINK COPIED TO SYSTEM
      </div>

      {/* Image Header */}
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={beat.imageUrl} 
          alt={beat.title} 
          className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 grayscale-[0.8] group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-95"></div>
        <div className="absolute inset-0 bg-[#ff5500]/0 group-hover:bg-[#ff5500]/10 transition-colors duration-700"></div>
        
        {/* SoundCloud Play Button */}
        <button 
          onClick={() => onPlay(beat)}
          className="absolute inset-0 flex items-center justify-center z-10"
        >
          <div className={`w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-xl border border-white/10 transition-all duration-500 ${isPlaying ? 'bg-[#ff5500] scale-110 shadow-[0_0_20px_#ff5500]' : 'bg-white/5 opacity-0 group-hover:opacity-100 hover:scale-105'}`}>
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            )}
          </div>
        </button>

        <div className="absolute top-4 left-4 flex flex-col space-y-2 z-20">
          <span className="bg-slate-950/90 px-3 py-1 text-[10px] font-mono tracking-tighter text-[#ff5500] border border-[#ff5500]/30">
            {beat.bpm} BPM
          </span>
          <span className="bg-slate-950/90 px-3 py-1 text-[9px] font-mono tracking-tighter text-slate-400 border border-slate-700">
            {beat.key}
          </span>
        </div>

        <button 
          onClick={handleShare}
          className="absolute top-4 right-4 z-20 w-8 h-8 bg-slate-950/80 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-[#ff5500] transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
        </button>
      </div>

      {/* Advanced Waveform */}
      <div className="px-6 py-4 bg-slate-900/40 relative">
        <div 
          className="h-16 flex items-end space-x-[1px] cursor-pointer group/wave"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            onSeek((x / rect.width) * duration);
          }}
        >
          {waveBars.map((h, i) => {
            const barProgress = (i / waveBars.length) * 100;
            const isFilled = barProgress < progress;
            return (
              <div 
                key={i} 
                className={`flex-1 waveform-bar ${isFilled ? 'bg-[#ff5500]' : 'bg-slate-700 group-hover/wave:bg-slate-600'}`}
                style={{ height: `${h}%` }}
              ></div>
            );
          })}
        </div>
        <div className="mt-2 flex justify-between text-[10px] font-mono text-slate-500">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-syncopate text-lg font-bold text-white uppercase group-hover:text-[#ff5500] transition-colors">{beat.title}</h3>
          <div className="text-right">
            <span className="text-[#ff5500] font-syncopate text-lg font-black">${beat.price}</span>
          </div>
        </div>

        {/* Rating Logic */}
        <div className="flex items-center space-x-1 mb-4">
          {[1, 2, 3, 4, 5].map(star => (
            <button key={star} onClick={() => onRate(beat.id, star)}>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 ${star <= rating ? 'text-[#ff5500] fill-current' : 'text-slate-700'}`} viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          ))}
          <span className="text-[10px] text-slate-500 font-mono ml-2">DATA: {rating.toFixed(1)}</span>
        </div>

        <p className="text-slate-400 text-xs mb-6 font-rajdhani leading-relaxed line-clamp-2 h-8">
          {beat.description}
        </p>

        <div className="flex items-center space-x-3">
          <button 
            onClick={() => onAddToCart(beat)}
            disabled={isAddedToCart}
            className={`flex-1 font-syncopate text-[9px] font-bold py-3.5 transition-all btn-military uppercase tracking-[0.2em] flex items-center justify-center space-x-2 ${isAddedToCart ? 'bg-[#ff5500]/20 text-[#ff5500] border border-[#ff5500]/50' : 'bg-slate-800 hover:bg-[#ff5500] text-white'}`}
          >
            {isAddedToCart ? 'IN QUEUE' : 'INITIALIZE UPLINK'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BeatCard;
