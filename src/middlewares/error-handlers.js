import {validationResult} from 'express-validator';

// runs when no route matched the request
const notFoundHandler = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error); // forward error to error handler
};

// eslint-disable-next-line no-unused-vars -- Express needs all 4 params to treat this as an error handler
const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500); // default is 500 if err.status is not defined
  res.json({
    error: {
      message: err.message,
      status: err.status || 500,
    },
  });
};

// sends a 400 error if express-validator found problems in the request
const validationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors
      .array()
      .map((error) => `${error.path}: ${error.msg}`)
      .join(', ');
    const error = new Error(messages);
    error.status = 400;
    return next(error);
  }
  next();
};

export {notFoundHandler, errorHandler, validationErrors};
