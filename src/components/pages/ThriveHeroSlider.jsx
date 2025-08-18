import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Users, Calendar, MapPin } from 'lucide-react';
import api from "../../api/axios";


const ThriveHeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/Events")
      .then(response => {
        setEvents(response.data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying || events.length === 0) return;
    const interval = setInterval(
      () => setCurrentSlide(prev => (prev + 1) % events.length),
      4000
    );
    return () => clearInterval(interval);
  }, [isAutoPlaying, events.length]);

  // Navigation
  const navigate = (direction) => {
    setCurrentSlide(prev =>
      direction === 'next'
        ? (prev + 1) % events.length
        : (prev - 1 + events.length) % events.length
    );
  };

  // Pause autoplay when interacting
  const handleInteraction = () => {
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-white bg-gray-900">
        Loading events...
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-white bg-gray-900">
        No events found.
      </div>
    );
  }

  const current = events[currentSlide];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={current.bgImage}
          alt={current.title}
          className="w-full h-full object-cover opacity-40"
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-between h-full px-8 lg:px-16">
        <div className="flex-1 max-w-2xl text-white">
          {/* Category */}
          <div className="inline-block px-3 py-1 mb-4 text-sm font-medium bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
            {current.category}
          </div>

          {/* Date */}
          <div className="flex items-center gap-2 mb-4 text-gray-200">
            <Calendar className="w-4 h-4" />
            <span className="text-lg">{current.date}</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl lg:text-7xl font-bold mb-4 leading-tight">{current.title}</h1>

          {/* Subtitle */}
          <div className="flex items-center gap-2 mb-6 text-xl text-gray-300">
            <MapPin className="w-5 h-5" />
            <span>{current.subtitle}</span>
          </div>

          {/* Price */}
          <div className="text-2xl font-semibold mb-8 text-cyan-300">{current.price}</div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleInteraction}
              className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Book tickets
            </button>
            <button
              onClick={handleInteraction}
              className="flex items-center gap-2 px-6 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              <Play className="w-4 h-4" /> Watch Trailer
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

      {/* Arrows */}
      <button
        onClick={() => { navigate('previous'); handleInteraction(); }}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={() => { navigate('next'); handleInteraction(); }}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {events.map((_, index) => (
          <button
            key={index}
            onClick={() => { setCurrentSlide(index); handleInteraction(); }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ThriveHeroSlider;