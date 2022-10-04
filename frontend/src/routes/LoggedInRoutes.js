import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Login from "../pages/login";

function LoggedInRoutes(props) {
  const user = useSelector((state) => state.user);
  return user ? <Outlet /> : <Login />;
}

LoggedInRoutes.propTypes = {};

export default LoggedInRoutes;
