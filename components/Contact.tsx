
import React from 'react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-green-500/5 to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-orbitron text-4xl font-black text-white mb-6 uppercase tracking-tighter">
            ESTABLISH <span className="text-green-500">COMMS</span>
          </h2>
          <p className="text-slate-400 font-light mb-16 max-w-2xl mx-auto">
            Ready to initiate a custom commission or discuss a high-priority collaboration? Use the direct uplink channels below to reach the command center.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Direct Channel 1 */}
            <div className="p-10 military-border bg-slate-900 group hover:border-green-500 transition-all">
              <div className="w-16 h-16 bg-slate-800 flex items-center justify-center mx-auto mb-6 border border-slate-700 group-hover:bg-green-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="font-orbitron text-xs text-green-500 mb-2 tracking-[0.3em]">SECURE LINE</div>
              <div className="font-orbitron text-2xl font-black text-white mb-2">0723481158</div>
              <p className="text-slate-500 text-sm">Direct voice and encrypted messaging available 24/7.</p>
            </div>

            {/* Direct Channel 2 */}
            <div className="p-10 military-border bg-slate-900 group hover:border-green-500 transition-all">
              <div className="w-16 h-16 bg-slate-800 flex items-center justify-center mx-auto mb-6 border border-slate-700 group-hover:bg-green-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="font-orbitron text-xs text-green-500 mb-2 tracking-[0.3em]">DATA BURST</div>
              <div className="font-orbitron text-lg font-black text-white mb-2 break-all lowercase">mojapelot2@gmail.com</div>
              <p className="text-slate-500 text-sm">Primary relay for business queries and project files.</p>
            </div>
          </div>

          <div className="mt-20 pt-10 border-t border-slate-900">
            <p className="font-orbitron text-[10px] tracking-[0.5em] text-slate-600 uppercase mb-8">Follow the Front Line</p>
            <div className="flex justify-center space-x-12">
              {['INSTAGRAM', 'YOUTUBE', 'SOUNDCLOUD', 'SPOTIFY'].map(social => (
                <a key={social} href="#" className="font-orbitron text-xs text-slate-400 hover:text-green-500 transition-colors tracking-widest">{social}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
