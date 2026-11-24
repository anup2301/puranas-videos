import { ctx, W, H, TAU, lerp, seg, eio, eob, rr, circle, ell, line, fillAll } from './core/lib.js';
import { L, Le } from './core/timing.js';
import * as K from './core/kit.js';
const { P, GROUND } = K, INK = P.ink;
const HI = __HI__;
function pill(txt, x, y, s = 1, col = P.gold) { if (!txt) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.font = '900 44px Inter, NotoDev'; const tw = ctx.measureText(txt).width + 60; rr(-tw / 2, -32, tw, 64, 32); ctx.fillStyle = col; ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 5; ctx.stroke(); ctx.fillStyle = INK; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(txt, 0, 2); ctx.restore(); }
function umbrella(x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineWidth = 7; ctx.strokeStyle = INK; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 120); ctx.stroke(); ctx.beginPath(); ctx.arc(0, 0, 90, Math.PI, 0); ctx.closePath(); ctx.fillStyle = P.saffronDeep; ctx.fill(); ctx.stroke(); ctx.restore(); }
function foot(x, y, s = 1, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.lineWidth = 8; ctx.strokeStyle = INK; ctx.fillStyle = '#F4C9A0'; ctx.beginPath(); ctx.moveTo(-70, -260); ctx.lineTo(70, -260); ctx.lineTo(80, 0); ctx.quadraticCurveTo(160, 40, 150, 90); ctx.lineTo(-90, 90); ctx.quadraticCurveTo(-110, 20, -70, -60); ctx.closePath(); ctx.fill(); ctx.stroke(); for (let i = 0; i < 5; i++) circle(-70 + i * 52, 80, 20 - i * 1.5, INK), circle(-70 + i * 52, 80, 14 - i * 1.5, '#F4C9A0'); ctx.restore(); }
function globe(x, y, r) { circle(x, y, r + 7, INK); circle(x, y, r, '#8FD0F2'); ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.clip(); for (const [ox, oy, w, h2] of [[-0.3, -0.2, 0.55, 0.35], [0.35, 0.3, 0.45, 0.3], [-0.2, 0.45, 0.3, 0.2]]) { ctx.beginPath(); ctx.ellipse(x + ox * r, y + oy * r, w * r, h2 * r, 0.3, 0, TAU); ctx.fillStyle = '#9ED68F'; ctx.fill(); } ctx.restore(); }
function pot(x, y, s = 1, tilt = 0, t = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(tilt); ctx.scale(s, s); ctx.lineWidth = 7; ctx.strokeStyle = INK; ctx.fillStyle = P.gold; ctx.beginPath(); ctx.ellipse(0, 0, 50, 42, 0, 0, TAU); ctx.fill(); ctx.stroke(); rr(-18, -78, 36, 40, 8); ctx.fill(); ctx.stroke(); ctx.restore(); if (tilt) { ctx.save(); ctx.strokeStyle = '#6EC6F5'; ctx.lineWidth = 8; ctx.setLineDash([14, 12]); ctx.lineDashOffset = -t * 60; ctx.beginPath(); ctx.moveTo(x + 40, y + 30); ctx.lineTo(x + 40, y + 200); ctx.stroke(); ctx.restore(); } }
function noose(x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineWidth = 8; ctx.strokeStyle = '#8B5A2B'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.bezierCurveTo(60, -50, 120, 40, 90, 90); ctx.stroke(); ctx.beginPath(); ctx.ellipse(90, 110, 28, 24, 0, 0, TAU); ctx.stroke(); ctx.restore(); }

export function buildShots() {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.08);
  // 0 hook: man with glowing word
  add({ id: 'A01', at: cut(0), cam: [540, 850], zoom: 0.07, note: 'man lying, one glowing word', draw(lt, d, t) {
    K.nightSky(t); K.burst(540, GROUND - 400, 300 + 12 * Math.sin(t * 4), P.gold, 0.5); K.being({ x: 540, y: GROUND, h: 700, kind: 'sage', t, mood: 'bless', arms: K.ARMS.pray });
    pill(HI ? '' : 'ONE WORD', 540, 200, 1.2);
  } }); cue(0.3, 'whoosh');
  // 1 learned brahmin then bad company
  add({ id: 'A02', at: cut(1), cam: [540, 850], zoom: 0.07, note: 'sage turns away from the light toward shadows', draw(lt, d, t) {
    const u = eio(seg(lt, 0.8, 3)); if (u < 0.5) K.heaven(t); else K.underworld(t);
    K.being({ x: lerp(300, 700, u), y: GROUND, h: 720, kind: 'sage', t, walk: t * 5, dir: u > 0.4 ? -1 : 1, mood: u > 0.5 ? 'shock' : undefined });
    pill(HI ? '' : 'BAD COMPANY', 540, 200, 1.1, '#FFB3B3');
  } }); cue(cut(1), 'whoosh');
  // 2 son Narayana
  add({ id: 'A03', at: cut(2), cam: [540, 850], zoom: 0.07, note: 'father and small son', draw(lt, d, t) {
    K.heaven(t); K.being({ x: 640, y: GROUND, h: 720, kind: 'sage', t, mood: 'bless', arms: K.ARMS.bless, dir: -1 }); K.being({ x: 330, y: GROUND, h: 260, kind: 'human', t });
    pill(HI ? '' : 'NARAYANA', 330, 520, 1.0);
  } }); cue(cut(2), 'whoosh');
  // 3 Yamadutas arrive
  add({ id: 'A04', at: cut(3), cam: [540, 850], zoom: 0.07, note: 'three demons with nooses close in', draw(lt, d, t) {
    K.underworld(t); const a = eio(seg(lt, 0.2, 1.8));
    K.being({ x: 640, y: GROUND, h: 600, kind: 'sage', t, mood: 'shock', dark: true });
    for (const [dx, i] of [[-80, 0], [-330, 1], [-560, 2]]) { const x = lerp(-300 + i * 60, 220 + i * 90, a); K.being({ x, y: GROUND, h: 640, kind: 'demon', glow: '#E0457B', t, mood: 'menace', arms: K.ARMS.menace, dark: true }); noose(x + 60, GROUND - 480, 0.8); }
    pill(HI ? '' : 'THE YAMADUTAS', 540, 200, 1.0, '#FFB3B3');
  } }); cue(cut(3), 'whoosh'); cue(cut(3) + 1.4, 'thud', { gain: 0.5 });
  // 4 he calls
  add({ id: 'A05', at: cut(4), cam: [540, 850], zoom: 0.07, note: 'terrified, calls out', draw(lt, d, t) {
    K.underworld(t); K.being({ x: 540, y: GROUND, h: 760, kind: 'sage', t, mood: 'shock', arms: K.ARMS.pray, dark: true });
    ctx.save(); ctx.font = '900 150px Inter, NotoDev'; ctx.textAlign = 'center'; ctx.lineWidth = 28; ctx.strokeStyle = INK; ctx.strokeText('NARAYANA!', 540, 360); ctx.fillStyle = P.gold; ctx.fillText('NARAYANA!', 540, 360); ctx.restore();
  } }); cue(cut(4), 'whoosh'); cue(cut(4) + 0.6, 'sparkle', { gain: 0.6 });
  // 5 Vishnu's attendants appear
  add({ id: 'A06', at: cut(5), cam: [540, 850], zoom: 0.07, note: 'light bursts; Vishnu attendants appear', draw(lt, d, t) {
    K.heaven(t); const a = eio(seg(lt, 0.3, 1.6)); K.burst(540, GROUND - 450, 420 * a, P.gold, 0.5);
    K.being({ x: 640, y: GROUND, h: 600, kind: 'sage', t, mood: 'bless', arms: K.ARMS.pray });
    for (const x of [170, 340]) K.being({ x: x, y: GROUND, h: 760 * a, kind: 'god', glow: P.vishnu, t, arms: K.ARMS.four, aura: 1 }); pill(HI ? '' : 'NARAYANA = VISHNU', 540, 200, 0.9);
  } }); cue(cut(5), 'whoosh'); cue(cut(5) + 0.8, 'sparkle', { gain: 0.7 });
  // 6 they stop the Yamadutas
  add({ id: 'A07', at: cut(6), cam: [540, 850], zoom: 0.07, note: 'attendants block the demons', draw(lt, d, t) {
    K.heaven(t); K.being({ x: 760, y: GROUND, h: 780, kind: 'god', glow: P.vishnu, t, dir: -1, mood: 'bless', arms: K.ARMS.menace });
    K.being({ x: 200, y: GROUND, h: 600, kind: 'demon', glow: '#E0457B', t, mood: 'shock', arms: K.ARMS.menace }); pill(HI ? '' : 'YOU CANNOT TAKE HIM', 540, 200, 0.95);
  } }); cue(cut(6), 'whoosh');
  // 7 the explanation
  add({ id: 'A08', at: cut(7), cam: [540, 850], zoom: 0.07, note: 'god explains to the demons', draw(lt, d, t) {
    K.heaven(t); K.burst(300, GROUND - 600, 220 + 10 * Math.sin(t * 3), P.gold, 0.35);
    K.being({ x: 300, y: GROUND, h: 780, kind: 'god', glow: P.vishnu, t, mood: 'bless', arms: K.ARMS.bless });
    K.being({ x: 740, y: GROUND, h: 600, kind: 'demon', glow: '#E0457B', t, dir: -1, mood: 'shock' }); pill(HI ? '' : 'THE HOLY NAME', 540, 200, 1.1);
  } }); cue(cut(7), 'whoosh');
  // 8 regret
  add({ id: 'A09', at: cut(8), cam: [540, 850], zoom: 0.07, note: 'man bows his head in regret', draw(lt, d, t) {
    K.heaven(t); K.being({ x: 540, y: GROUND, h: 700, kind: 'sage', t, mood: 'shock', arms: K.ARMS.pray }); pill(HI ? '' : 'DEEP REGRET', 540, 200, 1.1);
  } }); cue(cut(8), 'whoosh');
  // 9 Haridwar and devotion
  add({ id: 'A10', at: cut(9), cam: [540, 850], zoom: 0.07, note: 'walks to a river; ends in light', draw(lt, d, t) {
    K.heaven(t); ctx.fillStyle = '#BFE6FA'; ctx.fillRect(0, GROUND - 60, W, 80); const x = lerp(100, 560, eio(seg(lt, 0, 3)));
    K.being({ x, y: GROUND - 20, h: 620, kind: 'sage', t, walk: t * 6 }); if (lt > 3) K.burst(540, 400, 260, P.gold, 0.5); pill(HI ? '' : 'HARIDWAR', 540, 220, 1.1);
  } }); cue(cut(9), 'whoosh'); cue(cut(9) + 3.2, 'sparkle', { gain: 0.6 });
  // 10 close
  add({ id: 'A11', at: cut(10), cam: [540, 850], zoom: 0.08, note: 'Vishnu blesses; name card', draw(lt, d, t) {
    K.heaven(t); K.shadow(300, GROUND, 200); K.being({ x: 300, y: GROUND, h: 640, kind: 'sage', t, mood: 'bless', arms: K.ARMS.pray });
    K.shadow(780, GROUND, 230); K.being({ x: 780, y: GROUND, h: 840, kind: 'god', glow: P.vishnu, t, mood: 'bless', arms: K.ARMS.four });
    K.nameCard(HI ? '' : 'BHAGAVATA PURANA', HI ? '' : 'CANTO 6 · AJAMILA', 540, 120, 1.0);
  } }); cue(cut(10), 'whoosh'); cue(cut(10) + 0.6, 'sparkle', { gain: 0.5 });
  return { shots: S, cues: CUES };
}
