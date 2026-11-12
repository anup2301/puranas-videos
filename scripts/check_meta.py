"""Checks that FB_PAGE_TOKEN works for the Facebook Page and the Instagram account WITHOUT posting anything. Never prints the token."""
import json, os, sys, urllib.parse, urllib.request, urllib.error
tok = os.environ.get('FB_PAGE_TOKEN'); page = os.environ.get('FB_PAGE_ID', '1478060802048084'); ig = os.environ.get('IG_USER_ID', '17841466147205405')
if not tok: sys.exit('MISSING SECRET FB_PAGE_TOKEN: add it in repo Settings > Secrets and variables > Actions')
def get(path):
    try: return json.load(urllib.request.urlopen(f'https://graph.facebook.com/v21.0/{path}&access_token={urllib.parse.quote(tok)}' if '?' in path else f'https://graph.facebook.com/v21.0/{path}?access_token={urllib.parse.quote(tok)}', timeout=60))
    except urllib.error.HTTPError as e: sys.exit(f'FAILED {path.split("?")[0]}: HTTP {e.code} {e.read().decode()[:400]}')
me = get('me?fields=id,name'); print('token belongs to:', me.get('name'), me.get('id'))
if me.get('id') != page: sys.exit(f'The token is for id {me.get("id")}, but FB_PAGE_ID is {page}. Use the Page token of NovamindPath, or set secret FB_PAGE_ID.')
p = get(f'{page}?fields=name,fan_count'); print('Facebook Page OK:', p.get('name'))
i = get(f'{ig}?fields=username,media_count'); print('Instagram OK: @' + str(i.get('username')), 'media:', i.get('media_count'))
print('ALL GOOD: the daily job can post to both. (Posting permissions are only proven by the first real post.)')
