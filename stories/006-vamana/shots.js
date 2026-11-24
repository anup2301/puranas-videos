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
  // 0 hook: giant foot over a tiny boy
  add({ id: 'V01', at: cut(0), cam: [540, 850], zoom: 0.07, note: 'tiny boy under a giant foot', draw(lt, d, t) {
    K.heaven(t); const f = eio(seg(lt, 0.2, 2)); foot(540, lerp(-200, 330, f), 1.6, 0);
    K.being({ x: 540, y: GROUND, h: 300, kind: 'human', t }); umbrella(540, GROUND - 360, 0.8); pill(HI ? '' : 'THREE STEPS', 540, 1000, 1.1);
  } }); cue(0.3, 'whoosh');
  // 1 Bali conquers heaven; gods flee
  add({ id: 'V02', at: cut(1), cam: [540, 850], zoom: 0.07, note: 'Bali on top, gods flee', draw(lt, d, t) {
    K.heaven(t); K.being({ x: 760, y: GROUND, h: 760, kind: 'demon', glow: P.gold, t, mood: 'menace', arms: K.ARMS.menace });
    for (const [gx, gs] of [[150, 300], [300, 260]]) K.being({ x: gx - lt * 25, y: GROUND, h: gs, kind: 'god', glow: P.gold, t, dir: -1, walk: t * 8, mood: 'shock' });
    pill('KING BALI', 760, 220, 1.1);
  } }); cue(cut(1), 'whoosh');
  // 2 Vamana arrives
  add({ id: 'V03', at: cut(2), cam: [540, 850], zoom: 0.07, note: 'small boy with umbrella walks to the altar fire', draw(lt, d, t) {
    K.heaven(t); K.flame(820, GROUND - 30, 1.6, t); const x = lerp(-100, 480, eio(seg(lt, 0, 3.2)));
    K.being({ x, y: GROUND, h: 380, kind: 'human', t, walk: t * 7 }); umbrella(x + 30, GROUND - 440, 0.9); pill(HI ? '' : 'VAMANA', 540, 240, 1.1);
  } }); cue(cut(2), 'whoosh');
  // 3 the ask
  add({ id: 'V04', at: cut(3), cam: [540, 850], zoom: 0.07, note: 'Bali offers, boy asks three steps', draw(lt, d, t) {
    K.heaven(t); K.being({ x: 780, y: GROUND, h: 760, kind: 'demon', glow: P.gold, t, dir: -1, mood: 'bless', arms: K.ARMS.bless });
    K.being({ x: 300, y: GROUND, h: 380, kind: 'human', t }); umbrella(330, GROUND - 440, 0.9); pill(HI ? '' : '3 STEPS', 330, 420, 1.1);
  } }); cue(cut(3), 'whoosh');
  // 4 Shukracharya warns
  add({ id: 'V05', at: cut(4), cam: [540, 850], zoom: 0.07, note: 'sage warns Bali', draw(lt, d, t) {
    K.heaven(t); K.being({ x: 760, y: GROUND, h: 760, kind: 'demon', glow: P.gold, t, dir: -1 });
    K.being({ x: 280, y: GROUND, h: 780, kind: 'sage', t, mood: 'shock', arms: K.ARMS.point }); pill(HI ? '' : 'IT IS VISHNU', 300, 200, 1.0, '#FFB3B3');
  } }); cue(cut(4), 'whoosh');
  // 5 the water is poured
  add({ id: 'V06', at: cut(5), cam: [540, 850], zoom: 0.07, note: 'Bali pours water: the promise', draw(lt, d, t) {
    K.heaven(t); K.being({ x: 640, y: GROUND, h: 760, kind: 'demon', glow: P.gold, t, dir: -1, mood: 'bless', arms: K.ARMS.down });
    K.being({ x: 260, y: GROUND, h: 380, kind: 'human', t }); pot(520, GROUND - 400, 1.0, eio(seg(lt, 0.3, 1.2)) * 0.9, t); pill(HI ? '' : 'I PROMISE', 560, 200, 1.1);
  } }); cue(cut(5), 'whoosh'); cue(cut(5) + 0.8, 'sparkle', { gain: 0.5 });
  // 6 growth
  add({ id: 'V07', at: cut(6), cam: [540, 850], zoom: 0.04, note: 'boy grows into a giant god', draw(lt, d, t) {
    K.heaven(t); const g = eio(seg(lt, 0.2, 2.2)); const h = lerp(380, 1500, g);
    K.being({ x: 540, y: GROUND + 40, h, kind: g > 0.3 ? 'god' : 'human', glow: P.vishnu, t, mood: 'bless', arms: g > 0.3 ? K.ARMS.four : undefined, aura: g > 0.3 ? 1 : 0 });
    K.being({ x: 150, y: GROUND, h: 520, kind: 'demon', glow: P.gold, t, mood: 'shock' });
  } }); cue(cut(6), 'whoosh'); cue(cut(6) + 0.6, 'slide', { gain: 0.6 });
  // 7 two steps
  add({ id: 'V08', at: cut(7), cam: [540, 850], zoom: 0.05, note: 'foot over earth then over the heavens', draw(lt, d, t) {
    if (lt < 1.9) { K.heaven(t); globe(540, GROUND - 160, 220); foot(540, lerp(0, 400, eio(seg(lt, 0.2, 1.4))), 1.5); pill('EARTH', 540, 1020, 1.1); }
    else { K.nightSky(t); globe(540, GROUND + 100, 120); foot(540, lerp(-300, 450, eio(seg(lt, 1.9, 3.2))), 1.5); pill('HEAVENS', 540, 1020, 1.1); }
  } }); cue(cut(7), 'whoosh'); cue(cut(7) + 1.9, 'whoosh');
  // 8 no space
  add({ id: 'V09', at: cut(8), cam: [540, 850], zoom: 0.07, note: 'foot raised, nothing left to step on', draw(lt, d, t) {
    K.nightSky(t); foot(540, 330 + Math.sin(t * 3) * 8, 1.7); K.being({ x: 540, y: GROUND, h: 300, kind: 'demon', glow: P.gold, t, mood: 'shock' });
    pill(HI ? '' : 'WHERE DOES THE THIRD STEP GO?', 540, 1020, 0.85);
  } }); cue(cut(8), 'whoosh');
  // 9 Bali offers his head
  add({ id: 'V10', at: cut(9), cam: [540, 850], zoom: 0.07, note: 'Bali bows his head under the foot', draw(lt, d, t) {
    K.heaven(t); K.burst(540, GROUND - 500, 340, P.gold, 0.4); foot(540, 260 + eio(seg(lt, 0.6, 2.4)) * 220, 1.5);
    K.being({ x: 540, y: GROUND, h: 520, kind: 'demon', glow: P.gold, t, mood: 'bless', arms: K.ARMS.pray }); pill(HI ? '' : 'PLACE IT HERE', 540, 1040, 1.0);
  } }); cue(cut(9), 'whoosh'); cue(cut(9) + 1.3, 'sparkle', { gain: 0.6 });
  // 10 close
  add({ id: 'V11', at: cut(10), cam: [540, 850], zoom: 0.08, note: 'Vishnu blesses Bali; name card', draw(lt, d, t) {
    K.heaven(t); K.shadow(300, GROUND, 200); K.being({ x: 300, y: GROUND, h: 520, kind: 'demon', glow: P.gold, t, mood: 'bless', arms: K.ARMS.pray });
    K.shadow(780, GROUND, 230); K.being({ x: 780, y: GROUND, h: 840, kind: 'god', glow: P.vishnu, t, mood: 'bless', arms: K.ARMS.four });
    K.nameCard(HI ? '' : 'BHAGAVATA PURANA', HI ? '' : 'CANTO 8 · VAMANA', 540, 120, 1.0);
  } }); cue(cut(10), 'whoosh'); cue(cut(10) + 0.6, 'sparkle', { gain: 0.5 });
  return { shots: S, cues: CUES };
}
