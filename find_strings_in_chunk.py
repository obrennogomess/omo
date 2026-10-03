import urllib.request
import re

url = 'https://app.sigilopay.com.br/_next/static/chunks/1n_yx-x2q9lv1.js?dpl=f55e5e8f-831766474010894-1'
data = urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})).read().decode('utf-8', errors='ignore')

# print strings in data
strs = re.findall(r'\"([^\"]{3,100})\"', data)
for s in strs:
    if any(k in s.lower() for k in ['gateway', 'post', 'get', 'checkout', 'transaction', 'pix', 'order', 'schema']):
        print('String:', s)
