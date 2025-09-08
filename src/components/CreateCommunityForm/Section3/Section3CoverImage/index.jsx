import { Upload, X } from 'lucide-react';
import React from 'react';

const Section3CoverImage = ({ 
  formData = {}, 
  handleInputChange = () => {}, 
  errors = {},
  dragActive,
  handleDrag,
  handleDrop,
  handleFileSelect 
}) => {
  return (
    <>
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
                onClick={(e) => {
                e.stopPropagation();  
                handleInputChange("coverImage", null)}}
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

        {!formData.coverImage && (
            <input
                type="file"
                onChange={(e) => handleFileSelect(e, "coverImage")}
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            )}
      </div>
      {errors.coverImage && (
        <p className="text-red-500 text-sm mt-1">{errors.coverImage}</p>
      )}
    </>
  );
};

export default Section3CoverImage;