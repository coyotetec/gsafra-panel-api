import { Router } from 'express';

import CompanyController from '../controllers/panel/CompanyController';
import UserController from '../controllers/panel/UserController';
import AuthController from '../controllers/panel/AuthController';
import NotificationController from '../controllers/panel/NotificationController';

import { authMiddleware } from '../middlewares/authMiddleware';
import UserCompanyController from '../controllers/panel/UserCompanyController';
import { sendWhatsappMessage } from '../../utils/sendWhatsappMessage';

export const panelRouter = Router();

panelRouter.get('/test', (req, res) => res.json({ message: 'Hello World' }));
panelRouter.get('/test-whatsapp', (req, res) => {
  sendWhatsappMessage('559180589159', 'Mensagem de teste');
  res.json({ message: 'Hello World' });
});

panelRouter.get('/companies', authMiddleware, CompanyController.getAll);
panelRouter.get('/companies/:id', authMiddleware, CompanyController.getById);
panelRouter.post('/companies', authMiddleware, CompanyController.create);
panelRouter.put('/companies/:id', authMiddleware, CompanyController.update);
panelRouter.delete('/companies/:id', authMiddleware, CompanyController.destroy);
panelRouter.patch(
  '/companies/:id/activate',
  authMiddleware,
  CompanyController.activate,
);

panelRouter.get('/users', authMiddleware, UserController.index);
panelRouter.post('/users', authMiddleware, UserController.store);
panelRouter.put('/users/:id', authMiddleware, UserController.update);
panelRouter.delete('/users/:id', authMiddleware, UserController.destroy);
panelRouter.patch(
  '/users/:id/activate',
  authMiddleware,
  UserController.activate,
);

panelRouter.get(
  '/users/companies',
  authMiddleware,
  UserCompanyController.index,
);

panelRouter.get(
  '/users/:id/companies',
  authMiddleware,
  UserCompanyController.listCompaniesByUserId,
);

panelRouter.get('/notifications', authMiddleware, NotificationController.index);
panelRouter.post(
  '/notifications',
  authMiddleware,
  NotificationController.store,
);
panelRouter.put(
  '/notifications/:id',
  authMiddleware,
  NotificationController.update,
);
panelRouter.delete(
  '/notifications/:id',
  authMiddleware,
  NotificationController.delete,
);

panelRouter.post('/auth/login', AuthController.login);
panelRouter.post('/auth/password', AuthController.resetPassword);
panelRouter.post('/auth/request-reset', AuthController.requestReset);
