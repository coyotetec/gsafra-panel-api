import { format, getDate, subDays } from 'date-fns';
import { formatCurrency } from '../../../../utils/formatCurrency';

interface IReceivablesMessageGenerateArgs {
  receivables: { value: number; recipientName: string }[];
  checks: { value: number; recipientName: string }[];
}

export function receivablesMessageGenerate({
  receivables,
  checks,
}: IReceivablesMessageGenerateArgs) {
  const weekday = getDate(new Date());
  const today = format(new Date(), 'dd/MM/yyyy');
  const saturday = format(subDays(new Date(), 2), 'dd/MM/yyyy');

  return `
${
  receivables.length > 0
    ? `*📝 CONTAS A RECEBER*
${weekday !== 1 ? `_Contas a receber com o vencimento na data de hoje: *${today}*_` : `_Contas a receber com vencimento de sábado à hoje: *${saturday} - ${today}*_`}
${receivables
  .map(
    (receivable) => `
*${receivable.recipientName}*
${formatCurrency(receivable.value)}
`,
  )
  .join('')
  .trimEnd()}`
    : ''
}

${
  checks.length > 0
    ? `*🧾 CHEQUES EMITIDOS*
${weekday !== 1 ? `_Cheques emitidos com o vencimento na data de hoje: *${today}*_` : `_Cheques emitidos com vencimento de sábado à hoje: *${saturday} - ${today}*_`}
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
  `.trim();
}
