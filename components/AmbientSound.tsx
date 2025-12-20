
import React, { useEffect, useRef } from 'react';

interface AmbientSoundProps {
  isPlaying: boolean;
  isBeatPlaying: boolean;
}

const AmbientSound: React.FC<AmbientSoundProps> = ({ isPlaying, isBeatPlaying }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<number | null>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0; // Start muted
      audioRef.current.loop = true;
    }
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Clear any existing transition
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    const targetActive = isPlaying && !isBeatPlaying;

    if (targetActive) {
      // Initiate play and store promise
      playPromiseRef.current = audio.play();
      
      playPromiseRef.current.then(() => {
        const targetVolume = 0.3;
        intervalRef.current = window.setInterval(() => {
          if (audio.volume < targetVolume) {
            audio.volume = Math.min(targetVolume, audio.volume + 0.05);
          } else {
            if (intervalRef.current) window.clearInterval(intervalRef.current);
          }
        }, 100);
      }).catch(e => {
        console.warn("Ambient playback blocked or interrupted:", e);
      });
    } else {
      // Fade out
      intervalRef.current = window.setInterval(() => {
        if (audio.volume > 0.01) {
          audio.volume = Math.max(0, audio.volume - 0.05);
        } else {
          audio.volume = 0;
          if (intervalRef.current) window.clearInterval(intervalRef.current);
          
          // Only pause if the play promise has resolved or failed
          if (playPromiseRef.current) {
            playPromiseRef.current.then(() => {
              audio.pause();
            }).catch(() => {
              audio.pause();
            });
          } else {
            audio.pause();
          }
        }
      }, 100);
    }
  }, [isPlaying, isBeatPlaying]);

  return (
    <audio 
      ref={audioRef} 
      src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3" 
      preload="auto"
    />
  );
};

export default AmbientSound;
