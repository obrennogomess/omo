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

endpoints = [
    ('/gateway/transactions', 'GET'),
    ('/gateway/transactions', 'POST'),
    ('/gateway/orders', 'GET'),
    ('/gateway/orders', 'POST'),
    ('/gateway/charges', 'POST'),
    ('/gateway/pix', 'POST'),
    ('/transactions', 'GET'),
    ('/transactions', 'POST'),
    ('/orders', 'GET'),
    ('/orders', 'POST'),
    ('/pix', 'POST'),
    ('/charges', 'POST'),
]

for ep, method in endpoints:
    url = base_url + ep
    req = urllib.request.Request(url, headers=headers, method=method)
    if method == 'POST':
        req.data = json.dumps({}).encode('utf-8')
    try:
        with urllib.request.urlopen(req) as resp:
            print(f'[{method}] {ep} -> {resp.status}: {resp.read().decode("utf-8")[:150]}')
    except urllib.error.HTTPError as e:
        body = e.read().decode('utf-8', errors='ignore')[:150]
        print(f'[{method}] {ep} -> {e.code}: {body}')
    except Exception as e:
        print(f'[{method}] {ep} -> ERR: {e}')
