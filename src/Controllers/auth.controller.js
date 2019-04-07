import User from 'Models/user.model';
import * as responsor from 'Utils/responsor';
import passport from 'passport';
import jwt from 'jsonwebtoken';

export const signUpLocal = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { encryptedPassword, salt } = await User.encryptePassword(password);
    const newUser = await User.create({
      email,
      password: encryptedPassword,
      salt
    });
    responsor.sendData(res, newUser);
  } catch (error) {
    responsor.sendError(res, error.message, 400);
  }
};

export const signIn = async (req, res) => {
  // passport login
  passport.authenticate('local', { session: false }, (err, loginUser) => {
    // login complete
    if (err) {
      responsor.sendError(res, err.message, 500);
      return;
    }

    // loginUser을 jwt.sign에 인자로 넣어주면
    // "Expected \"payload\" to be a plain object." 란 오류가 발생하므로
    // plain object로 만들어준다.
    const userData = {
      email: loginUser.email
    };

    // token 발급
    const token = jwt.sign(userData, process.env.JWT_SECRET);
    responsor.sendData(res, { userData, token });
  })(req, res);
};
