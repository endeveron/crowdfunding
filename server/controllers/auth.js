import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { getItem } from '../utils/getFromDb.js';
import { HttpError } from '../utils/error.js';
import { UserModel } from '../models/user.js';
import { isReqValid } from '../utils/validateRequest.js';

import { logger } from '../utils/logger.js';

const genetrateJWToken = (userId, next) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_KEY, {
      expiresIn: '48h',
    });
    return token;
  } catch (err) {
    logger.r('genetrateJWToken', err);
    return next(new HttpError(`Token generating error. ${err._message}`, 500));
  }
};

export const login = async (req, res, next) => {
  if (!isReqValid(req, next)) return;
  const { email, password } = req.body;

  const userData = await getItem(
    UserModel,
    { 'account.email': email },
    "There's no account for this email."
  );
  if (userData?.error) return next(userData.error);
  const user = userData.data;

  // check password
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, user.account.password);
  } catch (err) {
    logger.r('login: password unhashing', err);
    return next(new HttpError('Password unhashing error.', 500));
  }
  if (!isValidPassword) {
    return next(new HttpError('Incorrect password', 401));
  }

  try {
    await user.save();

    // generate JWT
    const token = genetrateJWToken(user._id, next);

    res.send({
      data: {
        token,
        user,
      },
    });
  } catch (err) {
    logger.r('login', err);
    return next(new HttpError(error.message, 500));
  }
};

export const signup = async (req, res, next) => {
  if (!isReqValid(req, next)) return;
  const { email, name, password } = req.body;

  // check if user already created
  try {
    const emailInUse = await UserModel.exists({ 'account.email': email });
    if (emailInUse) {
      return next(new HttpError('Email already in use.', 409));
    }
  } catch (err) {
    logger.r('signup: check is user exists', err);
    return next(new HttpError('User check error.', 500));
  }

  // hash password
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    logger.r('signup: password hashing', err);
    return next(new HttpError('Password hashing error.', 500));
  }

  // create a new user
  const user = new UserModel({
    account: {
      email,
      name,
      password: hashedPassword,
    },
  });

  try {
    const userId = user._id.toString();

    // generate JWT
    const token = genetrateJWToken(userId, next);

    await user.save();

    res.status(201).send({
      data: {
        token,
        user,
      },
    });
  } catch (err) {
    logger.r('signup', err);
    return next(new HttpError(`Could not create user. ${err.message}`, 500));
  }
};
