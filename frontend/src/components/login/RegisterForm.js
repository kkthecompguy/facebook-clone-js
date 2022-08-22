import { Form, Formik } from "formik";
import { useState } from "react";
import RegisterInput from "../inputs/registerinput";

const userInfo = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  bYear: new Date().getFullYear(),
  bMonth: new Date().getMonth() + 1,
  bDay: new Date().getDate(),
  gender: "",
};

function RegisterForm(props) {
  const [user, setUser] = useState(userInfo);
  const { first_name, last_name, email, password, bYear, bMonth, bDay } = user;
  const handleChange = (e) => {
    setUser((current) => {
      return { ...current, [e.target.name]: e.target.value };
    });
  };
  console.log(user);
  return (
    <div className="blur">
      <div className="register">
        <div className="register_header">
          <i className="exit_icon"></i>
          <span>Sign Up</span>
          <span>It's quick and easy</span>
        </div>
        <Formik>
          {(formik) => (
            <Form className="register_form">
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="First Name"
                  name="first_name"
                  value={first_name}
                  onChange={handleChange}
                />

                <RegisterInput
                  type="text"
                  placeholder="Surname"
                  name="last_name"
                  value={last_name}
                  onChange={handleChange}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="Mobile number or email address"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="password"
                  placeholder="New Password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
              </div>
              <div className="reg_col">
                <div className="reg_col_header">
                  Date of birth <i className="info_icon"></i>
                </div>
                <div className="reg_grid">
                  <select name="bDay" value={bDay} onChange={handleChange}>
                    <option>25</option>
                  </select>
                  <select name="bMonth" value={bMonth} onChange={handleChange}>
                    <option>05</option>
                  </select>
                  <select name="bYear" value={bYear} onChange={handleChange}>
                    <option>2022</option>
                  </select>
                </div>
              </div>
              <div className="reg_col">
                <div className="reg_col_header">
                  Gender <i className="info_icon"></i>
                </div>
                <div className="reg_grid">
                  <label htmlFor="male">
                    Male
                    <input
                      type="radio"
                      name="gender"
                      id="male"
                      value="male"
                      onChange={handleChange}
                    />
                  </label>
                  <label htmlFor="female">
                    Male
                    <input
                      type="radio"
                      name="gender"
                      id="female"
                      value="female"
                      onChange={handleChange}
                    />
                  </label>
                  <label htmlFor="custom">
                    Male
                    <input
                      type="radio"
                      name="gender"
                      id="custom"
                      value="custom"
                      onChange={handleChange}
                    />
                  </label>
                </div>
              </div>
              {/* <div className="reg_service">
                People who use our service may have uploaded your contact information to Facebook. <span>Learn more</span>.
              </div> */}
              <div className="reg_infos">
                By clicking Sign Up, you agree to our{" "}
                <span>Terms, Privacy Policy &nbsp;</span> and{" "}
                <span>Cookies Policy.</span> You may receive SMS notifications
                from us and can opt out at any time.
              </div>
              <div className="reg_btn_wrapper">
                <button type="submit" className="blue_btn open_signup">
                  Sign Up
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

RegisterForm.propTypes = {};

export default RegisterForm;
