import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { weddingData } from '../data/weddingData';

const SaveTheDate = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });
  const { images, bride, groom } = weddingData;

  return (
    <section className="save-the-date" ref={ref}>
      <div className="std-container">
        <motion.div
          className="std-image"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2 }}
        >
          <img src={images.couple} alt={`${bride.firstName} & ${groom.firstName}`} loading="lazy" />
          <div className="std-overlay" />
        </motion.div>
        
        <motion.div
          className="std-content"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h2 className="std-title">You're Invited</h2>
          
          <motion.div
            className="std-badge"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            ✦ Save the Date ✦
          </motion.div>
          
          <motion.p
            className="std-message"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.7 }}
          >
            As we begin this beautiful journey together, we would be honored to celebrate this special day with the people we love.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default SaveTheDate;
