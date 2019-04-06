import User from 'Models/user.model';
import logger from 'Utils/logger';
import * as responsor from 'Utils/responsor';

export const signUpLocal = (req, res) => {
  const { email, password } = req.body;
  User.createPassword(
    password,
    async ({ salt, encryptedPassword }) => {
      try {
        const newUser = await User.create({
          email,
          password: encryptedPassword,
          salt
        });
        responsor.sendData(res, newUser);
      } catch (error) {
        responsor.sendError(res, error.message, 400);
      }
    },
    (err) => {
      responsor.sendError(res, error.message, 400);
    }
  );
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    user.checkPassword(
      password,
      () => {
        responsor.sendData(res, true);
      },
      (error) => {
        responsor.sendError(res, 'invalid password', 401);
      }
    );
  } catch (error) {
    responsor.sendError(res, error.message, 400);
  }
};
