export const getUserCommunities = (communities, currentUser) => {
  if (!communities || !currentUser) return [];

  return communities.filter((community) => {
    const creatorId = community.createdBy || community.userId;
    const creatorEmail = community.creatorEmail || community.builderEmail;

    return creatorId === currentUser.id || creatorEmail === currentUser.email;
  });
};
