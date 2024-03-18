import { Request, Response } from 'express';
import { AuthError } from '../errors/AuthError';
import { userStorePasswordSchema, userSchema } from '../schemas/userSchemas';
import { createUser } from '../useCases/user/createUser';
import { createUserPassword } from '../useCases/user/createUserPassword';
import { inactivateUser } from '../useCases/user/inactivateUser';
import { activateUser } from '../useCases/user/activateUser';
import { updateUser } from '../useCases/user/updateUser';
import { listUsers } from '../useCases/user/listUsers';

class UserController {
  async index(req: Request, res: Response) {
    if (!['ADMIN', 'MANAGER'].includes(req.user.role)) {
      throw new AuthError('Você não tem permissão para listar os usuários');
    }

    const users = await listUsers({
      requesterId: req.user.id,
      requesterRole: req.user.role,
    });

    return res.json(users);
  }

  async store(req: Request, res: Response) {
    if (!['ADMIN', 'MANAGER'].includes(req.user.role)) {
      throw new AuthError('Você não tem permissão para criar um usuário');
    }

    const data = userSchema.parse(req.body);

    if (data.role === 'MANAGER' && req.user.role !== 'MANAGER') {
      throw new AuthError(
        'Você não tem permissão para criar um usuário com este papel',
      );
    }

    const user = await createUser({
      payload: data,
      requesterId: req.user.id,
      requesterRole: req.user.role,
    });

    return res.status(201).json(user);
  }

  async storePassword(req: Request, res: Response) {
    const id = req.params.id;
    const password = userStorePasswordSchema.parse(req.body.password);

    await createUserPassword(id, password);

    return res.status(201).json({ message: 'Senha criada' });
  }

  async update(req: Request, res: Response) {
    if (!['ADMIN', 'MANAGER'].includes(req.user.role)) {
      throw new AuthError('Você não tem permissão para atualizar um usuários');
    }

    const id = req.params.id;
    const data = userSchema.parse(req.body);

    const user = await updateUser({
      payload: data,
      userId: id,
      requesterId: req.user.id,
      requesterRole: req.user.role,
    });

    return res.json(user);
  }

  async destroy(req: Request, res: Response) {
    if (!['ADMIN', 'MANAGER'].includes(req.user.role)) {
      throw new AuthError('Você não tem permissão para inativar um usuário');
    }

    const id = req.params.id;

    await inactivateUser({
      userId: id,
      requesterId: req.user.id,
      requesterRole: req.user.role,
    });

    return res.json({ message: 'Usuário inativado' });
  }

  async activate(req: Request, res: Response) {
    if (!['ADMIN', 'MANAGER'].includes(req.user.role)) {
      throw new AuthError('Você não tem permissão para ativar um usuário');
    }

    const id = req.params.id;

    await activateUser({
      userId: id,
      requesterId: req.user.id,
      requesterRole: req.user.role,
    });

    return res.json({ message: 'Usuário ativado' });
  }
}

export default new UserController();
