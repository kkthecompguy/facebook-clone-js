export const parseUser = (user) => {
  if (user) {
    try {
      return JSON.parse(user);
    } catch (error) {
      console.log(error);
    }
  }
  return null;
};
