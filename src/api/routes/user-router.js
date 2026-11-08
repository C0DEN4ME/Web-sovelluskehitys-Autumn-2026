import express from 'express';
import {
  postUser,
  deleteUser,
  getUserById,
  getUsers,
  putUser,
} from '../controllers/user-controller.js';
import {authenticateToken} from '../../middlewares/authentication.js';

const userRouter = express.Router();

// All /api/v1/users requests
userRouter.route('/').post(postUser).get(getUsers);

userRouter
  .route('/:id')
  .get(getUserById)
  .put(authenticateToken, putUser)
  .delete(authenticateToken, deleteUser);

export default userRouter;
