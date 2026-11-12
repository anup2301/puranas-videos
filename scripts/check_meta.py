"""Checks that FB_PAGE_TOKEN works for the Facebook Page and the linked Instagram account WITHOUT posting anything. Never prints the token."""
import json, os, sys, urllib.parse, urllib.request, urllib.error
tok = os.environ.get('FB_PAGE_TOKEN')
if not tok: sys.exit('MISSING SECRET FB_PAGE_TOKEN: add it in repo Settings > Secrets and variables > Actions')
def get(path, soft=False):
    sep = '&' if '?' in path else '?'
    try: return json.load(urllib.request.urlopen(f'https://graph.facebook.com/v21.0/{path}{sep}access_token={urllib.parse.quote(tok)}', timeout=60))
    except urllib.error.HTTPError as e:
        if soft: return None
        sys.exit(f'FAILED {path.split("?")[0]}: HTTP {e.code} {e.read().decode()[:500]}')
me = get('me?fields=id,name'); print('Token belongs to:', me.get('name'), '| id', me.get('id'))
pages = get('me/accounts?fields=name,id,instagram_business_account', soft=True)
if pages and pages.get('data') is not None and (pages['data'] or 'paging' in pages):
    print('\nThis is a PERSONAL (user) token, not a Page token. Pages this login can manage:')
    for p in pages['data']: print('  -', p['name'], '| page id', p['id'], '| instagram:', (p.get('instagram_business_account') or {}).get('id', 'none linked'))
    if not pages['data']: print('  (none: when you generated the token, the popup did not let this app see your Page. Generate it again and tick the Page and Instagram account.)')
    sys.exit('\nFIX: in the Graph API Explorer run  me/accounts?fields=name,id,access_token  and copy the access_token of your Page into the FB_PAGE_TOKEN secret.')
page = os.environ.get('FB_PAGE_ID') or me['id']
if me['id'] != page: sys.exit(f'Secret FB_PAGE_ID ({page}) does not match the token Page ({me["id"]}). Delete the FB_PAGE_ID secret.')
ig = os.environ.get('IG_USER_ID') or (get(f'{page}?fields=instagram_business_account').get('instagram_business_account') or {}).get('id')
if not ig: sys.exit('NO INSTAGRAM linked to this Facebook Page. Link the Instagram Business account to this Page (Page settings > Linked accounts), then make a new token.')
i = get(f'{ig}?fields=username,media_count'); print('Instagram account:', '@' + str(i.get('username')), '| id', ig, '| posts:', i.get('media_count'))
print('ALL GOOD: the daily job can post to this Page and this Instagram account. (Posting permission is only proven by the first real post.)')
