
import React, { useState, useEffect } from 'react';
import { NAV_ITEMS } from '../constants';

interface NavbarProps {
  isAmbientPlaying: boolean;
  onToggleAmbient: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAmbientPlaying, onToggleAmbient }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/90 backdrop-blur-md py-2 border-b border-green-500/30' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-green-500 flex items-center justify-center font-orbitron font-black text-slate-900 rounded-sm shadow-[0_0_15px_rgba(34,197,94,0.5)]">FB</div>
          <span className="font-orbitron text-xl font-bold tracking-tighter text-white">FRANCO<span className="text-green-500">BEATZ</span></span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-orbitron text-xs tracking-widest text-slate-400 hover:text-green-400 transition-colors py-2 relative group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 transition-all group-hover:w-full"></span>
            </a>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <button 
            onClick={onToggleAmbient}
            className={`flex items-center space-x-2 px-3 py-2 border ${isAmbientPlaying ? 'border-green-500 bg-green-500/10' : 'border-slate-700'} transition-all group`}
            title="Toggle Ambient Atmosphere"
          >
            <div className={`w-2 h-2 rounded-full ${isAmbientPlaying ? 'bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]' : 'bg-slate-600'}`}></div>
            <span className={`font-orbitron text-[9px] tracking-widest ${isAmbientPlaying ? 'text-green-400' : 'text-slate-500'}`}>COMMS</span>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${isAmbientPlaying ? 'text-green-400' : 'text-slate-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          </button>
          
          <button className="bg-green-600 hover:bg-green-500 text-white font-orbitron text-[10px] px-6 py-2 tracking-widest btn-military transition-all">
            LOG IN
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
