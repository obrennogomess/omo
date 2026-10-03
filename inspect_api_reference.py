import urllib.request
import re

headers = {'User-Agent': 'Mozilla/5.0'}
html = urllib.request.urlopen(urllib.request.Request('https://app.sigilopay.com.br/api-reference', headers=headers)).read().decode('utf-8')

# Search for spec-url or data-spec or json url
for m in re.finditer(r'(?:spec-url|url|spec)=[\"\']([^\"\']+)[\"\']', html):
    print('Spec URL attr:', m.group(0))

for m in re.finditer(r'https?://[^\s\"\']+\.json', html):
    print('JSON URL:', m.group(0))

for m in re.finditer(r'/api/[^\s\"\']+', html):
    print('API path:', m.group(0))
