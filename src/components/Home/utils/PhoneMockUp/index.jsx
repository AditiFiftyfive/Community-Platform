import React from 'react'
export { PhoneMockUp, TicketCard, ProfileCard, SocialProofBanner };


const PhoneMockUp = () => {
  return (
    
    <div className="relative mt-8 sm:mt-10 md:mt-12">
      <div className="w-48 sm:w-56 md:w-64 h-[360px] sm:h-[420px] md:h-[480px] bg-black rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] p-1.5 sm:p-2 shadow-2xl mx-auto">
        <div className="w-full h-full bg-white rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] overflow-hidden">
          <div className="relative h-full">
            <div className="flex justify-between items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-white">
              <div className="w-4 sm:w-5 h-1.5 sm:h-2 bg-black rounded-full"></div>
              <div className="text-xs font-semibold">9:41</div>
              <div className="flex space-x-1">
                <div className="w-2.5 sm:w-3 h-1.5 sm:h-2 bg-black rounded-sm"></div>
                <div className="w-2.5 sm:w-3 h-1.5 sm:h-2 bg-black rounded-sm"></div>
              </div>
            </div>

            <div className="px-2.5 sm:px-3 py-1.5 sm:py-2">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <div className="text-sm sm:text-base font-bold leading-none">Yoga with Swindells</div>
              </div>

              <div className="bg-gray-50 rounded-lg sm:rounded-xl p-2.5 sm:p-3 mb-2 sm:mb-3">
                <div className="flex items-center space-x-1.5 sm:space-x-2 mb-1.5 sm:mb-2">
                  <div className="w-8 sm:w-10 h-8 sm:h-10 bg-orange-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-xs sm:text-sm">Y</span>
                  </div>
                  <div>
                    <div className="font-semibold text-[11px] sm:text-xs leading-tight">Posture Flow class for beginners</div>
                    <div className="text-[9px] sm:text-[10px] text-gray-500">Hosted by Charlie</div>
                  </div>
                </div>
                <img 
                  src="https://images.pexels.com/photos/29322900/pexels-photo-29322900.jpeg" 
                  alt="Yoga class"
                  className="w-full h-16 sm:h-20 object-cover rounded-md sm:rounded-lg"
                />
              </div>

              <div className="flex justify-around py-1">
                <div className="text-center">
                  <div className="w-5 sm:w-6 h-5 sm:h-6 bg-orange-400 rounded-md sm:rounded-lg mx-auto mb-0.5"></div>
                  <div className="text-[9px] sm:text-[10px] text-orange-600 font-medium">Events</div>
                </div>
                <div className="text-center">
                  <div className="w-5 sm:w-6 h-5 sm:h-6 bg-gray-200 rounded-md sm:rounded-lg mx-auto mb-0.5"></div>
                  <div className="text-[9px] sm:text-[10px] text-gray-400">Community</div>
                </div>
                <div className="text-center">
                  <div className="w-5 sm:w-6 h-5 sm:h-6 bg-gray-200 rounded-md sm:rounded-lg mx-auto mb-0.5"></div>
                  <div className="text-[9px] sm:text-[10px] text-gray-400">Profile</div>
                </div>
              </div>

              <div className="space-y-1.5 sm:space-y-2 mt-1.5 sm:mt-2">
                <div className="text-xs sm:text-sm font-semibold">Upcoming Events</div>
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center space-x-1.5 sm:space-x-2 p-1.5 sm:p-2 bg-gray-50 rounded-md sm:rounded-lg">
                    <div className="w-6 sm:w-8 h-6 sm:h-8 bg-orange-200 rounded-sm sm:rounded-md"></div>
                    <div className="flex-1">
                      <div className="text-[10px] sm:text-[11px] font-medium">Morning Yoga Session</div>
                      <div className="text-[9px] sm:text-[10px] text-gray-500">Tomorrow 8:00 AM</div>
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-orange-600 font-semibold">Join</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:block absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-2 border">
        <div className="text-xs font-medium text-gray-700">Get Tickets</div>
        <div className="text-xs text-gray-500">Members only</div>
        <div className="text-sm font-bold text-green-600">$30.00</div>
      </div>
    </div>
  );
};

const TicketCard = () => {
  return (
    <div className="hidden lg:block absolute left-[-80px] xl:left-[-120px] top-1/2 transform -translate-y-1/2 translate-x-1/2">
      <div className="bg-white rounded-xl lg:rounded-2xl shadow-xl p-4 lg:p-6 w-64 lg:w-80 border">
        <div className="flex items-center justify-between mb-3 lg:mb-4">
          <div className="text-base lg:text-lg font-bold">Get Tickets</div>
          <button className="w-7 lg:w-8 h-7 lg:h-8 bg-gray-900 text-white rounded-full flex items-center justify-center">
            <span className="text-xs">→</span>
          </button>
        </div>
        
        <div className="space-y-2.5 lg:space-y-3">
          <div className="p-2.5 lg:p-3 border border-gray-200 rounded-lg">
            <div className="text-sm text-gray-600">Members only</div>
            <div className="text-base lg:text-lg font-bold">$30.00</div>
          </div>
          
          <button className="w-full bg-black text-white py-2.5 lg:py-3 rounded-lg font-medium text-sm lg:text-base">
            Book now for $32.00
          </button>
          
          <div className="text-xs text-gray-500 text-center">
            We donate 5% of our revenue to loneliness charities
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileCard = () => {
  return (
    <div className="hidden lg:block absolute left-1/2 bottom-0 transform translate-x-0 xl:translate-x-1/6 translate-y-1/2">
      <div className="bg-white rounded-xl lg:rounded-2xl shadow-xl p-3 lg:p-4 w-60 lg:w-72 border">
        <div className="flex items-center justify-between mb-2 lg:mb-3">
          <div className="text-sm lg:text-base font-bold">Hosted by Charlie</div>
        </div>
        
        <div className="flex items-center space-x-2.5 lg:space-x-3">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face"
            alt="Charlie"
            className="w-10 lg:w-12 h-10 lg:h-12 rounded-full"
          />
          <div className="flex-1">
            <div className="text-sm font-medium">Charlie</div>
            <div className="text-xs text-gray-600 leading-tight">
              An avid runner who loves to build communities. Come join us!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SocialProofBanner = () => {
  const avatars = [
    'https://framerusercontent.com/images/zA7hg7OUnSahgBJcsn7HpCAtY.png',
    'https://framerusercontent.com/images/FW7gdHyIJZUqRX0WLmQwCo53YI4.png',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
  ];

  return (
    <section className="flex justify-center items-center min-h-[120px] sm:min-h-[160px] md:min-h-[200px]"> {/*Wrapper for Vertical Centering */}
    <div className="inline-flex items-center bg-black text-white px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-full space-x-2 sm:space-x-3 mx-auto max-w-[90%] sm:max-w-none">
      <div className="flex -space-x-1.5 sm:-space-x-2">
        {avatars.map((avatar, index) => (
          <img
            key={index}
            src={avatar}
            alt={`User ${index + 1}`}
            className="w-7 sm:w-8 md:w-10 h-7 sm:h-8 md:h-10 rounded-full border-2 border-black"
          />
        ))}
      </div>
      <span className="text-sm sm:text-base md:text-lg font-medium text-center">
        <span className="hidden sm:inline">Join 1000s of communities using ThriveCircle</span>
        <span className="sm:hidden">Join 1000s using ThriveCircle</span>
      </span>
    </div>
    </section>
  );
};

export default PhoneMockUp;