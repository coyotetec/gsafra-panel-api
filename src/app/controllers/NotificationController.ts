import { Request, Response } from 'express';
import { findNotifications } from '../useCases/notification/findNotifications';
import { notificationSchema } from '../schemas/notificationSchema';
import { createNotification } from '../useCases/notification/createNotification';
import { AuthError } from '../errors/AuthError';
import { updateNotification } from '../useCases/notification/updateNotification';
import { deleteNotification } from '../useCases/notification/deleteNotification';

class NotificationController {
  async index(req: Request, res: Response) {
    if (!req.user) {
      return res.sendStatus(404);
    }

    const notifications = await findNotifications(req.user);

    return res.status(200).json(notifications);
  }

  async store(req: Request, res: Response) {
    if (req.user.role !== 'MANAGER') {
      throw new AuthError('Você não tem permissão para criar uma notificação');
    }
    const data = notificationSchema.parse(req.body);
    const notification = await createNotification(data);

    return res.status(201).json(notification);
  }

  async update(req: Request, res: Response) {
    if (req.user.role !== 'MANAGER') {
      throw new AuthError(
        'Você não tem permissão para atualizar uma notificação',
      );
    }
    const { id } = req.params;
    const data = notificationSchema.parse(req.body);

    const notificationUpdated = await updateNotification({
      notificationId: id,
      ...data,
    });

    return res.status(200).json(notificationUpdated);
  }

  async delete(req: Request, res: Response) {
    if (req.user.role !== 'MANAGER') {
      throw new AuthError(
        'Você não tem permissão para deletar uma notificação',
      );
    }
    const { id } = req.params;
    await deleteNotification(id);

    return res.status(200).json({ message: 'Notificação deletada' });
  }
}

export default new NotificationController();
