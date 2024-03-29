import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useClickOutside from "../../hooks/clickOutside";
import {
  ArrowDown,
  Friends,
  Gaming,
  HomeActive,
  Logo,
  Market,
  Menu,
  Messenger,
  Notifications,
  Search,
  Watch,
} from "../../svg";
import AllMenu from "./AllMenu";
import SearchMenu from "./SearchMenu";
import "./styles.css";
import UserMenu from "./userMenu";

function Header(props) {
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [showAllMenu, setShowAllMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const user = useSelector((state) => state.user);
  const allMenu = useRef(null);
  const userMenu = useRef(null);
  const color = "#65676b";

  useClickOutside(allMenu, () => {
    setShowAllMenu(false);
  });
  useClickOutside(userMenu, () => {
    setShowUserMenu(false);
  });
  return (
    <header>
      <div className="header_left">
        <Link to="/" className="header_logo">
          <div className="circle">
            <Logo />
          </div>
        </Link>
        <div className="search search1" onClick={() => setShowSearchMenu(true)}>
          <Search color={color} />
          <input
            type="text"
            placeholder="Search Facebook"
            className="hide_input"
          />
        </div>
      </div>
      {showSearchMenu && (
        <SearchMenu color={color} setShowSearchMenu={setShowSearchMenu} />
      )}
      <div className="header_middle">
        <Link to="/" className="middle_icon active">
          <HomeActive />
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Friends color={color} />
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Watch color={color} />
          <div className="middle_notification">9+</div>
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Market color={color} />
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Gaming color={color} />
        </Link>
      </div>
      <div className="header_right">
        <Link to="/profile" className="profile_link hover1">
          <img src={user?.picture} alt="profile-pic" />
          <span>{user?.firstName}</span>
        </Link>
        <div
          className={`circle_icon hover1 ${showAllMenu && "active_header"}`}
          ref={allMenu}
        >
          <div
            style={{ transform: "translateY(2px)" }}
            onClick={() => setShowAllMenu((prev) => !prev)}
          >
            <Menu />
          </div>
          {showAllMenu && <AllMenu setShowAllMenu={setShowAllMenu} />}
        </div>
        <div className="circle_icon hover1">
          <Messenger />
        </div>
        <div className="circle_icon hover1">
          <Notifications />
          <div className="right_notification">5</div>
        </div>
        <div
          className={`circle_icon hover1 ${showUserMenu && "active_header"}`}
          ref={userMenu}
        >
          <div
            style={{ transform: "translateY(2px)" }}
            onClick={() => setShowUserMenu((prev) => !prev)}
          >
            <ArrowDown />
          </div>
          {showUserMenu && <UserMenu user={user} />}
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {};

export default Header;
