import urllib.request
import urllib.error
import json

base_url = 'https://app.sigilopay.com.br/api/v1'
headers = {
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0',
    'x-public-key': 'brennogomes2003_zxeljl21yx729xou',
    'x-secret-key': 'xi0vz2idkghv0s431yhue5zvcdlxwrsqmbahkyc9ya726l8w6w2jkqq6luztb87o'
}

candidates = [
    '/gateway/checkout',
    '/gateway/transactions',
    '/gateway/transaction',
    '/gateway/charge',
    '/gateway/charges',
    '/gateway/payment',
    '/gateway/payments',
    '/gateway/pay',
    '/gateway/pix',
    '/gateway/order',
    '/gateway/orders',
    '/gateway/sale',
    '/gateway/sales',
    '/gateway/invoice',
    '/gateway/invoices',
    '/gateway/billet',
    '/gateway/credit-card',
    '/gateway/direct',
    '/gateway/transparent',
    '/gateway/transparent-checkout',
    '/checkout',
    '/transactions',
    '/charges',
    '/payments',
    '/orders',
    '/pix',
]

for c in candidates:
    for method in ['POST', 'GET']:
        url = base_url + c
        req = urllib.request.Request(url, headers=headers, method=method)
        if method == 'POST':
            req.data = b'{}'
        try:
            with urllib.request.urlopen(req) as resp:
                print(f'FOUND 200: {method} {c} -> {resp.read().decode("utf-8")[:100]}')
        except urllib.error.HTTPError as e:
            if e.code != 404:
                print(f'INTERESTING: {method} {c} -> {e.code}: {e.read().decode("utf-8")[:100]}')
        except:
            pass
