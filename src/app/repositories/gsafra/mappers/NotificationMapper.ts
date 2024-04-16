import { capitalizeWords } from '../../../../utils/capitalizeWords';
import { formatWhatsappNumber } from '../../../../utils/formatWhatsappNumber';

interface IFindContactsPersistence {
  LOGIN: string;
  WHATSAPP_NOTIFICACAO: string;
}

export function findContactsMapper(persistence: IFindContactsPersistence) {
  return {
    name: capitalizeWords(persistence.LOGIN),
    whatsappNumber: formatWhatsappNumber(persistence.WHATSAPP_NOTIFICACAO),
  };
}
