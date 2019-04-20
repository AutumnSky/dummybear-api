import express from 'express';
import * as authController from '../Controllers/auth.controller';
import validate from 'express-validation';
import * as validation from 'Utils/validation';

const router = express.Router();

// ref:
// https://medium.com/front-end-weekly/learn-using-jwt-with-passport-authentication-9761539c4314
// https://www.zerocho.com/category/NodeJS/post/57b7101ecfbef617003bf457
router.post('/signup-local', validate(validation.signUp), authController.signUpLocal);
router.post('/signin', validate(validation.signIn), authController.signIn);
router.post('/signin/auto', validate(validation.autoSignIn), authController.autoSignIn);

export default router;
