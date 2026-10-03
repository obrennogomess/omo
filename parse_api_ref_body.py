import urllib.request
import re

headers = {'User-Agent': 'Mozilla/5.0'}
html = urllib.request.urlopen(urllib.request.Request('https://app.sigilopay.com.br/api-reference', headers=headers)).read().decode('utf-8')
# Find all script tags or data in page
scripts = re.findall(r'<script[^>]*>(.*?)</script>', html)
for s in scripts:
    if 'openapi' in s.lower() or 'swagger' in s.lower() or 'paths' in s.lower() or 'gateway' in s.lower():
        print('Found interesting script:', s[:300])

# Find openapi JSON or route in scripts
matches = re.findall(r'/api-reference/[a-zA-Z0-9_\-\./]+|\b[a-zA-Z0-9_\-]+\.json\b', html)
print('Matches:', matches)
