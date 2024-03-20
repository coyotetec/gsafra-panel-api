import { prisma } from '../../../libs/prisma';

interface IAddNotificationCompanyArgs {
  notificationId: string;
  companiesToAdd: string[];
}

class NotificationCompanyRepository {
  addNotificationCompany({
    companiesToAdd,
    notificationId,
  }: IAddNotificationCompanyArgs) {
    return Promise.all(
      companiesToAdd.map((companyId) =>
        prisma.notificationCompany.create({
          data: {
            companyId,
            notificationId,
          },
        }),
      ),
    );
  }

  removeNotificationCompany(companiesId: string[]) {
    return prisma.notificationCompany.deleteMany({
      where: {
        companyId: {
          in: companiesId,
        },
      },
    });
  }
}

export default new NotificationCompanyRepository();
