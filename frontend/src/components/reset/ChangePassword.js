import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import LoginInput from "../inputs/logininput";

function ChangePassword({
  password,
  confPassword,
  error,
  setPassword,
  setConfPassword,
}) {
  const validatePassword = Yup.object({
    password: Yup.string()
      .required(
        "Enter a combination of at least six numbers, letters and panctuation marks(such as ! and &)"
      )
      .min(6, "Password must be at least 6 characters")
      .max(36, "Password can't be more than 36 characters"),
    confPassword: Yup.string()
      .required("Confirm your password.")
      .oneOf([Yup.ref("password")], "Passwords must match."),
  });
  return (
    <div className="reset_form" style={{ height: "310px" }}>
      <div className="reset_form_header">Code Verification</div>
      <div className="reset_form_text">Pick a strong password</div>
      <Formik
        initialValues={{
          password,
          confPassword,
        }}
        enableReinitialize
        validationSchema={validatePassword}
      >
        {(formik) => (
          <Form>
            <LoginInput
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
            />
            <LoginInput
              type="password"
              name="confPassword"
              onChange={(e) => setConfPassword(e.target.value)}
              placeholder="Confirm New Password"
              bottom={true}
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

ChangePassword.propTypes = {};

export default ChangePassword;
