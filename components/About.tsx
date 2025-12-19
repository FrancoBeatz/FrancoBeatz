
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-slate-900 border-y border-slate-800 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2 relative group">
            <div className="absolute -inset-4 border border-green-500/20 group-hover:border-green-500/50 transition-all duration-700 -z-10 military-border"></div>
            <img 
              src="https://picsum.photos/seed/producer/800/1000" 
              alt="Thabang Frans Mojapelo" 
              className="w-full h-auto military-border grayscale contrast-125"
            />
            <div className="absolute bottom-6 left-6 bg-slate-950/90 border-l-4 border-green-500 p-6 backdrop-blur-md">
              <div className="font-orbitron text-sm text-green-500 mb-1">PRODUCER ID</div>
              <div className="font-orbitron text-2xl font-black text-white">FRANCOBEATZ</div>
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <h2 className="font-orbitron text-4xl font-black text-white mb-6 uppercase tracking-tighter">
              THE <span className="text-green-500">DOSSIER</span>
            </h2>
            <div className="space-y-6 text-slate-400 font-light text-lg leading-relaxed">
              <p>
                Behind the sonic artillery of FrancoBeatz is <span className="text-white font-semibold">Thabang Frans Mojapelo</span>. 
                A mastermind of rhythm and a tactical engineer of sound, Thabang has spent years refining the trap and hip-hop 
                landscape with a futurist edge inspired by military precision and sci-fi aesthetics.
              </p>
              <p>
                Every beat produced is more than just a background track—it's a mission objective. Whether it's the dark, 
                gritty sliding 808s of modern drill or the triumphant, wide soundstages of cinematic hip-hop, FrancoBeatz 
                delivers with a level of detail that commands respect and demands attention.
              </p>
              <p className="border-l-2 border-slate-800 pl-6 italic">
                "In the war for the airwaves, your sound is your greatest weapon. I provide the munitions; you lead the assault."
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-8">
              <div>
                <div className="font-orbitron text-2xl font-black text-white">500+</div>
                <div className="font-orbitron text-[10px] text-slate-500 tracking-[0.2em] uppercase">Beats Deployed</div>
              </div>
              <div>
                <div className="font-orbitron text-2xl font-black text-white">100%</div>
                <div className="font-orbitron text-[10px] text-slate-500 tracking-[0.2em] uppercase">Tactical Reliability</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
