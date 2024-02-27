import NotificationRepository from '../../repositories/panelDB/NotificationRepository';

interface INotificationData {
  title: string;
  body: string;
  companiesId: string[];
}

export async function createNotification({
  body,
  companiesId,
  title,
}: INotificationData) {
  if (companiesId.length === 0) {
    const notification = await NotificationRepository.create({
      body,
      title,
      allCompanies: true,
    });

    return notification;
  }

  const notification = await NotificationRepository.createEspecificNotification(
    { body, title, allCompanies: false },
    companiesId,
  );

  return notification;
}
