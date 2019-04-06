export const sendData = (res, data, code = 200) => {
  res.status(code);
  res.json({
    data
  });
};

export const sendError = (res, errorMessage, code = 500) => {
  res.status(code);
  res.json({
    errorMessage
  });
};
