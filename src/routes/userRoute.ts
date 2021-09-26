import express from 'express';
import { createUser, getUser, allowLogin } from '../controller/userController';
import isAuthenticated from '../config/isAuthenticated';
const userRoute = express.Router();

userRoute.post('/', createUser);
userRoute.get('/', isAuthenticated, getUser);
userRoute.post('/login', allowLogin);

export default userRoute;