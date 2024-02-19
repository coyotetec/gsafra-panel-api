import { Request, Response } from 'express';
import { companySchema } from '../schemas/companySchema';
import { createCompany } from '../useCases/company/createCompany';
import { findCompanies } from '../useCases/company/findCompanies';
import { findCompanyById } from '../useCases/company/findCompanyById';
import { updateCompany } from '../useCases/company/updateCompany';
import { deleteCompany } from '../useCases/company/deleteCompany';
import { restoreCompany } from '../useCases/company/restoreCompany';
import { AuthError } from '../errors/AuthError';

class CompanyController {
  async create(req: Request, res: Response) {
    if (req.user.role !== 'MANAGER') {
      throw new AuthError('your can not do this operation');
    }

    const data = companySchema.parse(req.body);
    const company = await createCompany(data);

    return res.status(201).json(company);
  }

  async getAll(req: Request, res: Response) {
    if (req.user.role !== 'MANAGER') {
      throw new AuthError('your can not do this operation');
    }

    const companies = await findCompanies();
    return res.status(200).json(companies);
  }

  async getById(req: Request, res: Response) {
    if (req.user.role !== 'MANAGER') {
      throw new AuthError('your can not do this operation');
    }

    const { id } = req.params;
    const company = await findCompanyById(id);
    return res.status(200).json(company);
  }

  async update(req: Request, res: Response) {
    if (req.user.role !== 'MANAGER') {
      throw new AuthError('your can not do this operation');
    }

    const { id } = req.params;
    const data = companySchema.parse(req.body);
    const updatedCompany = await updateCompany(data, id);
    return res.status(200).json(updatedCompany);
  }

  async delete(req: Request, res: Response) {
    if (req.user.role !== 'MANAGER') {
      throw new AuthError('your can not do this operation');
    }

    const { id } = req.params;
    const deletedCompany = await deleteCompany(id);
    return res.status(200).json(deletedCompany);
  }

  async restore(req: Request, res: Response) {
    if (req.user.role !== 'MANAGER') {
      throw new AuthError('your can not do this operation');
    }

    const { id } = req.params;
    const restoredCompany = await restoreCompany(id);
    return res.status(200).json(restoredCompany);
  }
}

export default new CompanyController();
