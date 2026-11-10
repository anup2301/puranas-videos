# One-time setup (all free)

Everything runs in GitHub Actions at **20:15 IST** (render both languages) and **posts at 21:00 IST**, English first, then Hindi.
If anything is blocked, the job fails and GitHub emails you the reason (make sure Actions failure emails are on: GitHub > Settings > Notifications).

## 0. Activate the workflow (one time)
GitHub does not let a normal access token create workflow files. Either:
- (easiest) In the repo on github.com: Add file > Create new file, name it `.github/workflows/daily.yml`, paste the contents of `setup/daily.yml`, commit; or
- create a new fine-grained token for this repo with permissions Contents: read/write, **Workflows: read/write**, Actions: read/write, and give it to Claude (in a chat), who can then add the file and start test runs.

## 1. Test the renderer (no accounts needed)
Actions tab > "Daily Purana stories" > Run workflow > story `002-prahlada-2`, dry_run = true. After ~15 minutes open the run and download the `rendered` artifact (English and Hindi MP4 + thumbnails). Nothing is posted.

## 2. Facebook Page + Instagram Reels (free, direct API)
1. developers.facebook.com > My Apps > Create App (type Business). Add the Facebook Login product if asked. Keep the app in Development mode (works for your own Page and Instagram because you are the app admin).
2. Your Instagram must be a Business/Professional account linked to your Facebook Page (you already did this).
3. Tools > Graph API Explorer. Pick your app. Click "Get User Access Token" and tick: `pages_show_list`, `pages_read_engagement`, `pages_manage_posts`, `publish_video`, `instagram_basic`, `instagram_content_publish`, `business_management`. Choose your Page when asked. Copy the token.
4. On your computer: `python scripts/meta_token.py APP_ID APP_SECRET THAT_TOKEN`. It prints your Page id, your Instagram business id and a long-lived PAGE token.
5. GitHub repo > Settings > Secrets and variables > Actions > New repository secret: `FB_PAGE_TOKEN` = the page token. (Page id `1478060802048084` and Instagram id `17841466147205405` are already the defaults; if the helper prints different ids, add secrets `FB_PAGE_ID` / `IG_USER_ID`.)
Meta changes its screens and permission names often. If a step differs, tell Claude what you see.

## 3. YouTube (free Zapier Zap; direct API uploads stay private until Google audits the project)
The pipeline writes `media/latest.json` plus `latest-en.mp4`, `latest-hi.mp4`, `thumb-en.png`, `thumb-hi.png` to this repo before 21:00 IST.
Create one Zap on zapier.com:
- Trigger: **Schedule by Zapier**, every day at 9:00 PM (your time zone: Asia/Kolkata).
- Action 1: **Code by Zapier** (Run Python): fetch `https://raw.githubusercontent.com/anup2301/puranas-videos/main/media/latest.json` with `requests`, return `en_title, en_description, en_video, hi_title, hi_description, hi_video` (plus tags). 
- Action 2: **YouTube > Upload Video** (English): video URL = `en_video`, title, description, Privacy = Public, Category = Education, Made for kids = No.
- Action 3: **YouTube > Upload Video** (Hindi), same with the `hi_` fields.
Free Zapier plan = 100 tasks/month. This Zap uses 3 tasks a day = ~90 a month, so it fits only if nothing else uses Zapier (thumbnails would need 2 more tasks a day: set thumbnails in YouTube Studio by hand from the `thumb-*.png` files, or upgrade). Check zapier.com/pricing, plans change.
Alternative, fully free but slower to start: apply for Google's YouTube API compliance audit, then add secrets `YT_CLIENT_ID`, `YT_CLIENT_SECRET`, `YT_REFRESH_TOKEN` and the pipeline uploads (with thumbnails) by itself. Until the audit passes, API uploads are locked private.

## 4. Switch on daily posting
Repo > Settings > Secrets and variables > Actions > Variables > New variable `PUBLISH` = `true`. Until then the scheduled run only renders (dry run).

## 5. Feeding the queue
`queue.json` lists story ids in order; the daily job posts the first `pending` one and marks it `done`. When the queue is empty the job fails with "QUEUE EMPTY" (you get an email): ask Claude for the next batch. Claude writes each story as a folder `stories/<id>/` (story.json, script.en.json, script.hi.json, shots.js), checks the facts against sources, and adds the id to the queue. A series posts one part per day.
