# Handoff: Puranas Daily Pipeline
*Last updated: 2026-11-13. Paste this into a new chat to resume without repeating history.*

---

## Quick start for the new chat
Say: **"Continue the Puranas daily pipeline. Read HANDOFF.md."**
Then paste the contents of this file, or send the GitHub link:
https://raw.githubusercontent.com/anup2301/puranas-videos/main/HANDOFF.md

---

## What exists

### YouTube channel
- **Channel:** NovamindPath (novamindpath.youtube@gmail.com)
- **Videos live:** Channel intro, Prahlada Part 1 & 2 (English), Hindi Part 1 & 2 (owner to delete Hindi ones)
- **Thumbnails:** set on all 5 videos. Phone-verified.

### GitHub repo: `anup2301/puranas-videos`
- **Purpose:** daily automated story pipeline. Renders at 8:15 PM IST, posts at 9:00 PM IST.
- **Workflow:** `.github/workflows/daily.yml` (scheduled `cron: '45 14 * * *'`)
- **Queue file:** `queue.json` — `PUBLISH=true` variable is set. First pending story: `003-dhruva-1`.
- **Engine:** `engine/` — Divine Lines style (white paper, ink stick figures, gold for gods, red for demons, 1080x1920 30fps)
- **Scripts:** `scripts/run_daily.py` (orchestrator), `scripts/publish.py` (Facebook + Instagram + optional YouTube API), `scripts/voice.py` (Kokoro English TTS), `scripts/gen_words.py` (caption timing), `scripts/render_thumb.mjs` (1280x720 thumbnail)
- **Stories:** `stories/<id>/` — story.json, script.en.json, shots.js
- **Setup guide:** `SETUP.md`

### Social accounts (all novamindpath.youtube@gmail.com)
- **YouTube:** connected via Zapier (upload + thumbnail in one step)
- **Facebook Page:** NovamindPath, id `1478060802048084`, connected via `FB_PAGE_TOKEN` secret
- **Instagram:** @nova_mind_path, id `17841466147205405`, same `FB_PAGE_TOKEN`

### Zapier Zap (free plan, ~90 tasks/month)
- **Trigger:** Schedule, every day 9:00 PM Asia/Kolkata
- **Step 2:** Code by Zapier (Python) — fetches `media/latest.json` from the repo
- **Filter:** only continues if `go = yes` (today's date matches the file date)
- **Step 4:** YouTube → Upload Video (title, description, video URL, thumbnail from step 2)
- **Note:** Zapier free = 100 tasks/month. Don't use Zapier for other things in chat while this Zap is active.

### Meta developer app
- **App name:** Puranas Poster (NovamindPath business portfolio, unverified, Development mode)
- **Use cases:** Manage messaging & content on Instagram + Manage everything on your Page
- **Token type:** long-lived Page token (60-day), stored as `FB_PAGE_TOKEN` GitHub secret

---

## Pipeline flow (each day)
1. GitHub Actions (8:15 PM IST): reads `queue.json`, finds first `pending` story
2. Renders English MP4 + thumbnail (takes ~3 minutes)
3. Writes `media/latest-en.mp4`, `media/thumb-en.png`, `media/latest.json` to repo
4. Waits until 9:00 PM IST
5. Posts to Facebook Page and Instagram Reels via Meta Graph API
6. Marks story `done` in `queue.json`, commits
7. Zapier Zap (9:00 PM IST): reads `media/latest.json`, uploads to YouTube with thumbnail
8. If anything fails → GitHub emails the owner

---

## Story queue status
| id | status | notes |
|---|---|---|
| 002-prahlada-2 | done | Prahlada & Narasimha Part 2 (posted manually 2026-11-09) |
| 003-dhruva-1 | **pending** | The Boy Who Refused to Accept It — Part 1 of 2. Posting tonight (2026-11-13) |

**Next to write:** Dhruva Part 2 (what a five-year-old taught the gods: the penance, Vishnu appears, Dhruva gets the pole star but wants something else). Then continue through the Bhagavata Purana queue.

---

## Story writing rules (critical — never break these)
- **One part per day.** Never post Part 2 on the same day as Part 1.
- **Start inside the story.** No "Part one" spoken aloud. The part tag is on-screen only.
- **English only for now.** Hindi is paused (owner's decision). Don't add Hindi unless owner says to resume.
- **Hook first.** Open with a question or bold claim. Answer it scene by scene.
- **End English with:** "Follow for more stories."
- **Respect.** Deities drawn in traditional iconography. Cite Purana and chapter. Say "in this telling" when recensions differ.
- **Violence:** flash/silhouette only. No blood.
- **Source check:** verify 5-8 key facts before writing. Use Wisdomlib, vedabase.net, krishnakosh.org, sacred-texts.com.
- **Book order:** finish all stories from one Purana before the next. Currently on **Bhagavata Purana** (Canto 4 Dhruva → then Gajendra, Vamana/Bali, Krishna stories, etc.)

---

## Story package format
Each story = folder `stories/<NNN-slug>/` with:
- `story.json` — id, book, sources, `en.title`, `en.description` (YouTube), `en.tags`, `en.facebook`, `en.instagram`, `en.thumb` (bg/hero/lines/hi/size)
- `script.en.json` — voice `bm_fable`, speed 0.98, lines with text + caps (`*word` = gold)
- `shots.js` — bilingual template with `__HI__` placeholder (use `stories/002-prahlada-2/shots.js` as model: `tx(en,hi)` for on-screen text, `fr(i,f)` for timing, first frame = strong cover)

Add id to `queue.json` as `{"id":"...", "status":"pending"}`.
Push with the GitHub contents API or git.

---

## Thumbnail format
Config in `story.json` → `en.thumb`:
```json
{ "bg": "dark|light|dusk", "hero": "king|god|narasimha|human", "lines": ["LINE 1", "LINE 2", "LINE 3"], "hi": 2, "size": 108 }
```
Rendered by `scripts/render_thumb.mjs`. 1280x720. Big hero on the left, 3 lines of text on the right, gold line = `hi` index.

---

## Character kit (engine/src/core/kit.js)
- **God:** crown, gold halo + 12 rays, calm eyes, tilak, saffron dhoti, 4 arms (`ARMS.four`)
- **Demon:** red horns, flame aura, slit eyes, fanged grin, crimson rags, `dark:true` on black bg
- **Sage:** jata bun, ash halo, white beard, white wrap
- **Human:** plain, no aura
- Glow colours: Vishnu `#4C7FD6`, Shiva `#9AD1FF`, Devi `#E0457B`, gold default
- Scenes: `K.heaven(t)`, `K.underworld(t)`, `K.ocean(t)`, `K.nightSky(t)`
- Props: `K.lotus`, `K.chakra`, `K.trident`, `K.mace`, `K.flame`

---

## GitHub tokens (REVOKE THESE)
Two tokens were pasted in chat. Owner should revoke both at github.com/settings/tokens now that the pipeline is live. The daily job uses `FB_PAGE_TOKEN` and `PUBLISH` secrets only — no GitHub token is stored.

---

## Channel growth notes
- English videos avg ~350 views in first few days. Hindi near zero (paused).
- Channel name "Novamind Path" doesn't say what the channel is. Consider renaming to "Purana Stories" or similar.
- End each video with a question to drive comments.
- Reply to comments in the first hour.
- Use YouTube Studio retention graph to find drop-off points.
- Post at exactly 9:00 PM IST every day for consistency.
- Each series → pin a comment pointing to Part 2.
