import { useState } from "react";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import DotLoader from "react-spinners/DotLoader";
import Cookies from "js-cookie";
import LoginInput from "../inputs/logininput";
import axiosService from "../../app/services";

const loginInfo = {
  email: "",
  password: "",
};

function LoginForm(props) {
  const [login, setLogin] = useState(loginInfo);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, password } = login;

  const handleChange = (e) => {
    setLogin((current) => {
      return { ...current, [e.target.name]: e.target.value };
    });
  };
  const loginValidation = Yup.object({
    email: Yup.string()
      .required("Email address is required")
      .email("Must be a valid email")
      .max(100),
    password: Yup.string().required("Password is required"),
  });

  const handleLoginSubmit = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");
      const {
        data: { message, ...rest },
      } = await axiosService.post("users/login", login);
      setSuccess(message);
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: "LOGIN", payload: rest });
        Cookies.set("user", JSON.stringify(rest));
        navigate("/");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setError(error?.response?.data?.message);
    }
  };
  return (
    <div className="login_wrap">
      <div className="login_1">
        <img src="../../icons/facebook.svg" alt="login" />
        <span>
          Facebook helps you connect and share with the people in your life
        </span>
      </div>
      <div className="login_2">
        <div className="login_2_wrap">
          <Formik
            enableReinitialize
            initialValues={{
              email,
              password,
            }}
            validationSchema={loginValidation}
            onSubmit={() => {
              handleLoginSubmit();
            }}
          >
            {(formik) => (
              <Form>
                <LoginInput
                  placeholder="Email address or phone number"
                  name="email"
                  type="text"
                  value={email}
                  onChange={handleChange}
                />
                <LoginInput
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  bottom={true}
                />
                <button type="submit" className="blue_btn">
                  Log In
                </button>
              </Form>
            )}
          </Formik>
          <Link to="/forgot" className="forgot_password">
            Forgotten password?
          </Link>
          <DotLoader color="#1876f2" loading={loading} size={30} />
          {success && <div className="success_text">{success}</div>}
          {error && <div className="error_text">{error}</div>}
          <div className="sign_splitter"></div>
          <button
            className="blue_btn open_signup"
            onClick={() => props.setVisible(true)}
          >
            Create Account
          </button>
        </div>
        <Link to="/" className="sign_extra">
          <b>Create a Page</b> for a celebrity, brand or business.
        </Link>
      </div>
    </div>
  );
}

LoginForm.propTypes = {};

export default LoginForm;
