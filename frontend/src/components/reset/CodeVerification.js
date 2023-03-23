import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import axiosService from "../../app/services";
import LoginInput from "../inputs/logininput";

function CodeVerification({
  code,
  error,
  setCode,
  userInfo,
  loading,
  setLoading,
  setVisible,
  setError,
}) {
  const validateCode = Yup.object({
    code: Yup.string()
      .required("Code is required")
      .min(5, "Code must be 5 characters")
      .max(5, "Code must be 5 characters"),
  });

  const verifyCode = async () => {
    try {
      setLoading(true);
      await axiosService.post("users/verify/reset/code", {
        email: userInfo.email,
        code,
      });
      setLoading(false);
      setError("");
      setVisible(3);
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || error.message);
    }
  };
  return (
    <div className="reset_form">
      <div className="reset_form_header">Code Verification</div>
      <div className="reset_form_text">
        Please enter code that been sent to your email
      </div>
      <Formik
        initialValues={{
          code,
        }}
        enableReinitialize
        validationSchema={validateCode}
        onSubmit={verifyCode}
      >
        {(formik) => (
          <Form>
            <LoginInput
              type="text"
              name="code"
              onChange={(e) => setCode(e.target.value)}
              placeholder="Code"
            />
            {error && <div className="error_text">{error}</div>}
            <div className="reset_form_btns">
              <Link to={"/login"} className="gray_btn">
                Cancel
              </Link>
              <button type="submit" className="blue_btn">
                Continue
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

CodeVerification.propTypes = {};

export default CodeVerification;
