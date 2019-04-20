import User from 'Models/user.model';
import * as responsor from 'Utils/responsor';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import config from "config";

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
    if (err || !loginUser) {
      responsor.sendError(res, err.message, 401);
      return;
    }

    // loginUser을 jwt.sign에 인자로 넣어주면
    // "Expected \"payload\" to be a plain object." 란 오류가 발생하므로
    // plain object로 만들어준다.
    loginUser = {
      email: loginUser.email
    };

    // new token
    const token = jwt.sign(loginUser, config.get("JWT_SECRET"));

    // response
    responsor.sendData(res, { loginUser, token });
  })(req, res);
};

export const autoSignIn = async (req, res) => {
  const { token } = req.body;

  passport.authenticate('jwt-body', { session: false }, (err, loginUser) => {
    if (err || !loginUser) {
      return responsor.sendError(res, 'Unauthorized', 401);
    }

    // ISSUE: 이상하게 콜백에서 받은 loginUser를 바로 jwt.sign에 사용하면 본 콜백이 한번 더 호출된다.
    // 그래서 새로운 plain 객체를 새로 할당해준다.
    loginUser = {
      email: loginUser.email
    };

    // refresh token
    const token = jwt.sign(loginUser, config.get("JWT_SECRET"));

    // response
    responsor.sendData(res, { loginUser, token });
  })(req, res); // passport.authenticate는 함수를 반환한다는 것에 주의할 것
};
