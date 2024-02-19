import UserRepository from '../repositories/panelDB/UserRepository';
import { Request, Response } from 'express';
import { userStorePasswordSchema, userSchema } from '../schemas/userSchemas';
import { createUser } from '../useCases/user/createUser';
import { createUserPassword } from '../useCases/user/createUserPassword';
import { inactivateUser } from '../useCases/user/inactivateUser';
import { activateUser } from '../useCases/user/activateUser';
import { updateUser } from '../useCases/user/updateUser';
import { AuthError } from '../errors/AuthError';

class UserController {
  async index(req: Request, res: Response) {
    if (['ADMIN', 'MANAGER'].includes(req.user.role)) {
      throw new AuthError('your can not do this operation');
    }

    const users = await UserRepository.findAll();

    return res.json(users);
  }

  async store(req: Request, res: Response) {
    if (['ADMIN', 'MANAGER'].includes(req.user.role)) {
      throw new AuthError('your can not do this operation');
    }

    const data = userSchema.parse(req.body);

    if (data.role === 'MANAGER' && req.user.role !== 'MANAGER') {
      throw new AuthError('your can not do this operation');
    }

    const user = await createUser(data);

    return res.status(201).json(user);
  }

  async storePassword(req: Request, res: Response) {
    const id = req.params.id;
    const password = userStorePasswordSchema.parse(req.body.password);

    await createUserPassword(id, password);

    return res.status(201).json({ message: 'password created' });
  }

  async update(req: Request, res: Response) {
    if (['ADMIN', 'MANAGER'].includes(req.user.role)) {
      throw new AuthError('your can not do this operation');
    }

    const id = req.params.id;
    const data = userSchema.parse(req.body);

    const user = await updateUser(id, data);

    return res.json(user);
  }

  async destroy(req: Request, res: Response) {
    if (['ADMIN', 'MANAGER'].includes(req.user.role)) {
      throw new AuthError('your can not do this operation');
    }

    const id = req.params.id;

    await inactivateUser(id);

    return res.json({ message: 'user inactivated' });
  }

  async activate(req: Request, res: Response) {
    if (['ADMIN', 'MANAGER'].includes(req.user.role)) {
      throw new AuthError('your can not do this operation');
    }

    const id = req.params.id;

    await activateUser(id);

    return res.json({ message: 'user activated' });
  }
}

export default new UserController();
