"""Posting to Facebook Page + Instagram Reels (Meta Graph API, free) and, optionally, YouTube (direct API).

Secrets (GitHub: Settings > Secrets and variables > Actions):
  FB_PAGE_TOKEN   long-lived Page access token       FB_PAGE_ID  (default below)       IG_USER_ID  (default below)
  YT_CLIENT_ID, YT_CLIENT_SECRET, YT_REFRESH_TOKEN   only for direct YouTube upload (see SETUP.md; needs Google's audit to be public)
YouTube is normally posted by a free Zapier Zap that reads media/latest.json (see SETUP.md).
"""
import json, os, time, urllib.request, urllib.parse, urllib.error
GRAPH = 'https://graph.facebook.com/v21.0'; GRAPH_VIDEO = 'https://graph-video.facebook.com/v21.0'
PAGE_ID = os.environ.get('FB_PAGE_ID', '1478060802048084'); IG_ID = os.environ.get('IG_USER_ID', '17841466147205405')

def call(url, data=None, method=None):
    body = urllib.parse.urlencode(data).encode() if data is not None else None
    req = urllib.request.Request(url, data=body, method=method or ('POST' if data is not None else 'GET'))
    try:
        with urllib.request.urlopen(req, timeout=300) as r: return json.load(r)
    except urllib.error.HTTPError as e:
        raise RuntimeError(f'{url.split("?")[0]} -> HTTP {e.code}: {e.read().decode()[:600]}')

def facebook(story, lang, meta):
    tok = os.environ.get('FB_PAGE_TOKEN')
    if not tok: raise RuntimeError('MISSING SECRET FB_PAGE_TOKEN (see SETUP.md step 3)')
    r = call(f'{GRAPH_VIDEO}/{PAGE_ID}/videos', {'file_url': meta['video_url'], 'title': meta['title'], 'description': story[lang]['facebook'], 'access_token': tok})
    return r.get('id')

def instagram(story, lang, meta):
    tok = os.environ.get('FB_PAGE_TOKEN')
    if not tok: raise RuntimeError('MISSING SECRET FB_PAGE_TOKEN (see SETUP.md step 3)')
    c = call(f'{GRAPH}/{IG_ID}/media', {'media_type': 'REELS', 'video_url': meta['video_url'], 'caption': story[lang]['instagram'], 'share_to_feed': 'true', 'access_token': tok})['id']
    for _ in range(60):
        s = call(f'{GRAPH}/{c}?fields=status_code,status&access_token={urllib.parse.quote(tok)}')
        print('instagram processing:', s.get('status_code'), flush=True)
        if s.get('status_code') == 'FINISHED': break
        if s.get('status_code') in ('ERROR', 'EXPIRED'): raise RuntimeError(f'Instagram rejected the video: {s}')
        time.sleep(10)
    else: raise RuntimeError('Instagram processing timed out')
    return call(f'{GRAPH}/{IG_ID}/media_publish', {'creation_id': c, 'access_token': tok}).get('id')

def youtube(story, lang, meta):
    cid, sec, ref = (os.environ.get(k) for k in ('YT_CLIENT_ID', 'YT_CLIENT_SECRET', 'YT_REFRESH_TOKEN'))
    if not (cid and sec and ref): return 'skipped (Zapier posts YouTube; no YT_* secrets set)'
    tok = call('https://oauth2.googleapis.com/token', {'client_id': cid, 'client_secret': sec, 'refresh_token': ref, 'grant_type': 'refresh_token'})['access_token']
    video = urllib.request.urlopen(meta['video_url'], timeout=300).read()
    body = json.dumps({'snippet': {'title': meta['title'], 'description': meta['description'], 'tags': meta['tags'], 'categoryId': '27', 'defaultLanguage': lang, 'defaultAudioLanguage': lang},
                       'status': {'privacyStatus': 'public', 'selfDeclaredMadeForKids': False}}).encode()
    init = urllib.request.Request('https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status', data=body, method='POST',
        headers={'Authorization': f'Bearer {tok}', 'Content-Type': 'application/json; charset=UTF-8', 'X-Upload-Content-Type': 'video/mp4', 'X-Upload-Content-Length': str(len(video))})
    loc = urllib.request.urlopen(init, timeout=60).headers['Location']
    vid = json.load(urllib.request.urlopen(urllib.request.Request(loc, data=video, method='PUT', headers={'Content-Type': 'video/mp4'}), timeout=900))['id']
    img = urllib.request.urlopen(meta['thumbnail_url'], timeout=60).read()
    urllib.request.urlopen(urllib.request.Request(f'https://www.googleapis.com/upload/youtube/v3/thumbnails/set?videoId={vid}', data=img, method='POST', headers={'Authorization': f'Bearer {tok}', 'Content-Type': 'image/png'}), timeout=120)
    return vid

def post_all(story, lang, meta):
    out = {}
    for name, fn in (('youtube', youtube), ('facebook', facebook), ('instagram', instagram)):
        try: out[name] = fn(story, lang, meta)
        except Exception as e: out[name] = f'FAILED: {e}'; print(f'[{lang}] {name} FAILED: {e}', flush=True)
    if any(str(v).startswith('FAILED') for v in out.values()): raise RuntimeError(f'[{lang}] some platforms failed: {json.dumps(out, ensure_ascii=False)}')
    return out
