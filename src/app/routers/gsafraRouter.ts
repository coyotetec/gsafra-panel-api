import { Router } from 'express';
import UserController from '../controllers/gsafra/UserController';
import { authentication } from '../middlewares/authentication';

export const gsafraRouter = Router();

gsafraRouter.get('/companies/:id/users', authentication, UserController.index);
