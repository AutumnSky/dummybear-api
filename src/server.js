require('dotenv').config();
import express from 'express';
import morgan from 'morgan';
import routes from './routes';

const PORT = process.env.PORT || 5000;

const app = express();

// routes
app.use(morgan('dev'));
routes(app);

app.listen(PORT, () => console.log(`server running on http://localhost:${PORT}`));
