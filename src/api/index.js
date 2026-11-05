import express from 'express';
import catRouter from './routes/cat-router.js';
import userRouter from './routes/user-router.js';
import authRouter from './routes/auth-routes.js';

const router = express.Router();

router.use('/cats', catRouter);

//use use userRouter for all /user endpoints
router.use('/users', userRouter);

router.use('/auth', authRouter);

export default router;
