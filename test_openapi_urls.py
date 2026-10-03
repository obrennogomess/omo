import urllib.request

urls = [
    'https://app.sigilopay.com.br/openapi',
    'https://app.sigilopay.com.br/openapi.json',
    'https://app.sigilopay.com.br/openapi.yaml',
    'https://app.sigilopay.com.br/api/openapi.json',
    'https://app.sigilopay.com.br/llms.txt',
]

headers = {'User-Agent': 'Mozilla/5.0'}

for u in urls:
    try:
        req = urllib.request.Request(u, headers=headers)
        with urllib.request.urlopen(req, timeout=5) as resp:
            data = resp.read().decode('utf-8')
            print(f'200 {u} -> {len(data)} bytes: {data[:200]}')
    except Exception as e:
        print(f'ERR {u} -> {e}')
