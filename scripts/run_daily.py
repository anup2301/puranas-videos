#!/usr/bin/env python3
"""Daily Purana story pipeline (free, runs in GitHub Actions or on any computer).

  python scripts/run_daily.py --mode stage       render the next pending story and stage it in media/ (the Zap uploads it to YouTube at 21:00 IST)
  python scripts/run_daily.py --mode post        post the staged story to Facebook + Instagram NOW, mark it done, stage the next one
  python scripts/run_daily.py --dry-run          render only (nothing is posted or committed)
  python scripts/run_daily.py --story ID --only en   render one specific story as a test

Order per day: English first, then Hindi. Failure anywhere = the job fails = GitHub emails the repo owner.
"""
import argparse, datetime as dt, json, os, shutil, subprocess, sys, time, urllib.request, urllib.parse
from pathlib import Path
from zoneinfo import ZoneInfo

ROOT = Path(__file__).resolve().parent.parent
IST = ZoneInfo('Asia/Kolkata')
REPO = os.environ.get('GITHUB_REPOSITORY', 'anup2301/puranas-videos')
RAW = f'https://raw.githubusercontent.com/{REPO}/main'
os.environ.setdefault('FACELESS_HOME', str(ROOT / '.cache'))
os.environ.setdefault('CHROME', '/usr/bin/google-chrome')

def sh(cmd, cwd=None):
    print('$', ' '.join(str(c) for c in cmd), flush=True); subprocess.run([str(c) for c in cmd], cwd=cwd, check=True)

def git(*a):
    sh(['git', *a], cwd=ROOT)

def build(story, lang):
    sid = story['id']; work = ROOT / 'work' / f'{sid}-{lang}'
    if work.exists(): shutil.rmtree(work)
    shutil.copytree(ROOT / 'engine', work); (work / 'data').mkdir(); (work / 'renders').mkdir()
    sdir = ROOT / 'stories' / sid
    shutil.copy(sdir / f'script.{lang}.json', work / 'script.json')
    (work / 'src' / 'shots.js').write_text((sdir / 'shots.js').read_text().replace('__HI__', 'true' if lang == 'hi' else 'false'))
    py = sys.executable
    sh([py, ROOT / 'scripts' / 'voice.py', work])
    sh([py, ROOT / 'scripts' / 'gen_words.py', work])
    sh(['node', 'tools/capture.mjs', 'check'], cwd=work)
    sh(['node', 'tools/capture.mjs', 'cues'], cwd=work)
    sh([py, 'tools/mix.py', '.'], cwd=work)
    sh(['node', 'tools/capture.mjs', 'video', 'renders/out.mp4'], cwd=work)
    cfg = work / 'thumb.json'; cfg.write_text(json.dumps(story[lang]['thumb'], ensure_ascii=False))
    sh(['node', ROOT / 'scripts' / 'render_thumb.mjs', cfg, work / 'thumb.png'])
    return work / 'renders' / 'out.mp4', work / 'thumb.png'

def stage_media(story, files, post_date):
    media = ROOT / 'media'
    if media.exists(): shutil.rmtree(media)
    media.mkdir()
    meta = {'id': story['id'], 'date': post_date}
    for lang, (mp4, png) in files.items():
        shutil.copy(mp4, media / f'latest-{lang}.mp4'); shutil.copy(png, media / f'thumb-{lang}.png')
        meta[lang] = {k: story[lang][k] for k in ('title', 'description', 'tags')}
        meta[lang]['video_url'] = f'{RAW}/media/latest-{lang}.mp4'; meta[lang]['thumbnail_url'] = f'{RAW}/media/thumb-{lang}.png'
    (media / 'latest.json').write_text(json.dumps(meta, ensure_ascii=False, indent=1))
    git('config', 'user.name', 'purana-bot'); git('config', 'user.email', 'purana-bot@users.noreply.github.com')
    git('add', 'media'); git('commit', '-m', f'media for {story["id"]} (post date {post_date})'); git('pull', '--rebase', '-q'); git('push')
    return meta

def staged():
    f = ROOT / 'media' / 'latest.json'
    return json.loads(f.read_text()) if f.exists() else {}

def next_post_date(after_posting):
    """The IST date the Zap will upload this video: tomorrow if staged after the day's posting (evening), else today."""
    now = dt.datetime.now(IST); d = now.date() + dt.timedelta(days=1) if (after_posting or now.hour >= 12) else now.date()
    return d.isoformat()

def prepare(entry, q, langs, after_posting):
    story = json.loads((ROOT / 'stories' / entry['id'] / 'story.json').read_text())
    files = {lang: build(story, lang) for lang in langs}
    return story, files, stage_media(story, files, next_post_date(after_posting))

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--mode', choices=['auto', 'stage', 'post'], default='auto',
                    help='stage = render the next story and put it in media/ for the Zap; post = post the staged story to Facebook + Instagram NOW, mark it done, then stage the next one; auto = stage (and post only if repo variable POST_FROM_SCHEDULE is true)')
    ap.add_argument('--story'); ap.add_argument('--only', choices=['en', 'hi']); ap.add_argument('--dry-run', action='store_true'); a = ap.parse_args()
    q = json.loads((ROOT / 'queue.json').read_text()); langs = [a.only] if a.only else q.get('languages', ['en'])
    pending = [s for s in q['stories'] if s['status'] == 'pending']
    if a.story:   # dry-run / test of one specific story: render only
        entry = next(s for s in q['stories'] if s['id'] == a.story)
        story = json.loads((ROOT / 'stories' / entry['id'] / 'story.json').read_text()); files = {lang: build(story, lang) for lang in langs}
        out = ROOT / 'out' / story['id']; out.mkdir(parents=True, exist_ok=True)
        for lang, (mp4, png) in files.items(): shutil.copy(mp4, out / f'{lang}.mp4'); shutil.copy(png, out / f'{lang}.png')
        print('rendered (test only, nothing staged or posted):', {k: str(v[0]) for k, v in files.items()}); return
    if not pending: sys.exit('QUEUE EMPTY: no pending story in queue.json. Ask Claude to write the next batch of stories.')
    entry = pending[0]; mode = a.mode
    if mode == 'auto' and os.environ.get('POST_FROM_SCHEDULE') == 'true': mode = 'post'
    if a.dry_run:
        story = json.loads((ROOT / 'stories' / entry['id'] / 'story.json').read_text()); files = {lang: build(story, lang) for lang in langs}
        print('dry run: rendered', {k: str(v[0]) for k, v in files.items()}, '(nothing staged or posted)'); return
    if mode in ('stage', 'auto'):
        if staged().get('id') == entry['id']: print(f"already staged: {entry['id']} (post date {staged().get('date')})"); return
        prepare(entry, q, langs, after_posting=False); print('staged', entry['id']); return
    # mode == 'post': post the staged story right now (no waiting), then stage the next one
    if staged().get('id') != entry['id']: print('not staged yet: rendering first'); prepare(entry, q, langs, after_posting=False)
    story = json.loads((ROOT / 'stories' / entry['id'] / 'story.json').read_text()); meta = staged()
    sys.path.insert(0, str(ROOT / 'scripts')); import publish
    results = {lang: publish.post_all(story, lang, meta[lang]) for lang in langs}
    print(json.dumps(results, ensure_ascii=False, indent=1))
    entry['status'] = 'done'; entry['posted'] = dt.datetime.now(IST).date().isoformat(); (ROOT / 'queue.json').write_text(json.dumps(q, indent=1, ensure_ascii=False))
    git('config', 'user.name', 'purana-bot'); git('config', 'user.email', 'purana-bot@users.noreply.github.com')
    git('add', 'queue.json'); git('commit', '-m', f'posted {entry["id"]}'); git('pull', '--rebase', '-q'); git('push')
    nxt = [s for s in q['stories'] if s['status'] == 'pending']
    if nxt: prepare(nxt[0], q, langs, after_posting=True); print('staged next:', nxt[0]['id'])
    else: print('QUEUE NOW EMPTY after this post: ask Claude for the next batch of stories.')

if __name__ == '__main__': main()
