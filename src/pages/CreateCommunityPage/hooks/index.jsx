import { useState, useRef } from 'react';
import { useUser } from '@clerk/clerk-react';
import { validateSection1, validateSection2, validateSection3 } from '../utils';

export const useFormData = () => {
  const [formData, setFormData] = useState({
    existingPlatform: '',
    communityName: '',
    pageLink: '',
    description: '',
    location: '',
    categories: [],
    coverImage: null,
    profileImage: null
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCategoryToggle = (category) => {
    setFormData(prev => {
      const categories = prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category];
      return { ...prev, categories };
    });
  };

  return { formData, handleInputChange, handleCategoryToggle };
};

export const useFormValidation = (formData) => {
  const [errors, setErrors] = useState({});
  const { isSignedIn, user } = useUser();

  const validateSection = (section) => {
    let newErrors = {};
    
    if (section === 1) {
      newErrors = validateSection1(formData, isSignedIn, user);
    } else if (section === 2) {
      newErrors = validateSection2(formData);
    } else if (section === 3) {
      newErrors = validateSection3(formData);
    }
    
    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const clearError = (field) => {
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return { errors, validateSection, clearError };
};

export const useFormNavigation = () => {
  const [currentSection, setCurrentSection] = useState(1);

  const nextSection = () => {
    setCurrentSection(prev => Math.min(prev + 1, 3));
  };

  const prevSection = () => {
    setCurrentSection(prev => Math.max(prev - 1, 1));
  };

  return { currentSection, nextSection, prevSection };
};

export const useDragAndDrop = (onFileSelect) => {
  const [dragActive, setDragActive] = useState(false);
  const dragCounterRef = useRef(0);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter") {
      dragCounterRef.current += 1;
      setDragActive(true);
    } else if (e.type === "dragleave") {
      dragCounterRef.current -= 1;
      if (dragCounterRef.current <= 0) {
        dragCounterRef.current = 0;
        setDragActive(false);
      }
    } else if (e.type === "dragover") {
      setDragActive(true);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current = 0;
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      onFileSelect("coverImage", file);
    }
  };

  const handleFileSelect = (e, type) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onFileSelect(type, file);
    }
  };

  return { dragActive, handleDrag, handleDrop, handleFileSelect };
};