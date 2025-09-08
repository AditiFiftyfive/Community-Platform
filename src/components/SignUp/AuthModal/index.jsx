import React from "react";
import { X } from "lucide-react";

const AuthModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center sm:items-center justify-center p-4 sm:p-6">
      <div 
        className="fixed inset-0 bg-black/15 backdrop-blur-md transition-all duration-300"
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md mx-auto max-h-[95vh] sm:max-h-[90vh] overflow-y-auto z-10 transform transition-all duration-300">
        <div className="sticky top-0 bg-white rounded-t-2xl z-20 px-4 sm:px-6 pt-2 sm:pt-2 pb-2">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="px-4 sm:px-6 pb-4 sm:pb-6">
          {children}
        </div>

        <div className="sticky bottom-0 bg-white rounded-b-2xl px-4 sm:px-6 pb-4 sm:pb-6 pt-2 border-t border-gray-50">
          <div className="text-center">
            <p className="text-xs text-gray-500">
              By continuing, you agree to our{" "}
              <a href="#" className="text-[#1A103D] hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-[#1A103D] hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;