import express from 'express';
import {
  postUser,
  deleteUser,
  getUserById,
  getUsers,
  putUser,
} from '../controllers/user-controller.js';
import {authenticateToken} from '../../middlewares/authentication.js';
import {body} from 'express-validator';
import {validationErrors} from '../../middlewares/error-handlers.js';

const userRouter = express.Router();

// All /api/v1/users requests
userRouter
  .route('/')
  .post(
    body('name').trim().isAlphanumeric().isLength({min: 4, max: 20}),
    body('email').trim().isEmail(),
    body('password').trim().isLength({min: 6}),
    validationErrors,
    postUser
  )
  .get(authenticateToken, getUsers);

userRouter
  .route('/:id')
  .get(getUserById)
  .put(authenticateToken, putUser)
  .delete(authenticateToken, deleteUser);

export default userRouter;
