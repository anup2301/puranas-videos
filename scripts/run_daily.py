#!/usr/bin/env python3
"""Daily Purana story pipeline (free, runs in GitHub Actions or on any computer).

  python scripts/run_daily.py                    next pending story: render the languages in queue.json, wait for 21:00 IST, publish
  python scripts/run_daily.py --dry-run          render only (nothing is posted or committed)
  python scripts/run_daily.py --story ID --only en --dry-run

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

def wait_until(hhmm):
    h, m = map(int, hhmm.split(':')); now = dt.datetime.now(IST); target = now.replace(hour=h, minute=m, second=0, microsecond=0)
    if now >= target + dt.timedelta(hours=6): return    # a manual run late in the evening: do not wait for tomorrow
    while dt.datetime.now(IST) < target:
        left = (target - dt.datetime.now(IST)).total_seconds(); print(f'waiting {left:.0f}s until {hhmm} IST', flush=True); time.sleep(min(60, max(1, left)))

def stage_media(story, files):
    media = ROOT / 'media'
    if media.exists(): shutil.rmtree(media)
    media.mkdir()
    meta = {'id': story['id'], 'date': dt.datetime.now(IST).date().isoformat()}
    for lang, (mp4, png) in files.items():
        shutil.copy(mp4, media / f'latest-{lang}.mp4'); shutil.copy(png, media / f'thumb-{lang}.png')
        meta[lang] = {k: story[lang][k] for k in ('title', 'description', 'tags')}
        meta[lang]['video_url'] = f'{RAW}/media/latest-{lang}.mp4'; meta[lang]['thumbnail_url'] = f'{RAW}/media/thumb-{lang}.png'
    (media / 'latest.json').write_text(json.dumps(meta, ensure_ascii=False, indent=1))
    git('config', 'user.name', 'purana-bot'); git('config', 'user.email', 'purana-bot@users.noreply.github.com')
    git('add', 'media'); git('commit', '-m', f'media for {story["id"]}'); git('pull', '--rebase', '-q'); git('push')
    return meta

def main():
    ap = argparse.ArgumentParser(); ap.add_argument('--story'); ap.add_argument('--only', choices=['en', 'hi']); ap.add_argument('--dry-run', action='store_true'); a = ap.parse_args()
    q = json.loads((ROOT / 'queue.json').read_text())
    if a.story: entry = next(s for s in q['stories'] if s['id'] == a.story)
    else:
        entry = next((s for s in q['stories'] if s['status'] == 'pending'), None)
        if not entry: sys.exit('QUEUE EMPTY: no pending story in queue.json. Ask Claude to write the next batch of stories.')
    story = json.loads((ROOT / 'stories' / entry['id'] / 'story.json').read_text()); langs = [a.only] if a.only else q.get('languages', ['en'])
    files = {lang: build(story, lang) for lang in langs}
    out = ROOT / 'out' / story['id']; out.mkdir(parents=True, exist_ok=True)
    for lang, (mp4, png) in files.items(): shutil.copy(mp4, out / f'{lang}.mp4'); shutil.copy(png, out / f'{lang}.png')
    print('rendered:', {k: str(v[0]) for k, v in files.items()})
    if a.dry_run: print('dry run: nothing posted'); return
    meta = stage_media(story, files)
    wait_until(q.get('publish_time_ist', '21:00'))
    sys.path.insert(0, str(ROOT / 'scripts')); import publish
    results = {}
    for lang in langs: results[lang] = publish.post_all(story, lang, meta[lang])
    print(json.dumps(results, ensure_ascii=False, indent=1))
    if not a.story: entry['status'] = 'done'; entry['posted'] = meta['date']; (ROOT / 'queue.json').write_text(json.dumps(q, indent=1, ensure_ascii=False))
    git('add', 'queue.json'); git('commit', '-m', f'posted {story["id"]}', '--allow-empty'); git('pull', '--rebase', '-q'); git('push')

if __name__ == '__main__': main()
