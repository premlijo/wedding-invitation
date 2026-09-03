import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { weddingData } from '../data/weddingData';

const GroomFamily = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });
  const { groomFamily } = weddingData;

  return (
    <section className="groom-family" ref={ref}>
      <div className="container">
        <motion.div
          className="groom-family-content"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          
          <motion.div
            className="family-primary"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {groomFamily.fatherName && (
              <>
                <p className="family-name">{groomFamily.fatherName}</p>
                {groomFamily.fatherTitle && <p className="family-title">{groomFamily.fatherTitle}</p>}
              </>
            )}
            
            {groomFamily.motherName && (
              <>
                <p className="family-name">{groomFamily.motherName}</p>
                {groomFamily.motherTitle && <p className="family-title">{groomFamily.motherTitle}</p>}
              </>
            )}

            {groomFamily.fatherName && groomFamily.motherName && <div className="family-divider" />}
            
            {groomFamily.address && <p className="family-address">{groomFamily.address}</p>}
            {groomFamily.mobile && <p className="family-mobile">Mob: {groomFamily.mobile}</p>}
          </motion.div>
          
          <h2 className="family-heading">{groomFamily.heading}</h2>
        </motion.div>
      </div>
    </section>
  );
};

export default GroomFamily;
