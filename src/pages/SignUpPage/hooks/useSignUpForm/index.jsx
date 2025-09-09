import { useState } from "react";
import { useSignUp, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export const useSignUpForm = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const { user } = useUser();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showVerification, setShowVerification] = useState(false);

  const isSignUpValid = firstName.trim() && lastName.trim() && 
                       email.trim() && email.includes('@') && 
                       password.length >= 8;
  
  const isCodeValid = verificationCode.length === 6;

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    if (!isSignUpValid) {
      setError("Please fill in all fields correctly");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await signUp.create({
        emailAddress: email,
        password: password,
      });

      await result.prepareEmailAddressVerification({ strategy: "email_code" });
      setShowVerification(true);
    } catch (err) {
      setError(err.errors?.[0]?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    
    if (!isCodeValid) {
      setError("Please enter a valid 6-digit code");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        navigate("/");
      }
    } catch (err) {
      setError(err.errors?.[0]?.message || "Invalid verification code");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setLoading(true);
    setError("");

    try {
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
    } catch (err) {
      setError("Failed to resend code");
    } finally {
      setLoading(false);
    }
  };

  const handleCodeChange = (value) => {
    const cleanCode = value.replace(/\D/g, '');
    if (cleanCode.length <= 6) {
      setVerificationCode(cleanCode);
    }
  };

  const goBackToSignUp = () => {
    setShowVerification(false);
    setError("");
  };

  return {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    verificationCode,
    showPassword,
    setShowPassword,
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
  };
};