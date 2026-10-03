/**
 * Generates official EMVCo PIX payload directly for the acquirer:
 * PAY CONDUCTOR INTERMEDIACOES DE SERVICOS LTDA (CNPJ: 62.797.552/0001-20)
 * Acquirer for SigiloPay
 */

function crc16Ccitt(str: string): string {
  let crc = 0xffff;
  const bytes = new TextEncoder().encode(str);
  for (let i = 0; i < bytes.length; i++) {
    crc ^= bytes[i] << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = ((crc << 1) ^ 0x1021) & 0xffff;
      } else {
        crc = (crc << 1) & 0xffff;
      }
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

export function generateAcquirerPixPayload({
  cnpj = '62797552000120',
  acquirerName = 'PAY CONDUCTOR',
  city = 'BARUERI',
  amount = 49.92,
  txid = 'PAYCONDUCTOR',
}: {
  cnpj?: string;
  acquirerName?: string;
  city?: string;
  amount: number;
  txid?: string;
}): string {
  const f = (tag: string, val: string) =>
    `${tag}${val.length.toString().padStart(2, '0')}${val}`;

  const cleanCnpj = cnpj.replace(/\D/g, '') || '62797552000120';
  const gui = f('00', 'br.gov.bcb.pix');
  const key = f('01', cleanCnpj);
  const merchantAccount = f('26', `${gui}${key}`);

  const mcc = f('52', '0000');
  const currency = f('53', '986');
  const transactionAmount = f('54', amount.toFixed(2));
  const countryCode = f('58', 'BR');
  const name = f('59', acquirerName.slice(0, 25).toUpperCase());
  const merchantCity = f('60', city.slice(0, 15).toUpperCase());
  const cleanTxid = txid.replace(/[^A-Za-z0-9]/g, '').slice(0, 25) || 'PAYCONDUCTOR';
  const additionalData = f('62', f('05', cleanTxid));
  const header = `${f('00', '01')}${f('01', '12')}`;

  const payloadWithoutCrc = `${header}${merchantAccount}${mcc}${currency}${transactionAmount}${countryCode}${name}${merchantCity}${additionalData}6304`;
  const crc = crc16Ccitt(payloadWithoutCrc);
  return `${payloadWithoutCrc}${crc}`;
}
