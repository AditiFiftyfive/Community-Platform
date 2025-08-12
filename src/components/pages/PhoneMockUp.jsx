import React from 'react'
export { PhoneMockup, TicketCard, ProfileCard, SocialProofBanner };


// Phone Mockup Component
const PhoneMockup = () => {
  return (
    
    <div className="relative mt-12">
      <div className="w-64 h-[480px] bg-black rounded-[3rem] p-2 shadow-2xl">
        <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
          {/* Phone Screen Content */}
          <div className="relative h-full">
            {/* Status Bar */}
            <div className="flex justify-between items-center px-4 py-2 bg-white">
              <div className="w-5 h-2 bg-black rounded-full"></div>
              <div className="text-xs font-semibold">9:41</div>
              <div className="flex space-x-1">
                <div className="w-3 h-2 bg-black rounded-sm"></div>
                <div className="w-3 h-2 bg-black rounded-sm"></div>
              </div>
            </div>

            {/* App Interface */}
            <div className="px-3 py-2">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="text-base font-bold leading-none">Yoga with Swindells</div>
              </div>

              {/* Event Card */}
              <div className="bg-gray-50 rounded-xl p-3 mb-3">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">Y</span>
                  </div>
                  <div>
                    <div className="font-semibold text-xs leading-tight">Posture Flow class for beginners</div>
                    <div className="text-[10px] text-gray-500">Hosted by Charlie</div>
                  </div>
                </div>
                <img 
                  src="https://images.pexels.com/photos/29322900/pexels-photo-29322900.jpeg" 
                  alt="Yoga class"
                  className="w-full h-20 object-cover rounded-lg"
                />
              </div>

              {/* Navigation */}
              <div className="flex justify-around py-1">
                <div className="text-center">
                  <div className="w-6 h-6 bg-orange-400 rounded-lg mx-auto mb-0.5"></div>
                  <div className="text-[10px] text-orange-600 font-medium">Events</div>
                </div>
                <div className="text-center">
                  <div className="w-6 h-6 bg-gray-200 rounded-lg mx-auto mb-0.5"></div>
                  <div className="text-[10px] text-gray-400">Community</div>
                </div>
                <div className="text-center">
                  <div className="w-6 h-6 bg-gray-200 rounded-lg mx-auto mb-0.5"></div>
                  <div className="text-[10px] text-gray-400">Profile</div>
                </div>
              </div>

              {/* Event List */}
              <div className="space-y-2 mt-2">
                <div className="text-sm font-semibold">Upcoming Events</div>
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-orange-200 rounded-md"></div>
                    <div className="flex-1">
                      <div className="text-[11px] font-medium">Morning Yoga Session</div>
                      <div className="text-[10px] text-gray-500">Tomorrow 8:00 AM</div>
                    </div>
                    <div className="text-[10px] text-orange-600 font-semibold">Join</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements around phone */}
      <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-2 border">
        <div className="text-xs font-medium text-gray-700">Get Tickets</div>
        <div className="text-xs text-gray-500">Members only</div>
        <div className="text-sm font-bold text-green-600">$30.00</div>
      </div>
    </div>
  );
};

// Ticket Card Component
const TicketCard = () => {
  return (
    <div className="absolute left-[-120px] top-1/2 transform -translate-y-1/2 translate-x-1/2">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-80 border">
        <div className="flex items-center justify-between mb-4">
          <div className="text-lg font-bold">Get Tickets</div>
          <button className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center">
            <span className="text-xs">→</span>
          </button>
        </div>
        
        <div className="space-y-3">
          <div className="p-3 border border-gray-200 rounded-lg">
            <div className="text-sm text-gray-600">Members only</div>
            <div className="text-lg font-bold">$30.00</div>
          </div>
          
          <button className="w-full bg-black text-white py-3 rounded-lg font-medium">
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

// Profile Card Component
const ProfileCard = () => {
  return (
    <div className="absolute right-0 bottom-0 transform translate-x-1/3 translate-y-1/4">
      <div className="bg-white rounded-2xl shadow-xl p-4 w-72 border">
        <div className="flex items-center justify-between mb-3">
          <div className="text-base font-bold">Hosted by Charlie</div>
        </div>
        
        <div className="flex items-center space-x-3">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face"
            alt="Charlie"
            className="w-12 h-12 rounded-full"
          />
          <div className="flex-1">
            <div className="text-sm font-medium">Charlie</div>
            <div className="text-xs text-gray-600">
              An avid runner who loves to build communities. Come join us!
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};

// Social Proof Banner
const SocialProofBanner = () => {
  const avatars = [
    'https://framerusercontent.com/images/zA7hg7OUnSahgBJcsn7HpCAtY.png',
    'https://framerusercontent.com/images/FW7gdHyIJZUqRX0WLmQwCo53YI4.png',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
  ];

  return (
    <section className="flex justify-center items-center min-h-[200px]"> {/*Wrapper for Vertical Centering */}
    <div className="inline-flex items-center bg-black text-white px-5 py-2.5 rounded-full space-x-3 mx-auto">
      <div className="flex -space-x-2">
        {avatars.map((avatar, index) => (
          <img
            key={index}
            src={avatar}
            alt={`User ${index + 1}`}
            className="w-10 h-10 rounded-full border-2 border-black"
          />
        ))}
      </div>
      <span className="text-lg font-medium whitespace-nowrap">Join 1000s of communities using ThriveCircle</span>
    </div>
    </section>
  );
};

export default PhoneMockup;