// Simple custom middleware.
// next() passes handling to the next matching middleware or route handler.
const logger = (req, res, next) => {
  console.log('Middleware executed');
  next();
};

export default logger;
