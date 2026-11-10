#!/usr/bin/env python3
"""One-time helper: turn a short Facebook user token into a long-lived PAGE token (does not expire) and list your Pages + Instagram ids.
  python scripts/meta_token.py APP_ID APP_SECRET SHORT_USER_TOKEN
Run it on your own computer. Paste the printed page token into the GitHub secret FB_PAGE_TOKEN. Never share it in chat or commit it.
"""
import json, sys, urllib.parse, urllib.request
app, secret, short = sys.argv[1:4]
def get(url): return json.load(urllib.request.urlopen(url, timeout=60))
q = urllib.parse.urlencode({'grant_type': 'fb_exchange_token', 'client_id': app, 'client_secret': secret, 'fb_exchange_token': short})
long_user = get(f'https://graph.facebook.com/v21.0/oauth/access_token?{q}')['access_token']
pages = get('https://graph.facebook.com/v21.0/me/accounts?' + urllib.parse.urlencode({'fields': 'name,id,access_token,instagram_business_account', 'access_token': long_user}))['data']
for p in pages:
    print('\nPAGE:', p['name'], '| id:', p['id'], '| instagram business id:', (p.get('instagram_business_account') or {}).get('id', '(none linked)'))
    print('PAGE TOKEN (secret FB_PAGE_TOKEN):', p['access_token'])
