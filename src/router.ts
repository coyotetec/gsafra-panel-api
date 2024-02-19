import { Router } from 'express';

import CompanyController from './app/controllers/CompanyController';
import UserController from './app/controllers/UserController';
import AuthController from './app/controllers/AuthController';

import { authentication } from './app/middlewares/authentication';

export const router = Router();

router.get('/test', (req, res) => res.json({ message: 'Hello World' }));

router.get('/companies', authentication, CompanyController.getAll);
router.get('/companies/:id', authentication, CompanyController.getById);
router.post('/companies', authentication, CompanyController.create);
router.put('/companies/:id', authentication, CompanyController.update);
router.delete('/companies/:id', authentication, CompanyController.delete);
router.patch(
  '/companies/restore/:id',
  authentication,
  CompanyController.restore,
);

router.get('/users', authentication, UserController.index);
router.post('/users', authentication, UserController.store);
router.post('/users/:id/password', UserController.storePassword);
router.put('/users/:id', authentication, UserController.update);
router.delete('/users/:id', authentication, UserController.destroy);
router.patch('/users/:id/activate', authentication, UserController.activate);

router.post('/auth/login', AuthController.login);
