const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Something went wrong";

  // Wrong MongoDB id error
  if (err.name === "CastError") {
    return next(
      new ErrorHandler(`Resource not found with id ${err.value}`, 404)
    );
  }

  // Mongoose duplicate key error

  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  // Wrong JWT ERROR
  if (err.name === "JsonWebTokenError") {
    const message = `JSON Web Token is invalid, Try again`;
    err = new ErrorHandler(message, 400);
  }

  // JWT EXPIRE ERROR
  if (err.name === "TokenExpiredError") {
    const message = `JSON Web Token has expired, Try again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
