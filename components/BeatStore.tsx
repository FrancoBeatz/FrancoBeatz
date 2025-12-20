
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
  const [volume, setVolume] = useState(0.7);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlay = (beat: Beat) => {
    if (currentBeat?.id === beat.id) {
      if (isPlaying) { audioRef.current?.pause(); } else { audioRef.current?.play(); }
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

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onDurationChange = () => setDuration(audio.duration);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => { setIsPlaying(false); setCurrentTime(0); };
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

  useEffect(() => { onBeatStateChange(isPlaying); }, [isPlaying, onBeatStateChange]);

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
    <section id="beats" className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="scanner-line"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Advanced Tech Sidebar HUD */}
          <aside className="lg:w-80 space-y-8">
            <div className="military-border bg-slate-900/50 p-6 space-y-6 backdrop-blur-sm">
              <div className="font-mono text-[10px] text-[#ff5500] tracking-[0.4em] uppercase">Tactical Parameters</div>
              
              <div className="space-y-4">
                <div className="relative group">
                  <input 
                    type="text"
                    placeholder="SCAN AUDIO DATABASE..."
                    className="w-full bg-slate-950 border border-slate-800 focus:border-[#ff5500] text-white font-mono text-[11px] py-4 pl-12 pr-4 outline-none transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-hover:text-[#ff5500]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeWidth={2}/></svg>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {['TRAP', 'HIP-HOP', 'PHONK', 'DRILL'].map(tag => (
                    <button 
                      key={tag}
                      onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                      className={`py-3 font-mono text-[9px] border transition-all ${selectedTag === tag ? 'bg-[#ff5500]/20 border-[#ff5500] text-[#ff5500]' : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700'}`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <div className="flex justify-between font-mono text-[9px] text-slate-500 mb-2">
                  <span>SYSTEM STATUS:</span>
                  <span className="text-green-500 animate-pulse">OPTIMIZED</span>
                </div>
                <div className="flex justify-between font-mono text-[9px] text-slate-500">
                  <span>SAMPLES CACHED:</span>
                  <span>{BEATS.length}</span>
                </div>
              </div>
            </div>

            {cart.length > 0 && (
              <div className="military-border bg-slate-900/80 p-6 border-[#ff5500]/30">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-syncopate text-[10px] text-white">QUEUE [{cart.length}]</span>
                  <button onClick={() => setIsClearConfirmOpen(true)} className="text-[9px] font-mono text-red-500 hover:underline">PURGE</button>
                </div>
                <div className="space-y-3 mb-6">
                  {cart.slice(0, 3).map(item => (
                    <div key={item.id} className="flex justify-between items-center text-[11px] font-mono text-slate-400">
                      <span className="truncate pr-4">{item.title}</span>
                      <span className="text-white">${item.price}</span>
                    </div>
                  ))}
                  {cart.length > 3 && <div className="text-[9px] font-mono text-slate-600">+{cart.length - 3} MORE ASSETS</div>}
                </div>
                <button className="w-full sc-gradient py-3 font-syncopate text-[9px] text-white font-bold tracking-widest hover:brightness-110 transition-all">INITIALIZE PAYLOAD</button>
              </div>
            )}
          </aside>

          {/* Beat Grid */}
          <div className="flex-1">
            {filteredBeats.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8">
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
              <div className="py-40 text-center border border-dashed border-slate-800">
                <p className="font-mono text-slate-600 text-[10px] tracking-[0.5em] uppercase">NO SIGNAL FOUND IN THIS SECTOR</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <audio ref={audioRef} preload="metadata" />

      {/* Confirmation Modals */}
      {isClearConfirmOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-xl">
          <div className="absolute inset-0 bg-slate-950/80" onClick={() => setIsClearConfirmOpen(false)}></div>
          <div className="relative bg-slate-900 border border-red-500/40 p-10 max-w-sm w-full military-border shadow-[0_0_80px_rgba(239,68,68,0.2)]">
            <h3 className="font-syncopate text-xl text-white mb-4 uppercase">PURGE QUEUE?</h3>
            <p className="font-rajdhani text-slate-400 mb-8 leading-relaxed">System will dump all tracked assets. Continue?</p>
            <div className="flex space-x-4">
              <button onClick={() => { onClearCart(); setIsClearConfirmOpen(false); }} className="flex-1 bg-red-600 py-4 font-syncopate text-[10px] text-white font-bold btn-military">PURGE</button>
              <button onClick={() => setIsClearConfirmOpen(false)} className="flex-1 border border-slate-700 py-4 font-syncopate text-[10px] text-slate-400">ABORT</button>
            </div>
          </div>
        </div>
      )}

      {/* Modern SoundCloud Desktop Player HUD */}
      {currentBeat && (
        <div className="fixed bottom-0 left-0 w-full z-50 bg-slate-950/95 backdrop-blur-2xl border-t border-[#ff5500]/30 py-6 transform animate-slide-up">
          <div className="container mx-auto px-6 flex items-center gap-12">
            
            <div className="flex items-center space-x-6 w-80 shrink-0">
              <img src={currentBeat.imageUrl} className="w-16 h-16 object-cover military-border shadow-[0_0_15px_rgba(255,85,0,0.2)]" />
              <div className="min-w-0">
                <div className="text-[9px] text-[#ff5500] font-mono tracking-[0.2em] uppercase mb-1 flex items-center">
                  <div className="flex space-x-[2px] mr-2">
                    {[1,2,3,4].map(i => <div key={i} className={`w-[2px] bg-[#ff5500] ${isPlaying ? 'animate-bounce' : 'h-1'}`} style={{height: isPlaying ? `${Math.random()*12+4}px` : '4px', animationDelay: `${i*0.1}s`}}></div>)}
                  </div>
                  LIVE STREAM
                </div>
                <div className="font-syncopate font-black text-white text-sm uppercase tracking-widest truncate">{currentBeat.title}</div>
                <div className="text-[10px] font-mono text-slate-500 uppercase">FREQ: {currentBeat.bpm}HZ</div>
              </div>
            </div>
            
            <div className="flex-1 flex flex-col items-center">
               <button onClick={() => handlePlay(currentBeat)} className="text-white hover:text-[#ff5500] transition-all transform hover:scale-110 mb-3">
                  {isPlaying ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  )}
               </button>
               <div className="w-full flex items-center space-x-4">
                  <span className="font-mono text-[10px] text-slate-500 w-12 text-right">{formatTime(currentTime)}</span>
                  <div className="relative flex-1 h-1.5 bg-slate-800 rounded-full cursor-pointer overflow-hidden group/seek" onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    handleSeek((x / rect.width) * duration);
                  }}>
                    <div className="absolute inset-0 bg-slate-700/50 scale-x-0 origin-left group-hover/seek:scale-x-100 transition-transform duration-500"></div>
                    <div className="absolute left-0 top-0 h-full bg-[#ff5500] transition-all duration-100" style={{ width: `${(currentTime / duration) * 100}%` }}></div>
                  </div>
                  <span className="font-mono text-[10px] text-slate-500 w-12">{formatTime(duration)}</span>
               </div>
            </div>

            <div className="flex items-center space-x-8 w-80 justify-end shrink-0">
              <div className="flex items-center space-x-3">
                 <input type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => handleVolumeChange(parseFloat(e.target.value))} className="w-24 h-1 bg-slate-800 appearance-none cursor-pointer accent-[#ff5500]" />
              </div>
              <button 
                onClick={() => { setBeatToBuy(currentBeat); setIsConfirmOpen(true); }}
                className="sc-gradient px-8 py-3 text-[10px] font-syncopate tracking-[0.2em] font-bold btn-military hover:brightness-110 transition-all uppercase whitespace-nowrap"
              >
                SECURE LICENSE
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BeatStore;
