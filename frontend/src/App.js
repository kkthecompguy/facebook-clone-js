import { Routes, Route } from "react-router-dom";
import Activate from "./pages/activate";
import Home from "./pages/home";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Reset from "./pages/reset";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";

function App() {
  return (
    <Routes>
      <Route element={<LoggedInRoutes />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Home />} />
        <Route path="/activate/:token" element={<Activate />} />
      </Route>
      <Route element={<NotLoggedInRoutes />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="/reset" element={<Reset />} />
    </Routes>
  );
}

export default App;
