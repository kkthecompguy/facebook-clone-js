import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import SearchAccount from "../../components/reset/SearchAccount";
import SendEmail from "../../components/reset/SendEmail";
import CodeVerification from "../../components/reset/CodeVerification";
import Footer from "../../components/login/Footer";
import "./styles.css";
import ChangePassword from "../../components/reset/ChangePassword";

function Reset(props) {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(0);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    Cookies.set("user", "");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  console.log(userInfo);
  return (
    <div className="reset">
      <div className="reset_header">
        <img src="../../../icons/facebook.svg" alt="" />
        {user ? (
          <div className="right_reset">
            <Link to={"/profile"}>
              <img src={user.picture} alt="" />
            </Link>
            <button className="blue_btn" onClick={logout}>
              Logout
            </button>
          </div>
        ) : (
          <Link to={"/login"} className="right_reset">
            <button className="blue_btn">Login</button>
          </Link>
        )}
      </div>
      <div className="reset_wrap">
        {visible === 0 && (
          <SearchAccount
            user={user}
            email={email}
            error={error}
            setEmail={setEmail}
            setLoading={setLoading}
            setError={setError}
            setUserInfo={setUserInfo}
            setVisible={setVisible}
          />
        )}
        {visible === 1 && userInfo && (
          <SendEmail
            userInfo={userInfo}
            setVisible={setVisible}
            error={error}
            setLoading={setLoading}
            setError={setError}
          />
        )}
        {visible === 2 && (
          <CodeVerification
            code={code}
            error={error}
            setCode={setCode}
            setLoading={setLoading}
            setError={setError}
            setVisible={setVisible}
            userInfo={userInfo}
          />
        )}
        {visible === 3 && (
          <ChangePassword
            password={password}
            confPassword={confPassword}
            error={error}
            setPassword={setPassword}
            setConfPassword={setConfPassword}
            setLoading={setLoading}
            setError={setError}
            userInfo={userInfo}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}

Reset.propTypes = {};

export default Reset;
