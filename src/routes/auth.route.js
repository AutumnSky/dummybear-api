import express from 'express';

const router = express.Router();

// https://medium.com/front-end-weekly/learn-using-jwt-with-passport-authentication-9761539c4314
router.get('/signin', (req, res) => {
  console.log('signin');
  res.json('hug?');
});

export default router;
