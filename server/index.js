import express from 'express';
import cors from 'cors';

import { authRoutes } from './routes/auth.js';

import {
  corsOptions,
  errorController,
  notFoundController,
} from './controllers/index.js';

import { mongo } from './db/mongo.js';

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

// routes
app.use('/api/auth', authRoutes);

// 404
app.use(notFoundController);

// handle errors
app.use(errorController);

// connect to db
mongo.connect().then(() => app.listen(process.env.PORT));
