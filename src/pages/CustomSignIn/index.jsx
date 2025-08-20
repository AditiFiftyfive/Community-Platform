import { useState } from "react";
import { useSignIn, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const CustomSignIn = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const { user } = useUser();
  const navigate = useNavigate();
  
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [step, setStep] = useState("phone"); // "phone" or "verification"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (user) {
    navigate("/dashboard");
    return null;
  }

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    if (!phoneNumber) return;

    setLoading(true);
    setError("");

    try {
      const fullPhoneNumber = `+91${phoneNumber}`;
      
      // Start the sign-in process
      const signInAttempt = await signIn.create({
        identifier: fullPhoneNumber,
      });

      // Send SMS code
      await signInAttempt.prepareFirstFactor({
        strategy: "phone_code",
        phoneNumberId: signInAttempt.supportedFirstFactors.find(
          (factor) => factor.strategy === "phone_code"
        )?.phoneNumberId,
      });

      setStep("verification");
    } catch (err) {
      setError(err.errors?.[0]?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    if (!verificationCode) return;

    setLoading(true);
    setError("");

    try {
      const attemptFirstFactor = await signIn.attemptFirstFactor({
        strategy: "phone_code",
        code: verificationCode,
      });

      if (attemptFirstFactor.status === "complete") {
        await setActive({ session: attemptFirstFactor.createdSessionId });
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.errors?.[0]?.message || "Invalid verification code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-purple-800 px-4">
      {/* Close button */}
      <button 
        className="absolute top-6 right-6 text-white hover:text-gray-200 transition-colors"
        onClick={() => navigate("/")}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-2xl relative">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-3xl font-bold text-purple-700 mb-2">district</div>
          <div className="text-sm text-gray-500 uppercase tracking-wide">BY ZOMATO</div>
        </div>

        {step === "phone" ? (
          <form onSubmit={handlePhoneSubmit}>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
              Enter your mobile number
            </h2>
            <p className="text-center text-gray-500 mb-8">
              If you don't have an account yet, we'll create one for you
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-xl text-sm">
                {error}
              </div>
            )}

            <div className="mb-6">
              <div className="flex border border-gray-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-purple-500">
                {/* Country Code */}
                <div className="flex items-center px-4 py-3 bg-gray-50 border-r border-gray-300">
                  <img 
                    src="https://flagcdn.com/w20/in.png" 
                    alt="India" 
                    className="w-5 h-4 mr-2"
                  />
                  <span className="text-gray-700">+91</span>
                  <svg className="w-4 h-4 ml-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                
                {/* Phone Number Input */}
                <input
                  type="tel"
                  placeholder="Enter mobile number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                  className="flex-1 px-4 py-3 outline-none"
                  maxLength="10"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || phoneNumber.length !== 10}
              className="w-full bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 text-white font-medium py-4 px-4 rounded-xl transition-colors duration-200 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Sending code...
                </div>
              ) : (
                "Continue"
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerificationSubmit}>
            <div className="text-center mb-8">
              <button 
                onClick={() => setStep("phone")}
                className="text-purple-600 hover:text-purple-800 mb-4 inline-flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Enter verification code
              </h2>
              <p className="text-gray-500">
                We've sent a code to +91 {phoneNumber}
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-xl text-sm">
                {error}
              </div>
            )}

            <div className="mb-6">
              <input
                type="text"
                placeholder="Enter 6-digit code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-200 text-center text-2xl tracking-widest"
                maxLength="6"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading || verificationCode.length !== 6}
              className="w-full bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 text-white font-medium py-4 px-4 rounded-xl transition-colors duration-200 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Verifying...
                </div>
              ) : (
                "Verify"
              )}
            </button>

            <button
              type="button"
              onClick={handlePhoneSubmit}
              disabled={loading}
              className="w-full mt-4 text-purple-600 hover:text-purple-800 font-medium py-2 transition-colors duration-200"
            >
              Resend code
            </button>
          </form>
        )}

        <div className="text-center mt-8">
          <p className="text-xs text-gray-500">
            By continuing, you agree to our{" "}
            <a href="#" className="text-purple-600 hover:underline">Terms of Service</a>{" "}
            <a href="#" className="text-purple-600 hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomSignIn;