import { Request, Response } from 'express';
import { companySchema } from '../schemas/companySchema';
import { createCompany } from '../useCases/company/createCompany';
import { findCompanies } from '../useCases/company/findCompanies';
import { findCompanyById } from '../useCases/company/findCompanyById';
import { updateCompany } from '../useCases/company/updateCompany';
import { AuthError } from '../errors/AuthError';
import { activateCompany } from '../useCases/company/activateCompany';
import { inactivateCompany } from '../useCases/company/inactivateCompany';

class CompanyController {
  async create(req: Request, res: Response) {
    if (req.user.role !== 'MANAGER') {
      throw new AuthError('Você não tem permissão para criar uma empresa');
    }

    const data = companySchema.parse(req.body);
    const company = await createCompany(data);

    return res.status(201).json(company);
  }

  async getAll(req: Request, res: Response) {
    if (req.user.role !== 'MANAGER') {
      throw new AuthError('Você não tem permissão para buscar as empresas');
    }

    const companies = await findCompanies();
    return res.status(200).json(companies);
  }

  async getById(req: Request, res: Response) {
    if (req.user.role !== 'MANAGER') {
      throw new AuthError('Você não tem permissão para buscar uma empresa');
    }

    const { id } = req.params;
    const company = await findCompanyById(id);
    return res.status(200).json(company);
  }

  async update(req: Request, res: Response) {
    if (req.user.role !== 'MANAGER') {
      throw new AuthError('Você não tem permissão para atualizar uma empresa');
    }

    const { id } = req.params;
    const data = companySchema.parse(req.body);
    const updatedCompany = await updateCompany(data, id);
    return res.status(200).json(updatedCompany);
  }

  async destroy(req: Request, res: Response) {
    if (req.user.role !== 'MANAGER') {
      throw new AuthError('Você não tem permissão para inativar uma empresa');
    }

    const { id } = req.params;

    await inactivateCompany(id);

    return res.json({ message: 'Empresa inativada' });
  }

  async activate(req: Request, res: Response) {
    if (req.user.role !== 'MANAGER') {
      throw new AuthError('Você não tem permissão para ativar uma empresa');
    }

    const { id } = req.params;

    await activateCompany(id);

    return res.json({ message: 'Empresa ativada' });
  }
}

export default new CompanyController();
