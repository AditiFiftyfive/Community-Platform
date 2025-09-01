import { ArrowRight, Share2, Users, MapPin } from 'lucide-react';
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Footer from '../../components/Footer';
import Navbar from './../../components/Navbar';
import { fetchCommunities } from '../../reduxTK/features/community/communitySlice'; // Update path as needed

const Community = () => {
  // Use Redux instead of local state
  const dispatch = useDispatch();
  const { items: communities = [], loading, error } = useSelector(
    (state) => state.community
  );

  useEffect(() => {
    // Fetch communities through Redux
    if (communities.length === 0) {
      dispatch(fetchCommunities());
    }
  }, [dispatch, communities.length]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-purple-400 text-lg">Loading communities...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <p className="text-red-500 text-lg">Error loading communities: {error}</p>
          <button 
            onClick={() => dispatch(fetchCommunities())}
            className="mt-4 px-6 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (communities.length === 0) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-pink-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
          <div className="text-gray-400 text-4xl mb-4">🏘️</div>
          <p className="text-gray-600 text-lg">No communities found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6 sm:py-8 md:py-10 px-0">
      <div className="w-full px-4 sm:px-6 md:px-8 mb-6 sm:mb-8 md:mb-10 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-10 leading-tight px-2">
          Discover The Best Offline Communities In Your City
        </h1>
        <h2 className="text-base sm:text-lg md:text-xl text-gray-600 font-medium px-4">
          Curated Lists Of The Top Offline Communities, Meetups and Events To Join
        </h2>
      </div>

      <div className="w-full px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 cursor-pointer">
          {communities.map((c) => {
            // Generate consistent slug
            const slug = c.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
            
            return (
              <div
                key={c.id}
                className="w-full bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] sm:hover:scale-105"
              >
                {/* Image + title */}
                <div className="relative h-48 sm:h-56 md:h-64">
                  <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 sm:p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className={`w-6 sm:w-8 h-6 sm:h-8 ${c.color} rounded-full flex items-center justify-center`}
                      >
                        <Users size={14} className="sm:w-4 sm:h-4 text-white" />
                      </div>
                      <h3 className="text-white font-bold text-sm sm:text-base md:text-lg line-clamp-2">
                        {c.name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-1 text-white/90 text-xs sm:text-sm mb-2">
                      <MapPin size={12} className="sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                      <span className="truncate">{c.location}</span>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 sm:p-5 md:p-6">
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                    <span
                      className={`px-2 sm:px-3 py-1 ${c.color} text-white text-xs font-medium rounded-full`}
                    >
                      {c.category}
                    </span>
                    {c.subcategories.slice(0, 2).map((sub, i) => (
                      <span
                        key={i}
                        className="px-2 sm:px-3 py-1 bg-gray-200 text-gray-700 text-xs font-medium rounded-full"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mb-4 sm:mb-5">
                    <div className="min-w-0 flex-1 mr-4">
                      <p className="text-gray-600 text-xs sm:text-sm">Builder:</p>
                      <p className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                        {c.builder}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-gray-600 text-xs sm:text-sm">Members</p>
                      <p className="font-bold text-gray-800 text-sm sm:text-base">{c.members}</p>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Link
                      to={`/community/${slug}`}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2.5 sm:py-3 px-3 sm:px-5 rounded-lg transition-colors duration-200 text-sm sm:text-base flex items-center justify-center"
                    >
                      Explore Now
                    </Link>
                    <Link
                      to={`/join/${slug}`}
                      className="flex-1 bg-black hover:bg-gray-800 text-white font-semibold py-2.5 sm:py-3 px-3 sm:px-5 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
                    >
                      Join Now
                      <ArrowRight size={14} className="sm:w-4 sm:h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const DiscoverEvents = () => {
  const parentCategories = [
    { name: 'AI', events: '2K Events', bgColor: 'bg-[#D6D1B1]' },
    { name: 'Arts & Culture', events: '675 Events', bgColor: 'bg-[#C6D8D3]' },
    { name: 'Climate', events: '423 Events', bgColor: 'bg-[#E5CED8]' },
    { name: 'Fitness', events: '785 Events', bgColor: 'bg-[#D3C0D2]' },
    { name: 'Wellness', events: '994 Events', bgColor: 'bg-[#B9CEB2]' },
    { name: 'Crypto', events: '1K Events', bgColor: 'bg-[#C4B89F]' }
  ];

  return (
    <div className="min-h-screen pt-[150px] sm:pt-[120px] md:pt-[150px] py-6 sm:py-8 md:py-10">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 mb-6 sm:mb-8 md:mb-10 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 px-2">
          Discover Events
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 font-medium mb-3 sm:mb-4 px-4 leading-relaxed">
          Explore popular events near you, browse by category, or check out some of the great community calendars.
        </p>
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-6 sm:mb-8 px-2">
          Browse by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {parentCategories.map((category, i) => (
            <div 
              key={i} 
              className={`${category.bgColor} rounded-lg p-4 sm:p-5 md:p-6 hover:bg-gray-200 transition-colors duration-200 cursor-pointer hover:scale-[1.02] transition-transform`}
            >
              <div className="mb-3 sm:mb-4"></div>
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[#3A3335] mb-1 sm:mb-2">
                {category.name}
              </h3>
              <p className="text-gray-400 text-sm sm:text-base">{category.events}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const DiscoverPage = () => {
  return (
     <div className="min-h-screen bg-white bg-gradient-to-br from-[rgb(240,236,231)] to-white">
      <div className="overflow-y-auto">
        <Navbar />
        <DiscoverEvents />
        <Community /> 
        <Footer />
      </div>
    </div>
  );
};

export default DiscoverPage;