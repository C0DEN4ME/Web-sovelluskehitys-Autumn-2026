// Adds a requestTime property to req that later handlers can read
const requestTime = (req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
};

export default requestTime;
