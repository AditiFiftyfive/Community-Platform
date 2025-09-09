import React from "react";

const RightSection = () => {
  return (
    <div className="relative h-full bg-gradient-to-br from-stone-200 to-stone-300 flex flex-col justify-center items-center p-12 pt-20">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="relative">
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://tribeirl.com/images/testimonials/create-community1.jpg"
              alt="Travelling Community"
              className="w-full h-96 object-cover"
            />
          </div>
  
        </div>
        
        <div className="space-y-6">
          <h2 className="text-2xl text-gray-800 leading-relaxed">
            Thrive gave us a home. Our community finally has a space that feels like us.
          </h2>
          
          <div className="flex flex-col items-center space-y-2">
            <p className="text-lg font-medium text-gray-700">
              Sarah - Community leader
            </p>
          </div>
        </div>
        
        <div className="flex justify-center">
          <div className="w-px h-16 bg-gray-400"></div>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://tribeirl.com/images/testimonials/create-community3.jpg"
              alt="People gathering together in a community setting"
              className="w-full h-96 object-cover"
            />
          </div>
        <div className="space-y-6">
          <h2 className="text-2xl text-gray-800 leading-relaxed">
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