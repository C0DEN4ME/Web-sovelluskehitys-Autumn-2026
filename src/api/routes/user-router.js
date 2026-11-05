import express from 'express';
import {postUser} from '../controllers/user-controller.js';
const userRouter = express.Router();

// TODO: add /api/v1/users routes (user-controller.js)


userRouter.route('/',).post(postUser);

export default userRouter;
