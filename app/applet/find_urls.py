import subprocess
import re

html = subprocess.check_output([
    'curl', '-s', '-A', 'Mozilla/5.0',
    'https://checkoutseguro.info/checkout/cmuply6ac0a3201pmfm7q2w2b?offer=e6253e72'
]).decode('utf-8')

scripts = set(re.findall(r'"(/_next/static/chunks/[^"]+\.js[^"]*)"', html))

found = []
for s in scripts:
    url = 'https://checkoutseguro.info' + s.split('?')[0]
    try:
        content = subprocess.check_output(['curl', '-s', '-A', 'Mozilla/5.0', url]).decode('utf-8')
        # Search for fetch calls with POST or URLs
        for m in re.finditer(r'(https?://[^\s"\'`]+)', content):
            u = m.group(1)
            if any(k in u for k in ['api', 'sigilo', 'checkout', 'conductor', 'gateway', 'pix', 'transact']):
                found.append(u)
    except Exception as e:
        pass

for u in sorted(set(found)):
    print('URL found in chunk:', u)
