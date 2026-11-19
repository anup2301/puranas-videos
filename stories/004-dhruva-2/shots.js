// DHRUVA, PART 2 OF 2 (Bhagavata Purana, Canto 4, ch. 8-9, 12). Divine Lines.
import { ctx, W, H, TAU, lerp, seg, eio, eob, rr, circle, ell, line, fillAll } from './core/lib.js';
import { L, Le } from './core/timing.js';
import * as K from './core/kit.js';
const { P, GROUND } = K, INK = P.ink;
const HI = __HI__;
const fr = (i, f) => L(i) + f * (Le(i) - L(i));

function tree(x, y, s = 1) { rr(x - 12 * s, y - 20 * s, 24 * s, 120 * s, 4 * s); ctx.fillStyle = '#8B5A2B'; ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 6 * s; ctx.stroke(); for (const [ox, oy, r] of [[0, -55, 70], [-30, -20, 55], [30, -20, 55]]) { circle(x + ox * s, y + oy * s, r * s, INK); circle(x + ox * s, y + oy * s, (r - 7) * s, '#BFE3B4'); } }
function star(x, y, r, t) { for (let i = 0; i < 8; i++) { const a = i * TAU / 8 + t * 0.5; line([[x + Math.cos(a) * r * 0.6, y + Math.sin(a) * r * 0.6], [x + Math.cos(a) * r, y + Math.sin(a) * r]], P.gold, r * 0.18); } circle(x, y, r * 0.45, P.gold); circle(x, y, r * 0.28, '#FFFFFF'); }
function river(t, y = GROUND + 30) { for (let r = 0; r < 3; r++) { ctx.beginPath(); for (let x = -20; x <= W + 20; x += 20) { const yy = y + r * 40 + Math.sin(x * 0.02 + t * 2 + r) * 9; x === -20 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy); } ctx.strokeStyle = '#6EC6F5'; ctx.lineWidth = 6; ctx.stroke(); } }
function pill(txt, x, y, s = 1, col = P.gold) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.font = '900 44px Inter, NotoDev'; const tw = ctx.measureText(txt).width + 60; rr(-tw / 2, -32, tw, 64, 32); ctx.fillStyle = col; ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 5; ctx.stroke(); ctx.fillStyle = INK; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(txt, 0, 2); ctx.restore(); }
function bigText(txt, x, y, size, col = P.gold, a = 1) { ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.font = `900 ${size}px Inter, NotoDev`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineWidth = size * 0.2; ctx.lineJoin = 'round'; ctx.strokeStyle = INK; ctx.strokeText(txt, 0, 0); ctx.fillStyle = col; ctx.fillText(txt, 0, 0); ctx.restore(); }
function tile(x, y, w, h) { rr(x - w / 2, y - h / 2, w, h, 26); ctx.fillStyle = '#FFFFFF'; ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 6; ctx.stroke(); }
function label(txt, x, y, fs = 42) { ctx.save(); ctx.font = `900 ${fs}px Inter, NotoDev`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.letterSpacing = '4px'; ctx.fillStyle = INK; ctx.fillText(txt, x, y); ctx.restore(); }
function fruit(x, y, s) { circle(x, y, 50 * s, INK); circle(x, y, 44 * s, '#E5383B'); line([[x, y - 44 * s], [x + 6 * s, y - 66 * s]], '#8B5A2B', 8 * s); ctx.beginPath(); ctx.ellipse(x + 26 * s, y - 62 * s, 22 * s, 10 * s, -0.4, 0, TAU); ctx.fillStyle = '#7DBB6A'; ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 4 * s; ctx.stroke(); }
function leaf(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.rotate(-0.5); ctx.beginPath(); ctx.ellipse(0, 0, 70 * s, 34 * s, 0, 0, TAU); ctx.fillStyle = '#7DBB6A'; ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 6 * s; ctx.stroke(); line([[-70 * s, 0], [70 * s, 0]], INK, 5 * s); ctx.restore(); }
function drop(x, y, s) { ctx.beginPath(); ctx.moveTo(x, y - 70 * s); ctx.bezierCurveTo(x + 60 * s, y, x + 50 * s, y + 55 * s, x, y + 55 * s); ctx.bezierCurveTo(x - 50 * s, y + 55 * s, x - 60 * s, y, x, y - 70 * s); ctx.fillStyle = '#6EC6F5'; ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 6 * s; ctx.lineJoin = 'round'; ctx.stroke(); }
function air(x, y, s) { for (let i = -1; i <= 1; i++) { ctx.beginPath(); ctx.moveTo(x - 70 * s, y + i * 28 * s); ctx.bezierCurveTo(x - 20 * s, y + i * 28 * s - 24 * s, x + 20 * s, y + i * 28 * s + 24 * s, x + 70 * s, y + i * 28 * s); ctx.strokeStyle = INK; ctx.lineWidth = 7 * s; ctx.lineCap = 'round'; ctx.stroke(); } }
function conch(x, y, s, a = 1) { ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(-60, 20); ctx.bezierCurveTo(-60, -50, 40, -70, 70, -10); ctx.bezierCurveTo(90, 30, 40, 60, -10, 50); ctx.bezierCurveTo(-40, 45, -60, 40, -60, 20); ctx.closePath(); ctx.fillStyle = '#FFF1D6'; ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 7; ctx.lineJoin = 'round'; ctx.stroke(); ctx.beginPath(); ctx.arc(10, 0, 26, 0, TAU * 0.8); ctx.strokeStyle = INK; ctx.lineWidth = 6; ctx.stroke(); ctx.beginPath(); ctx.arc(10, 0, 12, 0, TAU * 0.8); ctx.stroke(); ctx.restore(); }
function crown(x, y, s) { ctx.beginPath(); for (const [a, b] of [[-70, 40], [-80, -40], [-35, 0], [0, -60], [35, 0], [80, -40], [70, 40]]) ctx.lineTo(x + a * s, y + b * s); ctx.closePath(); ctx.fillStyle = P.gold; ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 7 * s; ctx.lineJoin = 'round'; ctx.stroke(); }
function bowl(x, y, s, grains = 3) { ctx.beginPath(); ctx.moveTo(x - 60 * s, y); ctx.quadraticCurveTo(x, y + 80 * s, x + 60 * s, y); ctx.closePath(); ctx.fillStyle = '#C77F0A'; ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 6 * s; ctx.stroke(); for (let i = 0; i < grains; i++) ell(x - 20 * s + i * 20 * s, y - 6 * s, 7 * s, 4 * s, '#FFF1D6'); }

export function buildShots() {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.08);
  const A = (i, f) => fr(i, f) - cut(i);   // seconds into shot i

  // 0 · hook: tiny boy, worried gods above (strong cover from the first frame)
  add({ id: 'S01', at: cut(0), cam: [540, 850], zoom: 0.07, note: 'tiny boy in the forest, three worried gods above', draw(lt, d, t) {
    K.heaven(t); for (const [tx, ts] of [[110, 1.3], [980, 1.2]]) tree(tx, GROUND, ts);
    K.burst(540, GROUND - 150, 260 + 10 * Math.sin(t * 4), P.gold, 0.55); K.shadow(540, GROUND, 130);
    K.being({ x: 540, y: GROUND - 20, h: 300, kind: 'human', mood: 'calm', aura: 0, arms: K.ARMS.pray });
    for (const [gx, gy, gc] of [[220, 700, P.vishnu], [540, 560, P.gold], [860, 700, '#E0457B']]) K.being({ x: gx, y: gy, h: 340, kind: 'god', glow: gc, t, mood: 'shock', arms: [[100, 60], [-100, -60]] });
    pill('PART 2 OF 2', 540, 215, 1.25);
  } }); cue(0.3, 'whoosh'); cue(1.2, 'sparkle', { gain: 0.3 });

  // 1 · Narada tests him
  add({ id: 'S02', at: cut(1), cam: [500, 850], zoom: 0.07, note: 'Narada points home, boy stays', draw(lt, d, t) {
    K.heaven(t); for (const [tx, ts] of [[110, 1.3], [980, 1.2]]) tree(tx, GROUND, ts);
    K.being({ x: 300, y: GROUND, h: 680, kind: 'sage', t, arms: lt < A(1, 0.5) ? K.ARMS.point : K.ARMS.bless });
    K.being({ x: 720, y: GROUND - 20, h: 300, kind: 'human', mood: 'calm', dir: -1, aura: 0, arms: K.ARMS.pray });
    pill(HI ? '' : 'GO HOME, CHILD', 300, GROUND - 780, 1.0);
  } }); cue(cut(1), 'whoosh');

  // 2 · mantra, Madhuvana by the Yamuna
  add({ id: 'S03', at: cut(2), cam: [540, 850], zoom: 0.07, note: 'boy prays beside the river; the twelve-letter mantra appears', draw(lt, d, t) {
    K.heaven(t); for (const [tx, ts] of [[110, 1.4], [330, 1.0], [800, 1.1], [980, 1.3]]) tree(tx, GROUND, ts); river(t);
    K.shadow(540, GROUND, 130); K.being({ x: 540, y: GROUND - 20, h: 320, kind: 'human', mood: 'calm', aura: 0, arms: K.ARMS.pray });
    const a = eob(seg(lt, A(2, 0.15), A(2, 0.15) + 0.4)); if (a > 0) bigText('OM NAMO BHAGAVATE', 540, 330, 66, P.gold, Math.min(1, a)), bigText('VASUDEVAYA', 540, 410, 66, P.gold, Math.min(1, a));
  } }); cue(cut(2), 'whoosh'); cue(cut(2) + A(2, 0.15), 'sparkle', { gain: 0.5 });

  // 3 · fruit, leaves, water, air
  { const w = [0.1, 0.34, 0.58, 0.8].map((f) => A(3, f));
    add({ id: 'S04', at: cut(3), cam: [540, 800], zoom: 0.05, note: 'four tiles: fruit, leaves, water, air', draw(lt, d, t) {
      fillAll(P.paper); const cx = [310, 770], cy = [470, 880], pos = [[cx[0], cy[0]], [cx[1], cy[0]], [cx[0], cy[1]], [cx[1], cy[1]]], names = ['MONTH 1', 'MONTH 2', 'MONTH 3', 'MONTH 4'], icons = [fruit, leaf, drop, air], sc = [1.4, 1.4, 1.4, 1.3];
      pos.forEach(([x, y], i) => { tile(x, y, 410, 350); label(HI ? '' : names[i], x, y + 125, 40); const a = eob(seg(lt, w[i] - 0.25, w[i] + 0.1)); if (a <= 0) return; ctx.save(); ctx.translate(x, y - 40); ctx.scale(a, a); icons[i](0, 0, sc[i]); ctx.restore(); });
    } }); w.forEach((x) => cue(cut(3) + x, 'pop', { gain: 0.45 })); cue(cut(3), 'whoosh'); }

  // 4 · one foot, no breath, earth leans
  { const lean = A(4, 0.55);
    add({ id: 'S05', at: cut(4), cam: [540, 850], zoom: 0.08, note: 'boy glows, no breath, the ground tilts', draw(lt, d, t) {
      ctx.save(); const tilt = eio(seg(lt, lean, lean + 0.9)) * 0.07; ctx.translate(540, GROUND); ctx.rotate(tilt); ctx.translate(-540, -GROUND);
      K.heaven(t); for (const [tx, ts] of [[110, 1.4], [980, 1.3]]) tree(tx, GROUND, ts); circle(540, GROUND - 190, 230, '#FFF4DA'); K.burst(540, GROUND - 190, 330 + 14 * Math.sin(t * 5), P.gold, 0.7);
      K.being({ x: 540, y: GROUND, h: 380, kind: 'human', mood: 'calm', aura: 0, arms: K.ARMS.pray }); ctx.restore();
      pill(HI ? '' : 'NO BREATH', 540, 250, 1.3, '#FFB3B3');
    } }); cue(cut(4), 'whoosh'); cue(cut(4) + lean, 'thud', { gain: 0.6 }); }

  // 5 · gods cannot breathe
  add({ id: 'S06', at: cut(5), cam: [540, 850], zoom: 0.08, note: 'three gods gasp and hurry off', draw(lt, d, t) {
    K.heaven(t); const run = eio(seg(lt, 0.4, 1.6));
    for (const [gx, gc, k] of [[230, P.vishnu, 0], [540, P.gold, 1], [850, '#E0457B', 2]]) K.being({ x: lerp(gx, gx + 60, run), y: GROUND, h: 600, kind: 'god', glow: gc, t, mood: 'shock', arms: [[40, 100], [-40, -100]], walk: run > 0 && run < 1 ? lt * 8 + k : undefined });
    bigText('!', 230, 380, 120, P.red); bigText('!', 850, 380, 120, P.red);
  } }); cue(cut(5), 'whoosh'); cue(cut(5) + 0.2, 'alarm', { gain: 0.25 });

  // 6 · Vishnu: I will go myself
  add({ id: 'S07', at: cut(6), cam: [540, 800], zoom: 0.08, note: 'Vishnu rises in blue light', draw(lt, d, t) {
    K.heaven(t); const a = eob(seg(lt, 0.1, 0.6)); K.burst(540, 520, 400 * a, P.vishnu, 0.6 * a); K.shadow(540, GROUND, 230);
    K.being({ x: 540, y: GROUND, h: 860 * Math.min(1, 0.4 + a * 0.6), kind: 'god', glow: P.vishnu, t, hold: (i, x, y) => { if (i === 2) K.chakra(x - 4, y - 6, 0.9, t); if (i === 3) K.lotus(x, y - 4, 1.1); } });
  } }); cue(cut(6), 'whoosh'); cue(cut(6) + 0.3, 'sparkle', { gain: 0.6 });

  // 7 · vision vanishes, Vishnu stands before him
  { const pop = A(7, 0.4), ap = A(7, 0.62);
    add({ id: 'S08', at: cut(7), cam: [540, 850], zoom: 0.07, note: 'thought bubble pops, eyes open, Vishnu appears', draw(lt, d, t) {
      K.heaven(t); K.shadow(300, GROUND, 150);
      K.being({ x: 300, y: GROUND - 10, h: 420, kind: 'human', mood: lt < pop ? 'calm' : 'shock', dir: 1, aura: 0, arms: lt < pop ? K.ARMS.pray : [[130, 40], [-130, -40]] });
      if (lt < pop) { ctx.save(); circle(300, 380, 170, INK); circle(300, 380, 162, '#FFFFFF'); circle(300, 560, 18, INK); circle(300, 560, 12, '#FFFFFF'); ctx.restore(); K.being({ x: 300, y: 500, h: 260, kind: 'god', glow: P.vishnu, t, aura: 1 }); }
      else K.burst(300, 380, 240 * eob(seg(lt, pop, pop + 0.25)), P.gold, 1 - seg(lt, pop + 0.25, pop + 0.8));
      const a = eob(seg(lt, ap, ap + 0.4)); if (a > 0) { ctx.save(); ctx.globalAlpha = Math.min(1, a * 1.5); K.being({ x: 760, y: GROUND, h: 780, kind: 'god', glow: P.vishnu, t, hold: (i, x, y) => { if (i === 2) K.chakra(x - 4, y - 6, 0.8, t); if (i === 3) K.lotus(x, y - 4, 1.0); } }); ctx.restore(); }
    } }); cue(cut(7), 'whoosh'); cue(cut(7) + pop, 'pop'); cue(cut(7) + ap, 'sparkle', { gain: 0.6 }); }

  // 8 · conch touch, words pour out
  { const tc = A(8, 0.35);
    add({ id: 'S09', at: cut(8), cam: [540, 850], zoom: 0.07, note: 'Vishnu touches the boy with his conch; golden words flow', draw(lt, d, t) {
      K.heaven(t); K.shadow(300, GROUND, 150); K.shadow(760, GROUND, 220);
      K.being({ x: 760, y: GROUND, h: 800, kind: 'god', glow: P.vishnu, t, arms: [[100, 60], [-60, -40], [60, 20], [-30, -20]] });
      K.being({ x: 300, y: GROUND - 10, h: 420, kind: 'human', mood: lt > tc ? 'bless' : 'shock', dir: 1, aura: 0, arms: [[60, 40], [-60, -40]] });
      const a = eob(seg(lt, tc - 0.2, tc)); conch(lerp(600, 370, a), 880, 1.0, Math.min(1, a * 2));
      if (lt > tc) { K.burst(300, 880, 260 * eob(seg(lt, tc, tc + 0.3)), P.gold, 0.9); for (let i = 0; i < 3; i++) { const u = (lt - tc) * 1.4 - i * 0.2; if (u > 0) { ctx.save(); ctx.globalAlpha = Math.min(1, u * 2) * (1 - Math.min(1, u)); line([[300 + 40, 840 - u * 160], [300 + 100, 820 - u * 200]], P.gold, 10); ctx.restore(); } } }
    } }); cue(cut(8), 'whoosh'); cue(cut(8) + tc, 'sparkle', { gain: 0.7 }); }

  // 9 · 36,000 years and a star that never moves
  { const k = A(9, 0.5);
    add({ id: 'S10', at: cut(9), cam: [540, 800], zoom: 0.07, note: 'crown with 36,000, then a fixed pole star', draw(lt, d, t) {
      K.nightSky(t); const a1 = eob(seg(lt, 0.1, 0.5)); crown(540, 480, 1.6 * Math.min(1, a1)); bigText('36,000', 540, 720, 150, P.gold, Math.min(1, a1)); bigText(HI ? '' : 'YEARS AS KING', 540, 850, 56, '#FFFFFF', Math.min(1, a1));
      if (lt > k) { const a = eob(seg(lt, k, k + 0.4)); ctx.save(); ctx.globalAlpha = Math.min(1, a * 1.5); for (let r = 1; r <= 3; r++) { ctx.beginPath(); ctx.arc(540, 1050, r * 70, 0, TAU); ctx.strokeStyle = 'rgba(255,255,255,0.25)'; ctx.lineWidth = 4; ctx.stroke(); } star(540, 1050, 60 * a, t * 0.4); ctx.restore(); }
    } }); cue(cut(9), 'whoosh'); cue(cut(9) + 0.2, 'pop'); cue(cut(9) + k, 'sparkle', { gain: 0.6 }); }

  // 10 · the beggar and the emperor
  add({ id: 'S11', at: cut(10), cam: [540, 850], zoom: 0.07, note: 'boy with an almost empty bowl before a giant Vishnu', draw(lt, d, t) {
    K.heaven(t); K.shadow(260, GROUND, 140); K.shadow(780, GROUND, 230);
    K.being({ x: 780, y: GROUND, h: 840, kind: 'god', glow: P.vishnu, t, mood: 'bless', arms: K.ARMS.four });
    K.being({ x: 260, y: GROUND - 10, h: 360, kind: 'human', mood: 'wise', dir: 1, aura: 0, arms: [[70, 60], [-60, -30]] });
    bowl(390, GROUND - 190, 1.2, 3); pill(HI ? '' : 'A FEW BROKEN GRAINS', 330, GROUND - 480, 1.0);
  } }); cue(cut(10), 'whoosh');

  // 11 · the seat no one can take
  add({ id: 'S12', at: cut(11), cam: [540, 800], zoom: 0.08, note: 'night, the fixed pole star above the boy; part tag + name card', draw(lt, d, t) {
    K.nightSky(t); for (let r = 1; r <= 3; r++) { ctx.beginPath(); ctx.arc(540, 330, r * 75, 0, TAU); ctx.strokeStyle = 'rgba(255,255,255,0.22)'; ctx.lineWidth = 4; ctx.stroke(); } star(540, 330, 70 + 6 * Math.sin(t * 3), t * 0.3);
    K.being({ x: 540, y: GROUND - 20, h: 320, kind: 'human', mood: 'calm', aura: 0, arms: K.ARMS.pray, dark: true });
    K.nameCard(HI ? '' : 'BHAGAVATA PURANA', HI ? '' : 'CANTO 4 · DHRUVA', 540, 120, 1.0);
  } }); cue(cut(11), 'whoosh'); cue(cut(11) + 0.6, 'sparkle', { gain: 0.5 });

  return { shots: S, cues: CUES };
}
