import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import seal from '../assets/seal.webp';

const InvitationIntro = ({ onOpen, audioRef }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isOpening, setIsOpening] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    
    // Scroll to top so Hero is revealed when envelope opens
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    // Start music immediately on click
    if (audioRef.current) {
      audioRef.current.play().catch(err => console.log('Audio play failed:', err));
    }
  };

  useEffect(() => {
    if (isOpening) {
      // Complete animation after 1.9s
      const complete = setTimeout(() => {
        setIsVisible(false);
        onOpen();
      }, 1900);

      return () => {
        clearTimeout(complete);
      };
    }
  }, [isOpening, onOpen]);

  // Lock scroll during intro (only on mobile)
  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = 'hidden';
    }

    // Restore scroll only when intro is complete (component unmounts)
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobile]);

  return (
    <AnimatePresence>
      {isVisible && isMobile && (
        <motion.div
          className="invitation-intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="envelope-stage">
            <div className="coded-envelope">
              {/* Envelope body */}
              <motion.div
                className="envelope-body"
                initial={{ opacity: 1 }}
                animate={isOpening ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.3, delay: isOpening ? 0.2 : 0 }}
              />

              {/* Four flaps using SVG for precise geometry */}
              <motion.svg
                className="envelope-flap-svg envelope-bottom-flap"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                initial={{ y: 0 }}
                animate={isOpening ? { y: '100vh' } : { y: 0 }}
                transition={{ duration: 1.5, ease: [0.65, 0, 0.35, 1], delay: isOpening ? 0.2 : 0 }}
              >
                <defs>
                  <linearGradient id="bottomGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#7C8B5B" />
                    <stop offset="100%" stopColor="#6D7C4C" />
                  </linearGradient>
                </defs>
                <polygon points="0,100 100,100 50,50" fill="url(#bottomGradient)" />
              </motion.svg>

              <motion.svg
                className="envelope-flap-svg envelope-left-flap"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                initial={{ x: 0 }}
                animate={isOpening ? { x: '-100vw' } : { x: 0 }}
                transition={{ duration: 1.5, ease: [0.65, 0, 0.35, 1], delay: isOpening ? 0.2 : 0 }}
              >
                <defs>
                  <linearGradient id="leftGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8B9A6B" />
                    <stop offset="100%" stopColor="#7C8B5B" />
                  </linearGradient>
                </defs>
                <polygon points="0,0 50,50 0,100" fill="url(#leftGradient)" />
                <path d="M0,0 L50,50 L0,100" fill="none" stroke="white" strokeWidth="0.3" opacity="0.5" />
              </motion.svg>

              <motion.svg
                className="envelope-flap-svg envelope-right-flap"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                initial={{ x: 0 }}
                animate={isOpening ? { x: '100vw' } : { x: 0 }}
                transition={{ duration: 1.5, ease: [0.65, 0, 0.35, 1], delay: isOpening ? 0.2 : 0 }}
              >
                <defs>
                  <linearGradient id="rightGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7C8B5B" />
                    <stop offset="100%" stopColor="#6D7C4C" />
                  </linearGradient>
                </defs>
                <polygon points="100,0 50,50 100,100" fill="url(#rightGradient)" />
                <path d="M100,0 L50,50 L100,100" fill="none" stroke="white" strokeWidth="0.3" opacity="0.5" />
              </motion.svg>

              <motion.svg
                className="envelope-flap-svg envelope-top-flap"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                initial={{ y: 0 }}
                animate={isOpening ? { y: '-100vh' } : { y: 0 }}
                transition={{ duration: 1.5, ease: [0.65, 0, 0.35, 1], delay: isOpening ? 0.2 : 0 }}
              >
                <defs>
                  <linearGradient id="topGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#9AA87B" />
                    <stop offset="100%" stopColor="#8B9A6B" />
                  </linearGradient>
                </defs>
                <polygon points="0,0 100,0 50,50" fill="url(#topGradient)" />
                <path d="M0,0 L50,50 L100,0" fill="none" stroke="white" strokeWidth="0.3" opacity="0.5" />
              </motion.svg>

              {/* Gold wax seal */}
              <motion.button
                className="wax-seal"
                onClick={handleOpen}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleOpen();
                  }
                }}
                aria-label="Open wedding invitation"
                initial={{ scale: 1, opacity: 1 }}
                animate={isOpening ? { scale: 0.8, opacity: 0 } : { scale: 1, opacity: 1 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
              >
                <img src={seal} alt="Wedding wax seal" className="seal-image" />
              </motion.button>

              {/* Instruction text */}
              <motion.p
                className="seal-instruction"
                initial={{ opacity: 0, y: 10 }}
                animate={isOpening ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.5,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
              >
                Tap the seal to open
              </motion.p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InvitationIntro;
