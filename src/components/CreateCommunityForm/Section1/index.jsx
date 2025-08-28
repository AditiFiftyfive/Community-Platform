import { Check, AlertCircle } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import React from 'react';

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

export default Section1;