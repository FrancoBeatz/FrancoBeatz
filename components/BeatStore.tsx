
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { BEATS } from '../constants';
import BeatCard from './BeatCard';
import { Beat } from '../types';

interface BeatStoreProps {
  onBeatStateChange: (isPlaying: boolean) => void;
  cart: Beat[];
  onAddToCart: (beat: Beat) => void;
  onClearCart: () => void;
  ratings: Record<string, number>;
  onRate: (id: string, val: number) => void;
}

const BeatStore: React.FC<BeatStoreProps> = ({ 
  onBeatStateChange, 
  cart, 
  onAddToCart, 
  onClearCart,
  ratings,
  onRate
}) => {
  const [currentBeat, setCurrentBeat] = useState<Beat | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isClearConfirmOpen, setIsClearConfirmOpen] = useState(false);
  const [beatToBuy, setBeatToBuy] = useState<Beat | null>(null);
  
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlay = (beat: Beat) => {
    if (currentBeat?.id === beat.id) {
      if (isPlaying) {
        audioRef.current?.pause();
      } else {
        audioRef.current?.play();
      }
    } else {
      setCurrentBeat(beat);
      if (audioRef.current) {
        audioRef.current.src = beat.previewUrl;
        audioRef.current.play();
      }
    }
  };

  const handleSeek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (v: number) => {
    if (audioRef.current) {
      audioRef.current.volume = v;
      setVolume(v);
    }
  };

  const confirmPurchase = () => {
    setIsConfirmOpen(false);
    setBeatToBuy(null);
    alert(`Deploying ${beatToBuy?.title} license protocol to your encrypted storage.`);
  };

  const confirmClearCart = () => {
    onClearCart();
    setIsClearConfirmOpen(false);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onDurationChange = () => setDuration(audio.duration);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('durationchange', onDurationChange);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('durationchange', onDurationChange);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

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

  const cartIds = cart.map(item => item.id);

  return (
    <section id="beats" className="py-32 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent"></div>
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#22c55e 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-8 md:space-y-0">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <h2 className="font-syncopate text-3xl font-black text-white uppercase tracking-tighter">
                BEAT <span className="text-green-500">ARSENAL</span>
              </h2>
              {cart.length > 0 && (
                <button 
                  onClick={() => setIsClearConfirmOpen(true)}
                  className="font-syncopate text-[8px] text-red-500 border border-red-500/20 hover:bg-red-500/10 px-3 py-1 uppercase tracking-widest transition-all"
                >
                  PURGE CART
                </button>
              )}
            </div>
            
            <div className="relative max-w-xl group">
              <input 
                type="text"
                placeholder="SEARCH AUDIO ASSETS..."
                className="w-full bg-slate-900/50 border border-slate-800 focus:border-green-500 text-white font-rajdhani text-lg py-4 pl-14 pr-4 outline-none transition-all military-border hover:bg-slate-900"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-500 group-hover:text-green-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {['TRAP', 'HIP-HOP', 'PHONK', 'DRILL'].map(tag => (
              <button 
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={`px-6 py-2 border font-syncopate text-[10px] tracking-widest transition-all uppercase ${selectedTag === tag ? 'border-green-500 text-green-500 bg-green-500/20' : 'border-slate-800 text-slate-500 hover:border-green-500/50 hover:text-slate-300'}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {filteredBeats.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredBeats.map(beat => (
              <BeatCard 
                key={beat.id} 
                beat={beat} 
                onPlay={handlePlay}
                isPlaying={isPlaying && currentBeat?.id === beat.id}
                isActive={currentBeat?.id === beat.id}
                currentTime={currentBeat?.id === beat.id ? currentTime : 0}
                duration={currentBeat?.id === beat.id ? duration : 0}
                volume={volume}
                onSeek={handleSeek}
                onVolumeChange={handleVolumeChange}
                onAddToCart={onAddToCart}
                isAddedToCart={cartIds.includes(beat.id)}
                rating={ratings[beat.id] || 0}
                onRate={onRate}
              />
            ))}
          </div>
        ) : (
          <div className="py-32 text-center border border-dashed border-slate-800 bg-slate-900/20 military-border">
            <p className="font-syncopate text-slate-600 text-[10px] tracking-[0.5em] uppercase">Sector Empty - Redefine Search Parameters</p>
          </div>
        )}

        <audio ref={audioRef} preload="metadata" />
      </div>

      {/* Confirmation Modal: Clear Cart */}
      {isClearConfirmOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md">
          <div className="absolute inset-0 bg-slate-950/80" onClick={() => setIsClearConfirmOpen(false)}></div>
          <div className="relative bg-slate-900 border border-red-500/40 p-10 max-w-sm w-full military-border shadow-[0_0_100px_rgba(239,68,68,0.15)]">
            <h3 className="font-syncopate text-xl text-white mb-4 uppercase tracking-tighter">PURGE ARSENAL?</h3>
            <p className="font-rajdhani text-slate-400 mb-10 leading-relaxed">
              This will remove all tracked audio assets from your current deployment queue. Proceed with purge?
            </p>
            <div className="flex space-x-4">
              <button 
                onClick={confirmClearCart}
                className="flex-1 bg-red-600 hover:bg-red-500 text-white font-syncopate text-[10px] py-4 btn-military uppercase tracking-widest font-bold"
              >
                CONFIRM PURGE
              </button>
              <button 
                onClick={() => setIsClearConfirmOpen(false)}
                className="flex-1 border border-slate-700 hover:border-slate-500 text-slate-400 font-syncopate text-[10px] py-4 uppercase tracking-widest"
              >
                ABORT
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal: Single Purchase */}
      {isConfirmOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md">
          <div className="absolute inset-0 bg-slate-950/80" onClick={() => setIsConfirmOpen(false)}></div>
          <div className="relative bg-slate-900 border border-green-500/40 p-10 max-w-lg w-full military-border shadow-[0_0_100px_rgba(34,197,94,0.2)]">
            <h3 className="font-syncopate text-2xl text-white mb-4 uppercase tracking-tighter">AUTHORIZE ACQUISITION</h3>
            <p className="font-rajdhani text-slate-400 mb-10 leading-relaxed text-lg">
              Confirm immediate deployment of <span className="text-green-500 font-bold">{beatToBuy?.title}</span> license files?
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button onClick={confirmPurchase} className="flex-1 bg-green-600 hover:bg-green-500 text-white font-syncopate text-[11px] py-4 btn-military uppercase tracking-[0.2em] font-bold">CONFIRM DEPLOY</button>
              <button onClick={() => setIsConfirmOpen(false)} className="flex-1 border border-slate-700 hover:border-slate-500 text-slate-400 font-syncopate text-[11px] py-4 uppercase tracking-[0.2em]">ABORT MISSION</button>
            </div>
          </div>
        </div>
      )}

      {/* Mini Player */}
      {currentBeat && (
        <div className="fixed bottom-0 left-0 w-full z-50 bg-slate-950/90 backdrop-blur-xl border-t border-green-500/20 py-5 transform animate-slide-up">
          <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-4 w-full md:w-auto">
              <img src={currentBeat.imageUrl} className="w-14 h-14 object-cover military-border" />
              <div className="overflow-hidden">
                <div className="text-[9px] text-green-500 font-syncopate tracking-[0.3em] uppercase mb-1 flex items-center">
                  <span className={`w-1.5 h-1.5 bg-green-500 rounded-full mr-2 ${isPlaying ? 'animate-ping' : ''}`}></span>
                  Transmitting
                </div>
                <div className="font-syncopate font-black text-white text-sm uppercase tracking-widest truncate">{currentBeat.title}</div>
              </div>
            </div>
            
            <div className="flex flex-col items-center flex-1 max-w-2xl w-full px-6">
               <button onClick={() => handlePlay(currentBeat)} className="text-white hover:text-green-400 transition-all transform hover:scale-110 mb-2">
                  {isPlaying ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  )}
               </button>
               <div className="flex items-center space-x-3 w-full text-[10px] font-rajdhani text-slate-500">
                  <span>{formatTime(currentTime)}</span>
                  <div className="relative flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden" onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    handleSeek((x / rect.width) * duration);
                  }}>
                    <div className="absolute left-0 top-0 h-full bg-green-500" style={{ width: `${(currentTime / duration) * 100}%` }}></div>
                  </div>
                  <span>{formatTime(duration)}</span>
               </div>
            </div>

            <div className="flex items-center space-x-6 w-full md:w-auto justify-end">
              <button 
                onClick={() => { setBeatToBuy(currentBeat); setIsConfirmOpen(true); }}
                className="bg-green-600 px-8 py-3 text-[10px] font-syncopate tracking-[0.2em] font-bold btn-military hover:bg-green-500 transition-all uppercase"
              >
                CHECKOUT SECURE
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BeatStore;
