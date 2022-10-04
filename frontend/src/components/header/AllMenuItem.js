import PropTypes from "prop-types";

function AllMenuItem(props) {
  return (
    <div className="all_menu_item hover1">
      <img src={`../../left/${props.icon}.png`} alt="menu" />
      <div className="all_menu_col">
        <span>{props.name}</span>
        <span>{props.description}</span>
      </div>
    </div>
  );
}

AllMenuItem.propTypes = {
  icon: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
};

export default AllMenuItem;
