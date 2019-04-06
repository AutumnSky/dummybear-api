require('dotenv').config();
import express from 'express';
import morgan from 'morgan';
import logger from './Utils/logger';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import validation from 'express-validation';
import routes from './Routes';
import './Utils/passport';

const PORT = process.env.PORT || 5000;

const app = express();

// db
const db = mongoose.connection;
db.on('error', (error) => {
  logger.info(`❌  ${error}`);
});
db.once('open', () => {
  logger.info('✅  db connected');
});

mongoose.connect(process.env.DB, { useNewUrlParser: true, useCreateIndex: true });

// routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
routes(app);

// ref: https://www.npmjs.com/package/express-validation
app.use(function(err, req, res, next) {
  // specific for validation errors
  if (err instanceof validation.ValidationError) return res.status(err.status).json(err);

  // other type of errors, it *might* also be a Runtime Error
  // example handling
  if (process.env.NODE_ENV !== 'production') {
    return res.status(500).send(err.stack);
  } else {
    return res.status(500);
  }
});

app.listen(PORT, () => logger.info(`✅  server running on http://localhost:${PORT}`));
