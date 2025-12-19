
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

  // Pseudo-random stable waveform based on ID
  const waveBars = useMemo(() => {
    const bars = [];
    const seed = beat.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    for (let i = 0; i < 40; i++) {
      const height = 20 + Math.abs(Math.sin(seed + i * 0.5) * 60);
      bars.push(height);
    }
    return bars;
  }, [beat.id]);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={`group relative military-border bg-slate-900/40 backdrop-blur-sm overflow-hidden border border-slate-800 transition-all duration-500 hover:border-green-500/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.1)] ${isActive ? 'ring-1 ring-green-500/30' : ''}`}>
      {/* Toast Feedback */}
      <div className={`absolute top-0 left-0 w-full bg-green-600 text-slate-950 font-syncopate text-[8px] py-1 text-center z-30 transition-transform duration-300 pointer-events-none ${showToast ? 'translate-y-0' : '-translate-y-full'}`}>
        LINK ENCRYPTED TO CLIPBOARD
      </div>

      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={beat.imageUrl} 
          alt={beat.title} 
          className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 grayscale-[0.5] group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-green-500/0 group-hover:bg-green-600/20 transition-all duration-700 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90"></div>
        
        {/* Play Overlay */}
        <button 
          onClick={() => onPlay(beat)}
          className="absolute inset-0 flex items-center justify-center group-hover:opacity-100 transition-opacity z-10"
        >
          <div className={`w-14 h-14 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md transform transition-all duration-500 ${isPlaying ? 'bg-green-500/30 border-green-500 scale-110' : 'bg-white/5 group-hover:scale-105'}`}>
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            )}
          </div>
        </button>

        <div className="absolute top-4 left-4 flex flex-col space-y-2 z-20">
          <div className="group/tooltip relative">
            <span className="bg-slate-950/90 px-3 py-1 text-[10px] font-syncopate tracking-widest text-green-500 border border-green-500/30 block cursor-help">
              {beat.bpm} BPM
            </span>
            <div className="absolute left-full ml-2 top-0 bg-slate-800 text-white text-[9px] px-2 py-1 font-rajdhani whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none border border-slate-700">Beats Per Minute</div>
          </div>
          <div className="group/tooltip relative">
            <span className="bg-slate-950/90 px-3 py-1 text-[8px] font-syncopate tracking-widest text-slate-300 border border-slate-700 block cursor-help">
              KEY: {beat.key}
            </span>
            <div className="absolute left-full ml-2 top-0 bg-slate-800 text-white text-[9px] px-2 py-1 font-rajdhani whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none border border-slate-700">Musical Key Signature</div>
          </div>
        </div>

        {/* Share Button */}
        <button 
          onClick={handleShare}
          className="absolute top-4 right-4 z-20 w-8 h-8 bg-slate-950/80 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-green-500 hover:border-green-500 transition-all"
          title="Share Beat Intel"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>
      </div>

      {/* Interactive Waveform */}
      <div 
        className={`px-6 pt-4 h-20 flex items-center space-x-[2px] cursor-pointer group/wave transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}
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
              className={`flex-1 transition-all duration-300 ${isFilled ? 'bg-green-500' : 'bg-slate-800'}`}
              style={{ height: `${h}%` }}
            ></div>
          );
        })}
      </div>

      {/* Audio Time & Volume */}
      <div className={`px-6 py-2 flex items-center justify-between transition-all duration-500 ${isActive ? 'max-h-12 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="text-[10px] font-syncopate text-slate-500 tracking-widest">{formatTime(currentTime)} / {formatTime(duration)}</div>
        <div className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
          <input 
            type="range" min="0" max="1" step="0.01" value={volume} 
            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
            className="w-16 h-1 bg-slate-800 appearance-none cursor-pointer accent-green-500"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-syncopate text-base font-bold text-white group-hover:text-green-400 transition-colors uppercase tracking-tighter">
            {beat.title}
          </h3>
          <span className="text-green-500 font-syncopate text-base font-black">${beat.price}</span>
        </div>

        {/* Rating Stars */}
        <div className="flex items-center space-x-1 mb-4">
          {[1, 2, 3, 4, 5].map(star => (
            <button 
              key={star} 
              onClick={() => onRate(beat.id, star)}
              className="group/star"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-3 w-3 transition-all ${star <= rating ? 'text-yellow-500 fill-current' : 'text-slate-700 hover:text-yellow-500'}`} 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          ))}
          <span className="text-[10px] text-slate-500 font-rajdhani ml-2">({rating > 0 ? rating.toFixed(1) : 'No rating'})</span>
        </div>
        
        <p className="text-slate-400 text-[11px] mb-4 line-clamp-2 h-8 font-rajdhani italic opacity-80">
          "{beat.description}"
        </p>

        <div className="flex items-center space-x-3">
          <button 
            onClick={() => onAddToCart(beat)}
            disabled={isAddedToCart}
            className={`flex-1 font-syncopate text-[9px] font-bold py-3.5 transition-all btn-military uppercase tracking-widest flex items-center justify-center space-x-2 ${isAddedToCart ? 'bg-green-900/20 text-green-500 border border-green-500/50' : 'bg-slate-800 hover:bg-green-600 text-white'}`}
          >
            {isAddedToCart ? (
              <><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg><span>IN ARSENAL</span></>
            ) : 'ADD TO CART'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BeatCard;
