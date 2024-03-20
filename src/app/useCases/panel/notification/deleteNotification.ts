import { APPError } from '../../../errors/APPError';
import NotificationRepository from '../../../repositories/panel/NotificationRepository';

export async function deleteNotification(id: string) {
  const notification = await NotificationRepository.findById(id);

  if (!notification) throw new APPError('Notificação não encontrada');

  return await NotificationRepository.delete(id);
}
