import express from 'express';
import * as authController from '../Controllers/auth.controller';

const router = express.Router();

// https://medium.com/front-end-weekly/learn-using-jwt-with-passport-authentication-9761539c4314
router.get('/signin', authController.signIn);

router.post('/signup-local', authController.signUpLocal);

export default router;
