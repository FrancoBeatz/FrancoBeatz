
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 py-12 border-t border-slate-900">
      <div className="container mx-auto px-6 text-center">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="font-orbitron text-2xl font-black text-white mb-2">FRANCO<span className="text-green-500">BEATZ</span></div>
          <div className="h-0.5 w-12 bg-green-500"></div>
        </div>
        
        <p className="text-slate-500 text-xs tracking-widest uppercase font-orbitron mb-6">
          &copy; {new Date().getFullYear()} THABANG FRANS MOJAPELO. ALL RIGHTS RESERVED.
        </p>

        <div className="flex flex-wrap justify-center gap-6 text-[10px] font-orbitron text-slate-600 tracking-widest uppercase">
          <a href="#" className="hover:text-white transition-colors">Privacy Protocol</a>
          <a href="#" className="hover:text-white transition-colors">Licensing Directive</a>
          <a href="#" className="hover:text-white transition-colors">Usage Agreement</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
