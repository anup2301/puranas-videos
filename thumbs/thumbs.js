// Config-driven 1280x720 thumbnail: window.CFG = { bg: 'dark'|'light'|'dusk', hero: 'king'|'god'|'narasimha', lines: [...], hi: <index of the gold line>, size: 112 }
import { setCtx, TAU, circle, line } from '/engine/src/core/lib.js';
import * as K from '/engine/src/core/kit.js';
import * as lib from '/engine/src/core/lib.js';
const { P } = K, INK = P.ink, W = 1280, H = 720;
const cv = document.getElementById('cv'), c = cv.getContext('2d'); setCtx(c);
await document.fonts.load('900 100px Inter'); await document.fonts.load('900 100px NotoDev', 'अ');
const cfg = window.CFG || { bg: 'light', hero: 'god', lines: ['TEST', 'THUMBNAIL'], hi: 1, size: 112 };
function narasimha(x, y, h, t) {
  const r = h * 0.115, hy = y - h * 0.66 - r * 1.2; K.aura(x, hy, r, 'god', P.vishnu, t);
  for (let i = 0; i < 18; i++) { const a = i * TAU / 18, px = x + Math.cos(a) * r * 1.38, py = hy + Math.sin(a) * r * 1.38; circle(px, py, r * 0.5, INK); circle(px, py, r * 0.43, P.gold); }
  circle(x, hy, r * 1.4, INK); circle(x, hy, r * 1.32, P.goldDark);
  for (const sd of [-1, 1]) { circle(x + sd * r * 0.8, hy - r * 1.05, r * 0.3, INK); circle(x + sd * r * 0.8, hy - r * 1.05, r * 0.2, P.saffron); }
  K.being({ x, y, h, kind: 'human', mood: 'grin', arms: K.ARMS.menace, hold: (i, hx, hy2) => { for (const a of [-0.5, 0, 0.5]) line([[hx, hy2], [hx + Math.sin(a) * 22, hy2 + 24]], P.gold, 6); }, t });
  const hw = h * 0.05; c.beginPath(); c.moveTo(x - hw, y - h * 0.42); c.lineTo(x + hw, y - h * 0.42); c.lineTo(x + hw * 1.7, y - h * 0.085); c.lineTo(x - hw * 1.7, y - h * 0.085); c.closePath(); c.fillStyle = P.saffron; c.fill(); c.strokeStyle = INK; c.lineWidth = h * 0.024; c.stroke();
}
function text(lines, hi, x, size) {
  c.save(); c.font = `900 ${size}px Inter, NotoDev`; const mw = Math.max(...lines.map((t) => c.measureText(t).width)), k = Math.min(1, (W - x - 40) / mw); size *= k;
  c.font = `900 ${size}px Inter, NotoDev`; c.textAlign = 'left'; c.textBaseline = 'middle'; c.lineJoin = 'round'; const y0 = 360 - (lines.length - 1) * size * 1.12 / 2;
  lines.forEach((t, i) => { const yy = y0 + i * size * 1.12; c.lineWidth = size * 0.2; c.strokeStyle = INK; c.strokeText(t, x, yy); c.fillStyle = i === hi ? P.gold : '#FFFFFF'; c.fillText(t, x, yy); }); c.restore();
}
if (cfg.bg === 'dark') { c.fillStyle = P.night; c.fillRect(0, 0, W, H); const g = c.createRadialGradient(300, 330, 40, 300, 330, 520); g.addColorStop(0, 'rgba(229,56,59,0.55)'); g.addColorStop(1, 'rgba(229,56,59,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H); for (let i = 0; i < 40; i++) circle(lib.rnd(i) * W, lib.rnd(i + 50) * H, 1.5 + lib.rnd(i + 99) * 2.5, 'rgba(255,255,255,0.5)'); line([[0, 690], [W, 690]], P.bone, 4); }
else if (cfg.bg === 'dusk') { c.fillStyle = '#FFD7A6'; c.fillRect(0, 0, W, H); c.save(); c.beginPath(); c.rect(0, 0, W, 690); c.clip(); circle(330, 700, 330, '#FF8A3D'); circle(330, 700, 250, '#FFB25E'); c.restore(); line([[0, 690], [W, 690]], INK, 5); }
else { c.fillStyle = '#FFFFFF'; c.fillRect(0, 0, W, H); circle(330, 340, 330, '#FFF4DA'); line([[0, 690], [W, 690]], INK, 5); }
if (cfg.hero === 'king') K.being({ x: 330, y: 690, h: 650, kind: 'demon', dark: cfg.bg === 'dark', crown: P.gold, mood: 'grin', t: 0.5 });
else if (cfg.hero === 'narasimha') narasimha(330, 690, 650, 0.5);
else { K.shadow(330, 690, 200); K.being({ x: 330, y: 690, h: 640, kind: 'god', glow: cfg.glow, t: 0.5, hold: (i, x, y) => { if (i === 2) K.chakra(x - 4, y - 6, 0.7); if (i === 3) K.lotus(x, y - 4, 0.8); } }); }
text(cfg.lines, cfg.hi, 650, cfg.size || 112); window.READY = true;
