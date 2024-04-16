import { Router } from 'express';

import CompanyController from '../controllers/panel/CompanyController';
import UserController from '../controllers/panel/UserController';
import AuthController from '../controllers/panel/AuthController';
import NotificationController from '../controllers/panel/NotificationController';

import { authentication } from '../middlewares/authentication';
import UserCompanyController from '../controllers/panel/UserCompanyController';
import { sendWhatsappMessage } from '../../utils/sendWhatsappMessage';

export const panelRouter = Router();

panelRouter.get('/test', (req, res) => res.json({ message: 'Hello World' }));
panelRouter.get('/test-whatsapp', (req, res) => {
  sendWhatsappMessage('5591980589159', 'Mensagem de teste');
  res.json({ message: 'Hello World' });
});

panelRouter.get('/companies', authentication, CompanyController.getAll);
panelRouter.get('/companies/:id', authentication, CompanyController.getById);
panelRouter.post('/companies', authentication, CompanyController.create);
panelRouter.put('/companies/:id', authentication, CompanyController.update);
panelRouter.delete('/companies/:id', authentication, CompanyController.destroy);
panelRouter.patch(
  '/companies/:id/activate',
  authentication,
  CompanyController.activate,
);

panelRouter.get('/users', authentication, UserController.index);
panelRouter.post('/users', authentication, UserController.store);
panelRouter.put('/users/:id', authentication, UserController.update);
panelRouter.delete('/users/:id', authentication, UserController.destroy);
panelRouter.patch(
  '/users/:id/activate',
  authentication,
  UserController.activate,
);

panelRouter.get(
  '/users/companies',
  authentication,
  UserCompanyController.index,
);

panelRouter.get(
  '/users/:id/companies',
  authentication,
  UserCompanyController.listCompaniesByUserId,
);

panelRouter.get('/notifications', authentication, NotificationController.index);
panelRouter.post(
  '/notifications',
  authentication,
  NotificationController.store,
);
panelRouter.put(
  '/notifications/:id',
  authentication,
  NotificationController.update,
);
panelRouter.delete(
  '/notifications/:id',
  authentication,
  NotificationController.delete,
);

panelRouter.post('/auth/login', AuthController.login);
panelRouter.post('/auth/password', AuthController.resetPassword);
panelRouter.post('/auth/request-reset', AuthController.requestReset);
