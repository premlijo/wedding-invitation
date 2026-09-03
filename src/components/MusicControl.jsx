import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const MusicControl = ({ audioRef }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((error) => {
        console.log('Audio play failed:', error);
      });
      setIsPlaying(true);
    }
  };

  // Sync playing state with audio element
  useEffect(() => {
    if (!audioRef.current) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audioRef.current.addEventListener('play', handlePlay);
    audioRef.current.addEventListener('pause', handlePause);

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('play', handlePlay);
        audioRef.current.removeEventListener('pause', handlePause);
      }
    };
  }, [audioRef]);

  // Show music control after intro completes
  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <motion.button
        className="music-control"
        onClick={togglePlay}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        <motion.div
          className="music-icon"
          animate={isPlaying ? { scale: [1, 1.1, 1] } : { scale: 1 }}
          transition={{ duration: 2, repeat: isPlaying ? Infinity : 0 }}
        >
          {isPlaying ? '♪' : '♫'}
        </motion.div>
      </motion.button>
    </>
  );
};

export default MusicControl;
