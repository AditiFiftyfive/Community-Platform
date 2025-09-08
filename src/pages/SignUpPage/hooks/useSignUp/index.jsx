import { useState } from "react";
import { useSignUp as useClerkSignUp, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { 
  AUTH_ERRORS, 
  AUTH_STATES, 
  validateSignUpForm, 
  validateVerificationCode, 
  sanitizeVerificationCode 
} from "../../utils/authHelpers";

export const useSignUp = () => {
  const { signUp, setActive, isLoaded } = useClerkSignUp();
  const { user } = useUser();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    verificationCode: ""
  });
  
  const [currentState, setCurrentState] = useState(AUTH_STATES.SIGNUP);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateFormData = (field, value) => {
    setFormData(prev => ({ 
      ...prev, 
      [field]: field === 'verificationCode' ? sanitizeVerificationCode(value) : value 
    }));
    setError("");
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    if (!signUp) {
      setError(AUTH_ERRORS.SERVICE_UNAVAILABLE);
      return;
    }

    if (!validateSignUpForm(formData)) {
      setError("Please fill in all required fields correctly.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await signUp.create({
        emailAddress: formData.email,
        password: formData.password,
      });

      await result.prepareEmailAddressVerification({ strategy: "email_code" });
      setCurrentState(AUTH_STATES.VERIFICATION);
    } catch (err) {
      console.error("SignUp error:", err);
      setError(err.errors?.[0]?.message || AUTH_ERRORS.GENERIC_ERROR);
    }
    
    setLoading(false);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    
    if (!signUp) {
      setError(AUTH_ERRORS.SERVICE_UNAVAILABLE);
      return;
    }

    if (!validateVerificationCode(formData.verificationCode)) {
      setError("Please enter a valid 6-digit verification code.");
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
      setError(err.errors?.[0]?.message || AUTH_ERRORS.INVALID_CODE);
    }
    
    setLoading(false);
  };

  const handleResendCode = async () => {
    if (!signUp) {
      setError(AUTH_ERRORS.SERVICE_UNAVAILABLE);
      return;
    }

    setLoading(true);
    setError("");

    try {
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
    } catch (err) {
      console.error("Resend error:", err);
      setError(err.errors?.[0]?.message || AUTH_ERRORS.RESEND_FAILED);
    }
    
    setLoading(false);
  };

  const goBackToSignUp = () => {
    setCurrentState(AUTH_STATES.SIGNUP);
    setError("");
  };

  return {
    formData,
    currentState,
    loading,
    error,
    isLoaded,
    user,
    
    updateFormData,
    handleSignUp,
    handleVerify,
    handleResendCode,
    goBackToSignUp,
    
    navigate,
    
    isSignUpFormValid: validateSignUpForm(formData),
    isVerificationCodeValid: validateVerificationCode(formData.verificationCode)
  };
};