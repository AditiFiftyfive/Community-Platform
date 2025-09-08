import React from 'react';
import { ArrowLeft } from "lucide-react";

const VerificationForm = ({ 
  email,
  verificationCode, 
  onCodeChange, 
  onSubmit, 
  onGoBack,
  onResendCode,
  loading, 
  error, 
  isCodeValid 
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="text-center mb-8">
        <button 
          type="button"
          onClick={onGoBack}
          className="text-[#1A103D] hover:text-[#2a1d55] mb-4 inline-flex items-center transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </button>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Verify your email
        </h2>
        <p className="text-gray-500">
          We've sent a verification code to {email}
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-xl text-sm">
          {error}
        </div>
      )}

      <div className="mb-6">
        <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700 mb-2">
          Verification Code
        </label>
        <input
          id="verificationCode"
          type="text"
          placeholder="Enter 6-digit code"
          value={verificationCode}
          onChange={(e) => onCodeChange(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1A103D] focus:border-[#1A103D] outline-none transition-all duration-200 text-center text-2xl tracking-widest"
          maxLength="6"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading || !isCodeValid}
        className="w-full bg-[#1A103D] hover:bg-[#2a1d55] disabled:bg-gray-400 text-white font-medium py-4 px-4 rounded-xl transition-colors duration-200 disabled:cursor-not-allowed"
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            Verifying...
          </div>
        ) : (
          "Verify Email"
        )}
      </button>

      <button
        type="button"
        onClick={onResendCode}
        disabled={loading}
        className="w-full mt-4 text-[#1A103D] hover:text-[#2a1d55] font-medium py-2 transition-colors duration-200"
      >
        Resend verification email
      </button>
    </form>
  );
};

export default VerificationForm;