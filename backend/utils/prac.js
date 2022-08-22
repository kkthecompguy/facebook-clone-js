const options = function(req, res) {
  let tmp;
  if (allowedOrigins.indexOf(req.header("Origin")) > -1) {
    tmp = {
      origin: true,
      optionSuccessStatus: 200
    };
  } else {
    tmp = {
      origin: "notallowed"
    };
  }
  res(null, tmp);
}