
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 py-12 border-t border-slate-900">
      <div className="container mx-auto px-6 text-center">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="font-syncopate text-2xl font-black text-white mb-2 uppercase tracking-tighter">FRANCO<span className="text-green-500">BEATZ</span></div>
          <div className="h-0.5 w-12 bg-green-500"></div>
        </div>
        
        <p className="text-slate-500 text-[10px] tracking-widest uppercase font-syncopate mb-8">
          &copy; {new Date().getFullYear()} THABANG FRANS MOJAPELO. ALL RIGHTS RESERVED.
        </p>

        <div className="flex flex-wrap justify-center gap-10 text-[10px] font-syncopate text-slate-600 tracking-widest uppercase mb-10">
          <a href="#" title="View Privacy Protocol" className="hover:text-green-500 transition-colors">Privacy Protocol</a>
          <a href="#" title="Review Licensing Directive" className="hover:text-green-500 transition-colors">Licensing Directive</a>
          <a href="#" title="User Usage Agreement" className="hover:text-green-500 transition-colors">Usage Agreement</a>
        </div>

        <div className="flex justify-center space-x-8">
           {['Instagram', 'YouTube', 'SoundCloud'].map(platform => (
             <a 
              key={platform} 
              href="#" 
              title={`Visit our ${platform} interface`}
              className="text-slate-500 hover:text-white transition-colors"
            >
               <span className="sr-only">{platform}</span>
               {/* Simplified icon placeholders */}
               <div className="w-5 h-5 border border-slate-800 rounded-sm flex items-center justify-center text-[8px] font-syncopate hover:border-green-500 hover:text-green-500 transition-all">
                 {platform.charAt(0)}
               </div>
             </a>
           ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
