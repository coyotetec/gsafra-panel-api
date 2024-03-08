import { Request, Response } from 'express';
import { listUserCompanies } from '../useCases/userCompany/listUserCompanies';

class UserCompanyController {
  async index(req: Request, res: Response) {
    const companies = await listUserCompanies(req.user.id);

    res.json(companies);
  }
}

export default new UserCompanyController();
