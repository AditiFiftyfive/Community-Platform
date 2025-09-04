import { useState, useMemo } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useUser } from "@clerk/clerk-react";
import { normalizeCommunityData } from "../../utils/normalizeCommunityData";

export const useCommunityDashboard = () => {
  const { slug } = useParams();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("overview");
  const { formData } = location.state || {};

 const { items: communities = [], loading, error } = useSelector(
  (state) => state.communities
);

const { user } = useUser();

  const currentUser = user
    ? {
        id: user.id,
        name: user.fullName,
        email: user.primaryEmailAddress?.emailAddress,
        username: user.username,
        imageUrl: user.imageUrl,
      }
    : null;

  const processedCommunities = useMemo(() => {
    return communities
      .map((c) =>
        c.communityName && c.categories && Array.isArray(c.categories)
          ? c
          : normalizeCommunityData(c)
      )
      .filter(Boolean);
  }, [communities]);

  const reduxCommunity = processedCommunities.find((c) => c.slug === slug);

  let community = null;
  if (formData) {
    community = normalizeCommunityData(formData);
  } else if (reduxCommunity) {
  community = normalizeCommunityData(reduxCommunity);
  }

  let isCreator = false;

    if (community && currentUser) {
    const creatorId = community.createdBy || community.userId;
    isCreator = creatorId === currentUser.id;

    community = {
        ...community,
        isCreator,
    };
    }

  const hasCreatedCommunity = currentUser && processedCommunities.some((c) => {
  const creatorId = c.createdBy || c.userId;
  return creatorId === currentUser.id;
  });

  const defaultTabs = ["overview", "members", "events", "posts"];
  const tabs = isCreator
    ? [...defaultTabs, "analytics", "settings"]
    : defaultTabs;

  return {
    activeTab,
    setActiveTab,
    community,
    loading,
    error,
    tabs,
    isCreator,
    hasCreatedCommunity,
    currentUser,
    slug,
  };
};