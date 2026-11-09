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
    body('name').trim().isLength({min: 4, max: 100}),
    body('username').trim().isLength({min: 3, max: 20}).isAlphanumeric(),
    body('email').trim().isEmail(),
    body('password').isLength({min: 6}),
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
