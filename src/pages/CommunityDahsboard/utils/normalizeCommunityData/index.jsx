import { slugify } from "../../../../utils/slugify";

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
    createdBy: apiCommunity.createdBy || apiCommunity.userId,
    userId: apiCommunity.userId,
    creatorEmail: apiCommunity.creatorEmail || apiCommunity.builderEmail || null,
  };
};

export const getImageSrc = (image) => {
  if (!image) return null;
  if (image instanceof File) return URL.createObjectURL(image);
  return image;
};