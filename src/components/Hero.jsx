import { motion } from 'framer-motion';
import { weddingData } from '../data/weddingData';

const Hero = () => {
  const { groom, bride, images, bibleVerse } = weddingData;

  return (
    <section className="hero" id="home">
      <div className="hero-background">
        <motion.img
          src={images.hero}
          alt="Wedding couple"
          className="hero-image"
          loading="eager"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
        />
        <div className="hero-overlay" />
      </div>
      
      <div className="hero-content">
        <motion.div
          className="hero-bible-verse"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <p className="bible-text">{bibleVerse.text}</p>
          <p className="bible-reference">{bibleVerse.reference}</p>
        </motion.div>
        
        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Together with our families
        </motion.p>
        
        <motion.div
          className="hero-names"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <h1 className="script-text hero-groom">{groom.fullName}</h1>
          <span className="hero-connector">And</span>
          <h1 className="script-text hero-bride">{bride.fullName}</h1>
        </motion.div>
        
        <motion.p
          className="hero-announcement"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          are getting married
        </motion.p>
        
        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <span className="scroll-text">Scroll to discover</span>
          <motion.div
            className="scroll-arrow"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            ↓
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
