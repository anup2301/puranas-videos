# HANDOFF: Puranas daily channel (read this fully before answering anything)
*Updated 2026-11-16. Raw link for a new chat: https://raw.githubusercontent.com/anup2301/puranas-videos/main/HANDOFF.md*

## 0. How the owner wants to work (most important)
- The owner is tired of repeating himself. **Never ask for something already written here.** Start by acting on this file.
- He wants **short, simple answers** (often "yes/no"), free tools only (no monthly fees), and everything automatic. Do the work; keep explanations brief.
- Tell him plainly what is blocked and exactly which setting to change; he replies "done". Never claim something works unless it was tested.
- Past mistakes to avoid: posting a series' Part 2 the same day; Hindi narration saying "bhag ek/do"; scripts that only list events (stories must explain); waiting for 9 PM inside a GitHub job; pasting tokens (see section 9).
- He is in India (IST, UTC+5:30). Free Claude account (no Cowork/scheduled tasks).

## 1. Goal
A faceless YouTube/Facebook/Instagram channel telling one Purana story a day (English; Hindi is **paused** by the owner), as 40-60 s stick-figure shorts ("Divine Lines" style), posted automatically at 9:00 PM IST. Finish one Purana before the next (order in the puranas-daily skill, `references/books.md`; now on the **Bhagavata Purana**). Long stories become 2-3 parts, one part per day. Success is not guaranteed; the owner knows.

## 2. Accounts (all under novamindpath.youtube@gmail.com)
- YouTube channel "Novamind Path", id UCu_J8vkNE4ywrSUxHvAr61w (phone-verified, thumbnails allowed).
- Facebook Page "NovamindPath", id 1478060802048084. Instagram @nova_mind_path, id 17841466147205405 (Business, linked to that Page).
- Meta developer app "Puranas Poster" (Development mode, business portfolio NovamindPath). `FB_PAGE_TOKEN` (long-lived Page token) is a GitHub repo secret; the Check Meta token job passed.
- GitHub repo (public): **anup2301/puranas-videos**. Repo variable `PUBLISH=true` is set.
- Zapier (free plan, connections for YouTube, Drive, Sheets, Instagram, Facebook; the old Facebook/Instagram connections can't see the Page, use connection ids 0217e23f-2b6b-8580-a410-03716ab748ef (Facebook) and 02035eee-19c4-8d75-a956-91865826e9ca (Instagram) if posting by Zapier).

## 3. What is live on YouTube (all public, thumbnails set)
Intro BAXGfrFZ1wI · Prahlada Part 1 EN txtfJe34PHw · Part 2 EN ZJW7oSFpmNY · Hindi Part 1 ONsHqptjflQ · Hindi Part 2 A5vw6Kq6pNQ (owner will delete the Hindi ones himself) · **Dhruva Part 1 yGFEaR8kxfs** (posted by the Zap on 2026-11-14 21:00 IST). Early views: intro ~388, Prahlada P1 EN ~331, P2 EN ~132, Hindi 5-12.
Facebook and Instagram have: intro, Prahlada P1/P2 EN, Hindi P1/P2. **They do NOT have Dhruva Part 1** (the daily job never posted, see section 5).

## 4. The repo (everything runs from here)
- `engine/` renderer (headless Chrome + ffmpeg, Kokoro voice `bm_fable`, procedural sound). `engine/src/core/kit.js` = characters/props/scenes/captions.
- `stories/<id>/` = story.json, script.en.json (script.hi.json optional), shots.js. Model: `stories/002-prahlada-2/shots.js`, `stories/003-dhruva-1/`.
- `queue.json` = order + status (`pending`/`done`) + `languages: ["en"]`.
- `scripts/run_daily.py --mode stage|post|auto`, `scripts/publish.py` (Facebook + Instagram Graph API; YouTube direct API only if `YT_*` secrets exist), `scripts/check_meta.py`, `scripts/render_thumb.mjs`, `scripts/voice.py`, `scripts/gen_words.py`, `scripts/meta_token.py`.
- Workflows: `.github/workflows/daily.yml` (modes stage/post/test; cron 14:45 UTC only stages) and `check_meta.yml` (no-post token check).
- `media/latest.json` + `latest-en.mp4` + `thumb-en.png` = the staged video the Zap uploads. Its `date` (IST) is the day the Zap will upload it. **Currently set to 2026-11-14 on purpose** (so Dhruva Part 1 is not uploaded twice).
- `SETUP.md` = setup steps. Test a render any time: Actions > Daily Purana stories > Run workflow > mode `test` (renders in ~2.5 min, posts nothing).

## 5. The timing problem (found 2026-11-16) and the current design
GitHub ran the scheduled job 5-6 hours late every night (about 01:30-03:00 IST). The old job then waited for 21:00 IST and GitHub cancelled it after 150 min, so Facebook/Instagram never posted and the queue never advanced (3 nights). Fix pushed: GitHub no longer waits. **Mode `stage`** renders the next pending story into `media/`. **Mode `post`** posts the staged story to Facebook + Instagram immediately, marks it done, then stages the next. **A scheduler outside GitHub must trigger `post` at 21:00 IST and upload to YouTube**: today that is the Zapier Zap. The `post` mode has never run for real yet (untested).

## 6. DECISION PENDING: which scheduler (owner wants no monthly cost)
Options verified on 2026-11-16:
1. **Keep the Zap (Zapier free plan, $0, 100 tasks/month).** The Zap = Schedule 21:00 Asia/Kolkata > Code by Zapier (Python; fetches media/latest.json, outputs go/title/description/video/thumb; add the GitHub dispatch call from SETUP.md section 6) > Filter go=yes > YouTube Upload Video (with thumbnail). ~3 tasks/day (~90/month); Claude must not spend Zapier tasks in chats. It works (uploaded Dhruva P1). The owner said Zapier "charges money": check Zapier billing; it should be on the Free plan.
2. **Make.com free plan** (1,000 credits/month, 2 scenarios, 15-minute minimum schedule interval, reported 5 MB file limit, 5 min run limit). Make uses its own approved YouTube app so public uploads should work. Needs videos under 5 MB (stick-figure video compresses well; test). Not built or tested.
3. **n8n in Docker (self-hosted, free).** Exact 9 PM timing, Facebook/Instagram via Graph API fine. **But** YouTube upload via your own Google API project stays private until Google audits it (free, takes weeks), same as the direct API. Also needs a computer or free VM that is on at 9 PM. Not recommended unless the owner also wants to apply for the audit.
Whatever scheduler: it needs (a) a fine-grained GitHub token (this repo only, Actions: read/write) to dispatch `post`, and (b) the YouTube upload step.
Do NOT automate the YouTube website with a browser (against the rules).

## 7. Story queue and what to write next
| id | status |
|---|---|
| 002-prahlada-2 | done (test story) |
| 003-dhruva-1 | staged, already on YouTube; needs Facebook/Instagram (owner to decide: post now or skip) |
**Dhruva Part 2 (004-dhruva-2) is WRITTEN, tested (63 s) and in the queue as pending (added 2026-11-18); it must go out the day AFTER Part 1 reaches Facebook/Instagram.** Next to write after it: the following Bhagavata stories. (Old note: Dhruva Part 2 (the penance, Narada's mantra, Vishnu appears, the pole star; verify against Bhagavata Canto 4 ch. 8-12), then continue the Bhagavata queue) (plan 20-30 stories with chapter refs: Gajendra, Ajamila, Vamana/Bali, Krishna stories...). The queue must never run empty (the job fails with "QUEUE EMPTY" and emails the owner).

## 8. Story rules (never break)
Start inside the story (no spoken "Part one"; part tag on screen only). Hook question first, then explain cause and effect, clear payoff, closing feeling. English ends "Follow for more stories." One part per day. Respect deities (traditional iconography, no mockery), cite Purana + chapter, say "in this telling" when versions differ, verify 5-8 facts from 2+ sources, retell in own words. No blood (flash/silhouette). First frame must be a strong cover. Thumbnails: 1280x720, hero on left, 3 lines of text with one gold line (config in story.json). YouTube: public, Education, not for kids, #shorts. Details: skill `puranas-daily` (zip in outputs; references/storytelling.md, repo-pipeline.md, bilingual.md).

## 8b. Technical notes for the sandbox
- Chrome is at /opt/pw-browsers/chromium-1243/chrome-linux64/chrome; Kokoro models download from GitHub; Whisper (Hugging Face) is blocked, so timing is estimated (gen_words.py). Hindi voice: `hm_omega` via scripts/voice.py (weak quality, paused).
- The bash tool is `sh`: use `bash <<'EOF'` for brace expansion/heredocs. Long jobs must run in the foreground (background jobs get killed).
- web_fetch only opens URLs the user pasted or that appeared in search; github raw works, logs download hosts do not resolve (job conclusions are visible via the API).
- Instagram posts often answer "still processing" first; wait ~60 s and retry once (publish.py polls on its own).
- Zapier: each MCP call = 2 tasks. Thumbnail action needs a phone-verified channel (done).

## 9. Security (owner must do)
Several GitHub tokens were pasted into chats (a classic `ghp_` token with workflow scope and several fine-grained `github_pat_` tokens). **Revoke all of them** at github.com/settings/tokens once finished; Claude must never store them. For the scheduler create ONE new fine-grained token: this repo only, Actions: read/write only. The new chat should ask the owner to paste a token only when it truly needs one (e.g. to push files) and remind him to revoke it afterward.

## 10. First actions for the new chat
1. Ask nothing already answered here. Say in one line what you understood and which of section 6's options the owner picks (default: keep Zapier free if it is $0).
2. Write Dhruva Part 2 and add it to the queue (needs the owner's token once to push, or hand the files over as a zip).
3. Get the scheduler dispatching `post` at 21:00 IST; then check the first real post (Facebook/Instagram untested).
