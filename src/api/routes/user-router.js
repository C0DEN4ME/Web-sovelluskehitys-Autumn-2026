import express from 'express';
import {
  postUser,
  deleteUser,
  getUserById,
  getUsers,
  putUser,
} from '../controllers/user-controller.js';
import {authenticateToken} from '../../middlewares/authentication.js';
import {body, param} from 'express-validator';
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
  .get(param('id').isInt(), validationErrors, getUserById)
  .put(
    authenticateToken,
    param('id').isInt(),
    body('name').optional().trim().isLength({min: 4, max: 100}),
    body('username')
      .optional()
      .trim()
      .isLength({min: 3, max: 20})
      .isAlphanumeric(),
    body('email').optional().trim().isEmail(),
    body('password').optional().isLength({min: 6}),
    body('role').optional().isIn(['user', 'admin']),
    validationErrors,
    putUser
  )
  .delete(authenticateToken, param('id').isInt(),validationErrors, deleteUser);

export default userRouter;
