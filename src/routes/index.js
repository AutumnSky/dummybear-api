import authRouter from './auth.route';

export default (app) => {
  app.use('/api/auth', authRouter);
};
