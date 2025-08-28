import React from "react";

// Right Section Component
const RightSection = () => {
  return (
    <div className="relative h-full bg-gradient-to-br from-amber-50 to-orange-50 flex flex-col justify-center items-center p-12">
      {/* Main content container */}
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Image container */}
        <div className="relative">
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2832&q=80"
              alt="People gathering together in a community setting"
              className="w-full h-96 object-cover"
            />
          </div>
  
        </div>
        
        {/* Testimonial content */}
        <div className="space-y-6">
          <h2 className="text-3xl text-gray-800 leading-relaxed">
            Thrive gave us a home. Our community finally has a space that feels like us.
          </h2>
          
          <div className="flex flex-col items-center space-y-2">
            <p className="text-lg font-medium text-gray-700">
              Sarah - Community leader
            </p>
          </div>
        </div>
        
        {/* Decorative separator */}
        <div className="flex justify-center">
          <div className="w-px h-16 bg-gray-300"></div>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://tribeirl.com/images/testimonials/create-community1.jpg"
              alt="People gathering together in a community setting"
              className="w-full h-96 object-cover"
            />
          </div>
          {/* Testimonial content */}
        <div className="space-y-6">
          <h2 className="text-3xl text-gray-800 leading-relaxed">
            With Thrive, building our community finally felt effortless — and actually fun.
          </h2>
          
          <div className="flex flex-col items-center space-y-2">
            <p className="text-lg font-medium text-gray-700">
              Molly - Community leader
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSection;