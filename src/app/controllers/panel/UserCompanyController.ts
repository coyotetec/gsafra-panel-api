import { Request, Response } from 'express';
import { AuthError } from '../../errors/AuthError';
import { listUserCompanies } from '../../useCases/panel/userCompany/listUserCompanies';
import { findUserCompanies } from '../../useCases/panel/userCompany/findUserCompanies';

class UserCompanyController {
  async index(req: Request, res: Response) {
    const companies = await listUserCompanies(req.user.id);

    res.json(companies);
  }

  async listCompaniesByUserId(req: Request, res: Response) {
    if (!['ADMIN', 'MANAGER'].includes(req.user.role)) {
      throw new AuthError('Você não permissão para realizar essa listagem');
    }
    const { id } = req.params;
    const user = await findUserCompanies(id);

    return res.json(user);
  }
}

export default new UserCompanyController();
