import { Upload, X } from 'lucide-react';
import React from 'react';

const Section3ProfileImage = ({ 
  formData = {}, 
  handleInputChange = () => {}, 
  errors = {},
  handleFileSelect 
}) => {
  return (
    <>
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
                type="button"
                onClick={() => handleInputChange("profileImage", null)}
                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <label className="block cursor-pointer">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors">
                <Upload className="w-6 h-6 text-gray-400" />
              </div>
              <input
                type="file"
                onChange={(e) => handleFileSelect(e, "profileImage")}
                accept="image/*"
                className="hidden"
              />
            </label>
          )}
        </div>
        <div>
          <label className="cursor-pointer">
            <span className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Choose Profile Picture
            </span>
            <input
              type="file"
              onChange={(e) => handleFileSelect(e, "profileImage")}
              accept="image/*"
              className="hidden"
            /> 
          </label>
        </div>
      </div>
      {errors.profileImage && (
        <p className="text-red-500 text-sm mt-1">{errors.profileImage}</p>
      )}
    </>
  );
};

export default Section3ProfileImage;