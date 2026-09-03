import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { weddingData } from '../data/weddingData';

const CoupleIntroduction = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });
  const { groom, bride, images } = weddingData;

  return (
    <section className="couple-introduction" id="couple" ref={ref}>
      <div className="container">
        <div className="couple-grid">
          <motion.div
            className="couple-person groom"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="person-image">
              <img src={images.groom} alt={groom.fullName} loading="lazy" />
            </div>
            <div className="person-info">
              <h3 className="person-name script-text">{groom.fullName}</h3>
              <p className="person-relation">Son of</p>
              <p className="person-parents">{groom.parents}</p>
              <p className="person-address">{groom.address}</p>
            </div>
          </motion.div>
          
          <motion.div
            className="couple-divider"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <span className="divider-connector">with</span>
          </motion.div>
          
          <motion.div
            className="couple-person bride"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className="person-image">
              <img src={images.bride} alt={bride.fullName} loading="lazy" />
            </div>
            <div className="person-info">
              <h3 className="person-name script-text">{bride.fullName}</h3>
              <p className="person-relation">Daughter of</p>
              <p className="person-parents">{bride.parents}</p>
              <p className="person-address">{bride.address}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CoupleIntroduction;
