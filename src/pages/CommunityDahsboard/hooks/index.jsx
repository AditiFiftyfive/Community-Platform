import { useState, useMemo } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { slugify } from "../../../utils/slugify";



// Normalize community data to match formData structure exactly
export const normalizeCommunityData = (apiCommunity) => {
  if (!apiCommunity) return null;

  const communityName =
    apiCommunity.communityName || apiCommunity.name || "Unnamed Community";

  const slug = apiCommunity.slug || slugify(apiCommunity.communityName || apiCommunity.name || "");


  let categories = [];
  if (apiCommunity.categories) {
    categories = Array.isArray(apiCommunity.categories)
      ? apiCommunity.categories
      : [apiCommunity.categories];
  } else if (apiCommunity.subcategories) {
    categories = Array.isArray(apiCommunity.subcategories)
      ? apiCommunity.subcategories
      : [apiCommunity.subcategories];
  } else if (apiCommunity.category) {
    categories = [apiCommunity.category];
  }

  return {
    id: apiCommunity.id,
    commonId: apiCommunity.commonId,
    slug,
    communityName,
    description:
      apiCommunity.description ||
      `Join the ${communityName} community${
        apiCommunity.location ? ` in ${apiCommunity.location}` : ""
      }`,
    coverImage: apiCommunity.coverImage || apiCommunity.image || null,
    profileImage: apiCommunity.profileImage || apiCommunity.image || null,
    pageLink: apiCommunity.pageLink || slug,
    categories,
    location: apiCommunity.location || "",
    category: apiCommunity.category || (categories.length > 0 ? categories[0] : ""),
    builder: apiCommunity.builder || apiCommunity.creator || "Unknown",
    color: apiCommunity.color || "bg-gray-500",
    members: apiCommunity.members || apiCommunity.memberCount || "0",
    memberCount: apiCommunity.memberCount || apiCommunity.members || "0",
    createdBy: apiCommunity.createdBy || apiCommunity.userId,
    userId: apiCommunity.userId,
    isCreator: false, // will be updated
    isPublic: apiCommunity.isPublic !== undefined ? apiCommunity.isPublic : true,
    isActive: apiCommunity.isActive !== undefined ? apiCommunity.isActive : true,
  };
};

// Check if current user has creator/admin permissions
export const checkCreatorPermissions = (community, currentUser) => {
  if (!community || !currentUser) return { isCreator: false };

  const communityCreatorId =
    community.createdBy || community.userId || community.builder;
  const communityCreatorEmail =
    community.creatorEmail || community.builderEmail;

  const userId = currentUser.id;      // comes from Clerk via AuthSync
  const userEmail = currentUser.email;

  const isCreator =
    (communityCreatorId && communityCreatorId === userId) ||
    (communityCreatorEmail && communityCreatorEmail === userEmail);

  return { isCreator };
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
  (state) => state.communities   
);

  // Current user from Redux (adjust path to your auth slice)
  const currentUser = useSelector((state) => state.auth?.user);


  // Normalize communities
  const processedCommunities = useMemo(() => {
    return communities
      .map((c) =>
        c.communityName && c.categories && Array.isArray(c.categories)
          ? c
          : normalizeCommunityData(c)
      )
      .filter(Boolean);
  }, [communities]);

  // Find the community by slug
  const reduxCommunity = processedCommunities.find((c) => c.slug === slug);

  // Unified community object - prefer formData if it exists
  let community = null;
  if (formData) {
    community = normalizeCommunityData(formData);
  } else if (reduxCommunity) {
  community = normalizeCommunityData(reduxCommunity);
  }

  // Update creator status
  let permissions = { isCreator: false };
  if (community && currentUser) {
    permissions = checkCreatorPermissions(community, currentUser);
    community = {
      ...community,
      isCreator: permissions.isCreator,
    };
  }

  // Check if the current user has created any community
  const hasCreatedCommunity =
    currentUser &&
    processedCommunities.some((c) => checkCreatorPermissions(c, currentUser).isCreator);

console.log("slug from URL:", slug);
console.log("available communities:", processedCommunities.map(c => c.slug));


  // Tabs for dashboard
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
    hasCreatedCommunity,
    currentUser,
    slug,
  };
};

// Helper to get image src for File object or URL
export const getImageSrc = (image) => {
  if (!image) return null;
  if (image instanceof File) return URL.createObjectURL(image);
  return image;
};