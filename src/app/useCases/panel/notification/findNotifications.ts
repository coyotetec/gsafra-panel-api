import NotificationRepository from '../../../repositories/panel/NotificationRepository';

interface IUser {
  id: string;
  role: 'ADMIN' | 'USER' | 'MANAGER';
}

export async function findNotifications({ id, role }: IUser) {
  if (role === 'MANAGER') {
    return (await NotificationRepository.findAll()).map((notification) => ({
      id: notification.id,
      title: notification.title,
      body: notification.body,
      allCompanies: notification.allCompanies,
      createdAt: notification.createdAt,
      recipients: notification.notificationCompany.map(
        (notificationCompany) => notificationCompany.company,
      ),
    }));
  }

  const notifications = await NotificationRepository.findByUserId(id);

  return notifications;
}
