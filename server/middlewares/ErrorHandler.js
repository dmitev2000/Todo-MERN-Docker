exports.ErrorHandler = (err, req, res, next) => {
  err.errors.repeat.message
    ? res.status(500).json(err.errors.repeat.message)
    : res.status(500).json(err.message);
};
