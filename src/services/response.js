import httpStatus from '../utils/httpStatus';
import responseCode from '../utils/responseCode';

const {
  OK, BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND
} = httpStatus;
const { SUCCESS, ERROR_SERVER, ERROR_VALIDATION, NOT_FOUND: NOT_FOUND_CODE } = responseCode

const response = (res, status, code, msg, otherFields) => {
  const jsonOutput = { code, msg, ...otherFields };
  res.status(status).json(jsonOutput);
};

export const success = (res) => (entity) => {
  response(res, OK, SUCCESS, 'Success', entity);
};

// eslint-disable-next-line no-unused-vars
export const serverErrorHandler = () => (err, req, res, next) => {
  response(
    res, INTERNAL_SERVER_ERROR, ERROR_SERVER,
    err.msg || err.message || 'Something went wrong',
    {
      error: err
    }
  );
};

export const notFoundHandler = () => (req, res) => {
  response(
    res, NOT_FOUND, NOT_FOUND_CODE, 'Not found'
  );
};

export const validationErrorHandler = () => (err, req, res, next) => {
  if (req.errorBody) {
    const { error } = req.errorBody;
    const { message } = { error };
    response(
      res,
      BAD_REQUEST, // status
      ERROR_VALIDATION, // code
      message // message
    );
  }
  else {
    next(err);
  }
};
