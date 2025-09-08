import React, { useState, useEffect } from "react";
import { useSignIn, useUser } from "@clerk/clerk-react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import AuthModal from "../../components/SignUp/AuthModal";

const SignInPage = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const { user } = useUser();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!isLoaded) return null;

  const handleSignInSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) return setError("Please enter your email address");
    if (!password) return setError("Please enter your password");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return setError("Please enter a valid email address");

    setLoading(true);
    setError("");

    try {
      const result = await signIn.create({ identifier: email, password });
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        navigate("/");
      } else {
        setError("Sign-in requires additional verification");
      }
    } catch (err) {
      const errorMessage = err.errors?.[0]?.message || "Invalid email or password. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthModal isOpen={true} onClose={() => navigate("/")}>
      <form onSubmit={handleSignInSubmit}>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Sign in to your account
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Enter your email and password to continue
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-xl text-sm">
            {error}
          </div>
        )}

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1A103D] focus:border-[#1A103D] outline-none transition-all duration-200"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
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

        <div className="text-center mt-">
          <p className="text-gray-600">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-[#1A103D] hover:text-[#2a1d55] font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </AuthModal>
  );
};

export default SignInPage;