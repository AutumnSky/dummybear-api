import passport from 'passport';
import { LocalStrategy } from 'passport-local';
import crypto from 'crypto';

crypto.randomBytes(64, (err, buf) => {
  const salt = buf.toString('base64');
  crypto.pbkdf2('비밀번호', salt, 100000, 64, 'sha512', (err, key) => {
    console.log('salt', salt);
    console.log(key.toString('base64')); // 'dWhPkH6c4X1Y71A/DrAHhML3DyKQdEkUOIaSmYCI7xZkD5bLZhPF0dOSs2YZA/Y4B8XNfWd3DHIqR5234RtHzw=='
  });
});

// passport.use(
//   new LocalStrategy(
//     {
//       usernameField: 'email',
//       passwordField: 'password'
//     },
//     function(email, password, cb) {
//       return UserModel.findOne({ email, password })
//         .then((user) => {
//           if (!user) {
//             return cb(null, false, { message: 'Incorrect email or password.' });
//           }
//           return cb(null, user, { message: 'Logged In Successfully' });
//         })
//         .catch((err) => cb(err));
//     }
//   )
// );
