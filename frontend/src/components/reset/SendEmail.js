import { Link } from "react-router-dom";
import axiosService from "../../app/services";

function SendEmail({
  userInfo,
  error,
  setError,
  setVisible,
  loading,
  setLoading,
}) {
  const sendEmail = async () => {
    try {
      setLoading(true);
      await axiosService.post("users/send/reset/code", {
        email: userInfo.email,
      });
      setLoading(false);
      setVisible(2);
      setError("");
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setLoading(false);
    }
  };

  return (
    <div className="reset_form dynamic_height">
      <div className="reset_form_header">Reset Your Password</div>
      <div className="reset_grid">
        <div className="reset_left">
          <div className="reset_form_text">
            How do you want to receive the code to reset your password?
          </div>
          <label htmlFor="email" className="hover1">
            <input type="radio" name="" id="email" checked readOnly />
            <div className="label_col">
              <span>Send Code via email</span>
              <span>{userInfo.email}</span>
            </div>
          </label>
        </div>
        <div className="reset_right">
          <img src={userInfo.picture} alt="" />
          <span>{userInfo.email}</span>
          <span>Facebook User</span>
        </div>
      </div>
      {error && (
        <div className="error_text" style={{ padding: "10px" }}>
          {error}
        </div>
      )}
      <div className="reset_form_btns">
        <Link to={"/login"} className="gray_btn">
          Not You?
        </Link>
        <button onClick={sendEmail} className="blue_btn">
          Continue
        </button>
      </div>
    </div>
  );
}

SendEmail.propTypes = {};

export default SendEmail;
