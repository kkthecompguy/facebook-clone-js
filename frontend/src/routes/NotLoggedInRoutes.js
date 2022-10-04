import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function NotLoggedInRoutes(props) {
  const user = useSelector((state) => state.user);
  return user ? <Navigate to="/" /> : <Outlet />;
}

NotLoggedInRoutes.propTypes = {};

export default NotLoggedInRoutes;
