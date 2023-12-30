const getUrlForFile = async (file: File): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const imageUrl = `https://cdne-hotel-reservation-webapi-dev-001.azureedge.net/web/${file.name}`;
      resolve(imageUrl);
    }, 1000);
  });
};
export default getUrlForFile;
