import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { parseZodErrors } from '../../utils/parseZodErrors';
import { APPError } from '../errors/APPError';

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

  console.log(error);

  res.sendStatus(500);
}
