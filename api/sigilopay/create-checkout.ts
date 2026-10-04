export default async function handler(req: any, res: any) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const SIGILOPAY_PUBLIC_KEY =
    process.env.SIGILOPAY_PUBLIC_KEY || 'brennogomes2003_zxeljl21yx729xou';
  const SIGILOPAY_PRIVATE_KEY =
    process.env.SIGILOPAY_PRIVATE_KEY ||
    'xi0vz2idkghv0s431yhue5zvcdlxwrsqmbahkyc9ya726l8w6w2jkqq6luztb87o';
  const SIGILOPAY_BASE_URL =
    process.env.SIGILOPAY_BASE_URL || 'https://app.sigilopay.com.br/api/v1';

  try {
    const { offerId, customer, address, shipping, upsell } = req.body || {};

    const isKit2 = offerId === 'kit-2';
    const basePrice = isKit2 ? 71.96 : 49.92;
    const upsellPrice = upsell ? 19.9 : 0;
    const totalPrice = Number((basePrice + (shipping?.price || 0) + upsellPrice).toFixed(2));

    const productName = isKit2
      ? 'Kit Lava Roupas 7L (2x OMO + 2x Comfort - 28L)'
      : 'Kit Lava Roupas Líquido 7L (OMO Pro + Comfort Pro - 14L)';

    const offerName = isKit2
      ? '2 Kits Lava Roupas 7L (Oferta Relâmpago 78% OFF)'
      : '1 Kit Lava Roupas 7L (Oferta Relâmpago 78% OFF)';

    const payload = {
      product: {
        externalId: offerId || 'kit-1',
        name: productName,
        offer: {
          name: offerName,
          price: totalPrice,
          offerType: 'NATIONAL',
        },
      },
      settings: {
        askForAddress: true,
        defaultPaymentMethod: 'PIX',
      },
    };

    const response = await fetch(`${SIGILOPAY_BASE_URL}/gateway/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-public-key': SIGILOPAY_PUBLIC_KEY,
        'x-secret-key': SIGILOPAY_PRIVATE_KEY,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    let finalCheckoutUrl = data.checkoutUrl;
    if (finalCheckoutUrl) {
      const urlObj = new URL(finalCheckoutUrl);
      if (customer?.name) urlObj.searchParams.set('name', customer.name);
      if (customer?.email) urlObj.searchParams.set('email', customer.email);
      if (customer?.phone) {
        urlObj.searchParams.set('phone', customer.phone.replace(/\D/g, ''));
      }
      if (customer?.document) {
        urlObj.searchParams.set('document', customer.document.replace(/\D/g, ''));
      }
      if (address?.cep) {
        urlObj.searchParams.set('cep', address.cep.replace(/\D/g, ''));
      }
      if (address?.street) urlObj.searchParams.set('street', address.street);
      if (address?.number) urlObj.searchParams.set('number', address.number);
      if (address?.complement) urlObj.searchParams.set('complement', address.complement);
      if (address?.neighborhood) urlObj.searchParams.set('neighborhood', address.neighborhood);
      if (address?.city) urlObj.searchParams.set('city', address.city);
      if (address?.state) urlObj.searchParams.set('state', address.state);
      finalCheckoutUrl = urlObj.toString();
    }

    return res.status(200).json({
      success: true,
      productId: data.productId,
      offerCode: data.offerCode,
      checkoutUrl: finalCheckoutUrl,
      rawUrl: data.checkoutUrl,
      totalPrice: totalPrice,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message || 'Erro ao processar sessão SigiloPay',
    });
  }
}
