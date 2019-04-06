import User from 'Models/user.model';
import * as responsor from 'Utils/responsor';
import passport from 'passport';

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

    loginUser.password = undefined;
    loginUser.salt = undefined;

    // TODO: token 발급
    responsor.sendData(res, { loginUser });
  })(req, res);
};
