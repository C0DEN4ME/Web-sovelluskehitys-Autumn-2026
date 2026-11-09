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
import {body} from 'express-validator';
import {validationErrors} from '../../middlewares/error-handlers.js';
// multer saves uploaded files to uploads/ and adds req.file to the request
const upload = multer({dest: 'uploads/'});

const catRouter = express.Router();

// All /api/v1/cats requests
catRouter
  .route('/')
  .get(logger, getAllCats)
  .post(
    authenticateToken,
    body('cat_name').trim().isString().isLength({min: 3, max: 50}),
    body('weight').isNumeric().isLength({min: 1, max: 100}),
    body('filename').isString().isLength({min: 1, max: 255}),
    body('owner').isInt().isLength({min: 1, max: 100}),
    body('birthdate').isDate(),
    upload.single('image'),
    validationErrors,
    postCat
  );

// All /api/v1/cats/:id requests
catRouter
  .route('/:id')
  .get(getCatById)
  .delete(authenticateToken, deleteCat)
  .put(authenticateToken, putCat);

export default catRouter;
