import urllib.request

url = 'https://checkoutseguro.info/checkout/cmuply6ac0a3201pmfm7q2w2b?offer=e6253e72'
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
}

req = urllib.request.Request(url, headers=headers)
with urllib.request.urlopen(req) as resp:
    print('Status:', resp.status)
    for k, v in resp.headers.items():
        if any(h in k.lower() for h in ['frame', 'security', 'origin', 'content-type']):
            print(f'{k}: {v}')
