import { useState } from "react";
import axiosService from "../../../app/services";
import "./styles.css";

function SendVerification({ user }) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const sendLink = async () => {
    try {
      const { data } = await axiosService.post(
        "users/send/verification",
        {},
        user.accessToken
      );
      setSuccess(data.message);
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  };
  return (
    <div className="send_verification">
      <span>
        Your account is not verified, verify your account before it gets deleted
        after a month from creating.
      </span>
      <a href="#!" onClick={sendLink}>
        Click here to resend verification link
      </a>
      {success && <div className="success_text">{success}</div>}
      {error && <div className="error_text">{error}</div>}
    </div>
  );
}

SendVerification.propTypes = {};

export default SendVerification;
