import { APPError } from '../../errors/APPError';
import NotificationRepository from '../../repositories/panelDB/NotificationRepository';
import NotificationCompanyRepository from '../../repositories/panelDB/NotificationCompanyRepository';

interface INotificationData {
  title: string;
  body: string;
  companiesId: string[];
  notificationId: string;
}

export async function updateNotification({
  body,
  companiesId,
  notificationId,
  title,
}: INotificationData) {
  const notification = await NotificationRepository.findById(notificationId);

  if (!notification) throw new APPError('Notification does not exists');

  if (companiesId.length === 0) {
    const notificationUpdated = await NotificationRepository.update(
      notificationId,
      {
        body,
        title,
        allCompanies: true,
      },
    );

    return notificationUpdated;
  }
  const currentCompaniesId =
    await NotificationRepository.findCompaniesByNotificationId(notificationId);

  const companiesToAdd = companiesId.filter(
    (companyId) => !currentCompaniesId.includes(companyId),
  );

  const companiesToRemove = currentCompaniesId.filter(
    (companyId) => !companiesId.includes(companyId),
  );

  await NotificationCompanyRepository.removeNotificationCompany(
    companiesToRemove,
  );

  await NotificationCompanyRepository.addNotificationCompany({
    notificationId,
    companiesToAdd,
  });

  const notificationUpdated = await NotificationRepository.update(
    notificationId,
    {
      allCompanies: false,
      body,
      title,
    },
  );

  return notificationUpdated;
}
