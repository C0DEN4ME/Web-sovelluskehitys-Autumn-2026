import express from 'express';
import multer from 'multer';
import {
  deleteCat,
  getAllCats,
  getCatById,
  postCat,
  putCat,
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

// All /api/v1/cats/:id requests
catRouter.route('/:id').get(getCatById).delete(deleteCat).put(putCat);

export default catRouter;
