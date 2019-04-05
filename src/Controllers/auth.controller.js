import User from '../Models/user.model';

export const signUpLocal = async (req, res) => {
  console.log('signup local');
  const newUser = await User.create({
    email: 'test@gmail.com',
    password: 'password',
    salt: 'salt'
  });
  res.json(newUser);
};

export const signIn = (req, res) => {
  console.log('signIn', req, res);
};
