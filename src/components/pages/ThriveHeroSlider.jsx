import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Users, Calendar, MapPin } from 'lucide-react';
import crochet from '../../assets/crochet.png';



const ThriveHeroSlider = () => {
  const slides = [
    {
      id: 1,
      title: "Crochet | Community",
      subtitle: "Convention Center, Delhi",
      date: "11 Aug - 31 Aug, 12PM",
      price: "₹590 onwards",
      bgImage: crochet,
      category: "Wellness"
    },
    {
      id: 2,
      title: "The Kindness Meal",
      subtitle: "Parimal Gardens, Bangalore",
      date: "15 Sep - 17 Sep, 10AM",
      price: "₹1,200 onwards",
      bgImage: "https://curlytales.com/wp-content/uploads/2024/02/The-Kindness-Meal-800x450.jpg",
      category: "CULTURE & FOOD"
    },
    {
      id: 3,
      title: "Kythera Jams",
      subtitle: "Prarthana Yoga Studio, Jaipur",
      date: "Every Thursday, 7:30PM",
      price: "₹800 onwards",
      bgImage: "https://ts-production.imgix.net/images/fa8a8355-c8bd-4d80-b545-b50575f01dc7.jpg?auto=compress,format&w=800&h=450",
      category: "Entertainment"
    },
    {
      id: 4,
      title: "Jaipur Trekking Community",
      subtitle: "Hawa Mahal, Jaipur",
      date: "Every Sunday, 4AM",
      price: "₹450 onwards",
      bgImage: "https://trekkingmantra.com/uploads/ddb34ad69cea018a6ab53372779ecc8a.jpg?v=1789427477",
      category: "Fitness & Outdoors"
    }
  ];

  // State to track current slide
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((previousSlide) => (previousSlide + 1) % slides.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  // Navigation functions
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((previousSlide) => (previousSlide - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((previousSlide) => (previousSlide + 1) % slides.length);
  };

  // Pause auto-play when user interacts
  const handleUserInteraction = () => {
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume after 10 seconds
  };

  const current = slides[currentSlide];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={current.bgImage}
          alt={current.title}
          className="w-full h-full object-cover opacity-40"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-between h-full px-8 lg:px-16">
        {/* Left Content */}
        <div className="flex-1 max-w-2xl text-white">
          {/* Category Badge */}
          <div className="inline-block px-3 py-1 mb-4 text-sm font-medium bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
            {current.category}
          </div>

          {/* Date */}
          <div className="flex items-center gap-2 mb-4 text-gray-200">
            <Calendar className="w-4 h-4" />
            <span className="text-lg">{current.date}</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl lg:text-7xl font-bold mb-4 leading-tight">
            {current.title}
          </h1>

          {/* Subtitle with Location */}
          <div className="flex items-center gap-2 mb-6 text-xl text-gray-300">
            <MapPin className="w-5 h-5" />
            <span>{current.subtitle}</span>
          </div>

          {/* Price */}
          <div className="text-2xl font-semibold mb-8 text-cyan-300">
            {current.price}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleUserInteraction}
              className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Book tickets
            </button>
            <button
              onClick={handleUserInteraction}
              className="flex items-center gap-2 px-6 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              <Play className="w-4 h-4" />
              Watch Trailer
            </button>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 mt-8 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>1.2K interested</span>
            </div>
            <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
            <span>Limited seats available</span>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => { goToPrevious(); handleUserInteraction(); }}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={() => { goToNext(); handleUserInteraction(); }}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => { goToSlide(index); handleUserInteraction(); }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white scale-125'
                : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ThriveHeroSlider;