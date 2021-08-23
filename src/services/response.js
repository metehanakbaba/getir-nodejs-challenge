import httpStatus from '../utils/httpStatus';

const {
  OK, BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND
} = httpStatus;

const response = (res, status, code, msg, otherFields) => {
  const jsonOutput = { code, msg, ...otherFields };
  res.status(status).json(jsonOutput);
};

export const success = (res) => (entity) => {
  response(res, OK, 0, 'Success', entity);
};

// eslint-disable-next-line no-unused-vars
export const serverErrorHandler = () => (err, req, res, next) => {
  response(
    res, INTERNAL_SERVER_ERROR, 1,
    err.msg || err.message || 'Something went wrong',
    {
      error: err
    }
  );
};

export const notFoundHandler = () => (req, res) => {
  response(
    res, NOT_FOUND, 2, 'Not found'
  );
};

export const validationErrorHandler = () => (err, req, res, next) => {
  if (req.errorBody) {
    const { error } = req.errorBody;
    const { message } = { error };
    response(
      res,
      BAD_REQUEST, // status
      3, // code
      message // message
    );
  }
  else {
    next(err);
  }
};
