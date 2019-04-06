import Joi from 'joi';

const emailValidation = Joi.string().email().required();
const passwordValidation = Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required();

export const signUp = {
  body: {
    email: emailValidation,
    password: passwordValidation
  }
};

export const signIn = {
  body: {
    email: emailValidation,
    password: passwordValidation
  }
};
