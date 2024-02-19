import NotificationRepository from '../../repositories/panelDB/NotificationRepository';

interface IUser {
  id: string;
  role: 'ADMIN' | 'USER' | 'MANAGER';
}

export async function findNotifications({ id, role }: IUser) {
  if (role === 'MANAGER') {
    return NotificationRepository.findAll();
  }

  const notifications = await NotificationRepository.findByUserId(id);

  const mappedNotifications = notifications.map(({ notification }) => ({
    ...notification,
  }));

  return mappedNotifications;
}
