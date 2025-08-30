export const SECTION_CONFIG = {
  1: {
    title: "Let's get started",
    description: "First, we need to know a bit about you and verify your email.",
    buttonLabel: "Start Creating"
  },
  2: {
    title: "About your ThriveCircle", 
    description: "Tell us your Thrive's name, origin story (aka the year it all started), and where you call home.",
    buttonLabel: "Continue"
  },
  3: {
    title: "Your look starts here",
    description: "Personalize your page to visually reflect you and your tribe!",
    buttonLabel: "Create"
  }
};

// Validation functions
export const validateSection1 = (formData, isSignedIn, user) => {
  const errors = {};
  
  if (!isSignedIn) {
    errors.auth = 'Please sign in to continue';
  }
  
  if (isSignedIn && user?.primaryEmailAddress?.verification?.status !== 'verified') {
    errors.emailVerified = 'Please verify your email address';
  }
  
  if (!formData.existingPlatform) {
    errors.existingPlatform = 'Please select an option';
  }
  
  return errors;
};

export const validateSection2 = (formData) => {
  const errors = {};
  
  if (!formData.communityName) {
    errors.communityName = 'Community name is required';
  }
  
  if (!formData.pageLink) {
    errors.pageLink = 'Page link is required';
  }
  
  if (!formData.location) {
    errors.location = 'Location is required';
  }
  
  if (formData.categories.length === 0) {
    errors.categories = 'Please select at least one category';
  }
  
  return errors;
};

export const validateSection3 = (formData) => {
  const errors = {};
  
  if (!formData.coverImage) {
    errors.coverImage = 'Cover image is required';
  }
  
  if (!formData.profileImage) {
    errors.profileImage = 'Profile picture is required';
  }
  
  return errors;
};