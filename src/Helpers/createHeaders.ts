const createHeaderWithTokens = (accessToken: string, refreshToken: string) => {
  return {
    Authorization: `Bearer ${accessToken}`,
    Authentication: `Refresh ${refreshToken}`,
  };
};

export default createHeaderWithTokens;
