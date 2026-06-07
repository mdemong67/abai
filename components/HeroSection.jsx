'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
const HERO_IMAGES = [
    '/images/hero-banner.jpg',
    '/images/hero-banner.jpg', // You can add different images here
    '/images/hero-banner.jpg',
];
const SLIDE_INTERVAL = 7000; // 7 seconds
export default function HeroSection() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [direction, setDirection] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => {
            setDirection(1);
            setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
        }, SLIDE_INTERVAL);
        return () => clearInterval(timer);
    }, []);
    const slideVariants = {
        enter: (dir) => ({
            x: dir > 0 ? 1000 : -1000,
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (dir) => ({
            zIndex: 0,
            x: dir > 0 ? -1000 : 1000,
            opacity: 0,
        }),
    };
    const paginate = (newDirection) => {
        setDirection(newDirection);
        setCurrentSlide((prev) => (prev + newDirection + HERO_IMAGES.length) % HERO_IMAGES.length);
    };
    return (<section className="relative w-full h-screen min-h-[600px] sm:min-h-[700px] md:min-h-screen overflow-hidden pt-16 sm:pt-20">
      {/* Carousel Background */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div key={currentSlide} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 },
        }} className="absolute inset-0 w-full h-full" style={{
            backgroundImage: `url(${HERO_IMAGES[currentSlide]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40"/>
        </motion.div>
      </AnimatePresence>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center">
        {/* Logo with animation */}
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }} className="mb-6 sm:mb-8">
          <img src="/images/abai-logo.png" alt="ABAI Logo" className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 drop-shadow-lg"/>
        </motion.div>

        {/* Heading */}
        <motion.h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 drop-shadow-lg max-w-4xl" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4, duration: 0.6 }}>
          All Bangladeshi Association of Ireland
        </motion.h1>

        {/* Subtitle */}
        <motion.p className="text-white/90 text-lg sm:text-xl md:text-2xl mb-8 sm:mb-12 drop-shadow-lg max-w-2xl" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6, duration: 0.6 }}>
          Connecting Communities, Celebrating Heritage
        </motion.p>

        {/* CTA Buttons */}
        <motion.div className="flex flex-col sm:flex-row gap-4 sm:gap-6" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8, duration: 0.6 }}>
          <motion.button className="px-8 py-3 sm:py-4 bg-[#6B1C23] text-white font-bold rounded-lg hover:bg-[#8B2C33] transition-colors text-base sm:text-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Learn More
          </motion.button>
          <motion.button className="px-8 py-3 sm:py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors text-base sm:text-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Join Community
          </motion.button>
        </motion.div>
      </div>

      {/* Navigation Arrows */}
      <motion.button className="absolute left-4 sm:left-6 top-1/2 transform -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-white/20 hover:bg-white/40 transition-colors backdrop-blur-sm" onClick={() => paginate(-1)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} aria-label="Previous slide">
        <FiChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 text-white"/>
      </motion.button>

      <motion.button className="absolute right-4 sm:right-6 top-1/2 transform -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-white/20 hover:bg-white/40 transition-colors backdrop-blur-sm" onClick={() => paginate(1)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} aria-label="Next slide">
        <FiChevronRight className="w-6 h-6 sm:w-8 sm:h-8 text-white"/>
      </motion.button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {HERO_IMAGES.map((_, index) => (<motion.button key={index} className={`h-2 rounded-full transition-all ${index === currentSlide
                ? 'w-8 bg-[#D4AF37]'
                : 'w-2 bg-white/50 hover:bg-white/70'}`} onClick={() => {
                setDirection(index > currentSlide ? 1 : -1);
                setCurrentSlide(index);
            }} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} aria-label={`Go to slide ${index + 1}`}/>))}
      </div>

      {/* Scroll indicator */}
      <motion.div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20" animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/70 text-xs sm:text-sm">Scroll to explore</span>
          <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
          </svg>
        </div>
      </motion.div>
    </section>);
}
