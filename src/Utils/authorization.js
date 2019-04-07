import passport from 'passport';
import * as responsor from 'Utils/responsor';

export const requireLogin = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) {
      return responsor.sendError(res, 'Unauthorized', 401);
    }

    req.user = user;
    return next();
  })(req, res, next); // passport.authenticate는 함수를 반환한다는 것에 주의할 것
};
