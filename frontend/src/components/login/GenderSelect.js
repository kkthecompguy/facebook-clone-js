import PropTypes from "prop-types";
import { useMediaQuery } from "react-responsive";

function GenderSelect({ genderError, handleChange }) {
  // const view1 = useMediaQuery({
  //   query: `(min-width: 539px)`,
  // });
  // const view2 = useMediaQuery({
  //   query: `(min-width: 850px)`,
  // });
  const view3 = useMediaQuery({
    query: `(min-width: 1170px)`,
  });
  return (
    <div
      className="reg_grid"
      style={{ marginBottom: `${genderError && !view3 ? "70px" : "0"}` }}
    >
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
        Female
        <input
          type="radio"
          name="gender"
          id="female"
          value="female"
          onChange={handleChange}
        />
      </label>
      <label htmlFor="custom">
        Custom
        <input
          type="radio"
          name="gender"
          id="custom"
          value="custom"
          onChange={handleChange}
        />
      </label>
      {genderError && (
        <div
          className={
            !view3 ? "input_error" : "input_error input_error_select_large"
          }
        >
          <div
            className={!view3 ? "error_arrow_bottom" : "error_arrow_left"}
          ></div>
          {genderError}
        </div>
      )}
    </div>
  );
}

GenderSelect.propTypes = {
  handleChange: PropTypes.func,
  genderError: PropTypes.string,
};

export default GenderSelect;
