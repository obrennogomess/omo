import urllib.request
import re

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
}

try:
    req = urllib.request.Request('https://sigilopay.com', headers=headers)
    html = urllib.request.urlopen(req, timeout=10).read().decode('utf-8')
    links = re.findall(r'href=[\"\'](https?://[^\s\"\'>]+|/[^\s\"\'>]*)[\"\']', html)
    for l in set(links):
        if any(w in l.lower() for w in ['api', 'doc', 'gateway', 'checkout', 'integr']):
            print('Link:', l)
except Exception as e:
    print('Error:', e)
