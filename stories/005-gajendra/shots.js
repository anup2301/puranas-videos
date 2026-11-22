// GAJENDRA (Bhagavata Purana, Canto 8, ch. 2-4). Divine Lines.
import { ctx, W, H, TAU, lerp, seg, eio, eob, rr, circle, ell, line, fillAll } from './core/lib.js';
import { L, Le } from './core/timing.js';
import * as K from './core/kit.js';
const { P, GROUND } = K, INK = P.ink;
const HI = __HI__;
const EG = '#C9CED6';
function tree(x, y, s = 1) { rr(x - 12 * s, y - 20 * s, 24 * s, 120 * s, 4 * s); ctx.fillStyle = '#8B5A2B'; ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 6 * s; ctx.stroke(); for (const [ox, oy, r] of [[0, -55, 70], [-30, -20, 55], [30, -20, 55]]) { circle(x + ox * s, y + oy * s, r * s, INK); circle(x + ox * s, y + oy * s, (r - 7) * s, '#BFE3B4'); } }
function pill(txt, x, y, s = 1, col = P.gold) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.font = '900 44px Inter, NotoDev'; const tw = ctx.measureText(txt).width + 60; rr(-tw / 2, -32, tw, 64, 32); ctx.fillStyle = col; ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 5; ctx.stroke(); ctx.fillStyle = INK; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(txt, 0, 2); ctx.restore(); }
function water(t, top = GROUND - 90) { ctx.fillStyle = '#BFE6FA'; ctx.fillRect(0, top, W, GROUND - top + 4); for (let r = 0; r < 3; r++) { ctx.beginPath(); for (let x = -20; x <= W + 20; x += 20) { const yy = top + 14 + r * 26 + Math.sin(x * 0.02 + t * 2 + r) * 7; x === -20 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy); } ctx.strokeStyle = '#6EC6F5'; ctx.lineWidth = 6; ctx.stroke(); } }
// elephant facing right (dir 1) or left (-1); x,y = feet level
function elephant(x, y, s = 1, dir = 1, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(dir * s, s);
  const lw = o.lean || 0;
  ctx.lineWidth = 7; ctx.strokeStyle = INK; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  for (const lx of [-90, -40, 40, 90]) { rr(lx - 20, -110, 40, 110, 14); ctx.fillStyle = EG; ctx.fill(); ctx.stroke(); }
  ctx.save(); ctx.translate(lw, 0); ell(0, -190, 150, 100, EG); ctx.beginPath(); ctx.ellipse(0, -190, 150, 100, 0, 0, TAU); ctx.stroke(); ctx.restore();
  const hx = 140 + lw, hy = -230;
  circle(hx, hy, 72, INK); circle(hx, hy, 65, EG);
  ctx.beginPath(); ctx.ellipse(hx - 40, hy + 10, 46, 62, 0.2, 0, TAU); ctx.fillStyle = '#B7BCC6'; ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(hx + 50, hy + 20); const up = o.trunkUp || 0;
  ctx.bezierCurveTo(hx + 110, hy + 60 - up * 120, hx + 120, hy + 150 - up * 260, hx + 80 + up * 30, hy + 190 - up * 330);
  ctx.lineWidth = 34; ctx.strokeStyle = INK; ctx.stroke(); ctx.lineWidth = 22; ctx.strokeStyle = EG; ctx.stroke();
  ctx.lineWidth = 7; ctx.strokeStyle = INK;
  circle(hx + 24, hy - 14, 7, INK);
  ctx.beginPath(); ctx.moveTo(hx + 30, hy + 30); ctx.quadraticCurveTo(hx + 70, hy + 40, hx + 76, hy + 12); ctx.lineWidth = 10; ctx.strokeStyle = '#FFF1D6'; ctx.stroke();
  ctx.restore();
}
function croc(x, y, s = 1, dir = 1, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(dir * s, s); ctx.lineJoin = 'round'; ctx.lineWidth = 7; ctx.strokeStyle = INK;
  ctx.beginPath(); ctx.moveTo(-170, 0); ctx.quadraticCurveTo(-60, -80, 80, -50); ctx.lineTo(200, -40); ctx.lineTo(200, -5); ctx.lineTo(80, 10); ctx.quadraticCurveTo(-60, 40, -170, 0); ctx.closePath(); ctx.fillStyle = '#6FAE5C'; ctx.fill(); ctx.stroke();
  for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(-80 + i * 40, -62 + Math.abs(i - 2) * 6); ctx.lineTo(-68 + i * 40, -84 + Math.abs(i - 2) * 6); ctx.lineTo(-56 + i * 40, -62 + Math.abs(i - 2) * 6); ctx.fillStyle = '#4B8A3E'; ctx.fill(); ctx.stroke(); }
  circle(110, -60, 11, '#FFFFFF'); circle(112, -60, 5, INK);
  for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(130 + i * 17, -38); ctx.lineTo(138 + i * 17, -22); ctx.lineTo(146 + i * 17, -38); ctx.fillStyle = '#FFFFFF'; ctx.fill(); ctx.lineWidth = 4; ctx.stroke(); }
  ctx.restore();
}
function garuda(x, y, s, t) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const f = Math.sin(t * 8) * 18; for (const sg of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sg * 40, -10); ctx.quadraticCurveTo(sg * 220, -140 + f, sg * 330, -30 + f); ctx.quadraticCurveTo(sg * 220, 10, sg * 40, 40); ctx.closePath(); ctx.fillStyle = P.saffronDeep; ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 7; ctx.stroke(); } ell(0, 20, 70, 100, P.gold); ctx.beginPath(); ctx.ellipse(0, 20, 70, 100, 0, 0, TAU); ctx.stroke(); circle(0, -100, 44, '#FFF1D6'); ctx.beginPath(); ctx.arc(0, -100, 44, 0, TAU); ctx.stroke(); ctx.beginPath(); ctx.moveTo(10, -92); ctx.lineTo(62, -76); ctx.lineTo(14, -70); ctx.closePath(); ctx.fillStyle = P.gold; ctx.fill(); ctx.stroke(); ctx.restore(); }

export function buildShots() {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.08);
  const trees = () => { for (const [tx, ts] of [[110, 1.3], [980, 1.2]]) tree(tx, GROUND, ts); };

  // 0 · hook: tiny elephant strained against a pulling crocodile (strong cover)
  add({ id: 'S01', at: cut(0), cam: [540, 850], zoom: 0.07, note: 'elephant in the lake pulled by a crocodile', draw(lt, d, t) {
    K.heaven(t); water(t); const sh = Math.sin(t * 6) * 5;
    elephant(620 + sh, GROUND - 10, 1.5, -1, { lean: 10 }); croc(330 - sh, GROUND - 40, 1.2, 1);
    pill('THE ELEPHANT WHO STOPPED PULLING', 540, 215, 0.8);
  } }); cue(0.3, 'whoosh');

  // 1 · herd at the lake, Mount Trikuta
  add({ id: 'S02', at: cut(1), cam: [540, 850], zoom: 0.07, note: 'big elephant leads smaller ones to the lake', draw(lt, d, t) {
    K.heaven(t); trees(); water(t, GROUND - 40);
    for (const [ex, es] of [[820, 0.8], [980, 0.6]]) elephant(ex - lt * 15, GROUND, es, -1);
    elephant(430 - lt * 15, GROUND, 1.5, -1); pill('MOUNT TRIKUTA', 540, 260, 1.1);
  } }); cue(cut(1), 'whoosh');

  // 2 · splash then bite
  add({ id: 'S03', at: cut(2), cam: [540, 850], zoom: 0.07, note: 'splashing, then crocodile snaps', draw(lt, d, t) {
    K.heaven(t); water(t); const bite = lt > 1.6;
    elephant(620, GROUND - 10, 1.5, -1, { trunkUp: bite ? 0 : eio(seg(lt, 0.3, 0.9)) });
    croc(bite ? 440 : 80 + lt * 150, GROUND - 40, 1.2, 1); if (bite) pill('SNAP!', 460, 560, 1.3, '#FFB3B3');
  } }); cue(cut(2), 'whoosh'); cue(cut(2) + 1.6, 'thud', { gain: 0.6 });

  // 3 · tug of war
  add({ id: 'S04', at: cut(3), cam: [540, 850], zoom: 0.07, note: 'tug of war, family helpless', draw(lt, d, t) {
    K.heaven(t); water(t); const sh = Math.sin(t * 7) * 10;
    elephant(640 + sh, GROUND - 10, 1.5, -1, { lean: 10 }); croc(330 - sh, GROUND - 40, 1.2, 1);
    elephant(960, GROUND, 0.6, -1); elephant(110, GROUND - 160, 0.5, 1);
  } }); cue(cut(3), 'whoosh');

  // 4 · a thousand years
  add({ id: 'S05', at: cut(4), cam: [540, 800], zoom: 0.05, note: 'night, thousand years, croc grows, elephant shrinks', draw(lt, d, t) {
    K.nightSky(t); const u = eio(seg(lt, 0.2, 3)); water(t, GROUND - 90);
    elephant(640, GROUND - 10, lerp(1.5, 1.1, u), -1, { lean: 10 }); croc(330, GROUND - 40, lerp(1.0, 1.5, u), 1);
    ctx.save(); ctx.font = '900 130px Inter, NotoDev'; ctx.textAlign = 'center'; ctx.lineWidth = 26; ctx.strokeStyle = INK; ctx.strokeText('1000', 540, 360); ctx.fillStyle = P.gold; ctx.fillText('1000', 540, 360); ctx.restore(); pill(HI ? '' : 'YEARS', 540, 460, 1.1);
  } }); cue(cut(4), 'whoosh');

  // 5 · stops pulling, remembers
  add({ id: 'S06', at: cut(5), cam: [540, 850], zoom: 0.08, note: 'elephant still, golden memory glow', draw(lt, d, t) {
    K.heaven(t); water(t); K.burst(640, GROUND - 330, 300 + 12 * Math.sin(t * 4), P.gold, 0.5);
    elephant(640, GROUND - 10, 1.5, -1, { lean: 0 }); croc(330, GROUND - 40, 1.2, 1);
  } }); cue(cut(5), 'whoosh'); cue(cut(5) + 0.8, 'sparkle', { gain: 0.5 });

  // 7 (index 6) · lotus offered
  add({ id: 'S07', at: cut(6), cam: [540, 850], zoom: 0.08, note: 'trunk raised with a lotus', draw(lt, d, t) {
    K.heaven(t); water(t); K.burst(640, GROUND - 600, 240, P.gold, 0.55);
    elephant(640, GROUND - 10, 1.5, -1, { trunkUp: 1 }); K.lotus(560, GROUND - 600, 1.2); croc(330, GROUND - 40, 1.2, 1);
    pill(HI ? '' : 'I SURRENDER', 540, 230, 1.1);
  } }); cue(cut(6), 'whoosh'); cue(cut(6) + 0.9, 'sparkle', { gain: 0.6 });

  // 8 (index 7) · the gods do not come
  add({ id: 'S08', at: cut(7), cam: [540, 850], zoom: 0.07, note: 'three gods stay in the clouds; one huge glow behind', draw(lt, d, t) {
    K.heaven(t); K.burst(540, 560, 380 + 14 * Math.sin(t * 3), P.gold, 0.4);
    for (const [gx, gy, gc] of [[200, 800, P.vishnu], [540, 700, P.gold], [880, 800, '#E0457B']]) K.being({ x: gx, y: gy, h: 300, kind: 'god', glow: gc, t, mood: 'shock', arms: [[100, 60], [-100, -60]] });
    pill(HI ? '' : 'THE ONE BEHIND ALL GODS', 540, 1000, 0.85);
  } }); cue(cut(7), 'whoosh');

  // 9 (index 8) · Vishnu on Garuda
  add({ id: 'S09', at: cut(8), cam: [540, 850], zoom: 0.07, note: 'Vishnu on Garuda swoops in', draw(lt, d, t) {
    K.heaven(t); water(t); const a = eio(seg(lt, 0.2, 1.6)); const gx = lerp(1300, 540, a), gy = lerp(250, 560, a);
    garuda(gx, gy + 140, 1.3, t); K.being({ x: gx, y: gy + 200, h: 520, kind: 'god', glow: P.vishnu, t, arms: K.ARMS.four, aura: 1 });
    elephant(700, GROUND - 10, 1.0, -1); croc(330, GROUND - 40, 0.9, 1);
  } }); cue(cut(8), 'whoosh'); cue(cut(8) + 1.3, 'sparkle', { gain: 0.6 });

  // 10 (index 9) · chakra, Huhu freed
  add({ id: 'S10', at: cut(9), cam: [540, 850], zoom: 0.07, note: 'chakra spins, crocodile becomes a gandharva', draw(lt, d, t) {
    K.heaven(t); const f = lt > 1.8;
    if (!f) { water(t); croc(330, GROUND - 40, 1.2, 1); K.chakra(540, 520, 1.6, t * 8); K.burst(540, 520, 220, P.gold, 0.6); }
    else { K.being({ x: 330, y: GROUND, h: 520, kind: 'god', glow: '#9AD1FF', t, mood: 'bless', arms: K.ARMS.bless }); pill('HUHU', 330, GROUND - 640, 1.0); }
    elephant(780, GROUND, 1.2, -1);
  } }); cue(cut(9), 'whoosh'); cue(cut(9) + 1.8, 'sparkle', { gain: 0.7 });

  // 11 (index 10) · close, serene, Vishnu with Gajendra; name card
  add({ id: 'S11', at: cut(10), cam: [540, 850], zoom: 0.08, note: 'Vishnu blesses Gajendra; name card', draw(lt, d, t) {
    K.heaven(t); K.shadow(780, GROUND, 230);
    K.being({ x: 780, y: GROUND, h: 840, kind: 'god', glow: P.vishnu, t, mood: 'bless', arms: K.ARMS.four });
    elephant(330, GROUND, 1.3, 1, { trunkUp: 0.8 }); K.nameCard(HI ? '' : 'BHAGAVATA PURANA', HI ? '' : 'CANTO 8 · GAJENDRA', 540, 120, 1.0);
  } }); cue(cut(10), 'whoosh'); cue(cut(10) + 0.6, 'sparkle', { gain: 0.5 });

  return { shots: S, cues: CUES };
}
