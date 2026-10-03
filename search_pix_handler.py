import urllib.request
import re
from concurrent.futures import ThreadPoolExecutor

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
}

req = urllib.request.Request('https://checkoutseguro.info/checkout/cmuply6ac0a3201pmfm7q2w2b?offer=e6253e72', headers=headers)
html = urllib.request.urlopen(req).read().decode('utf-8')
chunks = list(set(re.findall(r'/_next/static/chunks/([a-zA-Z0-9_\-\.]+\.js)', html)))

def inspect_chunk(c):
    url = f'https://checkoutseguro.info/_next/static/chunks/{c}'
    try:
        data = urllib.request.urlopen(urllib.request.Request(url, headers=headers), timeout=3).read().decode('utf-8', errors='ignore')
        results = []
        if 'qrCode' in data or 'qrcode' in data or 'qr_code' in data:
            results.append(f'QRCODE in {c}')
            for m in re.finditer(r'([a-zA-Z0-9_$]+(?:\.qrCode|\.qr_code|qrcodeBase64|pixCode|pixCopiaECola)[a-zA-Z0-9_$]*)', data):
                results.append(f'  prop: {m.group(0)}')
        if 'generatePix' in data or 'createPix' in data or 'handlePix' in data:
            results.append(f'Pix Handler in {c}')
        return results
    except:
        return []

with ThreadPoolExecutor(max_workers=10) as ex:
    for res in ex.map(inspect_chunk, chunks):
        for line in res:
            print(line)
