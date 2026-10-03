import urllib.request
import re

headers = {'User-Agent': 'Mozilla/5.0'}
html = urllib.request.urlopen(urllib.request.Request('https://app.sigilopay.com.br/api-reference', headers=headers)).read().decode('utf-8')

for m in re.finditer(r'\"(/[^\"]+)\"', html):
    val = m.group(1)
    if any(k in val for k in ['gateway', 'transactions', 'checkout', 'orders', 'pix', 'v1']):
        print('Path:', val)
