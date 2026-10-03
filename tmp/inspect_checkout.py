import subprocess
import re

html = subprocess.check_output([
    'curl', '-s', '-A', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'https://checkoutseguro.info/checkout/cmuply6ac0a3201pmfm7q2w2b?offer=e6253e72'
]).decode('utf-8')

scripts = re.findall(r'src="([^"]+\.js[^"]*)"', html)
print('Found', len(scripts), 'scripts')

for s in scripts:
    url = s if s.startswith('http') else 'https://checkoutseguro.info' + s.split('?')[0]
    try:
        content = subprocess.check_output(['curl', '-s', '-A', 'Mozilla/5.0', url]).decode('utf-8', errors='ignore')
        if any(k in content.lower() for k in ['pay_conductor', 'qrcode', 'pix', 'transact']):
            print('Relevant script:', url)
            endpoints = set(re.findall(r'"(/api/[^"]+)"', content))
            endpoints.update(re.findall(r"'(/api/[^']+)'", content))
            if endpoints:
                print('  Endpoints in script:', endpoints)
            for m in re.finditer(r'fetch\(([^)]+)\)', content):
                f_arg = m.group(1)[:80]
                if '/api' in f_arg or 'http' in f_arg:
                    print('  fetch call:', f_arg)
    except Exception as e:
        print('Error on', url, e)
