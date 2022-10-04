function LeftLink({ img, text, notification }) {
  return (
    <div className="left_link">
      <img src={`../../../left/${img}.png`} />
      {notification ? (
        <div className="col">
          <div className="col_1">{text}</div>
          <div className="col_2">{notification}</div>
        </div>
      ) : (
        <span>{text}</span>
      )}
    </div>
  );
}

LeftLink.propTypes = {};

export default LeftLink;
