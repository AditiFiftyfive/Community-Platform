import { ArrowRight, Share2, Users, MapPin } from 'lucide-react';
import React, { useState, useEffect } from "react";
import Footer from '../pages/Footer';
import Header from '../pages/Header';
import api from "../../api/axios";



const Community = () => {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/Communities")
      .then((response) => {
        setCommunities(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-white bg-gray-900">
        Loading communities...
      </div>
    );
  }

  if (communities.length === 0) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-white bg-gray-900">
        No communities found.
      </div>
    );
  }

  const handleAction = (action, name) =>
    alert(`${action} ${name}!\nThis would typically redirect to a ${action.toLowerCase()} page.`);

  return (
    <div className="min-h-screen bg-gray-100 py-6 sm:py-8 md:py-10 px-0">
      <div className="w-full px-4 sm:px-6 md:px-8 mb-6 sm:mb-8 md:mb-10 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-10 leading-tight px-2">
          Discover The Best Offline Communities In Your City
        </h1>
        <h2 className="text-base sm:text-lg md:text-xl text-gray-600 font-medium px-4">
          Curated Lists Of The Top Offline Communities, Meetups and Events To Join
        </h2>
      </div>


    </div>
  );
};


const DiscoverEvents = () => {
  const categories = [
    { name: 'AI', events: '2K Events', bgColor: 'bg-[#D6D1B1]', color: 'pink' },
    { name: 'Arts & Culture', events: '675 Events', bgColor: 'bg-[#C6D8D3]', color: 'yellow' },
    { name: 'Climate', events: '423 Events', bgColor: 'bg-[#C4B89F]', color: 'green' },
    { name: 'Fitness', events: '785 Events', bgColor: 'bg-[#E5CED8]', color: 'orange' },
    { name: 'Wellness', events: '994 Events', bgColor: 'bg-[#D3C0D2]', color: 'cyan' },
    { name: 'Crypto', events: '1K Events', bgColor: 'bg-[#B9CEB2]', color: 'purple' }
  ];

  return (
    <div className="min-h-screen bg-gray-100 pt-[150px] sm:pt-[120px] md:pt-[150px] py-6 sm:py-8 md:py-10">
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
          {categories.map((category, i) => (
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

const CommunityCards = () => {
  return (
     <div className="min-h-screen bg-white">
      <div className="overflow-y-auto">
        <Header />
        <DiscoverEvents />
        <Community />
        <Footer />
      </div>
    </div>
  );
};


export default CommunityCards;