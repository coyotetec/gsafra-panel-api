import { format, getDate, subDays } from 'date-fns';
import { formatCurrency } from '../../../../utils/formatCurrency';

interface IPayablesMessageGenerateArgs {
  payables: { value: number; recipientName: string }[];
  checks: { value: number; recipientName: string }[];
  creditCardTotal: number;
}

export function payablesMessageGenerate({
  payables,
  checks,
  creditCardTotal,
}: IPayablesMessageGenerateArgs) {
  const weekday = getDate(new Date());
  const today = format(new Date(), 'dd/MM/yyyy');
  const saturday = format(subDays(new Date(), 2), 'dd/MM/yyyy');

  return `
${
  payables.length > 0
    ? `*📝 CONTAS A PAGAR*
${weekday !== 1 ? `_Contas a pagar com o vencimento na data de hoje: *${today}*_` : `_Contas a pagar com vencimento de sábado à hoje: *${saturday} - ${today}*_`}
${payables
  .map(
    (payment) => `
*${payment.recipientName}*
${formatCurrency(payment.value)}
`,
  )
  .join('')
  .trimEnd()}`
    : ''
}

${
  checks.length > 0
    ? `*🧾 CHEQUES A COMPENSAR*
${weekday !== 1 ? `_Cheques com o vencimento na data de hoje: *${today}*_` : `_Cheques com vencimento de sábado à hoje: *${saturday} - ${today}*_`}
${checks
  .map(
    (check) => `
*${check.recipientName}*
${formatCurrency(check.value)}
`,
  )
  .join('')
  .trimEnd()}`
    : ''
}

${
  creditCardTotal > 0
    ? `*💳 CARTÃO DE CRÉDITO*
_Fatura total com o vencimento na data de hoje:  *${today}*_

${formatCurrency(creditCardTotal)}`
    : ''
}
  `.trim();
}
