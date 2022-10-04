import Cookies from "js-cookie";
import { parseUser } from "../../utils";

let user = Cookies.get("user");

const initialState = parseUser(user);

const userReducer = function (state = initialState, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default userReducer;
