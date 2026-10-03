import urllib.request
import urllib.error

base_url = 'https://app.sigilopay.com.br/api/v1'
headers = {
    'User-Agent': 'Mozilla/5.0',
    'x-public-key': 'brennogomes2003_zxeljl21yx729xou',
    'x-secret-key': 'xi0vz2idkghv0s431yhue5zvcdlxwrsqmbahkyc9ya726l8w6w2jkqq6luztb87o'
}

keys = ['externalId', 'transactionId', 'orderId', 'reference', 'code', 'txid', 'uuid', 'productId', 'offerCode']

for k in keys:
    url = f'{base_url}/gateway/transactions?{k}=test'
    req = urllib.request.Request(url, headers=headers, method='GET')
    try:
        with urllib.request.urlopen(req) as resp:
            print(f'?{k} -> {resp.status}')
    except urllib.error.HTTPError as e:
        body = e.read().decode('utf-8', errors='ignore')
        print(f'?{k} -> {e.code}: {body}')
