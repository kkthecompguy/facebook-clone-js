import { useEffect, useRef, useState } from "react";
import useClickOutside from "../../hooks/clickOutside";
import { Return, Search } from "../../svg";

function SearchMenu(props) {
  const [iconVisible, setIconVisible] = useState(true);
  const menu = useRef(null);
  const input = useRef(null);
  useClickOutside(menu, () => {
    props.setShowSearchMenu(false);
  });
  useEffect(() => {
    input.current.focus();
  }, []);
  return (
    <div className="header_left search_area scrollbar" ref={menu}>
      <div className="search_wrap">
        <div className="header_logo">
          <div
            className="circle hover1"
            onClick={() => props.setShowSearchMenu(false)}
          >
            <Return color={props.color} />
          </div>
        </div>
        <div className="search" onClick={() => input.current.focus()}>
          {iconVisible && (
            <div>
              <Search color={props.color} />
            </div>
          )}
          <input
            type="text"
            placeholder="Search Facebook"
            ref={input}
            onFocus={() => setIconVisible(false)}
            onBlur={() => setIconVisible(true)}
          />
        </div>
      </div>
      <div className="search_history_header">
        <span>Recent Searches</span>
        <a href="#!">Edit</a>
      </div>
      <div className="search_history"></div>
      <div className="search_results scrollbar"></div>
    </div>
  );
}

SearchMenu.propTypes = {};

export default SearchMenu;
