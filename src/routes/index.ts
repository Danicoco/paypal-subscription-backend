import express from 'express';
import userRoute from './userRoute';
import subscribeRoute from './subscribeRoute';

const router = express.Router();

router.use('/users', userRoute);
router.use('/subscribe', subscribeRoute);

export default router;