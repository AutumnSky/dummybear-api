import User from 'Models/user.model';
import logger from 'Utils/logger.js';

export const signUpLocal = async (req, res) => {
  logger.debug('signup local');
  const newUser = await User.create({
    email: 'test@gmail.com',
    password: 'password',
    salt: 'salt'
  });
  res.json(newUser);
};

export const signIn = async (req, res) => {
  try {
    const user = await User.findOne({ email: 'test@gmail.com' });
    logger.debug('user', user.email);
  } catch (error) {
    logger.debug('error', error);
  }
};
