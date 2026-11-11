import express from 'express';
import router from './api/index.js';
import requestTime from './middlewares/request-time.js';
import cors from 'cors';
import {notFoundHandler, errorHandler} from './middlewares/error-handlers.js';

const app = express();

app.use(cors());

// serve static files (client app) from public/

app.use('/public', express.static('public')); // allow /public/ prefix for static files

app.use('/docs', express.static('docs'));

// middlewares run before the routes
app.use(requestTime);
// needed for reading request body in JSON format
app.use(express.json());
// parses URL-encoded form data (like HTML forms)
app.use(express.urlencoded({extended: true}));

// Use the router for all API routes for /api/v1
app.use('/api/v1', router);

app.use(notFoundHandler); // handle 404 errors
app.use(errorHandler); // handle other errors

export default app;
