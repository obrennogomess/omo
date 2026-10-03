import urllib.request
import re

url = 'https://checkoutseguro.info/checkout/cmuply6ac0a3201pmfm7q2w2b?offer=e6253e72'
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
}

req = urllib.request.Request(url, headers=headers)
html = urllib.request.urlopen(req).read().decode('utf-8')

# Search for product title, producer name, price
for m in re.finditer(r'<title>(.*?)</title>', html):
    print('Title:', m.group(1))

# Check for producer or store name
for m in re.finditer(r'\"(?:producer|store|merchant|company|name|price|amount)\":\"?([^\",}]+)', html):
    print('Data:', m.group(0))
