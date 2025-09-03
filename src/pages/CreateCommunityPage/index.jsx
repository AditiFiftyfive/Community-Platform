// CreateCommunityPage/index.jsx
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Section1, Section2, Section3CoverImage, Section3ProfileImage } from '../../components/CreateCommunityForm';
import RightSection from './RightSection';
import { useFormData, useFormValidation, useFormNavigation, useDragAndDrop } from './hooks';
import { SECTION_CONFIG } from './utils';
import { useNavigate } from "react-router-dom";
import { slugify } from "../../utils/slugify";
import { useDispatch, useSelector } from "react-redux";
import { addCommunity } from "../../reduxTK/features/community/communitySlice";


const CreateCommunityPage = () => {
  // Custom hooks for clean state management
  const { formData, handleInputChange, handleCategoryToggle } = useFormData();
  const { errors, validateSection, clearError } = useFormValidation(formData);
  const { currentSection, nextSection: goNext, prevSection } = useFormNavigation();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  
  // Drag and drop with error clearing
  const { dragActive, handleDrag, handleDrop, handleFileSelect } = useDragAndDrop(
    (field, file) => {
      handleInputChange(field, file);
      clearError(field);
    }
  );

  // Enhanced handlers that clear errors
  const handleInputWithClearError = (field, value) => {
    handleInputChange(field, value);
    clearError(field);
  };

  // Navigation
  const nextSection = () => {
    if (validateSection(currentSection)) goNext();
  };
  
  const navigate = useNavigate();

  // Simple submit handler - just navigate with data
  const handleSubmit = async () => {
  if (validateSection(currentSection)) {
    const communityName = formData.communityName || "new-community";
    const slug = slugify(communityName);

    // Build full community object
    const newCommunity = {
      ...formData,
      id: Date.now(),
      slug,
      createdAt: new Date().toISOString(),
      createdBy: currentUser?.id,        // 🔑 Clerk ID
      creatorEmail: currentUser?.email,  // optional for redundancy
      builder: currentUser?.name || currentUser?.username,
    };
    // 1️⃣ Add to Redux
    dispatch(addCommunity({ community: newCommunity, currentUser }));
    navigate(`/dashboard/${slug}`, { state: { formData: newCommunity } });
  }
};
  // Get current section config
  const currentConfig = SECTION_CONFIG[currentSection];
  const isLastSection = currentSection === 3;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left side: form */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-r border-gray-200">
          <div className="h-full overflow-y-auto">
            <div className="min-h-screen flex flex-col justify-center p-8 lg:p-12">
              <div className="max-w-lg mx-auto w-full">
                
                {/* Navigation Header */}
                <div className="flex flex-col items-start mb-8">
                  {currentSection > 1 && (
                    <button 
                      onClick={prevSection}
                      className="text-gray-600 hover:text-gray-800 mb-3 transition-colors"
                    >
                      Back
                    </button>
                  )}
                  
                  {/* Progress indicators */}
                  <div className="flex space-x-2">
                    {[1, 2, 3].map((step) => (
                      <div
                        key={step}
                        className={`w-8 h-2 rounded-full transition-colors ${
                          step === currentSection ? 'bg-gray-600' : 
                          step < currentSection ? 'bg-gray-900' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Section Content */}
                <div className="space-y-8">
                  {/* Section Header */}
                  <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                      {currentConfig.title}
                    </h1>
                    <p className={`text-gray-600 ${currentSection === 2 ? 'text-l px-1 py-3' : 'text-xl'}`}>
                      {currentConfig.description}
                    </p>
                  </div>
                  
                  {/* Dynamic Section Content */}
                  {currentSection === 1 && (
                    <Section1 
                      formData={formData} 
                      handleInputChange={handleInputWithClearError} 
                      errors={errors} 
                    />
                  )}

                  {currentSection === 2 && (
                    <Section2 
                      formData={formData} 
                      handleInputChange={handleInputWithClearError} 
                      handleCategoryToggle={handleCategoryToggle} 
                      errors={errors} 
                    />
                  )}

                  {currentSection === 3 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">
                          Drag & drop or click here to upload your Cover Image & Profile Picture
                        </h2>
                        <Section3CoverImage 
                          formData={formData}
                          handleInputChange={handleInputWithClearError}
                          errors={errors}
                          dragActive={dragActive}
                          handleDrag={handleDrag}
                          handleDrop={handleDrop}
                          handleFileSelect={handleFileSelect}
                        />
                      </div>

                      <div>
                        <h3 className="text-md font-medium text-gray-900 mb-3">Profile Picture</h3>
                        <Section3ProfileImage 
                          formData={formData}
                          handleInputChange={handleInputWithClearError}
                          errors={errors}
                          handleFileSelect={handleFileSelect}
                        />
                      </div>

                      <div>
                        <p className="text-sm text-gray-600 mb-6">
                          By agreeing to host this event, you accept Thrive&apos;s{" "}
                          <a href="#" className="text-blue-600 hover:underline">Terms of Use</a>{" "}
                          and{" "}
                          <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                          , and take responsibility for the event&apos;s content, attendees, and conduct.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Navigation Button */}
                <button 
                  onClick={isLastSection ? handleSubmit : nextSection}
                  className="w-full mt-10 bg-black text-white py-4 px-8 rounded-lg text-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                  {currentConfig.buttonLabel}
                  {!isLastSection && <ChevronRight className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>  

        {/* Right side */}
        <div className="hidden lg:block">
          <RightSection />
        </div>
      </div>
    </div>
  );
};

export default CreateCommunityPage;