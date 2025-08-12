import { ArrowRight, Share2, Users, MapPin } from 'lucide-react';
import Footer from '../pages/Footer';
import Header from '../pages/Header';


const Community = () => {
  const communities = [
    { id: 1, name: "Mumbai Street Food Explorers", location: "Mumbai, Maharashtra", category: "FOOD", subcategories: ["STREET FOOD", "CULTURE", "SOCIAL"], image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&h=400&fit=crop", builder: "Priya Sharma", color: "bg-orange-500", members: "4.8K" },
    { id: 2, name: "Lucknow Arts & Crafts Guild", location: "Lucknow, Uttar Pradesh", category: "ART", subcategories: ["HANDICRAFTS", "TRADITIONAL", "CULTURE"], image: "https://c7.alamy.com/comp/2CWD2P1/local-crafts-people-selling-their-wares-in-the-amazon-nature-park-amazon-basin-loreto-peru-2CWD2P1.jpg", builder: "Shabana Khan", color: "bg-rose-500", members: "1.8K" },
    { id: 3, name: "Delhi Heritage Walks", location: "New Delhi, Delhi", category: "HISTORY", subcategories: ["HERITAGE", "WALKING", "CULTURE"], image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&h=400&fit=crop", builder: "Ananya Singh", color: "bg-amber-600", members: "3.4K" },
    { id: 4, name: "Music Circle", location: "Boston, MA", category: "MUSIC", subcategories: ["DANCING", "CARNATIC", "PERFORMANCE"], image: "https://framerusercontent.com/images/sKJBEh34z8FAyZG6LvXU5sQwKQ.jpg", builder: "Harry Johnson", color: "bg-purple-500", members: "2.7K" },
    { id: 5, name: "Goa Beach Volleyball Club", location: "Goa, India", category: "SPORTS", subcategories: ["VOLLEYBALL", "BEACH", "FITNESS"], image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/5b/2b/28/caption.jpg?w=1400&h=800&s=1", builder: "Rohan D'Souza", color: "bg-teal-500", members: "1.9K" },
    { id: 6, name: "Kolkata Book Lovers Society", location: "Kolkata, West Bengal", category: "BOOKS", subcategories: ["LITERATURE", "BENGALI", "DISCUSSION"], image: "https://imgmediagumlet.lbb.in/media/2023/06/6481ac390921233807b71066_1686219833251.jpg", builder: "Soma Chatterjee", color: "bg-indigo-500", members: "4.1K" },
    { id: 7, name: "The Kindless Meal", location: "Hyderabad, Telangana", category: "FOOD", subcategories: ["VEGGIES", "HOME GROWN", "TASTE"], image: "https://curlytales.com/wp-content/uploads/2024/02/The-Kindness-Meal-800x450.jpg", builder: " Dipali", color: "bg-yellow-600", members: "3.8K" },
    { id: 8, name: "Pune Adventure Trekkers", location: "Pune, Maharashtra", category: "ADVENTURE", subcategories: ["TREKKING", "SAHYADRI", "OUTDOOR"], image: "https://images.pexels.com/photos/33389273/pexels-photo-33389273.jpeg?_gl=1*1b0r8b1*_ga*MTM0OTQ1ODY2NS4xNzUzMDc4NTY4*_ga_8JE65Q40S6*czE3NTQ5MTgzMzUkbzckZzEkdDE3NTQ5MTg0MTMkajQ4JGwwJGgw", builder: "Vikram Patil", color: "bg-green-600", members: "5.5K" },
    { id: 9, name: "Jaipur Photography Club", location: "Jaipur, Rajasthan", category: "PHOTOGRAPHY", subcategories: ["HERITAGE", "STREET", "PORTRAIT"], image: "https://images.pexels.com/photos/2764364/pexels-photo-2764364.jpeg?_gl=1*1frzcjf*_ga*MTM0OTQ1ODY2NS4xNzUzMDc4NTY4*_ga_8JE65Q40S6*czE3NTQ5MTgzMzUkbzckZzEkdDE3NTQ5MTgzNTEkajQ0JGwwJGgw", builder: "Arjun Rathore", color: "bg-pink-500", members: "2.9K" },
    { id: 10, name: "Kerala Spice Gardens Network", location: "Kochi, Kerala", category: "AGRICULTURE", subcategories: ["SPICES", "ORGANIC", "FARMING"], image: "https://www.honeymoonbug.com/blog/wp-content/uploads/2022/07/Cinnamon-Gardens-Spices-Plantation-kerala.jpg", builder: "Maya Nair", color: "bg-emerald-500", members: "1.6K" },
    { id: 11, name: "Brews and Shoes Run Club", location: "Ahmedabad, Gujarat", category: "Running", subcategories: ["RUNNING", "HEALTH", "LIVING"], image: "https://www.bpmcdn.com/f/files/victoria/2025-august/250801-vne-runclubs.jpg;w=960", builder: "Mohit Doshi", color: "bg-blue-600", members: "4.3K" },
    { id: 12, name: "Mindful Movements Yoga Circle", location: "Jaipur, Rajasthan", category: "WELLNESS", subcategories: ["YOGA", "MEDITATION", "HEALTH"], image: "https://images.pexels.com/photos/8613313/pexels-photo-8613313.jpeg?_gl=1*1r7k8y1*_ga*MTM0OTQ1ODY2NS4xNzUzMDc4NTY4*_ga_8JE65Q40S6*czE3NTQ5MTIxNDIkbzYkZzEkdDE3NTQ5MTIzOTYkajYwJGwwJGgw", builder: "Meera", color: "bg-violet-500", members: "3.1K" },
    { id: 13, name: "Chandigarh Cycling Enthusiasts", location: "Chandigarh, India", category: "SPORTS", subcategories: ["CYCLING", "FITNESS", "ENVIRONMENT"], image: "https://usercontent.one/wp/cycleclub.london/wp-content/uploads/2024/03/Altea-2024-16.jpeg", builder: "Hardeep Singh", color: "bg-cyan-500", members: "2.2K" },
    { id: 14, name: "Bangalore Tech Innovators", location: "Bangalore, Karnataka", category: "TECHNOLOGY", subcategories: ["STARTUP", "AI", "CODING"], image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600&h=400&fit=crop", builder: "Rajesh Kumar", color: "bg-blue-500", members: "6.2K" }
  ];

  const handleAction = (action, name) => alert(`${action} ${name}! 
    This would typically redirect to a ${action.toLowerCase()} page.`);

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
      <div className="w-full px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {communities.map((c) => (
            <div key={c.id} className="w-full bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] sm:hover:scale-105">
              <div className="relative h-48 sm:h-56 md:h-64">
                <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 sm:p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-6 sm:w-8 h-6 sm:h-8 ${c.color} rounded-full flex items-center justify-center`}>
                      <Users size={14} className="sm:w-4 sm:h-4 text-white" />
                    </div>
                    <h3 className="text-white font-bold text-sm sm:text-base md:text-lg line-clamp-2">{c.name}</h3>
                  </div>
                  <div className="flex items-center gap-1 text-white/90 text-xs sm:text-sm mb-2">
                    <MapPin size={12} className="sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                    <span className="truncate">{c.location}</span>
                  </div>
                </div>
              </div>
              <div className="p-4 sm:p-5 md:p-6">
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                  <span className={`px-2 sm:px-3 py-1 ${c.color} text-white text-xs font-medium rounded-full`}>
                    {c.category}
                  </span>
                  {c.subcategories.slice(0, 2).map((sub, i) => (
                    <span key={i} className="px-2 sm:px-3 py-1 bg-gray-200 text-gray-700 text-xs font-medium rounded-full">
                      {sub}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between mb-4 sm:mb-5">
                  <div className="min-w-0 flex-1 mr-4">
                    <p className="text-gray-600 text-xs sm:text-sm">Builder:</p>
                    <p className="font-semibold text-gray-800 text-sm sm:text-base truncate">{c.builder}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-gray-600 text-xs sm:text-sm">Members</p>
                    <p className="font-bold text-gray-800 text-sm sm:text-base">{c.members}</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button 
                    onClick={() => handleAction('Exploring', c.name)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2.5 sm:py-3 px-3 sm:px-5 rounded-lg transition-colors duration-200 text-sm sm:text-base"
                  >
                    Explore Now
                  </button>
                  <button 
                    onClick={() => handleAction('Joining', c.name)}
                    className="flex-1 bg-black hover:bg-gray-800 text-white font-semibold py-2.5 sm:py-3 px-3 sm:px-5 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    Join Now
                    <ArrowRight size={14} className="sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const DiscoverEvents = () => {
  const categories = [
    { name: 'AI', events: '2K Events', bgColor: 'bg-[#BDC2BF]', color: 'pink' },
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