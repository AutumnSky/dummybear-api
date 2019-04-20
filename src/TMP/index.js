import authRouter from './auth.route';
import testRouter from './test.route';

export default (app) => {
  app.use('/api/auth', authRouter);
  app.use('/api/test', testRouter);
};
