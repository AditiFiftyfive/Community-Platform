import { Check, AlertCircle } from 'lucide-react';
import React from 'react';

const Section2 = ({ formData = {}, handleInputChange = () => {}, handleCategoryToggle = () => {}, errors = {} }) => {
  const childCategories = [
    { id: 'special', parentId: 'ai', label: '✨ Special', color: 'bg-yellow-100 text-yellow-700' },
    { id: 'tribe-originals', parentId: 'arts-culture', label: '🏛️ Tribe Originals', color: 'bg-blue-100 text-blue-700' },
    { id: 'sport', parentId: 'fitness', label: '🏀 Sport', color: 'bg-orange-100 text-orange-700' },
    { id: 'design', parentId: 'arts-culture', label: '🎨 Design', color: 'bg-purple-100 text-purple-700' },
    { id: 'adventure', parentId: 'fitness', label: '⛰️ Adventure', color: 'bg-green-100 text-green-700' },
    { id: 'music', parentId: 'arts-culture', label: '🎵 Music', color: 'bg-pink-100 text-pink-700' },
    { id: 'food-drink', parentId: 'community', label: '🍕 Food & Drink', color: 'bg-red-100 text-red-700' },
    { id: 'volunteering', parentId: 'community', label: '💝 Volunteering', color: 'bg-yellow-100 text-yellow-700' },
    { id: 'gaming', parentId: 'ai', label: '🎮 Gaming', color: 'bg-indigo-100 text-indigo-700' },
    { id: 'lgbtq', parentId: 'community', label: '🏳️‍🌈 LGBTQ+', color: 'bg-yellow-100 text-rainbow-700' },
    { id: 'womens-only', parentId: 'community', label: '👩 Womens Only', color: 'bg-pink-100 text-pink-700' },
    { id: 'mens-only', parentId: 'community', label: '👨 Mens Only', color: 'bg-blue-100 text-blue-700' },
    { id: 'business-networking', parentId: 'crypto', label: '💼 Networking', color: 'bg-pink-100 text-gray-700' },
    { id: 'social', parentId: 'community', label: '🗣️ Social', color: 'bg-green-100 text-green-700' },
    { id: 'book-club', parentId: 'arts-culture', label: '📚 Book Club', color: 'bg-amber-100 text-amber-700' },
    { id: 'wellness-child', parentId: 'wellness', label: '🧘 Wellness', color: 'bg-teal-100 text-teal-700' },
    { id: 'art', parentId: 'arts-culture', label: '🎭 Art', color: 'bg-violet-100 text-violet-700' },
    { id: 'community', parentId: 'wellness', label: '👥 Community', color: 'bg-cyan-100 text-cyan-700' }
  ];

  const locations = [
    { value: '', label: 'Select a location' },
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

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">Your community's unique page link*</label>
        <div className="flex items-center">
          <input
            type="text"
            value={formData.pageLink || ''}
            onChange={(e) => handleInputChange('pageLink', e.target.value)}
            placeholder="Your community handle"
            className="flex-1 px-4 py-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
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

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">Tell us a bit about your community</label>
        <textarea
          value={formData.description || ''}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder=""
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 h-32 resize-none"
        />
      </div>

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

      <div className="text-xs text-gray-500 text-center">
        By agreeing to host this event, you accept Thrive's{' '}
        <a href="#" className="text-blue-600 hover:underline">Terms of Use</a>{' '}
        and{' '}
        <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>, and take responsibility for the event's content, attendees, and conduct.
      </div>
    </>
  );
};

export default Section2;