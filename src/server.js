import '@babel/polyfill';
import express from 'express';
import morgan from 'morgan';
import config from "config";
import logger from './Utils/logger';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import validation from 'express-validation';
import routes from './Routes';
import 'Utils/passport';

const PORT = config.get("PORT") || 5000;

const app = express();

// db
const db = mongoose.connection;
db.on('error', (error) => {
  logger.info(`❌  ${error}`);
});
db.once('open', () => {
  logger.info('✅  db connected');
});

mongoose.connect(config.get("DB.url"), { useNewUrlParser: true, useCreateIndex: true });

// routes
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
routes(app);
app.use("/", (req, res)=>{
  res.send(`hello for ${process.env.NODE_ENV}`);
})

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
