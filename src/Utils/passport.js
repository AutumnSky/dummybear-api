import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import User from 'Models/user.model';

// local strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async function(email, password, cb) {
      try {
        const user = await User.findOne({ email }).orFail();
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

// jwt streategy
// ref: https://medium.com/front-end-weekly/learn-using-jwt-with-passport-authentication-9761539c4314
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    },
    async function(jwtPayload, cb) {
      const email = jwtPayload.email;
      try {
        const user = await User.findOne({ email }).orFail();
        cb(null, user);
      } catch (error) {
        cb(error);
      }
    }
  )
);

// token inside of body
passport.use(
  'jwt-body',
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromBodyField('token'),
      secretOrKey: process.env.JWT_SECRET
    },
    async function(jwtPayload, cb) {
      const email = jwtPayload.email;
      try {
        const user = await User.findOne({ email }).orFail();
        cb(null, user);
      } catch (error) {
        cb(error);
      }
    }
  )
);
