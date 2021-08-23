const httpCodes = {
  success: 200,
  notFound: 404,
  serverError: 500,
  validationError: 400
  // etc
};
const response = (res, status, code, msg, otherFields) => {
  const jsonOutput = { code, msg, ...otherFields };
  res.status(status).json(jsonOutput);
};

export const success = (res) => (entity) => {
  response(res, httpCodes.success, 0, 'Success', entity);
};

// eslint-disable-next-line func-names
export const validationErrorHandler = () => function (err, req, res, next) {
  if (req.errorBody) {
    const { validationError } = httpCodes;
    const { error } = req.errorBody;
    const { message } = { error };
    response(
      res,
      validationError, // status
      validationError, // code
      message // message
    );
  }
  else {
    next(err);
  }
};

// eslint-disable-next-line func-names,no-unused-vars
export const serverErrorHandler = () => function (err, req, res, _next) {
  const { serverError } = httpCodes;
  response(
    res, serverError, serverError,
    err.msg || err.message || 'Something went wrong',
    {
      error: err
    }
  );
};

// eslint-disable-next-line func-names
export const notFoundHandler = () => function (req, res) {
  const { notFound } = httpCodes;
  response(
    res, notFound, notFound, 'Not found'
  );
};
