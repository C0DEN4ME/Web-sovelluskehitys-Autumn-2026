import express from 'express';
import multer from 'multer';
import {
  deleteCat,
  getAllCats,
  getCatById,
  postCat,
  putCat,
  getCatsByUserId,
} from '../controllers/cat-controller.js';
import logger from '../../middlewares/logger.js';
import {authenticateToken} from '../../middlewares/authentication.js';

// multer saves uploaded files to uploads/ and adds req.file to the request
const upload = multer({dest: 'uploads/'});

const catRouter = express.Router();

// All /api/v1/cats requests
catRouter
  .route('/')
  .get(logger, getAllCats)
  .post(authenticateToken, upload.single('image'), postCat);

// All /api/v1/cats/user/:user_id requests
catRouter.get('/user/:user_id', getCatsByUserId);

// All /api/v1/cats/:id requests
catRouter
  .route('/:id')
  .get(getCatById)
  .delete(authenticateToken, deleteCat)
  .put(authenticateToken, putCat);

export default catRouter;
