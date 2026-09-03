import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { weddingData } from '../data/weddingData';

const WeddingDetails = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });
  const { weddingDate, ceremony, weddingFunctions, officiant } = weddingData;

  return (
    <section className="wedding-details" id="wedding" ref={ref}>
      <div className="container">
        <motion.h2
          className="details-heading"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          The Wedding
        </motion.h2>
        
        <div className="details-grid">
          <motion.div
            className="detail-card ceremony"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h3 className="detail-title">Ceremony</h3>
            
            <div className="detail-info">
              <p className="detail-day">{weddingDate.dayOfWeek}</p>
              <p className="detail-date">{weddingDate.fullDate}</p>
              <p className="detail-time">{weddingDate.time}</p>
            </div>
            
            <div className="detail-venue">
              <p className="venue-name">{ceremony.venue}</p>
              <p className="venue-address">{ceremony.address}</p>
            </div>
            
            <div className="detail-officiant">
              <p className="officiant-label">Solemnized by</p>
              <p className="officiant-name">{officiant.name}</p>
              <p className="officiant-title">{officiant.title}</p>
            </div>
          </motion.div>
          
          <motion.div
            className="detail-card functions"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <h3 className="detail-title">Wedding Function</h3>
            
            <div className="detail-venue">
              <p className="venue-name">{weddingFunctions.venue}</p>
              <p className="wedding-venue-location">{weddingFunctions.location} ({weddingFunctions.address})</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WeddingDetails;
