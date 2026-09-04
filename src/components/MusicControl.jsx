import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
    const handlePlaying = () => setIsPlaying(true);

    audioRef.current.addEventListener('play', handlePlay);
    audioRef.current.addEventListener('pause', handlePause);
    audioRef.current.addEventListener('playing', handlePlaying);

    // Initialize state based on current audio state
    if (!audioRef.current.paused) {
      setIsPlaying(true);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('play', handlePlay);
        audioRef.current.removeEventListener('pause', handlePause);
        audioRef.current.removeEventListener('playing', handlePlaying);
      }
    };
  }, [audioRef]);

  // Show music control after intro completes
  useEffect(() => {
    setIsVisible(true);
    
    // Sync state with audio when becoming visible
    const syncAudioState = () => {
      if (audioRef.current && !audioRef.current.paused) {
        setIsPlaying(true);
      }
    };
    
    syncAudioState();
    
    // Poll audio state for a short time to catch any delayed state changes
    const pollInterval = setInterval(() => {
      syncAudioState();
    }, 100);
    
    // Clear polling after 3 seconds
    const timeout = setTimeout(() => {
      clearInterval(pollInterval);
    }, 3000);
    
    return () => {
      clearInterval(pollInterval);
      clearTimeout(timeout);
    };
  }, [audioRef]);

  if (!isVisible) return null;

  const PlayIcon = () => (
    <motion.svg
      width="22"
      height="24"
      viewBox="0 0 22 24"
      fill="none"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
    >
      <path
        d="M2 2L20 12L2 22V2Z"
        fill="white"
        fillOpacity="0.95"
      />
    </motion.svg>
  );

  const PauseIcon = () => (
    <motion.svg
      width="18"
      height="24"
      viewBox="0 0 18 24"
      fill="none"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
    >
      <rect
        x="0"
        y="0"
        width="5"
        height="24"
        rx="2"
        fill="white"
        fillOpacity="0.95"
      />
      <rect
        x="13"
        y="0"
        width="5"
        height="24"
        rx="2"
        fill="white"
        fillOpacity="0.95"
      />
    </motion.svg>
  );

  return (
    <motion.button
      className="music-control"
      onClick={togglePlay}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: isPlaying ? [1, 1.025, 1] : 1,
      }}
      transition={{
        duration: 0.5,
        scale: {
          duration: 3.5,
          repeat: isPlaying ? Infinity : 0,
          ease: "easeInOut"
        }
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isPlaying ? 'Pause music' : 'Play music'}
      type="button"
    >
      <AnimatePresence mode="wait">
        {isPlaying ? <PauseIcon key="pause" /> : <PlayIcon key="play" />}
      </AnimatePresence>
    </motion.button>
  );
};

export default MusicControl;
