import { Router } from 'express';
import UserController from '../controllers/gsafra/UserController';
import { authMiddleware } from '../middlewares/authMiddleware';
import PapelController from '../controllers/gsafra/PapelController';

export const gsafraRouter = Router();

gsafraRouter.get('/companies/:id/users', authMiddleware, UserController.index);
gsafraRouter.post('/user', UserController.create);
gsafraRouter.get('/papel', PapelController.index);
