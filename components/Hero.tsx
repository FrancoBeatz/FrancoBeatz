
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/seed/warzone/1920/1080" 
          alt="Battlefield" 
          className="w-full h-full object-cover filter brightness-[0.3] contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#020617_100%)]"></div>
      </div>

      {/* Decorative scan lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,128,0.06))] bg-[length:100%_2px,3px_100%]"></div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="inline-block px-4 py-1 mb-6 border border-green-500/50 bg-green-950/20 rounded-full">
          <span className="font-syncopate text-[9px] text-green-400 tracking-[0.4em] uppercase">Tactical Audio Deployment</span>
        </div>
        
        <h1 className="font-syncopate text-4xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight tracking-tighter">
          COMMAND YOUR <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-500 to-emerald-600 tiberium-glow">SOUNDSCAPE</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-slate-400 text-lg md:text-xl mb-10 leading-relaxed font-light font-rajdhani">
          Thabang Frans Mojapelo presents <span className="text-white font-semibold">FrancoBeatz</span>. 
          High-tier trap and hip-hop munitions for the modern artist. Secure your arsenal now.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
          <a href="#beats" className="w-full md:w-auto px-10 py-4 bg-green-600 hover:bg-green-500 text-white font-syncopate text-[11px] font-bold tracking-[0.2em] transition-all btn-military flex items-center justify-center group uppercase">
            DEPLOY BEATS
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
          <a href="#about" className="w-full md:w-auto px-10 py-4 border border-slate-700 hover:border-green-500 hover:bg-slate-800 text-white font-syncopate text-[11px] font-bold tracking-[0.2em] transition-all btn-military flex items-center justify-center uppercase">
            DOSSIER
          </a>
        </div>
      </div>

      {/* Stats overlay */}
      <div className="absolute bottom-10 left-10 hidden lg:block border-l-2 border-green-500 pl-4 py-2">
        <div className="font-syncopate text-[10px] text-green-500 mb-1 tracking-widest uppercase">NETWORK STATUS</div>
        <div className="font-syncopate text-lg font-bold text-white uppercase tracking-tighter">Sectors Secure</div>
        <div className="flex mt-2 space-x-1">
          <div className="w-4 h-1 bg-green-500"></div>
          <div className="w-4 h-1 bg-green-500"></div>
          <div className="w-4 h-1 bg-green-500"></div>
          <div className="w-4 h-1 bg-green-500/30"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
