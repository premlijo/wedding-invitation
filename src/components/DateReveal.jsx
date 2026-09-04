import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useId, useEffect } from 'react';
import { weddingData } from '../data/weddingData';

// Reusable ScratchCard component
const ScratchCard = ({ children, delay, className, isInView, onComplete }) => {
  const maskId = useId();
  const [isScratching, setIsScratching] = useState(false);

  // Organic zig-zag scratch strokes for this card - spanning FULL width (0 to 100)
  const scratchStrokes = [
    "M 0 8 C 18 5, 35 11, 50 8 C 65 5, 82 11, 100 8",
    "M 100 20 C 82 17, 65 23, 50 20 C 35 17, 18 23, 0 20",
    "M 0 32 C 20 29, 40 35, 55 32 C 70 29, 88 35, 100 32",
    "M 100 44 C 80 41, 60 47, 40 44 C 20 41, 5 47, 0 44",
    "M 0 56 C 22 53, 45 59, 60 56 C 78 53, 90 59, 100 56",
    "M 100 68 C 78 65, 55 71, 35 68 C 15 65, 5 71, 0 68",
    "M 0 80 C 22 77, 45 83, 60 80 C 78 77, 90 83, 100 80",
    "M 100 92 C 78 89, 55 95, 35 92 C 15 89, 5 93, 0 92",
  ];

  // Start scratching when in view
  useEffect(() => {
    if (isInView) {
      setIsScratching(true);
    } else {
      setIsScratching(false);
    }
  }, [isInView]);

  return (
    <div className={`scratch-card ${className}`}>
      {/* Date content underneath */}
      <div className="scratch-card-content">
        {children}
      </div>

      {/* Scratch coating overlay - covers entire card */}
      <motion.div
        className="scratch-card-coating"
        key={`coating-${isInView}`}
        initial={{ opacity: 1 }}
        animate={isInView ? { opacity: 0 } : { opacity: 1 }}
        transition={{
          duration: 1.5,
          delay: delay,
          ease: [0.25, 0.1, 0.25, 1]
        }}
        onAnimationComplete={() => {
          setIsScratching(false);
          if (onComplete) onComplete();
        }}
      />

      {/* Subtle scratch highlight */}
      {isInView && isScratching && (
        <motion.div
          className="scratch-card-highlight"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0] }}
          transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 0.06 }}
        />
      )}
    </div>
  );
};

const DateReveal = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });
  const { weddingDate } = weddingData;
  const [allComplete, setAllComplete] = useState(false);
  const [completedCards, setCompletedCards] = useState({ day: false, month: false, year: false });

  const handleCardComplete = (card) => {
    setCompletedCards(prev => ({ ...prev, [card]: true }));
  };

  // Check if all cards are complete
  useEffect(() => {
    if (completedCards.day && completedCards.month && completedCards.year) {
      setAllComplete(true);
    }
  }, [completedCards]);

  // Reset completion state when scrolling away
  useEffect(() => {
    if (!isInView) {
      setAllComplete(false);
      setCompletedCards({ day: false, month: false, year: false });
    }
  }, [isInView]);

  return (
    <section className="date-reveal" id="date" ref={ref}>
      <div className="container">
        <motion.h2
          className="date-heading"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          The Date
        </motion.h2>
        
        <div className="date-cards-row">
          <ScratchCard
            delay={0.5}
            className="day-card"
            isInView={isInView}
            onComplete={() => handleCardComplete('day')}
          >
            <div className="date-day">{weddingDate.day}</div>
          </ScratchCard>

          <ScratchCard
            delay={1}
            className="month-card"
            isInView={isInView}
            onComplete={() => handleCardComplete('month')}
          >
            <div className="date-month">{weddingDate.month}</div>
          </ScratchCard>

          <ScratchCard
            delay={1.5}
            className="year-card"
            isInView={isInView}
            onComplete={() => handleCardComplete('year')}
          >
            <div className="date-year">{weddingDate.year}</div>
          </ScratchCard>
        </div>

        {/* Bottom accent line */}
        {allComplete && (
          <motion.div
            className="date-accent-line"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          >
            <span className="accent-star">✦</span>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default DateReveal;
