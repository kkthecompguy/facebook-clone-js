import LeftLink from "./LeftLink";
import "./styles.css";

function LeftHome({ user }) {
  return (
    <div className="left_home">
      <div className="left_link">
        <img src={user?.picture} alt="" />
        <span>
          {user?.firstName} {user?.lastName}
        </span>
      </div>
      <LeftLink />
    </div>
  );
}

LeftHome.propTypes = {};

export default LeftHome;
