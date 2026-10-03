import urllib.request
import re

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
}

url = 'https://checkoutseguro.info/_next/static/chunks/43vap0vx-lb3n.js'
data = urllib.request.urlopen(urllib.request.Request(url, headers=headers)).read().decode('utf-8', errors='ignore')
print('Length:', len(data))

idx = 0
while True:
    pos = data.lower().find('qrcode', idx)
    if pos == -1:
        break
    print('Match:', data[max(0, pos - 100):min(len(data), pos + 250)])
    print('---')
    idx = pos + 6
