import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  email: {
    type: String,
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

schema.method.checkPassword = function(cb) {
  console.log('check password');
};

const model = mongoose.model('User', schema);
export default model;
