import { Request, Response } from 'express';
import { findNotifications } from '../../useCases/panel/notification/findNotifications';
import { createNotification } from '../../useCases/panel/notification/createNotification';
import { updateNotification } from '../../useCases/panel/notification/updateNotification';
import { deleteNotification } from '../../useCases/panel/notification/deleteNotification';
import { notificationSchema } from '../../schemas/notificationSchema';
import { AuthError } from '../../errors/AuthError';

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
