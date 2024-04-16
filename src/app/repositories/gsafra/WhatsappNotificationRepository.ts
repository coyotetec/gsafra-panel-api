import { queryFirebird } from '../../database/firebird';
import { findContactsMapper } from './mappers/NotificationMapper';

type notificationType = 'contas_pagar' | 'contas_receber';

class WhatsappNotificationRepository {
  findContacts(externalId: string, notification: notificationType) {
    return queryFirebird(
      externalId,
      `SELECT u.LOGIN, u.WHATSAPP_NOTIFICACAO
      FROM USUARIO_NOTIFICACAO_ZAP unz
      INNER JOIN USUARIO u ON u.ID = unz.ID_USUARIO
      INNER JOIN NOTIFICACAO_ZAP nz ON nz.ID = unz.ID_NOTIFICACAO_ZAP
      WHERE nz.CODIGO = '${notification}'
      AND u.STATUS = 1
      AND nz.SITUACAO = 1`,
      findContactsMapper,
    );
  }
}

export default new WhatsappNotificationRepository();
