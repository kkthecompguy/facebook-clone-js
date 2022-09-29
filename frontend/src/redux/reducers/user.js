import Cookies from "js-cookie";

let user = Cookies.get("user") || {};
try {
  user = JSON.parse(user);
} catch (error) {
  console.log(error);
}

const initialState = user;

const userReducer = function (state = initialState, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default userReducer;
