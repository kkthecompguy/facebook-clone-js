function Contact({ user }) {
  return (
    <div className="contact hover3">
      <div className="contact_img">
        <img src={user.picture} alt="" />
      </div>
      <span>
        {user.firstName} {user.lastName}
      </span>
    </div>
  );
}

Contact.propTypes = {};

export default Contact;
