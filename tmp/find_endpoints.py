import subprocess
import re

html = subprocess.check_output([
    'curl', '-s', '-A', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'https://app.sigilopay.com.br/docs/v1'
]).decode('utf-8')

chunks = set(re.findall(r'"(/_next/static/chunks/[^"]+\.js[^"]*)"', html))
print(f'Found {len(chunks)} chunks in docs')

endpoints = set()
for c in chunks:
    clean_c = c.split('?')[0]
    try:
        txt = subprocess.check_output([
            'curl', '-s', '-A', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'https://app.sigilopay.com.br' + clean_c
        ]).decode('utf-8')
        for m in re.findall(r'"(/api/v1/[^"]+)"', txt):
            endpoints.add(m)
        for m in re.findall(r"'(/api/v1/[^']+)'", txt):
            endpoints.add(m)
        for m in re.findall(r'`(/api/v1/[^`]+)`', txt):
            endpoints.add(m)
    except Exception as e:
        pass

print('ENDPOINTS FOUND:')
for ep in sorted(endpoints):
    print(' ', ep)
