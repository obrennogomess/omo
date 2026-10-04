export default async function handler(req: any, res: any) {
  const SIGILOPAY_PUBLIC_KEY =
    process.env.SIGILOPAY_PUBLIC_KEY || 'brennogomes2003_zxeljl21yx729xou';
  const SIGILOPAY_PRIVATE_KEY =
    process.env.SIGILOPAY_PRIVATE_KEY ||
    'xi0vz2idkghv0s431yhue5zvcdlxwrsqmbahkyc9ya726l8w6w2jkqq6luztb87o';
  const SIGILOPAY_BASE_URL =
    process.env.SIGILOPAY_BASE_URL || 'https://app.sigilopay.com.br/api/v1';

  try {
    const response = await fetch(`${SIGILOPAY_BASE_URL}`, {
      headers: {
        'x-public-key': SIGILOPAY_PUBLIC_KEY,
        'x-secret-key': SIGILOPAY_PRIVATE_KEY,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      },
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Erro ao conectar à SigiloPay' });
  }
}
