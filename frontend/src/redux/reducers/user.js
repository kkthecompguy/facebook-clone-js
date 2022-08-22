const initialState = {};

const userReducer = function (state = initialState, action) {
  switch (action.type) {
    case "LOGIN":
      return state;
    default:
      return state;
  }
};

export default userReducer;
