import urllib.request

headers = {'User-Agent': 'Mozilla/5.0'}
html = urllib.request.urlopen(urllib.request.Request('https://app.sigilopay.com.br/api-reference', headers=headers)).read().decode('utf-8')
print(html[:2000])
