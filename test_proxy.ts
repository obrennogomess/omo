import express from 'express';
import http from 'http';

const app = express();

app.get('/test-proxy', async (req, res) => {
  try {
    const upstream = await fetch('https://checkoutseguro.info/checkout/cmuply6ac0a3201pmfm7q2w2b?offer=e6253e72', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9',
        'Accept-Language': 'pt-BR,pt;q=0.9',
      }
    });

    const body = await upstream.text();
    // remove x-frame-options
    res.removeHeader('X-Frame-Options');
    res.removeHeader('Content-Security-Policy');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(body);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

const server = app.listen(3002, async () => {
  console.log('Test proxy listening on 3002');
  const res = await fetch('http://localhost:3002/test-proxy');
  console.log('Status:', res.status, 'Content length:', (await res.text()).length);
  server.close();
});
