import { useState, useRef, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import MusicControl from './components/MusicControl';
import InvitationIntro from './components/InvitationIntro';
import DateReveal from './components/DateReveal';
import SaveTheDate from './components/SaveTheDate';
import GroomFamily from './components/GroomFamily';
import CoupleIntroduction from './components/CoupleIntroduction';
import WeddingDetails from './components/WeddingDetails';
import Reception from './components/Reception';
import VenueSection from './components/VenueSection';
import FinalSection from './components/FinalSection';
import { weddingData } from './data/weddingData';

import './components/Navigation.css';
import './components/Hero.css';
import './components/MusicControl.css';
import './components/InvitationIntro.css';
import './components/DateReveal.css';
import './components/SaveTheDate.css';
import './components/GroomFamily.css';
import './components/CoupleIntroduction.css';
import './components/WeddingDetails.css';
import './components/Reception.css';
import './components/VenueSection.css';
import './components/FinalSection.css';

function App() {
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const audioRef = useRef(null);
  const mainRef = useRef(null);
  const autoScrollRef = useRef({
    animationFrame: null,
    timeout: null,
    pauseTimeout: null,
    eventListeners: [],
    isActive: false,
    isPaused: false
  });

  useEffect(() => {
    audioRef.current = new Audio(weddingData.music.url);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      stopAutoScroll();
    };
  }, []);

  // Linear easing for perfectly equal speed
  const linear = (t) => t;

  // Get navigation height for offset calculation
  const getNavigationOffset = () => {
    const nav = document.querySelector('.navigation');
    if (!nav) return 0;
    return nav.offsetHeight;
  };

  // Stop auto-scroll and clean up
  const stopAutoScroll = () => {
    const ref = autoScrollRef.current;
    if (ref.animationFrame) {
      cancelAnimationFrame(ref.animationFrame);
      ref.animationFrame = null;
    }
    if (ref.timeout) {
      clearTimeout(ref.timeout);
      ref.timeout = null;
    }
    if (ref.pauseTimeout) {
      clearTimeout(ref.pauseTimeout);
      ref.pauseTimeout = null;
    }
    ref.eventListeners.forEach(({ element, event, handler }) => {
      element.removeEventListener(event, handler);
    });
    ref.eventListeners = [];
    ref.isActive = false;
    ref.isPaused = false;
  };

  // Scroll to a specific section with ultra-smooth animation
  const scrollToSection = (section, baseDuration) => {
    return new Promise((resolve) => {
      // Calculate target position immediately before scroll
      const targetPosition = section.getBoundingClientRect().top + window.scrollY - getNavigationOffset();
      const startPosition = window.pageYOffset;
      const distance = Math.abs(targetPosition - startPosition);
      
      const startTime = performance.now();

      const scrollAnimation = (currentTime) => {
        if (!autoScrollRef.current.isActive) {
          resolve();
          return;
        }

        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / baseDuration, 1);
        const easedProgress = linear(progress);

        const currentScroll = startPosition + (distance * easedProgress);
        window.scrollTo(0, currentScroll);

        if (progress < 1) {
          autoScrollRef.current.animationFrame = requestAnimationFrame(scrollAnimation);
        } else {
          // Ensure final position is exact
          window.scrollTo(0, targetPosition);
          autoScrollRef.current.animationFrame = null;
          resolve();
        }
      };

      autoScrollRef.current.animationFrame = requestAnimationFrame(scrollAnimation);
    });
  };

  // Continuous scroll through all sections without stopping
  const continuousScroll = (sections, baseDuration) => {
    if (!autoScrollRef.current.isActive || sections.length === 0) {
      stopAutoScroll();
      return;
    }

    // Calculate total distance from current position to final section
    const finalSection = sections[sections.length - 1];
    const finalTargetPosition = finalSection.getBoundingClientRect().top + window.scrollY - getNavigationOffset();
    const startPosition = window.pageYOffset;
    const totalDistance = finalTargetPosition - startPosition;

    // Calculate total duration based on total distance for equal speed
    const totalDuration = baseDuration * sections.length;

    const startTime = performance.now();

    const scrollAnimation = (currentTime) => {
      if (!autoScrollRef.current.isActive) {
        return;
      }

      // If paused, don't update scroll position
      if (autoScrollRef.current.isPaused) {
        autoScrollRef.current.animationFrame = requestAnimationFrame(scrollAnimation);
        return;
      }

      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / totalDuration, 1);
      const easedProgress = linear(progress);

      const currentScroll = startPosition + (totalDistance * easedProgress);
      window.scrollTo(0, currentScroll);

      if (progress < 1) {
        autoScrollRef.current.animationFrame = requestAnimationFrame(scrollAnimation);
      } else {
        // Ensure final position is exact
        window.scrollTo(0, finalTargetPosition);
        autoScrollRef.current.animationFrame = null;
        stopAutoScroll();
      }
    };

    autoScrollRef.current.animationFrame = requestAnimationFrame(scrollAnimation);
  };

  // Get all section elements (excluding Navigation and MusicControl)
  const getSections = () => {
    if (!mainRef.current) return [];
    return Array.from(mainRef.current.children).filter(child => {
      const tagName = child.tagName?.toLowerCase();
      return tagName === 'section' || child.classList?.contains('hero') || 
             child.classList?.contains('date-reveal') || child.classList?.contains('save-the-date') ||
             child.classList?.contains('groom-family') || child.classList?.contains('couple-introduction') ||
             child.classList?.contains('wedding-details') || child.classList?.contains('reception') ||
             child.classList?.contains('venue-section') || child.classList?.contains('final-section');
    });
  };

  // Handle user interaction to pause auto-scroll temporarily
  const handleUserInteraction = () => {
    if (autoScrollRef.current.isActive && !autoScrollRef.current.isPaused) {
      autoScrollRef.current.isPaused = true;

      // Clear any existing pause timeout
      if (autoScrollRef.current.pauseTimeout) {
        clearTimeout(autoScrollRef.current.pauseTimeout);
      }

      // Resume after 2 seconds
      autoScrollRef.current.pauseTimeout = setTimeout(() => {
        autoScrollRef.current.isPaused = false;
        autoScrollRef.current.pauseTimeout = null;
      }, 4000);
    }
  };

  // Start the cinematic auto-scroll sequence
  const startAutoScroll = () => {
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // Reset to top
    window.scrollTo({ top: 0, behavior: 'instant' });

    const sections = getSections();
    if (sections.length === 0) return;

    autoScrollRef.current.isActive = true;

    // Add event listeners for user interaction
    const events = ['wheel', 'touchstart', 'pointerdown', 'keydown'];
    events.forEach(event => {
      const handler = handleUserInteraction;
      window.addEventListener(event, handler, { passive: true });
      autoScrollRef.current.eventListeners.push({ element: window, event, handler });
    });

    // Add navigation click listeners
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    navLinks.forEach(link => {
      const handler = handleUserInteraction;
      link.addEventListener('click', handler);
      autoScrollRef.current.eventListeners.push({ element: link, event: 'click', handler });
    });

    // Responsive timing for ultra-slow cinematic feel
    const isMobile = window.innerWidth < 768;
    const scrollDuration = isMobile ? 5000 : 7000;

    // Start after 3 second delay
    autoScrollRef.current.timeout = setTimeout(() => {
      // Use continuous scroll for smooth video-like flow
      continuousScroll(sections, scrollDuration);
    }, 3000);
  };

  const handleIntroComplete = () => {
    setIsIntroComplete(true);
    // On desktop/tablet, scroll should never be locked
    if (window.innerWidth >= 768) {
      document.body.style.overflow = '';
    }

    // Stop any existing auto-scroll before starting new one
    stopAutoScroll();
    startAutoScroll();
  };

  return (
    <>
      <main ref={mainRef}>
        <Navigation />
        <MusicControl audioRef={audioRef} />
        <Hero />
        <DateReveal />
        <SaveTheDate />
        <GroomFamily />
        <CoupleIntroduction />
        <WeddingDetails />
        <Reception />
        <VenueSection />
        <FinalSection />
      </main>
      <InvitationIntro onOpen={handleIntroComplete} audioRef={audioRef} />
    </>
  );
}

export default App;
