import { Request, Response } from 'express';
import { listPapel } from '../../useCases/gsafra/papel/listPapel';
import { APPError } from '../../errors/APPError';

class PapelController {
  async index(req: Request, res: Response) {
    const { companyId } = req.query;
    if (!companyId) {
      throw new APPError('CompanyId é obrigatório');
    }
    const papel = await listPapel({ companyId: String(companyId) });
    return res.json(papel);
  }
}

export default new PapelController();
