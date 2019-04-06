import mongoose from 'mongoose';
import crypto from 'crypto';

const schema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  }
});

// ref: https://www.zerocho.com/category/NodeJS/post/593a487c2ed1da0018cff95d
schema.statics.encryptePassword = function(password) {
  return new Promise((resolver, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      const salt = buf.toString('base64');
      if (err) {
        reject(err);
        return;
      }
      crypto.pbkdf2(password, salt, 395721, 64, 'sha512', (err, key) => {
        if (err) {
          reject(err);
          return;
        }
        const encryptedPassword = key.toString('base64');
        resolver({ encryptedPassword, salt });
      });
    });
  });
};

schema.methods.checkPassword = function(password) {
  return new Promise((resolver, reject) => {
    crypto.pbkdf2(password, this.salt, 395721, 64, 'sha512', (err, key) => {
      if (err) {
        reject(err);
        return;
      }
      const encryptedPassword = key.toString('base64');
      if (encryptedPassword === this.password) {
        resolver(true);
      } else {
        reject(new Error('password not matched'));
        return;
      }
    });
  });
};

const model = mongoose.model('User', schema);
export default model;
