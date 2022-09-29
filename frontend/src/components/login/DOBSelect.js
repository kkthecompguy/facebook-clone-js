import PropTypes from "prop-types";
import { useMediaQuery } from "react-responsive";
function DOBSelect({
  bDay,
  bMonth,
  bYear,
  days,
  months,
  years,
  handleChange,
  dateError,
}) {
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
      style={{ marginBottom: `${dateError && !view3 ? "90px" : "0"}` }}
    >
      <select name="bDay" value={bDay} onChange={handleChange}>
        {days.map((day, index) => (
          <option key={index} value={day}>
            {day}
          </option>
        ))}
      </select>
      <select name="bMonth" value={bMonth} onChange={handleChange}>
        {months.map((month, index) => (
          <option key={index} value={month}>
            {month}
          </option>
        ))}
      </select>
      <select name="bYear" value={bYear} onChange={handleChange}>
        {years.map((year, index) => (
          <option value={year} key={index}>
            {year}
          </option>
        ))}
      </select>
      {dateError && (
        <div
          className={
            !view3 ? "input_error" : "input_error input_error_select_large"
          }
        >
          <div
            className={!view3 ? "error_arrow_bottom" : "error_arrow_left"}
          ></div>
          {dateError}
        </div>
      )}
    </div>
  );
}

DOBSelect.propTypes = {
  bDay: PropTypes.any,
  bMonth: PropTypes.any,
  bYear: PropTypes.any,
  days: PropTypes.array,
  months: PropTypes.array,
  years: PropTypes.array,
  dateError: PropTypes.string,
  handleChange: PropTypes.func,
};

export default DOBSelect;
