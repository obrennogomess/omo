import urllib.request
import re

url = 'https://app.sigilopay.com.br/_next/static/chunks/1n_yx-x2q9lv1.js?dpl=f55e5e8f-831766474010894-1'
data = urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})).read().decode('utf-8', errors='ignore')
print('Length:', len(data))

# Find paths
for m in re.finditer(r'/api/v1/[a-zA-Z0-9_\-/{}]+', data):
    print('Found API endpoint:', m.group(0))
