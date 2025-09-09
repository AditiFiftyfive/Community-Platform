import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import AuthModal from "../../components/SignUp/AuthModal";
import VerificationForm from "./utils/VerificationForm";
import { useSignUpForm } from "./hooks/useSignUpForm";

const SignUpPage = () => {
  const {
    firstName, setFirstName,
    lastName, setLastName,
    email, setEmail,
    password, setPassword,
    verificationCode,
    showPassword, setShowPassword,
    loading,
    error,
    showVerification,
    isLoaded,
    user,
    isSignUpValid,
    isCodeValid,
    handleSignUp,
    handleVerification,
    handleResendCode,
    handleCodeChange,
    goBackToSignUp,
    navigate
  } = useSignUpForm();

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  if (!isLoaded) return null;

  return (
    <AuthModal isOpen={true} onClose={() => navigate("/")}>
      <div className="text-center mb-8 -mt-8">
        <div className="text-sm text-gray-500 uppercase tracking-wide">
          {showVerification ? "Verify Email" : "Join Us"}
        </div>
      </div>

      {showVerification ? (
        <VerificationForm
          email={email}
          verificationCode={verificationCode}
          loading={loading}
          error={error}
          isCodeValid={isCodeValid}
          handleVerification={handleVerification}
          handleResendCode={handleResendCode}
          handleCodeChange={handleCodeChange}
          goBackToSignUp={goBackToSignUp}
        />
      ) : (
        <form onSubmit={handleSignUp}>
          <h2 className="text-xl font-bold text-center text-gray-800">
            Create your account
          </h2>
          <p className="text-center text-gray-500 mb-4">
            Join ThriveCircle and discover amazing events
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-xl text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1A103D] focus:border-[#1A103D] outline-none transition-all duration-200"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1A103D] focus:border-[#1A103D] outline-none transition-all duration-200"
                  required
                />
              </div>
            </div>
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1A103D] focus:border-[#1A103D] outline-none transition-all duration-200"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1A103D] focus:border-[#1A103D] outline-none transition-all duration-200"
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

          <button
            type="submit"
            disabled={loading || !isSignUpValid}
            className="w-full bg-[#181818] hover:bg-[#111111] disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-xl transition-colors duration-200 disabled:cursor-not-allowed"
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

          <div className="text-center mt-2">
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