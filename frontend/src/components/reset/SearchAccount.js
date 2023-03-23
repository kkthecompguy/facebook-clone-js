import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import axiosService from "../../app/services";
import LoginInput from "../inputs/logininput";

function SearchAccount({
  user,
  email,
  error,
  setEmail,
  setLoading,
  setError,
  setUserInfo,
  setVisible,
}) {
  const validateEmail = Yup.object({
    email: Yup.string()
      .required("Email address is required.")
      .email("Must be a valid email address")
      .max(50, "Email address can't be more than 50 characters."),
  });
  const handleSearch = async () => {
    try {
      const { data } = await axiosService.post(
        "users/find/account",
        { email },
        user?.token
      );
      setUserInfo(data);
      setVisible(1);
      setError("");
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || error.message);
    }
  };
  return (
    <div className="reset_form">
      <div className="reset_form_header">Find Your Account</div>
      <div className="reset_form_text">
        Please enter your email address or mobile number to search for your
        account
      </div>
      <Formik
        initialValues={{
          email,
        }}
        enableReinitialize
        validationSchema={validateEmail}
        onSubmit={handleSearch}
      >
        {(formik) => (
          <Form>
            <LoginInput
              type="text"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address or phone number"
            />
            {error && <div className="error_text">{error}</div>}
            <div className="reset_form_btns">
              <Link to={"/login"} className="gray_btn">
                Cancel
              </Link>
              <button type="submit" className="blue_btn">
                Search
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

SearchAccount.propTypes = {};

export default SearchAccount;
