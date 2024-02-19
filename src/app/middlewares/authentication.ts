import { NextFunction, Request, Response } from 'express';
import { AuthError } from '../errors/AuthError';
import jwt from 'jsonwebtoken';
import { userRoleType } from '../../types/user';

export function authentication(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new AuthError('no authorization header found');
  }

  const token = authorization.split(' ')[1];

  if (!token) {
    throw new AuthError('invalid authentication token');
  }

  try {
    const jwtSecret = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, jwtSecret) as {
      id: string;
      role: userRoleType;
    };

    req.user = decoded;

    next();
  } catch {
    throw new AuthError('invalid authentication token');
  }
}
