import { Router } from 'express';

import CompanyController from './app/controllers/CompanyController';
import UserController from './app/controllers/UserController';
import AuthController from './app/controllers/AuthController';
import NotificationController from './app/controllers/NotificationController';

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

router.get('/companies/:companyId/users', authentication, UserController.index);
router.post(
  '/companies/:companyId/users',
  authentication,
  UserController.store,
);
router.post(
  '/companies/:companyId/users/:id/password',
  UserController.storePassword,
);
router.put(
  '/companies/:companyId/users/:id',
  authentication,
  UserController.update,
);
router.delete(
  '/companies/:companyId/users/:id',
  authentication,
  UserController.destroy,
);
router.patch(
  '/companies/:companyId/users/:id/activate',
  authentication,
  UserController.activate,
);

router.get('/notifications', authentication, NotificationController.index);
router.post('/notifications', authentication, NotificationController.store);

router.post('/auth/login', AuthController.login);
