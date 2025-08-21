import React from "react";
import { X } from "lucide-react";

const AuthModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with transparent background and blur */}
      <div 
        className="fixed inset-0 bg-black/15 backdrop-blur-md transition-all duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto p-6 sm:p-8 z-10 transform transition-all duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
        >
          <X size={20} className="text-gray-500" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-8">
          <div className="text-3xl font-bold text-[#1A103D] mb-2">
            ThriveCircle
          </div>
        </div>

        {/* Dynamic content passed as children */}
        {children}

        {/* Terms and conditions */}
        <div className="text-center mt-8">
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
  );
};

export default AuthModal;