const DiscoverEvents = () => {
  const parentCategories = [
  { 
    name: 'AI', 
    events: '2K Events', 
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100&h=100&fit=crop&crop=center&auto=format&q=85'
  },
  { 
    name: 'Arts & Culture', 
    events: '675 Events', 
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=100&h=100&fit=crop&crop=center&auto=format&q=85'
  },
  { 
    name: 'Climate', 
    events: '423 Events', 
    image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=100&h=100&fit=crop&crop=center&auto=format&q=85'
  },
  { 
    name: 'Fitness', 
    events: '785 Events', 
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=100&h=100&fit=crop&crop=center&auto=format&q=85'
  },
  { 
    name: 'Wellness', 
    events: '994 Events', 
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop&crop=center&auto=format&q=85'
  },
  { 
    name: 'Crypto', 
    events: '1K Events', 
    image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=100&h=100&fit=crop&crop=center&auto=format&q=85'
  }
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {parentCategories.map((category, i) => (
            <div 
              key={i} 
              className="group bg-white rounded-2xl p-6 hover:bg-gray-50 transition-all duration-300 cursor-pointer hover:scale-[1.03] border border-gray-100"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full overflow-hidden group-hover:scale-110 transition-transform duration-300">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-1">
                    {category.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{category.events}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscoverEvents;