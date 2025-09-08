import React from "react";
import AuthModal from "../../components/SignUp/AuthModal";
import SignUpForm from "../../components/SignUp/SignUpForm";
import VerificationForm from "../../components/SignUp/VerificationForm";
import { useSignUp } from "../SignUpPage/hooks/useSignUp";
import { AUTH_STATES } from "../SignUpPage/utils/authHelpers";

const SignUpPage = () => {
  const {
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
    isSignUpFormValid,
    isVerificationCodeValid
  } = useSignUp();

  if (!isLoaded) {
    return (
      <AuthModal isOpen={true} onClose={() => navigate("/")}>
        <div className="flex items-center justify-center py-8">
          <div className="w-8 h-8 border-2 border-[#1A103D] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </AuthModal>
    );
  }

  if (user) {
    navigate("/");
    return null;
  }

  return (
    <AuthModal isOpen={true} onClose={() => navigate("/")}>
      <div className="text-center mb-8 -mt-8">
        <div className="text-sm text-gray-500 uppercase tracking-wide">
          {currentState === AUTH_STATES.VERIFICATION ? "Verify Email" : "Join Us"}
        </div>
      </div>

      {currentState === AUTH_STATES.VERIFICATION ? (
        <VerificationForm
          email={formData.email}
          verificationCode={formData.verificationCode}
          onCodeChange={(value) => updateFormData("verificationCode", value)}
          onSubmit={handleVerify}
          onGoBack={goBackToSignUp}
          onResendCode={handleResendCode}
          loading={loading}
          error={error}
          isCodeValid={isVerificationCodeValid}
        />
      ) : (
        <SignUpForm
          formData={formData}
          onInputChange={updateFormData}
          onSubmit={handleSignUp}
          loading={loading}
          error={error}
          isFormValid={isSignUpFormValid}
        />
      )}
    </AuthModal>
  );
};

export default SignUpPage;