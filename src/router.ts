import { Router } from 'express';
import CompanyController from './app/controllers/CompanyController';

export const router = Router();

router.get('/company', CompanyController.getAll);
router.get('/company/:id', CompanyController.getById);
router.post('/company', CompanyController.create);
router.put('/company/:id', CompanyController.update);
router.delete('/company/:id', CompanyController.delete);
router.patch('/company/restore/:id', CompanyController.restore);
