import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// SigiloPay Configuration
const SIGILOPAY_PUBLIC_KEY =
  process.env.SIGILOPAY_PUBLIC_KEY || 'brennogomes2003_zxeljl21yx729xou';
const SIGILOPAY_PRIVATE_KEY =
  process.env.SIGILOPAY_PRIVATE_KEY ||
  'xi0vz2idkghv0s431yhue5zvcdlxwrsqmbahkyc9ya726l8w6w2jkqq6luztb87o';
const SIGILOPAY_BASE_URL =
  process.env.SIGILOPAY_BASE_URL || 'https://app.sigilopay.com.br/api/v1';

// Verify credentials endpoint
app.get('/api/sigilopay/verify', async (req, res) => {
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
});

// Create checkout session via SigiloPay API
app.post('/api/sigilopay/create-checkout', async (req, res) => {
  try {
    const { offerId, customer, address, shipping, upsell } = req.body;

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
      console.error('SigiloPay checkout error:', data);
      return res.status(response.status).json(data);
    }

    // Build personalized checkout URL with customer and address query parameters
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

    return res.json({
      success: true,
      productId: data.productId,
      offerCode: data.offerCode,
      checkoutUrl: finalCheckoutUrl,
      rawCheckoutUrl: data.checkoutUrl,
    });
  } catch (error: any) {
    console.error('Error proxying to SigiloPay:', error);
    return res.status(500).json({
      error: error.message || 'Erro interno no servidor ao contatar SigiloPay',
    });
  }
});

// Check transaction status via SigiloPay API
app.get('/api/sigilopay/status', async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: 'ID da transação é obrigatório' });
    }

    const response = await fetch(
      `${SIGILOPAY_BASE_URL}/gateway/transactions?id=${encodeURIComponent(id as string)}`,
      {
        headers: {
          'x-public-key': SIGILOPAY_PUBLIC_KEY,
          'x-secret-key': SIGILOPAY_PRIVATE_KEY,
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        },
      }
    );

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// Webhook endpoint to receive SigiloPay payment events
app.post('/api/sigilopay/webhook', (req, res) => {
  console.log('SigiloPay Webhook event received:', JSON.stringify(req.body));
  return res.status(200).json({ received: true });
});

// Setup Vite middleware in dev or static serve in prod
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT} (SigiloPay connected)`);
  });
}

startServer();
