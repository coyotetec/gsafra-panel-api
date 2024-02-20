import { APPError } from '../../errors/APPError';
import NotificationRepository from '../../repositories/panelDB/NotificationRepository';

export async function deleteNotification(id: string) {
  const notification = await NotificationRepository.findById(id);

  if (!notification) throw new APPError('Notification does not exists');

  return await NotificationRepository.delete(id);
}
