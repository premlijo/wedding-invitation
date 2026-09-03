import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { weddingData } from '../data/weddingData';
import finalImage from '../assets/final.jpeg';

const FinalSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });
  const { groom, bride, closing } = weddingData;

  return (
    <section className="final-section" ref={ref}>
      <div className="final-background">
        <motion.img
          src={finalImage}
          alt="Wedding celebration"
          className="final-image"
          loading="lazy"
          initial={{ scale: 1.1 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 1.5 }}
        />
        <div className="final-overlay" />
      </div>
      
      <div className="final-content">
        <motion.div
          className="final-message"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="final-compliments"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <p className="compliments-text">{closing.compliments}</p>
            <p className="signatory-name script-text">{closing.signatory}</p>
            <p className="kin-text">{closing.kin}</p>
          </motion.div>
          
          <motion.div
            className="final-signature"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <p className="signature-names script-text">
              {groom.fullName} & {bride.fullName}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalSection;
