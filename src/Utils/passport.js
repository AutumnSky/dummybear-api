import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from 'Models/user.model';

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async function(email, password, cb) {
      try {
        const user = await User.findOne({ email });
        const isValid = await user.checkPassword(password);
        if (isValid) {
          cb(null, user);
        }
      } catch (error) {
        cb(error, null);
      }
    }
  )
);
