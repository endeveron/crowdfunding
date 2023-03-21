import { validationResult } from 'express-validator';

import { HttpError } from './error.js';

import { logger } from './logger.js';

const createErrMessage = (errData) => {
  const errArr = [];
  errData.errors.forEach((err) => errArr.push(` ${err.msg} '${err.param}'`));
  const errStr = errArr?.length ? errArr.join('.') + '.' : '';

  return `Check your data.${errStr}`;
};

const handleErrorMessage = (message, next) => {
  logger.r('isReqValid', message);
  // send error to the errorController
  next(new HttpError(message, 400));
};

const isReqValid = (req, next) => {
  const errData = validationResult(req);
  if (!errData.isEmpty()) {
    const errMessage = createErrMessage(errData);
    handleErrorMessage(errMessage, next);
    return false;
  }
  return true;
};

export { isReqValid };
