import express from 'express';
import router from './api/index.js';
import requestTime from './middlewares/request-time.js';

const hostname = '127.0.0.1';
const port = 3000;
const app = express();

// serve static files (client app) from public/
app.use(express.static('public'));

// middlewares run before the routes
app.use(requestTime);
// needed for reading request body in JSON format
app.use(express.json());
// parses URL-encoded form data (like HTML forms)
app.use(express.urlencoded({extended: true}));

// Use the router for all API routes for /api/v1
app.use('/api/v1', router);

// Start the server by listening on the specified hostname and port.
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
