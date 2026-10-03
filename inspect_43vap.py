import urllib.request
import re

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
}

url = 'https://checkoutseguro.info/_next/static/chunks/43vap0vx-lb3n.js'
data = urllib.request.urlopen(urllib.request.Request(url, headers=headers)).read().decode('utf-8', errors='ignore')

# Find server actions or functions in this file
actions = re.findall(r'createServerReference\([\"\'`]([a-f0-9]+)[\"\'`][^)]*\"([^\"]+)\"', data)
print('Actions:', actions)

for m in re.finditer(r'\"([a-zA-Z0-9_$]+(?:Transaction|Order|Pix|Checkout)[a-zA-Z0-9_$]*)\"', data):
    print('Entity:', m.group(1))
