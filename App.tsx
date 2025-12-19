
import React, { useEffect, useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BeatStore from './components/BeatStore';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AmbientSound from './components/AmbientSound';

const App: React.FC = () => {
  const [isAmbientPlaying, setIsAmbientPlaying] = useState(false);
  const [isBeatPlaying, setIsBeatPlaying] = useState(false);

  useEffect(() => {
    // Smooth scroll for anchor links
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

    // Intersection Observer for fade-in animations
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

  return (
    <div className="min-h-screen selection:bg-green-500 selection:text-white">
      <Navbar 
        isAmbientPlaying={isAmbientPlaying} 
        onToggleAmbient={handleToggleAmbient} 
      />
      <main>
        <Hero />
        <BeatStore onBeatStateChange={handleBeatStateChange} />
        <About />
        <Contact />
      </main>
      <Footer />
      
      <AmbientSound 
        isPlaying={isAmbientPlaying} 
        isBeatPlaying={isBeatPlaying} 
      />

      {/* Decorative scanline globally */}
      <div className="fixed inset-0 pointer-events-none z-[60] opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,128,0.06))] bg-[length:100%_2px,3px_100%]"></div>
    </div>
  );
};

export default App;
