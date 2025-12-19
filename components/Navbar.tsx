
import React, { useState, useEffect } from 'react';
import { NAV_ITEMS } from '../constants';
import { Beat } from '../types';

interface NavbarProps {
  isAmbientPlaying: boolean;
  onToggleAmbient: () => void;
  cart: Beat[];
  onRemoveFromCart: (id: string) => void;
  onClearCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAmbientPlaying, onToggleAmbient, cart, onRemoveFromCart, onClearCart }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/90 backdrop-blur-md py-2 border-b border-green-500/30' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-green-500 flex items-center justify-center font-orbitron font-black text-slate-900 rounded-sm shadow-[0_0_15px_rgba(34,197,94,0.5)] cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>FB</div>
          <span className="font-orbitron text-xl font-bold tracking-tighter text-white">FRANCO<span className="text-green-500">BEATZ</span></span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              title={`Navigate to ${item.label}`}
              className="font-syncopate text-[10px] tracking-widest text-slate-400 hover:text-green-400 transition-colors py-2 relative group uppercase"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 transition-all group-hover:w-full"></span>
            </a>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          {/* Cart Icon & Dropdown */}
          <div 
            className="relative group"
            onMouseEnter={() => setIsCartOpen(true)}
            onMouseLeave={() => setIsCartOpen(false)}
          >
            <button className="flex items-center space-x-2 px-3 py-2 border border-slate-700 hover:border-green-500 transition-all relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400 group-hover:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-slate-950 text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full animate-pulse">
                  {cart.length}
                </span>
              )}
            </button>

            {/* Cart Dropdown */}
            <div className={`absolute right-0 top-full pt-4 transition-all duration-300 ${isCartOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}>
              <div className="w-80 bg-slate-900 border border-slate-800 military-border shadow-[0_10px_40px_rgba(0,0,0,0.5)] p-4">
                <div className="font-syncopate text-[10px] text-green-500 mb-4 tracking-widest uppercase border-b border-slate-800 pb-2">Deployment Queue</div>
                
                {cart.length === 0 ? (
                  <div className="py-6 text-center text-slate-600 font-rajdhani text-sm italic">Arsenal is currently empty</div>
                ) : (
                  <>
                    <div className="max-h-60 overflow-y-auto space-y-3 mb-4 pr-2 custom-scrollbar">
                      {cart.map(item => (
                        <div key={item.id} className="flex items-center space-x-3 group/item">
                          <img src={item.imageUrl} className="w-10 h-10 object-cover grayscale group-hover/item:grayscale-0 transition-all border border-slate-800" alt={item.title} />
                          <div className="flex-1 min-w-0">
                            <div className="font-syncopate text-[9px] text-white truncate uppercase">{item.title}</div>
                            <div className="font-rajdhani text-[11px] text-green-500">${item.price}</div>
                          </div>
                          <button 
                            onClick={() => onRemoveFromCart(item.id)}
                            className="text-slate-600 hover:text-red-500 transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-slate-800 pt-4 space-y-3">
                      <div className="flex justify-between font-syncopate text-[10px] text-white">
                        <span>TOTAL PAYLOAD:</span>
                        <span className="text-green-500">${totalPrice.toFixed(2)}</span>
                      </div>
                      <button className="w-full bg-green-600 hover:bg-green-500 text-white font-syncopate text-[9px] py-3 btn-military transition-all uppercase tracking-widest">
                        INITIALIZE CHECKOUT
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <button 
            onClick={onToggleAmbient}
            className={`flex items-center space-x-2 px-3 py-2 border ${isAmbientPlaying ? 'border-green-500 bg-green-500/10' : 'border-slate-700'} transition-all group`}
            title={isAmbientPlaying ? "Disable Atmosphere" : "Enable Atmosphere"}
          >
            <div className={`w-2 h-2 rounded-full ${isAmbientPlaying ? 'bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]' : 'bg-slate-600'}`}></div>
            <span className={`font-syncopate text-[9px] tracking-widest ${isAmbientPlaying ? 'text-green-400' : 'text-slate-500'}`}>COMMS</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
