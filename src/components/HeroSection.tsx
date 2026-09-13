import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HeroSection: React.FC = () => {
  const { siteContent, navigateTo } = useApp();
  const slides = siteContent?.home?.heroSlides?.length 
    ? siteContent.home.heroSlides 
    : [
        {
          id: '1',
          imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156a?auto=format&fit=crop&w=1920&q=80',
          title: 'Welcome To Smart Engineering',
          subtitle: 'For structural, architectural, electrical & plumbing solutions for your industry.',
          buttonText: 'Contact Us',
          buttonLink: '#contact'
        }
      ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Keep index in range if slides change
  useEffect(() => {
    if (currentSlide >= slides.length) {
      setCurrentSlide(0);
    }
  }, [slides.length, currentSlide]);

  // Auto-play slider every 6 seconds
  useEffect(() => {
    if (isPaused || slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section 
      id="home"
      className="relative w-full h-[380px] xs:h-[440px] sm:h-[500px] md:h-[560px] lg:h-[620px] bg-neutral-950 overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slide Images */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          {/* Background Image */}
          <img
            src={slide.imageUrl}
            alt={slide.title}
            className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-10000"
          />

          {/* Dark Overlay matching reference image 1 */}
          <div className="absolute inset-0 bg-black/45" />
        </div>
      ))}

      {/* Center Glass/Card Content (Identical layout to reference image 1) */}
      <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-center text-center">
        <div className="max-w-3xl mx-auto py-6 px-4 sm:px-8">
          
          {/* Main Title: Welcome To Smart Engineering */}
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-3 sm:mb-4 drop-shadow-md">
            {slides[currentSlide].title}
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-slate-100 max-w-2xl mx-auto font-medium leading-relaxed mb-6 sm:mb-8 drop-shadow-xs">
            {slides[currentSlide].subtitle}
          </p>

          {/* Contact Us Outline Button (as shown in reference image 1) */}
          <div className="flex items-center justify-center">
            <a
              href={slides[currentSlide]?.buttonLink || '#contact'}
              className="inline-block border-2 border-white text-white hover:bg-[#e52424] hover:border-[#e52424] font-bold text-xs sm:text-sm uppercase tracking-wider px-6 sm:px-8 py-2.5 sm:py-3 rounded transition-all duration-200 shadow-lg cursor-pointer"
            >
              {slides[currentSlide]?.buttonText || 'Contact Us'}
            </a>
          </div>
        </div>
      </div>

      {/* Navigation Arrows (Left & Right) */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-[#e52424] text-white flex items-center justify-center transition-all border border-white/20 backdrop-blur-xs"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-[#e52424] text-white flex items-center justify-center transition-all border border-white/20 backdrop-blur-xs"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Slide Indicators / Dots */}
      <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 z-30 flex items-center justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`transition-all rounded-full ${
              index === currentSlide
                ? 'w-8 h-2.5 bg-[#e52424]'
                : 'w-2.5 h-2.5 bg-white/60 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
