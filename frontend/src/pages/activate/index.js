import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import CreatePost from "../../components/createPost";
import Header from "../../components/header";
import LeftHome from "../../components/home/left";
import RightHome from "../../components/home/right";
import Stories from "../../components/home/stories";
import ActivateForm from "./ActivateForm";
import axiosService from "../../app/services";
import "../home/styles.css";

function Activate() {
  const user = useSelector((state) => state.user);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axiosService.post(
          "users/activate",
          { token },
          user.accessToken
        );
        setSuccess(data.message);
        dispatch({ type: "VERIFY", payload: true });
        Cookies.set("user", JSON.stringify({ ...user, verified: true }));
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    })();
  }, [token, user, dispatch, navigate]);
  return (
    <div className="home">
      {success && (
        <ActivateForm
          type="success"
          header="Account verification succeeded."
          text={success}
          loading={loading}
        />
      )}
      {error && (
        <ActivateForm
          type="error"
          header="Account verification failed"
          text={error}
          loading={loading}
        />
      )}
      <Header />
      <LeftHome user={user} />
      <div className="home_middle">
        <Stories />
        <CreatePost user={user} />
      </div>
      <RightHome user={user} />
    </div>
  );
}

export default Activate;
