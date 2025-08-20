import React, { useState, useEffect } from "react";
import { useSignUp, useUser } from "@clerk/clerk-react";
import { Dialog, DialogPanel, DialogBackdrop } from "@headlessui/react";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";

const CustomSignUpModal = ({ isOpen, onClose, onSwitchToSignIn }) => {
  // Clerk hooks for authentication
  const { isLoaded, signUp, setActive } = useSignUp();
  const { user } = useUser();
  
  // Form state management
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState("signup"); // "signup" or "verification"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  // Close modal if user successfully signs up
  useEffect(() => {
    if (user && isOpen) {
      onClose();
    }
  }, [user, isOpen, onClose]);

  // Helper function to reset all form fields
  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setVerificationCode("");
    setShowPassword(false);
    setStep("signup");
    setError("");
    setLoading(false);
  };

  // Don't render if Clerk is not loaded
  if (!isLoaded) {
    return null;
  }

  // Handle sign up form submission
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!firstName.trim()) {
      setError("Please enter your first name");
      return;
    }
    
    if (!lastName.trim()) {
      setError("Please enter your last name");
      return;
    }
    
    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }
    
    if (!password) {
      setError("Please enter a password");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Password validation
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Create the sign up with Clerk
      const result = await signUp.create({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        emailAddress: email,
        password: password,
      });

      // Send email verification
      await result.prepareEmailAddressVerification({ strategy: "email_code" });
      
      // Move to verification step
      setStep("verification");
    } catch (err) {
      // Handle sign-up errors
      const errorMessage = err.errors?.[0]?.message || "Something went wrong. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Handle email verification
  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    
    // Validate verification code
    if (!verificationCode || verificationCode.length !== 6) {
      setError("Please enter a valid 6-digit verification code");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Attempt to verify the email
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });

      // Check if sign-up is complete
      if (completeSignUp.status === "complete") {
        // Set the active session
        await setActive({ session: completeSignUp.createdSessionId });
        // Modal will close automatically due to useEffect
      } else {
        setError("Verification not complete. Please try again.");
      }
    } catch (err) {
      // Handle verification errors
      const errorMessage = err.errors?.[0]?.message || "Invalid verification code. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Handle going back to signup form
  const handleBackToSignUp = () => {
    setStep("signup");
    setVerificationCode("");
    setError("");
  };

  // Handle resending verification email
  const handleResendCode = async () => {
    setLoading(true);
    setError("");

    try {
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
    } catch (err) {
      setError(err.errors?.[0]?.message || "Failed to resend verification email");
    } finally {
      setLoading(false);
    }
  };

  // Handle switching to sign in modal
  const handleSwitchToSignIn = () => {
    resetForm();
    onSwitchToSignIn();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Background overlay */}
      <DialogBackdrop className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      
      {/* Modal container */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md p-8 bg-white rounded-3xl shadow-2xl relative">
          
          {/* Close button */}
          <button 
            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
            onClick={onClose}
            type="button"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Modal Header */}
          <div className="text-center mb-8">
            <div className="text-3xl font-bold text-[#1A103D] mb-2">ThriveCircle</div>
            <div className="text-sm text-gray-500 uppercase tracking-wide">Join Us</div>
          </div>

          {/* Step 1: Sign Up Form */}
          {step === "signup" ? (
            <form onSubmit={handleSignUpSubmit}>
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
                Create your account
              </h2>
              <p className="text-center text-gray-500 mb-6">
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
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="firstName"
                      type="text"
                      placeholder="First name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
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
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1A103D] focus:border-[#1A103D] outline-none transition-all duration-200"
                    required
                  />
                </div>
              </div>

              {/* Email input */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1A103D] focus:border-[#1A103D] outline-none transition-all duration-200"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
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
                disabled={loading || !firstName.trim() || !lastName.trim() || !email.trim() || !password}
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
                  <button
                    type="button"
                    onClick={handleSwitchToSignIn}
                    className="text-[#1A103D] hover:text-[#2a1d55] font-medium"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </form>
          ) : (
            /* Step 2: Email Verification */
            <form onSubmit={handleVerificationSubmit}>
              <div className="text-center mb-8">
                {/* Back button */}
                <button 
                  type="button"
                  onClick={handleBackToSignUp}
                  className="text-[#1A103D] hover:text-[#2a1d55] mb-4 inline-flex items-center"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>
                
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Verify your email
                </h2>
                <p className="text-gray-500">
                  We've sent a verification code to {email}
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
                <input
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1A103D] focus:border-[#1A103D] outline-none transition-all duration-200 text-center text-2xl tracking-widest"
                  maxLength="6"
                  required
                />
              </div>

              {/* Verify button */}
              <button
                type="submit"
                disabled={loading || verificationCode.length !== 6}
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
          )}

          {/* Terms and conditions */}
          <div className="text-center mt-8">
            <p className="text-xs text-gray-500">
              By continuing, you agree to our{" "}
              <a href="#" className="text-[#1A103D] hover:underline">Terms of Service</a>{" "}
              <a href="#" className="text-[#1A103D] hover:underline">Privacy Policy</a>
            </p>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default CustomSignUpModal;