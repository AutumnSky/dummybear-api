import express from 'express';
import * as authController from '../Controllers/auth.controller';

const router = express.Router();

// ref:
// https://medium.com/front-end-weekly/learn-using-jwt-with-passport-authentication-9761539c4314
// https://www.zerocho.com/category/NodeJS/post/57b7101ecfbef617003bf457
router.post('/signin', authController.signIn);
router.post('/signup-local', authController.signUpLocal);

export default router;
