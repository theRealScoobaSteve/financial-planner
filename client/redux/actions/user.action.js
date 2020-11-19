export const UPDATE_USER_DATA = "UPDATE_USER_DATA";

export const updateUserData = (user) => {
  return {
    type: UPDATE_USER_DATA,
    payload: {
      user,
    },
  };
};
