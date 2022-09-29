import { Form, Formik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import DotLoader from "react-spinners/DotLoader";
import Cookies from "js-cookie";
import RegisterInput from "../inputs/registerinput";
import DOBSelect from "./DOBSelect";
import GenderSelect from "./GenderSelect";
import axiosService from "../../app/services";

const userInfo = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  bYear: new Date().getFullYear(),
  bMonth: new Date().getMonth() + 1,
  bDay: new Date().getDate(),
  gender: "",
};

function RegisterForm(props) {
  const [user, setUser] = useState(userInfo);
  const [dateError, setDateError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const { firstName, lastName, email, password, bYear, bMonth, bDay, gender } =
    user;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setUser((current) => {
      return { ...current, [e.target.name]: e.target.value };
    });
  };
  const now = new Date().getFullYear();
  const years = Array.from(new Array(100), (val, index) => now - index);
  const months = Array.from(new Array(12), (val, index) => 1 + index);
  const getDays = () => {
    return new Date(bYear, bMonth, 0).getDate();
  };
  const days = Array.from(new Array(getDays()), (val, index) => 1 + index);
  const registerValidation = Yup.object({
    firstName: Yup.string()
      .required("What's your First name?")
      .min(2, "First name must be between 2 and 16 character")
      .max(16, "First name must be between 2 and 16 character")
      .matches(
        /^[aA-zZ\s]+$/,
        "Numbers and special characters are not allowed."
      ),
    lastName: Yup.string()
      .required("What's your Last name?")
      .min(2, "Last name must be between 2 and 16 character")
      .max(16, "Last name must be between 2 and 16 character")
      .matches(
        /^[aA-zZ\s]+$/,
        "Numbers and special characters are not allowed."
      ),
    email: Yup.string()
      .required(
        "You will need this when you login and if you ever need to reset your password"
      )
      .email("Enter a valid email address"),
    password: Yup.string()
      .required(
        "Enter a combination of at least six numbers, letters and panctuation marks(such as ! and &)"
      )
      .min(6, "Password must be at least 6 characters")
      .max(36, "Password can't be more than 36 characters"),
  });

  const handleFormSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axiosService.post("users/register", user);
      setLoading(false);
      setError("");
      setSuccess(data.message);
      const { message, ...rest } = data;
      setTimeout(() => {
        dispatch({ type: "LOGIN", payload: rest });
        Cookies.set("user", JSON.stringify(rest));
        navigate("/");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setSuccess("");
      setError(error?.response?.data?.message);
    }
  };
  return (
    <div className="blur">
      <div className="register">
        <div className="register_header">
          <i onClick={() => props.setVisible(false)} className="exit_icon"></i>
          <span>Sign Up</span>
          <span>It's quick and easy</span>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            firstName,
            lastName,
            email,
            password,
            bYear,
            bMonth,
            bDay,
            gender,
          }}
          validationSchema={registerValidation}
          onSubmit={() => {
            let currentDate = new Date();
            let pickedDate = new Date(bYear, bMonth - 1, bDay);
            let atleast14 = new Date(1970 + 14, 0, 1);
            let noMoreThan70 = new Date(1970 + 70, 0, 1);
            if (currentDate - pickedDate < atleast14) {
              setDateError(
                "It looks like you've entered the wrong info. Please make sure that you use your real date of birth."
              );
            } else if (currentDate - pickedDate > noMoreThan70) {
              setDateError(
                "It looks like you've entered the wrong info. Please make sure that you use your real date of birth."
              );
            } else if (gender === "") {
              setDateError("");
              setGenderError(
                "Please choose a gender. You can change who can see this later"
              );
            } else {
              setDateError("");
              setGenderError("");
              handleFormSubmit();
            }
          }}
        >
          {(formik) => (
            <Form className="register_form">
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={firstName}
                  onChange={handleChange}
                />

                <RegisterInput
                  type="text"
                  placeholder="Surname"
                  name="lastName"
                  value={lastName}
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
                <DOBSelect
                  bDay={bDay}
                  bMonth={bMonth}
                  bYear={bYear}
                  days={days}
                  months={months}
                  years={years}
                  handleChange={handleChange}
                  dateError={dateError}
                />
              </div>
              <div className="reg_col">
                <div className="reg_col_header">
                  Gender <i className="info_icon"></i>
                </div>
                <GenderSelect
                  genderError={genderError}
                  handleChange={handleChange}
                />
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
              <DotLoader color="#1876f2" loading={loading} size={30} />
              {error && <div className="error_text">{error}</div>}
              {success && <div className="success_text">{success}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

RegisterForm.propTypes = {};

export default RegisterForm;
