import express from 'express';
import {upload, createThumbnail} from '../../middlewares/upload.js';
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
import {body} from 'express-validator';
import {validationErrors} from '../../middlewares/error-handlers.js';

const catRouter = express.Router();

// All /api/v1/cats requests
catRouter
  .route('/')
  .get(logger, getAllCats)
  .post(
    authenticateToken,
    upload.single('image'), // multer middleware to handle single file upload with field name 'image'
    createThumbnail, // middleware to create thumbnail after file upload
    body('cat_name').trim().isLength({min: 3, max: 50}),
    body('weight').isFloat({min: 0.1, max: 100}),
    body('birthdate').isDate(),
    validationErrors, // middleware to check for validation errors
    postCat
  );

// All /api/v1/cats/user/:user_id requests
catRouter.get('/user/:user_id', getCatsByUserId);

// All /api/v1/cats/:id requests
catRouter
  .route('/:id')
  .get(getCatById)
  .delete(authenticateToken, deleteCat)
  .put(
    authenticateToken,
    body('cat_name').optional().trim().isLength({min: 3, max: 50}),
    body('weight').optional().isFloat({min: 0.1, max: 100}),
    body('birthdate').optional().isDate(),
    validationErrors,
    putCat
  );

export default catRouter;
