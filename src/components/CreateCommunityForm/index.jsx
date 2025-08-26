import { Check, AlertCircle, Upload, X } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import React, { useState, useRef  } from 'react';

// Section 1: Authentication and Platform Selection
const Section1 = ({ formData = {}, handleInputChange = () => {}, errors = {} }) => {
  const { isSignedIn, user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress || '';
  const isEmailVerified = user?.primaryEmailAddress?.verification?.status === 'verified';

  return (
    <>
      {/* Platform Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-3">Already on another platform?*</label>
        <div className="space-y-2">
          {['Yes, I have an existing community', 'No, this is my first community'].map((option) => (
            <label key={option} className="flex items-center">
              <input
                type="radio"
                name="existingPlatform"
                value={option}
                checked={formData.existingPlatform === option}
                onChange={(e) => handleInputChange('existingPlatform', e.target.value)}
                className="mr-3"
              />
              <span className="text-gray-700">{option}</span>
            </label>
          ))}
        </div>
        {errors.existingPlatform && (
          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
            <AlertCircle size={16} />{errors.existingPlatform}
          </p>
        )}
      </div>

      {/* Authentication Status */}
      {isSignedIn ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-green-700">
            <Check size={20} />
            <div>
              <p className="font-medium">Signed in as </p>
              <p className="text-sm text-green-600">{userEmail}</p>
              {!isEmailVerified && (
                <p className="text-red-600 text-sm flex items-center gap-1">
                  <AlertCircle size={16} />Email not verified - Please verify your account
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-red-700">
            <AlertCircle size={20} />
            <div>
              <p className="font-medium">Please sign in to continue</p>
              <p className="text-sm text-red-600">You need to be signed in to create a community</p>
            </div>
          </div>
        </div>
      )}

      {/* Error Messages */}
      {errors.auth && (
        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
          <AlertCircle size={16} />{errors.auth}
        </p>
      )}
      {errors.emailVerified && (
        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
          <AlertCircle size={16} />{errors.emailVerified}
        </p>
      )}
    </>
  );
};

// Section 2: Community Details
const Section2 = ({ formData = {}, handleInputChange = () => {}, handleCategoryToggle = () => {}, errors = {} }) => {
  const childCategories = [
    { id: 'special', parentId: 'ai', label: '✨ Special', color: 'bg-yellow-100 text-yellow-700' },
    { id: 'tribe-originals', parentId: 'arts-culture', label: '🏛️ Tribe Originals', color: 'bg-blue-100 text-blue-700' },
    { id: 'free-events', parentId: 'ai', label: '🆓 Free Events', color: 'bg-gray-100 text-gray-700' },
    { id: 'sport', parentId: 'fitness', label: '🏀 Sport', color: 'bg-orange-100 text-orange-700' },
    { id: 'design', parentId: 'arts-culture', label: '🎨 Design', color: 'bg-purple-100 text-purple-700' },
    { id: 'adventure', parentId: 'fitness', label: '⛰️ Adventure', color: 'bg-green-100 text-green-700' },
    { id: 'music', parentId: 'arts-culture', label: '🎵 Music', color: 'bg-pink-100 text-pink-700' },
    { id: 'food-drink', parentId: 'community', label: '🍕 Food & Drink', color: 'bg-red-100 text-red-700' },
    { id: 'volunteering', parentId: 'community', label: '💝 Volunteering', color: 'bg-yellow-100 text-yellow-700' },
    { id: 'gaming', parentId: 'ai', label: '🎮 Gaming', color: 'bg-indigo-100 text-indigo-700' },
    { id: 'lgbtq', parentId: 'community', label: '🏳️‍🌈 LGBTQ+', color: 'bg-rainbow-100 text-rainbow-700' },
    { id: 'womens-only', parentId: 'community', label: '👩 Womens Only', color: 'bg-pink-100 text-pink-700' },
    { id: 'mens-only', parentId: 'community', label: '👨 Mens Only', color: 'bg-blue-100 text-blue-700' },
    { id: 'business-networking', parentId: 'crypto', label: '💼 Business Networking', color: 'bg-gray-100 text-gray-700' },
    { id: 'social', parentId: 'community', label: '🗣️ Social', color: 'bg-green-100 text-green-700' },
    { id: 'book-club', parentId: 'arts-culture', label: '📚 Book Club', color: 'bg-amber-100 text-amber-700' },
    { id: 'wellness-child', parentId: 'wellness', label: '🧘 Wellness', color: 'bg-teal-100 text-teal-700' },
    { id: 'art', parentId: 'arts-culture', label: '🎭 Art', color: 'bg-violet-100 text-violet-700' },
    { id: 'community', parentId: 'wellness', label: '👥 Community', color: 'bg-cyan-100 text-cyan-700' }
  ];

  const locations = [
    { value: 'mumbai', label: 'Mumbai, India' },
    { value: 'delhi', label: 'New Delhi, India' },
    { value: 'bangalore', label: 'Bangalore, India' },
    { value: 'hyderabad', label: 'Hyderabad, India' },
    { value: 'chennai', label: 'Chennai, India' },
    { value: 'kolkata', label: 'Kolkata, India' },
    { value: 'pune', label: 'Pune, India' },
    { value: 'ahmedabad', label: 'Ahmedabad, India' },
    { value: 'jaipur', label: 'Jaipur, India' },
    { value: 'lucknow', label: 'Lucknow, India' }
  ];

  return (
    <>
      {/* Community Name */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">What's your community's name?*</label>
        <input
          type="text"
          value={formData.communityName || ''}
          onChange={(e) => handleInputChange('communityName', e.target.value)}
          placeholder="Enter name"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        {errors.communityName && (
          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
            <AlertCircle size={16} />{errors.communityName}
          </p>
        )}
      </div>

      {/* Page Link */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">Your community's unique page link*</label>
        <div className="flex items-center">
          <input
            type="text"
            value={formData.pageLink || ''}
            onChange={(e) => handleInputChange('pageLink', e.target.value)}
            placeholder="Your community handle"
            className="flex-1 px-4 py-3 border border-gray-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <div className="px-4 py-3 bg-gray-50 border border-l-0 border-gray-200 rounded-r-lg text-gray-500">
            .thriveirl.com
          </div>
        </div>
        {formData.pageLink && (
          <p className="text-green-600 text-sm mt-1 flex items-center gap-1">
            <Check size={16} />This URL is available
          </p>
        )}
        {errors.pageLink && (
          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
            <AlertCircle size={16} />{errors.pageLink}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">Tell us a bit about your community</label>
        <textarea
          value={formData.description || ''}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder=""
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 h-32 resize-none"
        />
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">Where's your community based?*</label>
        <select
          value={formData.location || ''}
          onChange={(e) => handleInputChange('location', e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          {locations.map((location) => (
            <option key={location.value} value={location.value}>{location.label}</option>
          ))}
        </select>
        {errors.location && (
          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
            <AlertCircle size={16} />{errors.location}
          </p>
        )}
      </div>

      {/* Categories */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-3">Which categories best fit your community?*</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {childCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => handleCategoryToggle(category.id)}
              className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                formData.categories?.includes(category.id)
                  ? 'bg-black text-white'
                  : category.color + ' hover:opacity-80'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Terms */}
      <div className="text-xs text-gray-500 text-center">
        By agreeing to host this event, you accept Thrive's{' '}
        <a href="#" className="text-blue-600 hover:underline">Terms of Use</a>{' '}
        and{' '}
        <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>, and take responsibility for the event's content, attendees, and conduct.
      </div>
    </>
  );
};

// Section 3: Final Setup
const Section3 = ({ formData = {}, handleInputChange = () => {}, errors = {}, handleSubmit }) => {
  const [dragActive, setDragActive] = useState(false);
  const dragCounterRef = useRef(0); // keeps track of nested drag events

  // Handles drag events (enter, over, leave)
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter") {
      dragCounterRef.current += 1;
      setDragActive(true);
    } else if (e.type === "dragleave") {
      dragCounterRef.current -= 1;
      if (dragCounterRef.current <= 0) {
        dragCounterRef.current = 0;
        setDragActive(false);
      }
    } else if (e.type === "dragover") {
      setDragActive(true);
    }
  };

  // Handles file drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current = 0; // reset counter
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleInputChange("coverImage", file);
    }
  };

  // Handles manual file selection
  const handleFileSelect = (e, type) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleInputChange(type, file);
    }
  };

  return (
    <>
      {/* Image Upload Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Drag & drop or click here to upload your Cover Image & Profile Picture
        </h2>
        <p className="text-sm text-gray-500 mb-4">The ideal aspect ratio is 16:9</p>

        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? "border-blue-400 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          } ${errors.coverImage ? "border-red-300" : ""}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {formData.coverImage ? (
            <div className="space-y-4">
              <div className="relative inline-block">
                <img
                  src={URL.createObjectURL(formData.coverImage)}
                  alt="Cover preview"
                  className="max-h-32 rounded-lg shadow-md"
                />
                <button
                  onClick={() => handleInputChange("coverImage", null)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
              <p className="text-sm text-gray-600">Cover image uploaded</p>
            </div>
          ) : (
            <div>
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">
                Drop your cover image here, or click to browse
              </p>
              <p className="text-sm text-gray-500">
                Supports JPG, PNG, GIF up to 10MB
              </p>
            </div>
          )}

          <input
            type="file"
            onChange={(e) => handleFileSelect(e, "coverImage")}
            accept="image/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          <div className="absolute top-4 right-4 flex space-x-2">
            <button className="p-2 bg-white rounded-full shadow hover:shadow-md">
              <Upload className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
        {errors.coverImage && (
          <p className="text-red-500 text-sm mt-1">{errors.coverImage}</p>
        )}
      </div>

      {/* Profile Picture Upload */}
      <div className="mb-8">
        <h3 className="text-md font-medium text-gray-900 mb-3">Profile Picture</h3>
        <div className="flex items-center space-x-4">
          <div className="relative">
            {formData.profileImage ? (
              <div className="relative">
                <img
                  src={URL.createObjectURL(formData.profileImage)}
                  alt="Profile preview"
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                />
                <button
                  onClick={() => handleInputChange("profileImage", null)}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                <Upload className="w-6 h-6 text-gray-400" />
              </div>
            )}
          </div>
          <div>
            <label className="block">
              <span className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg cursor-pointer text-sm font-medium">
                Choose Profile Picture
              </span>
              <input
                type="file"
                onChange={(e) => handleFileSelect(e, "profileImage")}
                accept="image/*"
                className="hidden"
              />
            </label>
            <p className="text-xs text-gray-500 mt-1">Square images work best</p>
          </div>
        </div>
        {errors.profileImage && (
          <p className="text-red-500 text-sm mt-1">{errors.profileImage}</p>
        )}
      </div>

      {/* Terms and Create Button */}
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-6">
          By agreeing to host this event, you accept Tribe&apos;s{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Terms of Use
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>
          , and take responsibility for the event&apos;s content, attendees, and
          conduct.
        </p>

        <button
          onClick={handleSubmit}
          className="w-full bg-gray-900 text-white py-4 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
        >
          Create
        </button>
      </div>
    </>
  );
};

export { Section1, Section2, Section3 };