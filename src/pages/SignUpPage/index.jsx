import React, { useState } from "react";
import { useSignUp, useUser } from "@clerk/clerk-react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft } from "lucide-react";
import AuthModal from "./../../components/AuthModal";

const SignUpPage = () => {
  const { signUp, setActive, isLoaded } = useSignUp();
  const { user } = useUser();
  const navigate = useNavigate();
  
  // Form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    verificationCode: ""
  });
  
  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Show loading while Clerk is initializing
  if (!isLoaded) {
    return (
      <AuthModal isOpen={true} onClose={() => navigate("/")}>
        <div className="flex items-center justify-center py-8">
          <div className="w-8 h-8 border-2 border-[#1A103D] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </AuthModal>
    );
  }

  // Redirect if already signed in
  if (user) {
    navigate("/");
    return null;
  }

  // Update form data
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(""); // Clear error when user types
  };

  // Step 1: Create account
  const handleSignUp = async (e) => {
    e.preventDefault();
    
    if (!signUp) {
      setError("Authentication service is not available. Please try again.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Create account
      const result = await signUp.create({
        emailAddress: formData.email,
        password: formData.password,
      });

      // Send verification email
      await result.prepareEmailAddressVerification({ strategy: "email_code" });
      setIsVerifying(true);
    } catch (err) {
      console.error("SignUp error:", err);
      setError(err.errors?.[0]?.message || "Something went wrong. Please try again.");
    }
    
    setLoading(false);
  };

  // Step 2: Verify email
  const handleVerify = async (e) => {
    e.preventDefault();
    
    if (!signUp) {
      setError("Authentication service is not available. Please try again.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code: formData.verificationCode,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        navigate("/");
      }
    } catch (err) {
      console.error("Verification error:", err);
      setError(err.errors?.[0]?.message || "Invalid verification code. Please try again.");
    }
    
    setLoading(false);
  };

  // Resend verification code
  const handleResendCode = async () => {
    if (!signUp) {
      setError("Authentication service is not available. Please try again.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
    } catch (err) {
      console.error("Resend error:", err);
      setError(err.errors?.[0]?.message || "Failed to resend verification email");
    }
    
    setLoading(false);
  };

  return (
    <AuthModal isOpen={true} onClose={() => navigate("/")}>
      {/* Modal Header */}
      <div className="text-center mb-8 -mt-8">
        <div className="text-sm text-gray-500 uppercase tracking-wide">
          {isVerifying ? "Verify Email" : "Join Us"}
        </div>
      </div>

      {/* Verification Step */}
      {isVerifying ? (
        <form onSubmit={handleVerify}>
          <div className="text-center mb-8">
            {/* Back button */}
            <button 
              type="button"
              onClick={() => setIsVerifying(false)}
              className="text-[#1A103D] hover:text-[#2a1d55] mb-4 inline-flex items-center transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </button>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Verify your email
            </h2>
            <p className="text-gray-500">
              We've sent a verification code to {formData.email}
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-xl text-sm">
              {error}
            </div>
          )}

          {/* Verification code input */}
          <div className="mb-6">
            <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700 mb-2">
              Verification Code
            </label>
            <input
              id="verificationCode"
              type="text"
              placeholder="Enter 6-digit code"
              value={formData.verificationCode}
              onChange={(e) => handleInputChange("verificationCode", e.target.value.replace(/\D/g, ''))}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1A103D] focus:border-[#1A103D] outline-none transition-all duration-200 text-center text-2xl tracking-widest"
              maxLength="6"
              required
            />
          </div>

          {/* Verify button */}
          <button
            type="submit"
            disabled={loading || formData.verificationCode.length !== 6}
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

          {/* Resend code button */}
          <button
            type="button"
            onClick={handleResendCode}
            disabled={loading}
            className="w-full mt-4 text-[#1A103D] hover:text-[#2a1d55] font-medium py-2 transition-colors duration-200"
          >
            Resend verification email
          </button>
        </form>
      ) : (
        /* Sign Up Form */
        <form onSubmit={handleSignUp}>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
            Create your account
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Join ThriveCircle and discover amazing events
          </p>

          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-xl text-sm">
              {error}
            </div>
          )}

          {/* Name inputs - Side by side */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="firstName"
                  type="text"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1A103D] focus:border-[#1A103D] outline-none transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="lastName"
                  type="text"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1A103D] focus:border-[#1A103D] outline-none transition-all duration-200"
                  required
                />
              </div>
            </div>
          </div>

          {/* Email input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1A103D] focus:border-[#1A103D] outline-none transition-all duration-200"
                required
              />
            </div>
          </div>

          {/* Password input */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1A103D] focus:border-[#1A103D] outline-none transition-all duration-200"
                minLength="8"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Must be at least 8 characters long
            </p>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading || !formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.password}
            className="w-full bg-[#1A103D] hover:bg-[#2a1d55] disabled:bg-gray-400 text-white font-medium py-4 px-4 rounded-xl transition-colors duration-200 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Creating account...
              </div>
            ) : (
              "Create Account"
            )}
          </button>

          {/* Sign In Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-[#1A103D] hover:text-[#2a1d55] font-medium transition-colors duration-200"
              >
                Sign in
              </Link>
            </p>
          </div>
        </form>
      )}
    </AuthModal>
  );
};

export default SignUpPage;