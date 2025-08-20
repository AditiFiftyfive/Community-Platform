import React, { useState, useEffect } from "react";
import { useSignIn, useUser } from "@clerk/clerk-react";
import { Dialog, DialogPanel, DialogBackdrop } from "@headlessui/react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

const CustomSignInModal = ({ isOpen, onClose, onSwitchToSignUp }) => {
  // Clerk hooks for authentication
  const { isLoaded, signIn, setActive } = useSignIn();
  const { user } = useUser();
  
  // Form state management
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  // Close modal if user successfully signs in
  useEffect(() => {
    if (user && isOpen) {
      onClose();
    }
  }, [user, isOpen, onClose]);

  // Helper function to reset all form fields
  const resetForm = () => {
    setEmail("");
    setPassword("");
    setShowPassword(false);
    setError("");
    setLoading(false);
  };

  // Don't render if Clerk is not loaded
  if (!isLoaded) {
    return null;
  }

  // Handle email/password sign in
  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }
    
    if (!password) {
      setError("Please enter your password");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Attempt to sign in with email and password
      const result = await signIn.create({
        identifier: email,
        password: password,
      });

      // Check if sign-in is complete
      if (result.status === "complete") {
        // Set the active session
        await setActive({ session: result.createdSessionId });
        // Modal will close automatically due to useEffect
      } else {
        // Handle other statuses (like requiring 2FA)
        setError("Sign-in requires additional verification");
      }
    } catch (err) {
      // Handle sign-in errors
      const errorMessage = err.errors?.[0]?.message || "Invalid email or password. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Handle switching to sign up modal
  const handleSwitchToSignUp = () => {
    resetForm();
    onSwitchToSignUp();
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
          </div>

          {/* Sign In Form */}
          <form onSubmit={handleSignInSubmit}>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
              Sign in to your account
            </h2>
            <p className="text-center text-gray-500 mb-8">
              Enter your email and password to continue
            </p>

            {/* Error message */}
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-xl text-sm">
                {error}
              </div>
            )}

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
                  placeholder="Enter your password"
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
            </div>

            {/* Forgot Password Link */}
            <div className="text-right mb-6">
              <button
                type="button"
                className="text-sm text-[#1A103D] hover:text-[#2a1d55] font-medium"
              >
                Forgot your password?
              </button>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading || !email.trim() || !password}
              className="w-full bg-[#1A103D] hover:bg-[#2a1d55] disabled:bg-gray-400 text-white font-medium py-4 px-4 rounded-xl transition-colors duration-200 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </button>

            {/* Sign Up Link */}
            <div className="text-center mt-6">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={handleSwitchToSignUp}
                  className="text-[#1A103D] hover:text-[#2a1d55] font-medium"
                >
                  Sign up
                </button>
              </p>
            </div>
          </form>

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

export default CustomSignInModal;