import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { weddingData } from '../data/weddingData';

const DateReveal = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });
  const { weddingDate } = weddingData;

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
        
        <div className="date-display">
          <motion.div
            className="date-day"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {weddingDate.day}
          </motion.div>
          
          <motion.div
            className="date-month"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {weddingDate.month}
          </motion.div>
          
          <motion.div
            className="date-year"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {weddingDate.year}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DateReveal;
