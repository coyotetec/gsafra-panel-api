import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { parseZodErrors } from '../../utils/parseZodErrors';
import { APPError } from '../errors/APPError';
import { AuthError } from '../errors/AuthError';

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error instanceof ZodError) {
    return res.status(400).json({ error: parseZodErrors(error) });
  }

  if (error instanceof APPError) {
    return res.status(400).json({ error: error.message });
  }

  if (error instanceof AuthError) {
    return res.status(401).json({ error: error.message });
  }

  console.log(error);

  res.sendStatus(500);
}
