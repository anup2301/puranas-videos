# DISABLED on 2026-11-24: YouTube upload runs through Make.com instead. Uncomment to re-enable.
# import datetime
# import json
# import os
# import tempfile
# import urllib.request
# from zoneinfo import ZoneInfo
#
# from google.auth.transport.requests import Request
# from google.oauth2.credentials import Credentials
# from googleapiclient.discovery import build
# from googleapiclient.http import MediaFileUpload
#
# LATEST_JSON_URL = (
#     "https://raw.githubusercontent.com/anup2301/puranas-videos/main/media/latest.json"
# )
# SCOPES = [
#     "https://www.googleapis.com/auth/youtube.force-ssl",
#     "https://www.googleapis.com/auth/youtube.readonly",
#     "https://www.googleapis.com/auth/youtube.upload",
# ]
#
#
# def get_ist_today() -> str:
#     return datetime.datetime.now(ZoneInfo("Asia/Kolkata")).date().isoformat()
#
#
# def download_file(url: str, suffix: str) -> str:
#     req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
#     with urllib.request.urlopen(req, timeout=60) as resp, tempfile.NamedTemporaryFile(
#         delete=False, suffix=suffix
#     ) as tmp:
#         tmp.write(resp.read())
#         return tmp.name
#
#
# def get_youtube_service():
#     creds = Credentials(
#         token=None,
#         refresh_token=os.environ["YOUTUBE_REFRESH_TOKEN"],
#         token_uri="https://oauth2.googleapis.com/token",
#         client_id=os.environ["YOUTUBE_CLIENT_ID"],
#         client_secret=os.environ["YOUTUBE_CLIENT_SECRET"],
#         scopes=SCOPES,
#     )
#     creds.refresh(Request())
#     return build("youtube", "v3", credentials=creds)
#
#
# def main():
#     with urllib.request.urlopen(LATEST_JSON_URL, timeout=20) as resp:
#         data = json.loads(resp.read().decode("utf-8"))
#
#     today = get_ist_today()
#     if data.get("date") != today:
#         print(f"Skipping: latest.json date ({data.get('date')}) != IST today ({today})")
#         return
#
#     en = data.get("en", {})
#     title = en.get("title", "").strip()
#     description = en.get("description", "").strip()
#     video_url = en.get("video_url", "").strip()
#     thumbnail_url = en.get("thumbnail_url", "").strip()
#
#     if not title or not video_url:
#         raise ValueError("Missing required 'title' or 'video_url' in latest.json")
#
#     video_path = download_file(video_url, ".mp4")
#     thumb_path = download_file(thumbnail_url, ".jpg") if thumbnail_url else None
#
#     try:
#         youtube = get_youtube_service()
#         body = {
#             "snippet": {
#                 "title": title[:100],
#                 "description": description[:5000],
#                 "categoryId": "22",
#             },
#             "status": {
#                 "privacyStatus": "public",
#                 "selfDeclaredMadeForKids": False,
#             },
#         }
#         media = MediaFileUpload(video_path, mimetype="video/mp4", resumable=True)
#         request = youtube.videos().insert(
#             part="snippet,status", body=body, media_body=media
#         )
#         response = None
#         while response is None:
#             _, response = request.next_chunk()
#
#         video_id = response["id"]
#         print(f"Uploaded video ID: {video_id}")
#
#         if thumb_path:
#             youtube.thumbnails().set(
#                 videoId=video_id,
#                 media_body=MediaFileUpload(thumb_path, mimetype="image/jpeg"),
#             ).execute()
#             print("Uploaded custom thumbnail.")
#     finally:
#         if os.path.exists(video_path):
#             os.remove(video_path)
#         if thumb_path and os.path.exists(thumb_path):
#             os.remove(thumb_path)
#
#
# if __name__ == "__main__":
#     main()
