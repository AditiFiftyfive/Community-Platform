import React, { useState } from 'react';
import { ChevronRight, Check, X } from 'lucide-react';
import { Section1, Section2, Section3 } from '../../components/CreateCommunityForm';
import { useUser } from '@clerk/clerk-react';

const CreateCommunityPage = () => {
  const [currentSection, setCurrentSection] = useState(1);
  const { isSignedIn, user } = useUser();
  
  const [formData, setFormData] = useState({
    existingPlatform: '',
    communityName: '',
    pageLink: '',
    description: '',
    location: '',
    categories: [],
    coverImage: null,
    profileImage: null
  });
  
  const [errors, setErrors] = useState({});

  // Update form data
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  // Toggle categories
  const handleCategoryToggle = (category) => {
    setFormData(prev => {
      const categories = prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category];
      return { ...prev, categories };
    });
  };

  // Check if section is valid
  const isValid = (section) => {
    const newErrors = {};
    
    if (section === 1) {
      if (!isSignedIn) newErrors.auth = 'Please sign in to continue';
      if (isSignedIn && user?.primaryEmailAddress?.verification?.status !== 'verified') {
        newErrors.emailVerified = 'Please verify your email address';
      }
      if (!formData.existingPlatform) newErrors.existingPlatform = 'Please select an option';
    }
    
    if (section === 2) {
      if (!formData.communityName) newErrors.communityName = 'Community name is required';
      if (!formData.pageLink) newErrors.pageLink = 'Page link is required';
      if (!formData.location) newErrors.location = 'Location is required';
      if (formData.categories.length === 0) newErrors.categories = 'Please select at least one category';
    }

    if (section === 3) {
    if (!formData.coverImage) newErrors.coverImage = 'Cover image is required';
    if (!formData.profileImage) newErrors.profileImage = 'Profile picture is required';
    }
    
    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  // Move to next section
  const nextSection = () => {
    if (isValid(currentSection)) setCurrentSection(prev => Math.min(prev + 1, 3));
  };

  // Submit form
  const handleSubmit = () => {
    if (isValid(3)) {
    console.log('Form submitted:', formData);
    alert('Community created successfully!');
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Progress bar */}
      <div className="bg-gradient-to-br from-[rgb(240,236,231)] to-white border-b px-8 py-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step < currentSection ? 'bg-green-600 text-white'
                : step === currentSection ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-600'
              }`}>
                {step < currentSection ? <Check className="w-4 h-4" /> : step}
              </div>
              {step < 3 && (
                <div className={`w-16 h-1 mx-2 ${
                  step < currentSection ? 'bg-green-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1">
        {/* Section 1 */}
        {currentSection === 1 && (
          <div className="h-full grid grid-cols-2">
            {/* Left side: form - 50% width */}
            <div className="bg-gradient-to-br from-[rgb(240,236,231)] to-white flex flex-col justify-center p-12 border-r border-gray-200">
              <div className="max-w-lg mx-auto w-full">
                {/* Section 1 Header */}
                <div className="space-y-8">
                  <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Let's get started</h1>
                    <p className="text-xl text-gray-600">First, we need to know a bit about you and verify your email.</p>
                  </div>
                  
                  {/* Section 1 Component */}
                  <Section1 
                    formData={formData} 
                    handleInputChange={handleInputChange} 
                    errors={errors} 
                  />
                </div>
                
                {/* Section 1 Button */}
                <button 
                  onClick={nextSection} 
                  className="w-full mt-10 bg-black text-white py-4 px-8 rounded-lg text-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                  Start Creating <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Right side: background/image - 50% width */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
              <div className="text-center p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Join the Community</h2>
                <p className="text-gray-600">Connect with like-minded people and build something amazing together.</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Section 2 */}
        {currentSection === 2 && (
          <div className="h-full grid grid-cols-2">
            {/* Left side: form - 50% width */}
            <div className="bg-gradient-to-br from-[rgb(240,236,231)] to-white flex flex-col justify-center p-12 border-r border-gray-200 overflow-y-auto">
              <div className="max-w-lg mx-auto w-full">
                {/* Section 2 Header */}
                <div className="space-y-8">
                  <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">About your ThriveCircle</h1>
                    <p className="text-xl text-blue-600 bg-blue-50 px-6 py-3 rounded-lg">
                      Tell us your Thrive's name, origin story (aka the year it all started), and where you call home.
                    </p>
                  </div>
                  
                  {/* Section 2 Component */}
                  <Section2 
                    formData={formData} 
                    handleInputChange={handleInputChange} 
                    handleCategoryToggle={handleCategoryToggle} 
                    errors={errors} 
                  />
                </div>
                
                {/* Section 2 Button */}
                <button 
                  onClick={nextSection} 
                  className="w-full mt-10 bg-black text-white py-4 px-8 rounded-lg text-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                  Continue <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Right side: background/image - 50% width */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
              <div className="text-center p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Tell Your Story</h2>
                <p className="text-gray-600">Share what makes your community unique and special.</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Section 3 */}
        {currentSection === 3 && (
          <div className="bg-gradient-to-br from-[rgb(240,236,231)] to-white h-full flex flex-col justify-center items-center p-8">
            <div className="w-full max-w-2xl">
              {/* Section 3 Header */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-between mb-4">
                  <button 
                    onClick={() => setCurrentSection(2)}
                    className="flex items-center text-gray-600 hover:text-gray-800"
                  >
                    <span className="mr-2">←</span> Back
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex justify-center mb-6">
                  <div className="flex space-x-2">
                    <div className="w-8 h-2 bg-gray-300 rounded-full"></div>
                    <div className="w-8 h-2 bg-gray-300 rounded-full"></div>
                    <div className="w-8 h-2 bg-gray-900 rounded-full"></div>
                  </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-2">Your look starts here</h1>
                <p className="text-gray-600">Personalisation your page to visually reflect you and your tribe!</p>
              </div>
              
              {/* Section 3 Component */}
              <Section3 
                formData={formData} 
                handleInputChange={handleInputChange} 
                errors={errors}
                handleSubmit={handleSubmit}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateCommunityPage;