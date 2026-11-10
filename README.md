# Puranas stories: daily automatic shorts (English + Hindi)

Free pipeline: GitHub Actions renders stick-figure story shorts (Divine Lines style, Kokoro voice, procedural sound), then posts to Facebook, Instagram and YouTube every day at 9:00 PM IST.

- `engine/`: the video renderer (headless Chrome + ffmpeg), characters in `src/core/kit.js`
- `stories/<id>/`: one folder per video part (story.json, script.en.json, script.hi.json, shots.js)
- `queue.json`: order of stories and their status
- `scripts/`: `run_daily.py` (orchestrator), `publish.py` (Facebook, Instagram, optional YouTube API), `voice.py`, `gen_words.py`, `render_thumb.mjs`, `meta_token.py`
- `.github/workflows/daily.yml`: schedule
- `SETUP.md`: the one-time setup steps

Rules: one part per day, English only for now (Hindi paused), no language labels, story starts at once, thumbnails on every YouTube video, respectful retellings with named sources.
