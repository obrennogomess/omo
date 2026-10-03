import urllib.request
import re

url = 'https://app.sigilopay.com.br/api-reference'
html = urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})).read().decode('utf-8')

# Let's search for openapi or spec in html
pos = 0
while True:
    p1 = html.find('openapi', pos)
    p2 = html.find('swagger', pos)
    p = -1
    if p1 != -1 and p2 != -1:
        p = min(p1, p2)
    elif p1 != -1:
        p = p1
    elif p2 != -1:
        p = p2
    
    if p == -1:
        break
    print(html[max(0, p - 50):min(len(html), p + 100)])
    print('---')
    pos = p + 10
