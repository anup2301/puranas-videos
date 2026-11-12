"""Checks that FB_PAGE_TOKEN works for the Facebook Page and the linked Instagram account WITHOUT posting anything. Never prints the token."""
import json, os, sys, urllib.parse, urllib.request, urllib.error
tok = os.environ.get('FB_PAGE_TOKEN')
if not tok: sys.exit('MISSING SECRET FB_PAGE_TOKEN: add it in repo Settings > Secrets and variables > Actions')
def get(path):
    sep = '&' if '?' in path else '?'
    try: return json.load(urllib.request.urlopen(f'https://graph.facebook.com/v21.0/{path}{sep}access_token={urllib.parse.quote(tok)}', timeout=60))
    except urllib.error.HTTPError as e: sys.exit(f'FAILED {path.split("?")[0]}: HTTP {e.code} {e.read().decode()[:500]}')
me = get('me?fields=id,name'); page = os.environ.get('FB_PAGE_ID') or me['id']
print('Facebook Page behind this token:', me.get('name'), '| id', me.get('id'))
if me['id'] != page: sys.exit(f'Secret FB_PAGE_ID ({page}) does not match the token Page ({me["id"]}). Delete the FB_PAGE_ID secret.')
ig = os.environ.get('IG_USER_ID') or (get(f'{page}?fields=instagram_business_account').get('instagram_business_account') or {}).get('id')
if not ig: sys.exit('NO INSTAGRAM linked to this Facebook Page. Link the Instagram Business account to this Page (Page settings > Linked accounts), then make a new token.')
i = get(f'{ig}?fields=username,media_count'); print('Instagram account:', '@' + str(i.get('username')), '| id', ig, '| posts:', i.get('media_count'))
print('ALL GOOD: the daily job can post to this Page and this Instagram account. (Posting permission is only proven by the first real post.)')
