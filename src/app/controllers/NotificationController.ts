import { Request, Response } from 'express';
import { findNotifications } from '../useCases/notification/findNotifications';
import { notificationSchema } from '../schemas/notificationSchema';
import { createNotification } from '../useCases/notification/createNotification';
import { AuthError } from '../errors/AuthError';

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
      throw new AuthError(
        'You do not have permission to create a notification',
      );
    }
    const data = notificationSchema.parse(req.body);
    const notification = await createNotification(data);

    return res.status(201).json(notification);
  }
}

export default new NotificationController();
