import urllib.request
import urllib.error
import json

base_url = 'https://app.sigilopay.com.br/api/v1'
headers = {
    'User-Agent': 'Mozilla/5.0',
    'x-public-key': 'brennogomes2003_zxeljl21yx729xou',
    'x-secret-key': 'xi0vz2idkghv0s431yhue5zvcdlxwrsqmbahkyc9ya726l8w6w2jkqq6luztb87o'
}

params_list = [
    'page=1',
    'limit=10',
    'status=PENDING',
    'status=ALL',
    'page=1&pageSize=20',
    'startDate=2026-01-01',
    'email=felipevanvieira136878@live.com',
    'customerEmail=felipevanvieira136878@live.com',
    'id=1',
]

for p in params_list:
    url = f'{base_url}/gateway/transactions?{p}'
    req = urllib.request.Request(url, headers=headers, method='GET')
    try:
        with urllib.request.urlopen(req) as resp:
            print(f'GET ?{p} -> {resp.status}: {resp.read().decode("utf-8")[:300]}')
    except urllib.error.HTTPError as e:
        print(f'GET ?{p} -> {e.code}: {e.read().decode("utf-8")[:150]}')
