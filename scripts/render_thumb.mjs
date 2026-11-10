// node scripts/render_thumb.mjs <cfg.json> <out.png>   (needs: npm i playwright-core, and Chrome via CHROME or /usr/bin/google-chrome)
import { chromium } from 'playwright-core';
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path'; import { fileURLToPath } from 'node:url';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'), MIME = { '.html': 'text/html', '.js': 'text/javascript', '.otf': 'font/otf', '.woff2': 'font/woff2' };
const cfg = JSON.parse(fs.readFileSync(process.argv[2], 'utf8')), out = process.argv[3];
const srv = http.createServer((q, r) => { const f = path.join(ROOT, decodeURIComponent(q.url.split('?')[0])); if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); r.end(); return; } r.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(r); });
await new Promise((ok) => srv.listen(0, '127.0.0.1', ok));
const b = await chromium.launch({ executablePath: process.env.CHROME || '/usr/bin/google-chrome', args: ['--no-sandbox'] }); const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
await p.addInitScript(`window.CFG = ${JSON.stringify(cfg)};`); p.on('pageerror', (e) => console.log('PAGEERROR', e.message));
await p.goto(`http://127.0.0.1:${srv.address().port}/thumbs/thumbs.html`); await p.waitForFunction('window.READY', null, { timeout: 20000 });
await p.locator('#cv').screenshot({ path: out }); await b.close(); srv.close(); console.log('thumbnail ->', out);
