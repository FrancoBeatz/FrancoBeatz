
import React from 'react';
import { Beat } from '../types';

interface BeatCardProps {
  beat: Beat;
  onPlay: (beat: Beat) => void;
  isPlaying: boolean;
}

const BeatCard: React.FC<BeatCardProps> = ({ beat, onPlay, isPlaying }) => {
  return (
    <div className="group relative military-border bg-slate-900 overflow-hidden hover:border-green-500 transition-all duration-300">
      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={beat.imageUrl} 
          alt={beat.title} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-125 grayscale group-hover:grayscale-0"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-green-500/0 group-hover:bg-green-900/20 transition-colors duration-500"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-80"></div>
        
        {/* Play Overlay */}
        <button 
          onClick={() => onPlay(beat)}
          className="absolute inset-0 flex items-center justify-center group-hover:opacity-100 transition-opacity"
        >
          <div className={`w-16 h-16 rounded-full border-2 border-white/30 flex items-center justify-center backdrop-blur-sm transform group-hover:scale-110 transition-transform ${isPlaying ? 'bg-green-500/20 border-green-500' : 'bg-white/10'}`}>
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </div>
        </button>

        <div className="absolute top-4 left-4">
          <span className="bg-slate-950/80 px-2 py-1 text-[10px] font-syncopate tracking-widest text-green-500 border border-green-500/30">
            {beat.bpm} BPM
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-syncopate text-lg font-bold text-white group-hover:text-green-400 transition-colors uppercase tracking-tight">
            {beat.title}
          </h3>
          <span className="text-green-500 font-syncopate text-base font-black">${beat.price}</span>
        </div>
        
        <p className="text-slate-400 text-xs mb-4 line-clamp-2 h-8 font-light italic">
          "{beat.description}"
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {beat.tags.map(tag => (
            <span key={tag} className="text-[9px] uppercase tracking-widest text-slate-500 border border-slate-800 px-2 py-0.5">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <button className="flex-1 bg-slate-800 hover:bg-green-600 text-white font-syncopate text-[9px] font-bold py-3 transition-all btn-military uppercase tracking-widest">
            ADD TO ARSENAL
          </button>
          <button className="w-12 h-12 flex items-center justify-center border border-slate-800 hover:border-green-500 text-slate-400 hover:text-green-400 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BeatCard;
