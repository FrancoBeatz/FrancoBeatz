
import React, { useEffect, useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BeatStore from './components/BeatStore';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AmbientSound from './components/AmbientSound';
import { Beat } from './types';

const App: React.FC = () => {
  const [isAmbientPlaying, setIsAmbientPlaying] = useState(false);
  const [isBeatPlaying, setIsBeatPlaying] = useState(false);
  const [cart, setCart] = useState<Beat[]>([]);
  const [ratings, setRatings] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('franco_ratings');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        if (targetId) {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth'
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      section.classList.add('reveal');
      observer.observe(section);
    });

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  const handleToggleAmbient = () => {
    setIsAmbientPlaying(!isAmbientPlaying);
  };

  const handleBeatStateChange = useCallback((playing: boolean) => {
    setIsBeatPlaying(playing);
  }, []);

  const handleAddToCart = (beat: Beat) => {
    if (!cart.find(item => item.id === beat.id)) {
      setCart(prev => [...prev, beat]);
    }
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleRateBeat = (id: string, rating: number) => {
    const newRatings = { ...ratings, [id]: rating };
    setRatings(newRatings);
    localStorage.setItem('franco_ratings', JSON.stringify(newRatings));
  };

  return (
    <div className="min-h-screen selection:bg-green-500 selection:text-white">
      <Navbar 
        isAmbientPlaying={isAmbientPlaying} 
        onToggleAmbient={handleToggleAmbient}
        cart={cart}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />
      <main>
        <Hero />
        <BeatStore 
          onBeatStateChange={handleBeatStateChange} 
          cart={cart}
          onAddToCart={handleAddToCart}
          onClearCart={handleClearCart}
          ratings={ratings}
          onRate={handleRateBeat}
        />
        <About />
        <Contact />
      </main>
      <Footer />
      
      <AmbientSound 
        isPlaying={isAmbientPlaying} 
        isBeatPlaying={isBeatPlaying} 
      />

      <div className="fixed inset-0 pointer-events-none z-[60] opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,128,0.06))] bg-[length:100%_2px,3px_100%]"></div>
    </div>
  );
};

export default App;
