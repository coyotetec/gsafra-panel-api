import { Router } from 'express';
import UserController from '../controllers/gsafra/UserController';
import { authMiddleware } from '../middlewares/authMiddleware';

export const gsafraRouter = Router();

gsafraRouter.get('/companies/:id/users', authMiddleware, UserController.index);
