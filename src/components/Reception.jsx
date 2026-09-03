import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { weddingData } from '../data/weddingData';

const Reception = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });
  const { reception, images, receptionMapUrl, receptionGuest } = weddingData;

  return (
    <section className="reception-section" id="reception" ref={ref}>
      <div className="reception-background">
        <motion.img
          src={images.reception}
          alt="Reception venue"
          className="reception-image"
          loading="lazy"
          initial={{ scale: 1.1 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 1.5 }}
        />
        <div className="reception-overlay" />
      </div>
      
      <div className="reception-content">
        <motion.div
          className="reception-info"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          {receptionGuest && (
            <motion.div
              className="final-guest-of-honour"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <p className="guest-introduction">The Reception function will be graced by the esteemed presence of</p>
              <div className="guest-divider" />
              <p className="guest-name">{receptionGuest.name}</p>
              {receptionGuest.title && <p className="guest-title">{receptionGuest.title}</p>}
            </motion.div>
          )}

          <h2 className="reception-heading">Reception</h2>
          
          <div className="reception-details">
            <p className="reception-date">{reception.date}</p>
            <p className="reception-day">{reception.day}</p>
            <p className="reception-time">{reception.time}</p>
          </div>
          
          <div className="reception-venue">
            <p className="venue-name-large">{reception.venue}</p>
            <p className="venue-location">{reception.location}</p>
          </div>
          
          <motion.a
            href={receptionMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="map-button"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            View Reception Venue
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Reception;
