import { Request, Response } from 'express';
import { listUsers } from '../../useCases/gsafra/user/listUsers';
import { AuthError } from '../../errors/AuthError';

class UserController {
  async index(req: Request, res: Response) {
    if (!['ADMIN', 'MANAGER'].includes(req.user.role)) {
      throw new AuthError('Você não tem permissão para listar os usuários');
    }

    const companyId = req.params.id;

    const users = await listUsers({
      companyId,
      requesterId: req.user.id,
      requesterRole: req.user.role,
    });

    return res.json(users);
  }
}

export default new UserController();
