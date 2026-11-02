import express from 'express';
import {
  getAllCats,
  getCat,
  createCat,
} from './api/controllers/cat-controller.js';
import router from './api/index.js';

const hostname = '127.0.0.1';
const app = express();
const port = 3000;

app.use(express.json());

// Use the router for all API routes for /api/v1
app.use('/api/v1', router);

// Start the server by listening on the specified hostname and port.
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
