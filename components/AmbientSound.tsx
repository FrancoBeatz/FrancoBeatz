
import React, { useEffect, useRef } from 'react';

interface AmbientSoundProps {
  isPlaying: boolean;
  isBeatPlaying: boolean;
}

const AmbientSound: React.FC<AmbientSoundProps> = ({ isPlaying, isBeatPlaying }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // Low background volume
      audioRef.current.loop = true;
    }
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying && !isBeatPlaying) {
      audioRef.current.play().catch(e => console.log("Autoplay prevented:", e));
      // Fade in effect
      const targetVolume = 0.3;
      audioRef.current.volume = 0;
      const fadeIn = setInterval(() => {
        if (audioRef.current && audioRef.current.volume < targetVolume) {
          audioRef.current.volume = Math.min(targetVolume, audioRef.current.volume + 0.05);
        } else {
          clearInterval(fadeIn);
        }
      }, 100);
    } else {
      // Fade out effect
      const fadeOut = setInterval(() => {
        if (audioRef.current && audioRef.current.volume > 0.01) {
          audioRef.current.volume = Math.max(0, audioRef.current.volume - 0.05);
        } else {
          if (audioRef.current) audioRef.current.pause();
          clearInterval(fadeOut);
        }
      }, 100);
    }
  }, [isPlaying, isBeatPlaying]);

  return (
    <audio 
      ref={audioRef} 
      src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3" // Ambient atmospheric track
      preload="auto"
    />
  );
};

export default AmbientSound;
