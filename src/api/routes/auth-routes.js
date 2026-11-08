import express from 'express';
import {postLogin, getMe} from '../controllers/auth-controller.js';
import {authenticateToken} from '../../middlewares/authentication.js';

const authRouter = express.Router();

authRouter.post('/login', postLogin);
export default authRouter;

authRouter.get('/me', authenticateToken, getMe);
