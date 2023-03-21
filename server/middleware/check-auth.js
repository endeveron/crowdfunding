import jwt from 'jsonwebtoken';
import { HttpError } from '../utils/error.js';

import { logger } from '../utils/logger.js';

const checkAuth = (req, res, next) => {
  if (req.method === 'OPTIONS') return next();

  try {
    const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer '
    if (!token) {
      return next(new HttpError('Authentication failed', 401));
    }

    // verify token
    const tkn = jwt.verify(token, process.env.JWT_KEY);

    // add user data to request
    req.userId = tkn.userId;
    next();
  } catch (err) {
    logger.r('checkAuth', err);
    return next(new HttpError('Authentication failed', 401));
  }
};

export { checkAuth };
