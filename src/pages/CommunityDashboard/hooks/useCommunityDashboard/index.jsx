// hooks/useCommunityDashboard.js
import { useState, useMemo } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

// Normalize community data to match formData structure exactly
export const normalizeCommunityData = (apiCommunity) => {
  if (!apiCommunity) return null;

  // Ensure we have a proper community name
  const communityName = apiCommunity.communityName || 
                       apiCommunity.name || 
                       "Unnamed Community";

  // Generate consistent slug
  const slug = apiCommunity.slug || 
               communityName.toLowerCase()
                           .replace(/\s+/g, "-")
                           .replace(/[^a-z0-9-]/g, "");

  // Normalize categories to always be an array
  let categories = [];
  if (apiCommunity.categories) {
    categories = Array.isArray(apiCommunity.categories) ? apiCommunity.categories : [apiCommunity.categories];
  } else if (apiCommunity.subcategories) {
    categories = Array.isArray(apiCommunity.subcategories) ? apiCommunity.subcategories : [apiCommunity.subcategories];
  } else if (apiCommunity.category) {
    categories = [apiCommunity.category];
  }

  // Return structure that matches formData exactly
  return {
    // Core identifiers
    id: apiCommunity.id,
    commonId: apiCommunity.commonId,
    slug: slug,

    // Main content fields (matching formData structure)
    communityName: communityName,
    description: apiCommunity.description || 
                `Join the ${communityName} community${apiCommunity.location ? ` in ${apiCommunity.location}` : ''}`,
    
    // Images (matching formData structure)
    coverImage: apiCommunity.coverImage || apiCommunity.image || null,
    profileImage: apiCommunity.profileImage || apiCommunity.image || null,

    pageLink: apiCommunity.pageLink || slug,
    
    // Categories (matching formData structure)
    categories: categories,
    
    // Additional metadata
    location: apiCommunity.location || "",
    category: apiCommunity.category || (categories.length > 0 ? categories[0] : ""),
    builder: apiCommunity.builder || apiCommunity.creator || "Unknown",
    color: apiCommunity.color || "bg-gray-500",
    members: apiCommunity.members || apiCommunity.memberCount || "0",
    memberCount: apiCommunity.memberCount || apiCommunity.members || "0",
    
    // Creator info
    createdBy: apiCommunity.createdBy || apiCommunity.userId,
    userId: apiCommunity.userId,
    
    // Default flags
    isCreator: false, // Will be updated based on current user
    isPublic: apiCommunity.isPublic !== undefined ? apiCommunity.isPublic : true,
    isActive: apiCommunity.isActive !== undefined ? apiCommunity.isActive : true,
  };
};

// Check if current user has creator/admin permissions
export const checkCreatorPermissions = (community, currentUser) => {
  if (!community || !currentUser) {
    return {
      isCreator: false,
      canEdit: false,
      canManage: false,
      canModerate: false,
      canInvite: false,
      canDelete: false,
    };
  }

  // Multiple ways to check if user is the creator
  const isCreator =
    community.builder === currentUser.name ||
    community.builder === currentUser.username ||
    community.createdBy === currentUser.id ||
    community.userId === currentUser.id ||
    currentUser.id === community.createdBy ||
    currentUser.id === community.userId;

  return {
    isCreator,
    canEdit: isCreator,
    canManage: isCreator,
    canModerate: isCreator,
    canInvite: isCreator,
    canDelete: isCreator,
  };
};

// Hook for Community Dashboard logic
export const useCommunityDashboard = () => {
  const { slug } = useParams();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("overview");

  // From creation flow (formData)
  const { formData } = location.state || {};

  // From Redux (explore flow)
  const { items: communities = [], loading, error } = useSelector(
    (state) => state.community
  );

  // Current user from Redux (adjust path to your auth slice)
  const { user: currentUser } = useSelector((state) => state.auth || {});

  // Process communities: normalize API data or keep formData as-is
  const processedCommunities = useMemo(() => {
    return communities.map((community) => {
      // If it already has formData structure, keep it as-is
      if (community.communityName && community.categories && Array.isArray(community.categories)) {
        return community;
      }
      // Otherwise, normalize it
      return normalizeCommunityData(community);
    }).filter(Boolean); // Remove any null results
  }, [communities]);

  // Find the community by slug
  const reduxCommunity = processedCommunities.find((c) => c.slug === slug);

  // Unified community object - prefer formData if it exists
  let community = null;
  if (formData) {
    // FormData might need normalization if it came from API
    community = formData.communityName ? formData : normalizeCommunityData(formData);
  } else {
    community = reduxCommunity;
  }

  // Update creator status based on current user
  if (community && currentUser) {
    const permissions = checkCreatorPermissions(community, currentUser);
    community = {
      ...community,
      isCreator: permissions.isCreator
    };
  }

  // Compute permissions
  const permissions = checkCreatorPermissions(community, currentUser);

  // Tabs for dashboard - add extra tabs for creators
  const defaultTabs = ["overview", "members", "events", "posts"];
  const tabs = permissions.isCreator
    ? [...defaultTabs, "analytics", "settings"]
    : defaultTabs;

  return {
    activeTab,
    setActiveTab,
    community,
    loading,
    error,
    tabs,
    permissions,
    currentUser,
    slug,
  };
};

// Helper to get image src for File object or URL
export const getImageSrc = (image) => {
  if (!image) return null;
  if (image instanceof File) {
    return URL.createObjectURL(image);
  }
  return image;
};