import subprocess
import re

html = subprocess.check_output([
    'curl', '-s', '-A', 'Mozilla/5.0',
    'https://checkoutseguro.info/checkout/cmuply6ac0a3201pmfm7q2w2b?offer=e6253e72'
]).decode('utf-8')

scripts = set(re.findall(r'"(/_next/static/chunks/[^"]+\.js[^"]*)"', html))

actions = set()
for s in scripts:
    url = 'https://checkoutseguro.info' + s.split('?')[0]
    try:
        content = subprocess.check_output(['curl', '-s', '-A', 'Mozilla/5.0', url]).decode('utf-8')
        if 'createServerReference' in content or 'next-action' in content.lower():
            print('Found server action reference in:', url)
            for m in re.finditer(r'createServerReference\("([a-f0-9]+)"', content):
                actions.add(m.group(1))
            for m in re.finditer(r'"([a-f0-9]{40,})"', content):
                actions.add(m.group(1))
    except Exception as e:
        pass

print('Found server action IDs:', actions)
