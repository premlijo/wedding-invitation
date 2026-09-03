import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { weddingData } from '../data/weddingData';

const VenueSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });
  const { ceremony, weddingFunctions, reception, images, weddingMapUrl, functionMapUrl, receptionMapUrl } = weddingData;

  return (
    <section className="venue-section" id="venue" ref={ref}>
      <div className="venue-content">
        <motion.div
          className="venue-info"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <h2 className="venue-heading">Venue Locations</h2>
          
          <div className="venue-cards">
            <motion.div
              className="venue-card"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="venue-card-title">Wedding Ceremony</h3>
              <p className="venue-card-name">{ceremony.venue}</p>
              <p className="venue-card-address">{ceremony.address}</p>
              {ceremony.qrLabel && <p className="venue-qr-label">{ceremony.qrLabel}</p>}
              <motion.a
                href={weddingMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="venue-map-link"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                View on Map
              </motion.a>
            </motion.div>

            <motion.div
              className="venue-card"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h3 className="venue-card-title">Wedding Function</h3>
              <p className="venue-card-name">{weddingFunctions.venue}</p>
              <p className="venue-card-address">{weddingFunctions.location}</p>
              <p className="venue-card-sub">{weddingFunctions.address}</p>
              {weddingFunctions.qrLabel && <p className="venue-qr-label">{weddingFunctions.qrLabel}</p>}
              {functionMapUrl && (
                <motion.a
                  href={functionMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="venue-map-link"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View on Map
                </motion.a>
              )}
            </motion.div>

            <motion.div
              className="venue-card"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="venue-card-title">Reception</h3>
              <p className="venue-card-name">{reception.venue}</p>
              <p className="venue-card-address">{reception.location}</p>
              {reception.qrLabel && <p className="venue-qr-label">{reception.qrLabel}</p>}
              <motion.a
                href={receptionMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="venue-map-link"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                View on Map
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VenueSection;
