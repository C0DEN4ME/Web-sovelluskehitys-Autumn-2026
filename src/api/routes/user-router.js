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

const userRouter = express.Router();

// All /api/v1/users requests
userRouter
  .route('/')
  .post(
    body('name').isAlphanumeric().isLength({min: 4, max: 20}),
    body('email').isEmail(),
    body('password').isLength({min: 6}),
    postUser
  )
  .get(authenticateToken, getUsers);

userRouter
  .route('/:id')
  .get(getUserById)
  .put(authenticateToken, putUser)
  .delete(authenticateToken, deleteUser);

export default userRouter;
