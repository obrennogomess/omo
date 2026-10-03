import urllib.request
import urllib.error

urls = [
    'https://app.sigilopay.com.br/docs',
    'https://app.sigilopay.com.br/api-reference',
    'https://app.sigilopay.com.br/reference',
    'https://app.sigilopay.com.br/api/v1/docs',
    'https://app.sigilopay.com.br/api/docs',
    'https://app.sigilopay.com.br/swagger',
    'https://app.sigilopay.com.br/scalar',
    'https://api.sigilopay.com.br/docs',
    'https://api.sigilopay.com.br/swagger',
    'https://api.sigilopay.com.br/v1/docs',
]

headers = {'User-Agent': 'Mozilla/5.0'}

for u in urls:
    try:
        req = urllib.request.Request(u, headers=headers)
        with urllib.request.urlopen(req, timeout=4) as r:
            print(f'200 OK: {u}')
    except urllib.error.HTTPError as e:
        if e.code != 404:
            print(f'{e.code}: {u}')
    except Exception as e:
        pass
