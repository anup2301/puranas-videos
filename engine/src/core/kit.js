// Divine Lines: the COMPONENT ZOO. Ink stick bodies with round white heads, one glow colour per character,
// white paper by default, black night where the story turns dark.
import { ctx, W, H, TAU, lerp, clamp, rnd, rr, circle, ell, line, fillAll } from './lib.js';

export const P = {
  paper: '#FFFFFF', ink: '#111114', night: '#0B0B10', night2: '#171722', bone: '#F2F2F2', grey: '#E6E6E6',
  gold: '#F5A623', goldDark: '#C77F0A', saffron: '#FFD98A', saffronDeep: '#E8590C',
  red: '#E5383B', crimson: '#8E1B2B', lotus: '#F4A6C0', vishnu: '#4C7FD6', shiva: '#9AD1FF', devi: '#E0457B', ash: '#BFC3C9', fire: '#FF6B2C',
};
export const GROUND = 1240;                       // where feet stand; the caption zone (y 1250-1550) stays free below
export const CAPLOOK = { y: 1400 };
const rad = (d) => d * Math.PI / 180;
const LS = (t, px) => (/[^\x00-\x7F]/.test(t) ? '0px' : px);   // no letter-spacing on Devanagari (it breaks conjuncts)

function limb(x, y, l1, a1, l2, a2, dir, w, col) {   // angles in degrees from straight down; + = toward facing side, - = the other side
  const k = [x + Math.sin(rad(a1)) * l1 * dir, y + Math.cos(rad(a1)) * l1];
  const e = [k[0] + Math.sin(rad(a1 + a2)) * l2 * dir, k[1] + Math.cos(rad(a1 + a2)) * l2];
  line([[x, y], k, e], col, w); return e;
}
export const ARMS = {
  four: [[100, 60], [-100, -60], [45, 25], [-45, -25]],     // upper pair blessing, lower pair holding props
  bless: [[100, 60], [-14, -8]], down: [[8, 10], [-8, -10]], point: [[88, 4], [-10, -8]],
  menace: [[75, 25], [-75, -25]], pray: [[38, 118], [-38, -118]],
};
const DEFAULT_ARMS = { god: ARMS.four, demon: ARMS.menace, sage: ARMS.bless, human: ARMS.down };

// ═════════════════════════ AURA ═════════════════════════
export function aura(x, y, r, kind = 'god', glow, t = 0) {
  ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  if (kind === 'demon') {
    const n = 14, pts = [];
    for (let i = 0; i < n * 2; i++) { const a = (i / (n * 2)) * TAU - Math.PI / 2, rr2 = (i % 2 ? 1.52 : 1.95 + 0.12 * Math.sin(t * 6 + i)) * r; pts.push([x + Math.cos(a) * rr2, y + Math.sin(a) * rr2]); }
    ctx.beginPath(); pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.closePath();
    ctx.strokeStyle = glow || P.red; ctx.lineWidth = r * 0.1; ctx.stroke();
  } else {
    const col = glow || (kind === 'sage' ? P.ash : P.gold);
    ctx.strokeStyle = col; ctx.lineWidth = r * (kind === 'sage' ? 0.07 : 0.115);
    ctx.beginPath(); ctx.arc(x, y, r * 1.68, 0, TAU); ctx.stroke();
    if (kind === 'god') for (let i = 0; i < 12; i++) {
      const a = (i / 12) * TAU, p = 1 + 0.14 * Math.sin(t * 3 + i * 1.3);
      line([[x + Math.cos(a) * r * 1.95, y + Math.sin(a) * r * 1.95], [x + Math.cos(a) * r * (2.2 * p + 0.12), y + Math.sin(a) * r * (2.2 * p + 0.12)]], col, r * 0.11);
    }
  }
  ctx.restore();
}

// ═════════════════════════ HEAD + FACE ═════════════════════════
/** kind 'god'|'demon'|'sage'|'human'; mood 'calm'|'bless'|'angry'|'grin'|'shock'|'wise' */
export function head(x, y, r, o = {}) {
  const kind = o.kind || 'human', m = o.mood || (kind === 'god' ? 'calm' : kind === 'demon' ? 'grin' : kind === 'sage' ? 'wise' : 'bless');
  const lw = r * 0.09;
  if (kind === 'demon') for (const s of [-1, 1]) {            // horns
    ctx.beginPath(); ctx.moveTo(x + s * r * 0.5, y - r * 0.78); ctx.quadraticCurveTo(x + s * r * 0.95, y - r * 1.05, x + s * r * 0.82, y - r * 1.7);
    ctx.quadraticCurveTo(x + s * r * 0.55, y - r * 1.2, x + s * r * 0.12, y - r * 0.92); ctx.closePath();
    ctx.fillStyle = P.red; ctx.fill(); ctx.strokeStyle = P.ink; ctx.lineWidth = lw * 0.8; ctx.lineJoin = 'round'; ctx.stroke();
  }
  if (kind === 'sage') { circle(x, y - r * 1.05, r * 0.4, P.ink); line([[x - r * 0.55, y - r * 0.85], [x + r * 0.55, y - r * 0.85]], P.ink, r * 0.12); }
  circle(x, y, r, P.ink); circle(x, y, r - lw, P.paper);
  const ex = r * 0.36, ey = y - r * 0.04, I = P.ink;
  ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  for (const s of [-1, 1]) {
    const cx = x + s * ex + (o.look ? o.look[0] * r * 0.05 : 0);
    if (m === 'calm') { ctx.beginPath(); ctx.arc(cx, ey - r * 0.05, r * 0.17, rad(20), rad(160)); ctx.strokeStyle = I; ctx.lineWidth = r * 0.075; ctx.stroke(); }
    else if (m === 'bless') circle(cx, ey, r * 0.075, I);
    else if (m === 'wise') line([[cx - r * 0.15, ey], [cx + r * 0.15, ey]], I, r * 0.08);
    else if (m === 'shock') { ctx.beginPath(); ctx.arc(cx, ey, r * 0.15, 0, TAU); ctx.strokeStyle = I; ctx.lineWidth = r * 0.06; ctx.stroke(); circle(cx, ey, r * 0.05, I); }
    else if (m === 'angry') {
      circle(cx, ey + r * 0.04, r * 0.095, kind === 'demon' ? P.red : I); if (kind === 'demon') { ctx.beginPath(); ctx.arc(cx, ey + r * 0.04, r * 0.095, 0, TAU); ctx.strokeStyle = I; ctx.lineWidth = r * 0.04; ctx.stroke(); }
      line([[cx + s * r * 0.24, ey - r * 0.3], [cx - s * r * 0.2, ey - r * 0.12]], I, r * 0.09);
    } else if (m === 'grin') {
      line([[cx + s * r * 0.2, ey - r * 0.1], [cx - s * r * 0.17, ey + r * 0.06]], P.red, r * 0.12);
      line([[cx + s * r * 0.26, ey - r * 0.22], [cx - s * r * 0.2, ey - r * 0.02]], I, r * 0.05);
    }
  }
  const my = y + r * 0.38;
  if (m === 'calm' || m === 'bless') { ctx.beginPath(); ctx.moveTo(x - r * 0.22, my - r * 0.05); ctx.quadraticCurveTo(x, my + r * 0.2, x + r * 0.22, my - r * 0.05); ctx.strokeStyle = I; ctx.lineWidth = r * 0.075; ctx.stroke(); }
  else if (m === 'wise') { ctx.beginPath(); ctx.moveTo(x - r * 0.16, my); ctx.quadraticCurveTo(x, my + r * 0.12, x + r * 0.16, my); ctx.strokeStyle = I; ctx.lineWidth = r * 0.07; ctx.stroke(); }
  else if (m === 'shock') ell(x, my + r * 0.05, r * 0.11, r * 0.15, I);
  else if (m === 'angry') line([[x - r * 0.25, my + r * 0.04], [x - r * 0.1, my - r * 0.02], [x + r * 0.05, my + r * 0.05], [x + r * 0.25, my - r * 0.01]], I, r * 0.08);
  else if (m === 'grin') {
    ctx.beginPath(); ctx.moveTo(x - r * 0.55, my - r * 0.08); ctx.quadraticCurveTo(x, my + r * 0.62, x + r * 0.55, my - r * 0.08); ctx.closePath(); ctx.fillStyle = I; ctx.fill();
    ctx.fillStyle = P.paper; for (let i = 0; i < 4; i++) { const tx = x - r * 0.4 + i * r * 0.27, ty = my - r * 0.06 + Math.abs(i - 1.5) * r * -0.0; ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(tx + r * 0.12, ty + r * 0.2 - (i % 3 === 0 ? 0 : 0)); ctx.lineTo(tx + r * 0.24, ty); ctx.closePath(); ctx.fill(); }
  }
  if (kind === 'god' || (kind === 'demon' && o.crown)) {
    if (kind === 'god') line([[x, y - r * 0.64], [x, y - r * 0.4]], P.saffronDeep, r * 0.1);
    const pts = [[-0.55, -0.78], [-0.64, -1.52], [-0.28, -1.16], [0, -1.74], [0.28, -1.16], [0.64, -1.52], [0.55, -0.78]];
    ctx.beginPath(); pts.forEach(([a, b], i) => (i ? ctx.lineTo(x + a * r, y + b * r) : ctx.moveTo(x + a * r, y + b * r))); ctx.closePath();
    ctx.fillStyle = o.crown || P.gold; ctx.fill(); ctx.strokeStyle = I; ctx.lineWidth = r * 0.075; ctx.stroke();
  }
  if (kind === 'sage') {
    ctx.beginPath(); ctx.moveTo(x - r * 0.62, y + r * 0.3); ctx.quadraticCurveTo(x - r * 0.5, y + r * 1.55, x, y + r * 1.75); ctx.quadraticCurveTo(x + r * 0.5, y + r * 1.55, x + r * 0.62, y + r * 0.3);
    ctx.quadraticCurveTo(x, y + r * 0.62, x - r * 0.62, y + r * 0.3); ctx.closePath(); ctx.fillStyle = P.paper; ctx.fill(); ctx.strokeStyle = I; ctx.lineWidth = r * 0.07; ctx.stroke();
    if (m === 'wise') { ctx.beginPath(); ctx.moveTo(x - r * 0.16, my); ctx.quadraticCurveTo(x, my + r * 0.12, x + r * 0.16, my); ctx.strokeStyle = I; ctx.lineWidth = r * 0.07; ctx.stroke(); }
  }
}

// ═════════════════════════ THE BEING (body) ═════════════════════════
/** o = { x, y (feet), h (≈860), kind, dir, dark (on a night scene: lines turn bone), arms: ARMS.x | [[sh, el]…], hold: (i, x, y) => prop,
 *  mood, glow (aura colour), aura: 0 hides it, walk (phase), t (time, for pulsing aura), crown } */
export function being(o) {
  const kind = o.kind || 'god', h = o.h || 860, d = o.dir || 1, lc = o.dark ? P.bone : P.ink, w = h * 0.03;
  const hipY = o.y - h * 0.4, shY = o.y - h * 0.66, r = h * 0.115, hx = o.x, hy = shY - r * 1.2, wk = o.walk, sw = wk != null ? Math.sin(wk) : 0;
  ctx.save();
  if (o.aura !== 0 && kind !== 'human') aura(hx, hy, r, kind, o.glow, o.t || 0);
  limb(o.x, hipY, h * 0.2, wk != null ? sw * 22 : 7, h * 0.2, -(wk != null ? Math.max(0, -sw) * 28 + 4 : 3), d, w, lc);
  limb(o.x, hipY, h * 0.2, wk != null ? -sw * 22 : -7, h * 0.2, -(wk != null ? Math.max(0, sw) * 28 + 4 : 3), d, w, lc);
  if (kind !== 'human') {                                   // cloth: saffron dhoti · crimson rags · white wrap
    const hw = h * 0.05, bot = o.y - h * 0.085, col = kind === 'god' ? P.saffron : kind === 'demon' ? P.crimson : P.paper;
    ctx.beginPath(); ctx.moveTo(o.x - hw, hipY - h * 0.02); ctx.lineTo(o.x + hw, hipY - h * 0.02);
    if (kind === 'demon') for (let i = 0; i <= 6; i++) ctx.lineTo(o.x + hw * 1.6 - i * (hw * 3.2 / 6), bot + (i % 2 ? h * 0.05 : 0));
    else { ctx.lineTo(o.x + hw * 1.6, bot); ctx.lineTo(o.x - hw * 1.6, bot); }
    ctx.closePath(); ctx.fillStyle = col; ctx.fill(); ctx.strokeStyle = P.ink; ctx.lineWidth = w * 0.8; ctx.lineJoin = 'round'; ctx.stroke();
  }
  line([[o.x, hipY], [o.x, shY]], lc, w * 1.15);
  (o.arms || DEFAULT_ARMS[kind]).forEach((a, i) => {
    const e = limb(o.x, shY + h * 0.02, h * 0.15, a[0], h * 0.14, a[1], d, w, lc);
    circle(e[0], e[1], w * 0.85, lc === P.ink ? P.paper : lc); ctx.beginPath(); ctx.arc(e[0], e[1], w * 0.85, 0, TAU); ctx.strokeStyle = P.ink; ctx.lineWidth = w * 0.5; ctx.stroke();
    if (o.hold) o.hold(i, e[0], e[1]);
  });
  if (kind !== 'human') for (const s of [-1, 1]) ell(o.x + s * h * 0.045, o.y + 2, h * 0.032, h * 0.011, lc);
  else for (const s of [-1, 1]) ell(o.x + s * h * 0.05, o.y + 2, h * 0.034, h * 0.011, lc);
  head(hx, hy, r, { kind, mood: o.mood, look: o.look, crown: o.crown });
  ctx.restore();
}
export function shadow(x, y, rx, dark) { ell(x, y + 6, rx, rx * 0.09, dark ? 'rgba(255,255,255,0.08)' : '#E6E6E6'); }

// ═════════════════════════ PROPS ═════════════════════════
export function lotus(x, y, s = 1, col = P.lotus) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = P.ink; ctx.lineWidth = 3; ctx.fillStyle = col;
  for (const a of [-35, 35, 0]) { ctx.save(); ctx.rotate(rad(a)); ctx.beginPath(); ctx.ellipse(0, -13, 7, 15, 0, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore(); }
  ctx.restore();
}
export function chakra(x, y, s = 1, spin = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(spin);
  for (let i = 0; i < 12; i++) { ctx.rotate(TAU / 12); line([[0, -24], [0, -33]], P.gold, 5); }
  ctx.beginPath(); ctx.arc(0, 0, 22, 0, TAU); ctx.strokeStyle = P.gold; ctx.lineWidth = 6; ctx.stroke(); circle(0, 0, 5, P.gold); ctx.restore();
}
export function trident(x, y, s = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  line([[0, 90], [0, -60]], P.ink, 6); line([[-20, -40], [-20, -70], [-20, -40], [0, -34], [20, -40], [20, -70]], P.ink, 6); line([[0, -34], [0, -86]], P.ink, 6);
  for (const px of [-20, 0, 20]) { ctx.beginPath(); ctx.moveTo(px - 6, px === 0 ? -86 : -70); ctx.lineTo(px, px === 0 ? -108 : -92); ctx.lineTo(px + 6, px === 0 ? -86 : -70); ctx.closePath(); ctx.fillStyle = P.ink; ctx.fill(); }
  ctx.restore();
}
export function mace(x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); line([[0, 70], [0, -30]], P.ink, 7); circle(0, -50, 24, P.gold); ctx.beginPath(); ctx.arc(0, -50, 24, 0, TAU); ctx.strokeStyle = P.ink; ctx.lineWidth = 4; ctx.stroke(); ctx.restore(); }
export function flame(x, y, s = 1, t = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s * (1 + 0.08 * Math.sin(t * 9 + x)));
  ctx.beginPath(); ctx.moveTo(-26, 0); ctx.quadraticCurveTo(-34, -40, -8, -70); ctx.quadraticCurveTo(-6, -40, 8, -48); ctx.quadraticCurveTo(14, -84, 4, -112); ctx.quadraticCurveTo(40, -60, 26, 0); ctx.closePath();
  ctx.fillStyle = P.fire; ctx.fill(); ctx.beginPath(); ctx.moveTo(-12, 0); ctx.quadraticCurveTo(-14, -26, 0, -40); ctx.quadraticCurveTo(14, -20, 12, 0); ctx.closePath(); ctx.fillStyle = P.gold; ctx.fill(); ctx.restore();
}

// ═════════════════════════ SCENES (white paper by default, black night when needed) ═════════════════════════
export function heaven(t = 0) {
  fillAll(P.paper); circle(540, 640, 400, '#FFF4DA');
  const cloud = (x, y, s) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#F1F1F1'; ctx.strokeStyle = P.ink; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-90, 0); ctx.arc(-55, -4, 36, Math.PI, Math.PI * 1.5); ctx.arc(-5, -30, 46, Math.PI * 1.15, Math.PI * 1.9); ctx.arc(48, -4, 38, Math.PI * 1.5, 0); ctx.lineTo(80, 0); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore(); };
  cloud(170 + Math.sin(t) * 12, 420, 1.3); cloud(930 - Math.sin(t) * 12, 760, 1.1); cloud(240, 1000, 0.9);
  line([[-300, GROUND], [W + 300, GROUND]], P.ink, 5);
}
export function underworld(t = 0) {
  fillAll(P.night); ell(540, GROUND + 20, 760, 200, '#2A0F18');
  for (let i = 0; i < 9; i++) flame(60 + i * 120 + (i % 2) * 24, GROUND - 4 + (i % 3) * 10, 1.1 + rnd(i) * 0.9, t + i);
  line([[-300, GROUND], [W + 300, GROUND]], P.bone, 4);
  for (let i = 0; i < 30; i++) circle(rnd(i) * W, 120 + rnd(i + 40) * 700, 2 + rnd(i + 80) * 3, 'rgba(255,255,255,0.5)');
}
export function ocean(t = 0) {
  fillAll(P.paper); ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, 980); ctx.clip(); circle(540, 980, 330, P.saffron); ctx.restore();
  for (let r = 0; r < 7; r++) { ctx.beginPath(); for (let x = -20; x <= W + 20; x += 20) { const y = 990 + r * 62 + Math.sin(x * 0.02 + t * 2 + r) * 12; x === -20 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.strokeStyle = P.ink; ctx.lineWidth = 4 - r * 0.25; ctx.stroke(); }
}
export function nightSky(t = 0) {
  fillAll(P.night); for (let i = 0; i < 40; i++) circle(rnd(i) * W, 80 + rnd(i + 50) * 900, 2 + rnd(i + 99) * 3, P.bone);
  circle(820, 330, 90, P.bone); circle(850, 310, 80, P.night); line([[-300, GROUND], [W + 300, GROUND]], P.bone, 4);
}

// ═════════════════════════ GRAPHICS ═════════════════════════
/** words = [{ txt, hi }]: white outlined caption, one gold word, centred at x, y */
export function caption(words, x, y, s = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.font = '900 104px Inter, NotoDev'; ctx.textBaseline = 'middle'; ctx.textAlign = 'left'; ctx.lineJoin = 'round';
  const gap = 30, wid = (r) => r.map((w) => ctx.measureText(w.txt).width), tot = (r) => wid(r).reduce((a, b) => a + b, 0) + gap * (r.length - 1);
  const rows = tot(words) > 1150 && words.length > 2 ? [words.slice(0, Math.ceil(words.length / 2)), words.slice(Math.ceil(words.length / 2))] : [words];
  rows.forEach((row, ri) => {
    const ws = wid(row), t = tot(row), k = Math.min(1, 960 / t); ctx.save(); ctx.translate(0, (ri - (rows.length - 1) / 2) * 120); ctx.scale(k, k); let cx = -t / 2;
    row.forEach((w, i) => { ctx.lineWidth = 24; ctx.strokeStyle = P.ink; ctx.strokeText(w.txt, cx, 0); ctx.fillStyle = w.hi ? P.gold : P.paper; ctx.fillText(w.txt, cx, 0); cx += ws[i] + gap; });
    ctx.restore();
  });
  ctx.restore();
}
/** black plate: gold book name, white chapter */
export function nameCard(book, chap, x, y, s = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rr(-300, -62, 600, 124, 18); ctx.fillStyle = P.ink; ctx.fill(); ctx.strokeStyle = P.gold; ctx.lineWidth = 5; ctx.stroke();
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.letterSpacing = LS(book, '6px'); ctx.font = '900 46px Inter, NotoDev'; const bw = ctx.measureText(book).width, bk = Math.min(1, 540 / bw); ctx.save(); ctx.scale(bk, bk); ctx.fillStyle = P.gold; ctx.fillText(book, 0, -14 / bk); ctx.restore();
  ctx.letterSpacing = LS(chap, '4px'); ctx.font = '800 26px Inter, NotoDev'; const cw = ctx.measureText(chap).width, ck = Math.min(1, 540 / cw); ctx.save(); ctx.scale(ck, ck); ctx.fillStyle = P.paper; ctx.fillText(chap, 0, 30 / ck); ctx.restore(); ctx.letterSpacing = '0px'; ctx.restore();
}
export function partTag(txt, x, y, s = 1, dark = false) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.font = '900 38px Inter, NotoDev'; const tw = ctx.measureText(txt).width + 60;
  rr(-tw / 2, -32, tw, 64, 32); ctx.fillStyle = P.gold; ctx.fill(); ctx.strokeStyle = P.ink; ctx.lineWidth = 5; ctx.stroke();
  ctx.fillStyle = P.ink; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(txt, 0, 2); ctx.restore();
}
export function burst(x, y, r, col = P.gold, a = 1) {
  ctx.save(); ctx.globalAlpha = a; for (let i = 0; i < 16; i++) { const an = (i / 16) * TAU; line([[x + Math.cos(an) * r * 0.55, y + Math.sin(an) * r * 0.55], [x + Math.cos(an) * r * (i % 2 ? 0.85 : 1), y + Math.sin(an) * r * (i % 2 ? 0.85 : 1)]], col, r * 0.06); } ctx.restore();
}
export const captionBar = (words, x, y, s) => caption(words, x, y, s);
