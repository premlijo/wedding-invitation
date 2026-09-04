import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MusicControl = ({ audioRef }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const listenersAttached = useRef(false);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
      } catch (error) {
        console.error('Audio play failed:', error);
        setIsPlaying(false);
      }
    } else {
      audio.pause();
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      listenersAttached.current = false;
      return;
    }

    if (listenersAttached.current) return;

    const syncAudioState = () => {
      setIsPlaying(!audio.paused);
    };

    audio.addEventListener('play', syncAudioState);
    audio.addEventListener('playing', syncAudioState);
    audio.addEventListener('pause', syncAudioState);
    audio.addEventListener('ended', syncAudioState);

    syncAudioState();
    listenersAttached.current = true;

    return () => {
      audio.removeEventListener('play', syncAudioState);
      audio.removeEventListener('playing', syncAudioState);
      audio.removeEventListener('pause', syncAudioState);
      audio.removeEventListener('ended', syncAudioState);
      listenersAttached.current = false;
    };
  }, [audioRef?.current]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
