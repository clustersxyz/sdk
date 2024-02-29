export const getImageUrl = (name: string) => {
  const splitName = name.toLowerCase().split('/');
  return `https://cdn.clusters.xyz/profile/${splitName[0]}`;
};

export const getProfileUrl = (name: string) => {
  const splitName = name.toLowerCase().split('/');
  return `https://clusters.xyz/profile/${splitName[0]}`;
};
