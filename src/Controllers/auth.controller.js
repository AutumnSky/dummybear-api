import User from 'Models/user.model';
import * as responsor from 'Utils/responsor';

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

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isValid = await user.checkPassword(password);
    if (isValid) {
      responsor.sendData(res, true);
    } else {
      responsor.sendError(res, 'invalid password', 401);
    }
  } catch (error) {
    responsor.sendError(res, error.message, 400);
  }
};
