// PRAHLADA AND NARASIMHA, PART 2 OF 2 (Bhagavata Purana, Canto 7). Divine Lines. LANG switch below.
import { ctx, W, H, TAU, clamp, lerp, seg, eo, eio, eob, rnd, rr, circle, ell, line, fillAll } from './core/lib.js';
import { L, Le } from './core/timing.js';
import * as K from './core/kit.js';
const { P, GROUND } = K;
const HI = __HI__;
const tx = (en, hi) => (HI ? hi : en);
const fr = (i, f) => L(i) + f * (Le(i) - L(i));
const INK = P.ink, nonAscii = (t) => /[^\x00-\x7F]/.test(t);

function tile(x, y, w, h, night) { rr(x - w / 2, y - h / 2, w, h, 26); ctx.fillStyle = night ? P.night : '#FFFFFF'; ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 6; ctx.stroke(); }
function xmark(x, y, r, a) { if (a <= 0) return; const k = eob(a); ctx.save(); ctx.globalAlpha = Math.min(1, a * 3); line([[x - r * k, y - r * k], [x + r * k, y + r * k]], P.red, 18); line([[x + r * k, y - r * k], [x - r * k, y + r * k]], P.red, 18); ctx.restore(); }
function sunI(x, y, s) { for (let i = 0; i < 8; i++) { const a = i * TAU / 8; line([[x + Math.cos(a) * 36 * s, y + Math.sin(a) * 36 * s], [x + Math.cos(a) * 52 * s, y + Math.sin(a) * 52 * s]], P.gold, 6 * s); } circle(x, y, 29 * s, INK); circle(x, y, 25 * s, P.gold); }
function moonI(x, y, s) { circle(x, y, 32 * s, INK); circle(x, y, 28 * s, P.night); circle(x + 14 * s, y - 8 * s, 26 * s, '#FFFFFF'); }
function houseI(x, y, s) { rr(x - 36 * s, y - 10 * s, 72 * s, 56 * s, 3); ctx.fillStyle = P.saffron; ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 4 * s; ctx.stroke(); ctx.beginPath(); ctx.moveTo(x - 48 * s, y - 10 * s); ctx.lineTo(x, y - 48 * s); ctx.lineTo(x + 48 * s, y - 10 * s); ctx.closePath(); ctx.fillStyle = P.red; ctx.fill(); ctx.stroke(); }
function treeI(x, y, s) { rr(x - 8 * s, y, 16 * s, 46 * s, 3); ctx.fillStyle = '#8B5A2B'; ctx.fill(); circle(x, y - 14 * s, 36 * s, INK); circle(x, y - 14 * s, 32 * s, '#BFE3B4'); }
function lionI(x, y, s) { for (let i = 0; i < 12; i++) { const a = i * TAU / 12; circle(x + Math.cos(a) * 30 * s, y + Math.sin(a) * 30 * s, 13 * s, P.gold); } circle(x, y, 32 * s, P.goldDark); circle(x, y, 25 * s, P.saffron); circle(x - 9 * s, y - 5 * s, 3 * s, INK); circle(x + 9 * s, y - 5 * s, 3 * s, INK); }
function swordI(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.rotate(-0.6); ctx.scale(s, s); rr(-6, -60, 12, 90, 5); ctx.fillStyle = '#D5D8DD'; ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.stroke(); line([[-22, 32], [22, 32]], INK, 8); line([[0, 32], [0, 58]], INK, 8); ctx.restore(); }
function cloudI(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#F1F1F1'; ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-50, 14); ctx.arc(-28, 8, 20, Math.PI, Math.PI * 1.5); ctx.arc(0, -8, 26, Math.PI * 1.15, Math.PI * 1.9); ctx.arc(28, 8, 20, Math.PI * 1.5, 0); ctx.lineTo(46, 14); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore(); }
function groundI(x, y, s) { line([[x - 50 * s, y], [x + 50 * s, y]], INK, 6 * s); for (let i = -3; i <= 3; i++) line([[x + i * 14 * s, y], [x + i * 14 * s - 6 * s, y + 14 * s]], INK, 4 * s); }

function dusk(t) { fillAll('#FFD7A6'); ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, GROUND); ctx.clip(); circle(540, GROUND - 30, 330, '#FF8A3D'); circle(540, GROUND - 30, 250, '#FFB25E'); ctx.restore(); moonI(860, 360, 1.6); line([[-300, GROUND], [W + 300, GROUND]], INK, 5); for (let i = 0; i < 6; i++) circle(120 + i * 170 + rnd(i) * 40, 200 + rnd(i + 9) * 300, 3, '#FFF'); }
function pillar(x, top, split, glow) {
  const w = 150, hgt = GROUND - top, s = eio(split);
  if (s > 0) { ctx.save(); ctx.globalAlpha = 0.9; rr(x - 10 - s * 40, top + 20, 20 + s * 80, hgt - 20, 6); ctx.fillStyle = P.gold; ctx.fill(); ctx.restore(); }
  if (s === 0) { rr(x - w / 2, top, w, hgt, 8); ctx.fillStyle = '#D9DADF'; ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 8; ctx.stroke(); line([[x - w / 2 + 28, top + 20], [x - w / 2 + 28, GROUND - 20]], '#FFFFFF', 8); if (glow) K.burst(x, top + hgt * 0.45, 230 * glow, P.gold, glow); return; }
  for (const side of [-1, 1]) {
    ctx.save(); ctx.translate(x + side * s * 85, GROUND); ctx.rotate(side * s * 0.16); ctx.translate(-x, -GROUND);
    ctx.beginPath(); ctx.moveTo(x, top); ctx.lineTo(x + side * w / 2, top); ctx.lineTo(x + side * w / 2, GROUND); ctx.lineTo(x, GROUND); ctx.closePath();
    ctx.fillStyle = '#D9DADF'; ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 8; ctx.lineJoin = 'round'; ctx.stroke(); ctx.restore();
  }
  if (glow) K.burst(x, top + hgt * 0.45, 230 * glow, P.gold, glow);
}
function narasimha(x, y, h, t, o = {}) {
  const r = h * 0.115, hy = y - h * 0.66 - r * 1.2; K.aura(x, hy, r, 'god', o.glow || P.vishnu, t);
  for (let i = 0; i < 18; i++) { const a = i * TAU / 18; circle(x + Math.cos(a) * r * 1.38, hy + Math.sin(a) * r * 1.38, r * 0.5, INK); circle(x + Math.cos(a) * r * 1.38, hy + Math.sin(a) * r * 1.38, r * 0.43, P.gold); }
  circle(x, hy, r * 1.4, INK); circle(x, hy, r * 1.32, P.goldDark);
  for (const sd of [-1, 1]) { circle(x + sd * r * 0.8, hy - r * 1.05, r * 0.3, INK); circle(x + sd * r * 0.8, hy - r * 1.05, r * 0.2, P.saffron); }
  K.being({ x, y, h, kind: 'human', mood: o.mood || 'grin', arms: o.arms || K.ARMS.menace, hold: (i, hx, hy2) => { for (const a of [-0.5, 0, 0.5]) line([[hx, hy2], [hx + Math.sin(a) * 26, hy2 + 28 + Math.cos(a) * 6]], P.gold, 6); }, t });
  const hw = h * 0.05; ctx.beginPath(); ctx.moveTo(x - hw, y - h * 0.42); ctx.lineTo(x + hw, y - h * 0.42); ctx.lineTo(x + hw * 1.7, y - h * 0.085); ctx.lineTo(x - hw * 1.7, y - h * 0.085); ctx.closePath(); ctx.fillStyle = P.saffron; ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = h * 0.024; ctx.stroke();
}
function doorway(x, w, top) { rr(x - w / 2, top, w, GROUND - top, 12); ctx.fillStyle = '#FFF1D6'; ctx.fill(); line([[x - w / 2, GROUND], [x - w / 2, top], [x + w / 2, top], [x + w / 2, GROUND]], INK, 18); line([[x - w / 2 - 20, GROUND], [x + w / 2 + 20, GROUND]], P.gold, 12); }
function pill(txt, x, y, s = 1) { K.partTag(txt, x, y, s); }

export function buildShots() {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.08);
  const king = (o) => K.being({ kind: 'demon', crown: P.gold, ...o });

  { const st = cut(0), xs = [0.1, 0.22, 0.34, 0.46, 0.58].map((f) => fr(0, f) - st), q = fr(0, 0.75) - st;
    add({ id: 'S01', at: st, cam: [540, 800], zoom: 0.05, note: 'the six rules, all crossed out, then a big question mark', draw(lt, d, t) {
      fillAll(P.paper); const cx = [300, 780], cy = [470, 780, 1090]; pill(tx('PART 2 OF 2', 'भाग 2 / 2'), 540, 235, 1.25);
      tile(cx[0], cy[0], 400, 270); sunI(cx[0] - 90, cy[0], 1.1); moonI(cx[0] + 90, cy[0], 1.3);
      tile(cx[1], cy[0], 400, 270); houseI(cx[1] - 90, cy[0] - 10, 1.1); treeI(cx[1] + 90, cy[0] - 20, 1.0);
      tile(cx[0], cy[1], 400, 270); K.being({ x: cx[0] - 90, y: cy[1] + 85, h: 190, kind: 'human', aura: 0 }); lionI(cx[0] + 90, cy[1], 1.4);
      tile(cx[1], cy[1], 400, 270); swordI(cx[1], cy[1], 1.6);
      tile(cx[0], cy[2], 400, 270); groundI(cx[0] - 90, cy[2] + 40, 1.0); cloudI(cx[0] + 90, cy[2] - 20, 1.3);
      [[cx[0], cy[0]], [cx[1], cy[0]], [cx[0], cy[1]], [cx[1], cy[1]], [cx[0], cy[2]]].forEach(([x, y], i) => xmark(x, y, 90, seg(lt, xs[i], xs[i] + 0.25)));
      const a = eob(seg(lt, q, q + 0.3)); tile(cx[1], cy[2], 400, 270); if (a > 0) { ctx.save(); ctx.translate(cx[1], cy[2]); ctx.scale(a, a); ctx.font = '900 200px Inter, NotoDev'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = P.gold; ctx.strokeStyle = INK; ctx.lineWidth = 14; ctx.lineJoin = 'round'; ctx.strokeText('?', 0, 10); ctx.fillText('?', 0, 10); ctx.restore(); }
    } });
    cue(0.3, 'whoosh'); xs.forEach((x) => cue(st + x, 'thud', { gain: 0.4 })); cue(st + q, 'pop'); }

  { const st = cut(1), q = fr(1, 0.6) - st;
    add({ id: 'S02', at: st, cam: [540, 850], zoom: 0.07, note: 'king mocks Prahlada beside a pillar', draw(lt, d, t) {
      K.heaven(t); pillar(560, 330, 0); K.shadow(220, GROUND, 190); K.shadow(870, GROUND, 120);
      king({ x: 220, y: GROUND, h: 780, dir: 1, mood: 'grin', arms: K.ARMS.point, t }); K.being({ x: 870, y: GROUND, h: 430, dir: -1, kind: 'human', mood: 'calm', arms: K.ARMS.pray });
    } });
    cue(st, 'whoosh'); cue(st + q, 'thud', { gain: 0.5 }); }

  { const st = cut(2), gl = fr(2, 0.55) - st;
    add({ id: 'S03', at: st, cam: [650, 900], zoom: 0.09, note: 'Prahlada calm, the pillar glows: He is everywhere', draw(lt, d, t) {
      K.heaven(t); pillar(400, 330, 0, eob(seg(lt, gl, gl + 0.5)) * 0.9); K.shadow(760, GROUND, 170);
      K.being({ x: 760, y: GROUND, h: 640, kind: 'human', mood: 'calm', arms: K.ARMS.pray });
    } });
    cue(st, 'whoosh'); cue(st + gl, 'sparkle', { gain: 0.6 }); }

  { const st = cut(3), hit = fr(3, 0.55) - st;
    add({ id: 'S04', at: st, cam: [540, 850], zoom: 0.09, note: 'the king strikes the pillar', draw(lt, d, t) {
      K.heaven(t); const sh = lt > hit ? Math.sin(lt * 80) * 9 * Math.exp(-(lt - hit) * 3) : 0; ctx.save(); ctx.translate(sh, 0); pillar(720, 330, 0); ctx.restore();
      K.shadow(300, GROUND, 220); king({ x: 300, y: GROUND, h: 860, dir: 1, mood: 'angry', arms: lt < hit ? [[150, 25], [-60, -10]] : [[95, 5], [-60, -10]], t });
      if (lt > hit) K.burst(650, 800, 220 * eob(seg(lt, hit, hit + 0.2)), P.red, 1 - seg(lt, hit + 0.2, hit + 0.8));
    } });
    cue(st, 'whoosh'); cue(st + hit, 'slam', { gain: 0.7 }); }

  { const st = cut(4);
    add({ id: 'S05', at: st, cam: [540, 800], zoom: 0.06, note: 'dusk: neither day nor night', draw(lt, d, t) {
      dusk(t); pillar(540, 330, 0); const a = eob(seg(lt, 0.3, 0.7)); pill(tx('DUSK', 'संध्या'), 540, 230, 1.5 * a);
    } });
    cue(st, 'whoosh'); cue(st + 0.4, 'sparkle', { gain: 0.4 }); }

  { const st = cut(5), sp = fr(5, 0.12) - st, em = fr(5, 0.4) - st;
    add({ id: 'S06', at: st, cam: [540, 850], zoom: 0.09, note: 'the pillar splits; Narasimha emerges', draw(lt, d, t) {
      dusk(t); const s = seg(lt, sp, sp + 0.5); pillar(540, 330, s); const a = eob(seg(lt, em, em + 0.45));
      if (a > 0) { ctx.save(); ctx.globalAlpha = Math.min(1, a * 1.6); narasimha(540, GROUND, 900 * Math.min(1, a), t); ctx.restore(); }
      if (lt > em) K.burst(540, 560, 520 * eob(seg(lt, em, em + 0.3)), P.gold, 0.85);
    } });
    cue(st, 'whoosh'); cue(st + sp, 'slam', { gain: 0.7 }); cue(st + em, 'sparkle', { gain: 0.7 }); }

  { const st = cut(6);
    add({ id: 'S07', at: st, cam: [540, 850], zoom: 0.07, note: 'in the doorway: neither inside nor outside', draw(lt, d, t) {
      dusk(t); doorway(540, 520, 250); narasimha(540, GROUND, 860, t);
      king({ x: 830, y: GROUND - 250 + 14 * Math.sin(t * 5), h: 300, dir: -1, mood: 'shock', arms: [[145, 20], [-145, -20]], aura: 0 }); pill(tx('THE DOORWAY', 'चौखट'), 540, 170, 1.3);
    } });
    cue(st, 'whoosh'); cue(st + 0.5, 'thud', { gain: 0.5 }); }

  { const st = cut(7);
    add({ id: 'S08', at: st, cam: [540, 850], zoom: 0.07, note: 'across his lap: not ground, not sky', draw(lt, d, t) {
      dusk(t); narasimha(540, GROUND, 860, t, { arms: [[40, 70], [-40, -70]] }); const hipY = GROUND - 860 * 0.4;
      ctx.save(); ctx.translate(560, hipY - 20); ctx.rotate(-Math.PI / 2); king({ x: 0, y: 0, h: 330, mood: 'shock', aura: 0, arms: [[120, 20], [-120, -20]] }); ctx.restore(); pill(tx('ON HIS LAP', 'गोद में'), 540, 170, 1.3);
    } });
    cue(st, 'whoosh'); }

  { const st = cut(8), fl = fr(8, 0.62) - st;
    add({ id: 'S09', at: st, cam: [540, 800], zoom: 0.1, note: 'claws, no weapon; a white flash', draw(lt, d, t) {
      dusk(t); const hx = 540, hy = 760; circle(hx, hy, 190, INK); circle(hx, hy, 180, '#FFFFFF'); for (let i = -2; i <= 2; i++) { const bx = hx + i * 70; ctx.beginPath(); ctx.moveTo(bx - 20, hy - 150); ctx.lineTo(bx, hy - 330 - Math.abs(i) * -20); ctx.lineTo(bx + 20, hy - 150); ctx.closePath(); ctx.fillStyle = P.gold; ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 6; ctx.lineJoin = 'round'; ctx.stroke(); }
      K.burst(hx, hy - 120, 380 + 20 * Math.sin(t * 6), P.gold, 0.8); pill(tx('NO WEAPON', 'कोई शस्त्र नहीं'), 540, 230, 1.3);
      if (lt > fl) { ctx.save(); ctx.globalAlpha = Math.sin(clamp((lt - fl) / 0.5) * Math.PI) * 0.95; ctx.fillStyle = '#FFFFFF'; ctx.fillRect(-300, -300, W + 600, H + 600); ctx.restore(); }
    } });
    cue(st, 'whoosh'); cue(st + fl, 'slam', { gain: 0.8 }); }

  { const st = cut(9), wk = fr(9, 0.45) - st;
    add({ id: 'S10', at: st, cam: [540, 850], zoom: 0.09, note: 'fury shakes the worlds; only Prahlada walks forward', draw(lt, d, t) {
      K.underworld(t); const sh = Math.sin(t * 60) * 5; ctx.save(); ctx.translate(sh, 0);
      narasimha(540, GROUND, 860, t, { glow: P.red, mood: 'angry', arms: [[150, 20], [-150, -20]] }); ctx.restore();
      for (const [x, dir] of [[110, 1], [970, -1]]) K.being({ x, y: GROUND, h: 300, dir, kind: 'god', dark: true, arms: [[150, 20], [-150, -20]], aura: 0 });
      const p = eio(seg(lt, wk, wk + 0.9)); if (lt > wk - 0.2) K.being({ x: lerp(930, 700, p), y: GROUND, h: 340, dir: -1, kind: 'human', dark: true, mood: 'calm', arms: K.ARMS.pray, walk: p < 1 ? lt * 8 : undefined });
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'alarm', { gain: 0.3 }); cue(st + wk, 'sparkle', { gain: 0.4 }); }

  { const st = cut(10);
    add({ id: 'S11', at: st, cam: [540, 850], zoom: 0.08, note: 'the lion calms; Prahlada prays at his feet', draw(lt, d, t) {
      K.heaven(t); K.burst(540, 520, 380 + 12 * Math.sin(t * 3), P.gold, 0.6); K.shadow(540, GROUND, 230); narasimha(540, GROUND, 860, t, { mood: 'bless', arms: [[40, 25], [-40, -25]], glow: P.gold });
      K.being({ x: 330, y: GROUND, h: 300, dir: 1, kind: 'human', mood: 'calm', arms: K.ARMS.pray, aura: 0 });
    } });
    cue(st, 'whoosh'); cue(st + 0.6, 'sparkle', { gain: 0.6 }); }

  { const st = cut(11);
    add({ id: 'S12', at: st, cam: [540, 850], zoom: 0.08, note: 'next story card', draw(lt, d, t) {
      K.heaven(t); K.shadow(540, GROUND, 230); K.being({ x: 540, y: GROUND, h: 860, kind: 'god', glow: P.vishnu, t, hold: (i, x, y) => { if (i === 2) K.chakra(x - 4, y - 6, 0.9, t); if (i === 3) K.lotus(x, y - 4, 1.1); } });
      K.nameCard(tx('COMING TOMORROW', 'कल की कहानी'), tx('A NEW STORY', 'एक नई कथा'), 540, 190 - 160 * (1 - eob(seg(lt, 0.1, 0.5))), 1.25);
    } });
    cue(st, 'whoosh'); cue(st + 0.5, 'pop'); }

  return { shots: S, cues: CUES };
}
