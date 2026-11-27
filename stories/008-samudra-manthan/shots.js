import { ctx, W, H, TAU, lerp, seg, eio, eob, rr, circle, ell, line, fillAll } from './core/lib.js';
import { L, Le } from './core/timing.js';
import * as K from './core/kit.js';
const { P, GROUND } = K, INK = P.ink;
const HI = __HI__;
const rnd = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
function pill(txt, x, y, s = 1, col = P.gold) { if (!txt) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.font = '900 44px Inter, NotoDev'; const tw = ctx.measureText(txt).width + 60; rr(-tw / 2, -32, tw, 64, 32); ctx.fillStyle = col; ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 5; ctx.stroke(); ctx.fillStyle = INK; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(txt, 0, 2); ctx.restore(); }
function umbrella(x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineWidth = 7; ctx.strokeStyle = INK; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 120); ctx.stroke(); ctx.beginPath(); ctx.arc(0, 0, 90, Math.PI, 0); ctx.closePath(); ctx.fillStyle = P.saffronDeep; ctx.fill(); ctx.stroke(); ctx.restore(); }
function foot(x, y, s = 1, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.lineWidth = 8; ctx.strokeStyle = INK; ctx.fillStyle = '#F4C9A0'; ctx.beginPath(); ctx.moveTo(-70, -260); ctx.lineTo(70, -260); ctx.lineTo(80, 0); ctx.quadraticCurveTo(160, 40, 150, 90); ctx.lineTo(-90, 90); ctx.quadraticCurveTo(-110, 20, -70, -60); ctx.closePath(); ctx.fill(); ctx.stroke(); for (let i = 0; i < 5; i++) circle(-70 + i * 52, 80, 20 - i * 1.5, INK), circle(-70 + i * 52, 80, 14 - i * 1.5, '#F4C9A0'); ctx.restore(); }
function globe(x, y, r) { circle(x, y, r + 7, INK); circle(x, y, r, '#8FD0F2'); ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.clip(); for (const [ox, oy, w, h2] of [[-0.3, -0.2, 0.55, 0.35], [0.35, 0.3, 0.45, 0.3], [-0.2, 0.45, 0.3, 0.2]]) { ctx.beginPath(); ctx.ellipse(x + ox * r, y + oy * r, w * r, h2 * r, 0.3, 0, TAU); ctx.fillStyle = '#9ED68F'; ctx.fill(); } ctx.restore(); }
function pot(x, y, s = 1, tilt = 0, t = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(tilt); ctx.scale(s, s); ctx.lineWidth = 7; ctx.strokeStyle = INK; ctx.fillStyle = P.gold; ctx.beginPath(); ctx.ellipse(0, 0, 50, 42, 0, 0, TAU); ctx.fill(); ctx.stroke(); rr(-18, -78, 36, 40, 8); ctx.fill(); ctx.stroke(); ctx.restore(); if (tilt) { ctx.save(); ctx.strokeStyle = '#6EC6F5'; ctx.lineWidth = 8; ctx.setLineDash([14, 12]); ctx.lineDashOffset = -t * 60; ctx.beginPath(); ctx.moveTo(x + 40, y + 30); ctx.lineTo(x + 40, y + 200); ctx.stroke(); ctx.restore(); } }
function noose(x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineWidth = 8; ctx.strokeStyle = '#8B5A2B'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.bezierCurveTo(60, -50, 120, 40, 90, 90); ctx.stroke(); ctx.beginPath(); ctx.ellipse(90, 110, 28, 24, 0, 0, TAU); ctx.stroke(); ctx.restore(); }


// ---- colourful scene backgrounds + props (Divine Lines figures stay white with black ink) ----
function grad(c1, c2, c3) { const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, c1); if (c3) g.addColorStop(0.55, c2); g.addColorStop(1, c3 || c2); ctx.fillStyle = g; ctx.fillRect(-300, -300, W + 600, H + 600); }
function waves(t, y0, cols) { cols.forEach((c, r) => { ctx.beginPath(); ctx.moveTo(-300, H + 300); for (let x = -300; x <= W + 300; x += 20) ctx.lineTo(x, y0 + r * 70 + Math.sin(x * 0.012 + t * 1.6 + r * 1.3) * (14 + r * 4)); ctx.lineTo(W + 300, H + 300); ctx.closePath(); ctx.fillStyle = c; ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 5; ctx.stroke(); }); }
function sun(x, y, r, c = '#FFE29A') { circle(x, y, r + 20, 'rgba(255,255,255,0.25)'); circle(x, y, r, c); }
function mountain(x, y, s = 1, tilt = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(tilt); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(-260, 0); ctx.lineTo(-40, -520); ctx.lineTo(40, -520); ctx.lineTo(260, 0); ctx.closePath(); ctx.fillStyle = '#B98B5E'; ctx.fill(); ctx.lineWidth = 8; ctx.strokeStyle = INK; ctx.stroke(); ctx.beginPath(); ctx.moveTo(-60, -440); ctx.lineTo(-40, -520); ctx.lineTo(40, -520); ctx.lineTo(70, -430); ctx.closePath(); ctx.fillStyle = '#7CC27A'; ctx.fill(); ctx.stroke(); ctx.restore(); }
function serpent(x0, x1, y, t, amp = 34) { ctx.save(); ctx.lineCap = 'round'; ctx.beginPath(); for (let x = x0; x <= x1; x += 16) { const yy = y + Math.sin(x * 0.03 + t * 3) * amp; x === x0 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy); } ctx.strokeStyle = INK; ctx.lineWidth = 50; ctx.stroke(); ctx.strokeStyle = '#8E6AD0'; ctx.lineWidth = 36; ctx.stroke(); ctx.setLineDash([10, 26]); ctx.strokeStyle = '#CDB8F5'; ctx.lineWidth = 12; ctx.stroke(); ctx.restore(); circle(x1 + 10, y + Math.sin(x1 * 0.03 + t * 3) * amp, 42, INK); circle(x1 + 10, y + Math.sin(x1 * 0.03 + t * 3) * amp, 34, '#8E6AD0'); circle(x1 + 22, y + Math.sin(x1 * 0.03 + t * 3) * amp - 8, 6, '#FFFFFF'); }
function tortoise(x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineWidth = 8; ctx.strokeStyle = INK; for (const lx of [-170, 130]) { rr(lx, -30, 60, 70, 20); ctx.fillStyle = '#7CC27A'; ctx.fill(); ctx.stroke(); } ctx.beginPath(); ctx.ellipse(0, 0, 260, 150, 0, Math.PI, 0); ctx.closePath(); ctx.fillStyle = '#4B8A3E'; ctx.fill(); ctx.stroke(); for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.arc(i * 90, -60, 40, 0, TAU); ctx.strokeStyle = '#2E5E2A'; ctx.lineWidth = 6; ctx.stroke(); } circle(300, -20, 52, INK); circle(300, -20, 45, '#7CC27A'); circle(318, -30, 7, INK); ctx.restore(); }
function poison(x, y, t, s = 1) { for (let i = 0; i < 9; i++) { const a = i * 0.9 + t * 1.2, r = (60 + (i % 3) * 40) * s; circle(x + Math.cos(a) * 110 * s, y - i * 38 * s + Math.sin(a * 1.3) * 25, r, i % 2 ? '#3E1F5E' : '#2C6B3A'); } }
function amritaPot(x, y, s = 1, t = 0) { K.burst(x, y - 40 * s, 220 * s + 10 * Math.sin(t * 4), P.gold, 0.55); ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineWidth = 8; ctx.strokeStyle = INK; ctx.fillStyle = P.gold; ctx.beginPath(); ctx.ellipse(0, 0, 90, 80, 0, 0, TAU); ctx.fill(); ctx.stroke(); rr(-36, -118, 72, 50, 12); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.ellipse(0, -118, 44, 14, 0, 0, TAU); ctx.fillStyle = '#FFF1D6'; ctx.fill(); ctx.stroke(); ctx.restore(); }
function cow(x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineWidth = 7; ctx.strokeStyle = INK; for (const lx of [-70, -30, 30, 70]) { rr(lx - 9, 0, 18, 70, 6); ctx.fillStyle = '#FFFFFF'; ctx.fill(); ctx.stroke(); } ctx.beginPath(); ctx.ellipse(0, -10, 100, 60, 0, 0, TAU); ctx.fillStyle = '#FFFFFF'; ctx.fill(); ctx.stroke(); circle(110, -30, 38, INK); circle(110, -30, 32, '#FFFFFF'); ctx.beginPath(); ctx.moveTo(100, -62); ctx.lineTo(90, -90); ctx.moveTo(124, -62); ctx.lineTo(136, -88); ctx.stroke(); circle(122, -36, 5, INK); ctx.restore(); }
function whiteElephant(x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineWidth = 7; ctx.strokeStyle = INK; for (const lx of [-60, -20, 30, 70]) { rr(lx - 14, 0, 28, 75, 10); ctx.fillStyle = '#FFFFFF'; ctx.fill(); ctx.stroke(); } ctx.beginPath(); ctx.ellipse(0, -30, 110, 70, 0, 0, TAU); ctx.fillStyle = '#FFFFFF'; ctx.fill(); ctx.stroke(); circle(115, -60, 46, INK); circle(115, -60, 40, '#FFFFFF'); ctx.beginPath(); ctx.moveTo(145, -40); ctx.quadraticCurveTo(175, 10, 150, 50); ctx.lineWidth = 22; ctx.strokeStyle = INK; ctx.stroke(); ctx.lineWidth = 12; ctx.strokeStyle = '#FFFFFF'; ctx.stroke(); circle(125, -70, 5, INK); ctx.restore(); }
function horse(x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineWidth = 7; ctx.strokeStyle = INK; for (const lx of [-70, -35, 40, 75]) { rr(lx - 9, 0, 18, 80, 6); ctx.fillStyle = '#FFFFFF'; ctx.fill(); ctx.stroke(); } ctx.beginPath(); ctx.ellipse(0, -15, 100, 50, 0, 0, TAU); ctx.fillStyle = '#FFFFFF'; ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(70, -40); ctx.lineTo(130, -120); ctx.lineTo(175, -100); ctx.lineTo(140, -50); ctx.closePath(); ctx.fill(); ctx.stroke(); circle(150, -100, 5, INK); ctx.restore(); }

export function buildShots() {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.08);
  // 1 hook: wide sunrise over the milk ocean, glowing pot rising; camera pushes in on the pot
  add({ id: 'M01', at: cut(0), cam: [540, 760], zoom: 0.24, note: 'sunrise ocean, glowing pot rises (push-in)', draw(lt, d, t) {
    grad('#FFB199', '#FFD6A5', '#9AD8E8'); sun(540, 860, 230); waves(t, 1010, ['#BFE6FA', '#8FD0F2', '#5BB6E8']);
    amritaPot(540, 1020 - eio(seg(lt, 0.3, 2.4)) * 220, 1.2, t); pill(HI ? '' : 'THE NECTAR OF IMMORTALITY', 540, 250, 0.85);
  } }); cue(0.3, 'whoosh'); cue(1.2, 'sparkle', { gain: 0.5 });
  // 2 curse: stormy purple; low camera looking up at the demons
  add({ id: 'M02', at: cut(1), cam: [760, 1100], zoom: 0.16, note: 'low angle: demons tower over the gods', draw(lt, d, t) {
    grad('#3B2A6B', '#7A4E9E', '#B565A7'); for (let i = 0; i < 5; i++) circle(120 + i * 220 + Math.sin(t + i) * 20, 300 + (i % 2) * 90, 90, 'rgba(30,20,60,0.55)'); line([[-300, GROUND], [W + 300, GROUND]], INK, 5);
    K.being({ x: 780, y: GROUND, h: 900, kind: 'demon', glow: '#E0457B', t, mood: 'menace', arms: K.ARMS.menace });
    for (const [gx, gs] of [[150, 300], [300, 270]]) K.being({ x: gx, y: GROUND, h: gs, kind: 'god', glow: '#9A9A9A', t, mood: 'shock', dir: -1 });
    pill(HI ? '' : 'THE CURSE', 300, 330, 1.0, '#FFB3B3');
  } }); cue(cut(1), 'whoosh'); cue(cut(1) + 1.0, 'thud', { gain: 0.5 });
  // 3 Vishnu advises: golden sky, close-up angle on Vishnu
  add({ id: 'M03', at: cut(2), cam: [540, 650], zoom: 0.26, note: 'close-up on Vishnu giving the idea', draw(lt, d, t) {
    grad('#FFE29A', '#FFC48C', '#FFB199'); K.burst(540, 640, 420 + 12 * Math.sin(t * 3), '#FFFFFF', 0.35); line([[-300, GROUND], [W + 300, GROUND]], INK, 5);
    K.being({ x: 540, y: GROUND, h: 1000, kind: 'god', glow: P.vishnu, t, mood: 'bless', arms: K.ARMS.four, aura: 1 });
    for (const gx of [120, 960]) K.being({ x: gx, y: GROUND, h: 300, kind: 'god', glow: P.gold, t, mood: 'bless', arms: K.ARMS.pray }); pill(HI ? '' : 'CHURN THE OCEAN', 540, 200, 1.0);
  } }); cue(cut(2), 'whoosh'); cue(cut(2) + 0.8, 'sparkle', { gain: 0.5 });
  // 4 mountain + serpent tug of war: wide shot with a side-to-side pan
  add({ id: 'M04', at: cut(3), cam: [540, 900], zoom: 0.05, note: 'wide: gods pull the tail, demons pull the head, rope sways', draw(lt, d, t) {
    grad('#7FD3E0', '#B8E8F0', '#4FA3C7'); sun(860, 330, 120); const px = Math.sin(t * 0.9) * 22; ctx.save(); ctx.translate(px, 0);
    mountain(540, GROUND - 120, 1.5); waves(t, GROUND - 20, ['#8FD0F2', '#4FA3C7']); serpent(-40, 1100, GROUND - 330, t, 30);
    for (const [gx, i] of [[120, 0], [300, 1]]) K.being({ x: gx - Math.sin(t * 3 + i) * 12, y: GROUND + 10, h: 420, kind: 'god', glow: P.gold, t, dir: 1, mood: 'bless' });
    for (const [dx, i] of [[820, 0], [980, 1]]) K.being({ x: dx + Math.sin(t * 3 + i) * 12, y: GROUND + 10, h: 480, kind: 'demon', glow: '#E0457B', t, dir: -1, mood: 'menace' });
    ctx.restore(); pill(HI ? '' : 'MOUNT MANDARA + VASUKI', 540, 220, 0.85);
  } }); cue(cut(3), 'whoosh');
  // 5 the mountain sinks, Vishnu the tortoise holds it: deep blue, low camera
  add({ id: 'M05', at: cut(4), cam: [540, 1150], zoom: 0.22, note: 'underwater: tortoise holds up the tilting mountain', draw(lt, d, t) {
    grad('#1F4E8C', '#2C7DB8', '#46B4C9'); for (let i = 0; i < 16; i++) circle((i * 97 + t * 30) % W, 1700 - ((i * 211 + t * 90) % 1500), 10 + (i % 4) * 6, 'rgba(255,255,255,0.35)');
    const tilt = lerp(0.35, 0, eio(seg(lt, 0.3, 2.6))); mountain(540, 1150 + 40 * (1 - eio(seg(lt, 0.3, 2.6))), 1.5, tilt); tortoise(540, 1500, 1.5); K.burst(840, 1480, 150, P.vishnu, 0.35); pill(HI ? '' : 'KURMA', 540, 220, 1.1);
  } }); cue(cut(4), 'whoosh'); cue(cut(4) + 1.6, 'thud', { gain: 0.5 });
  // 6 poison rises: tilted camera, sickly green-purple
  add({ id: 'M06', at: cut(5), cam: [540, 800], zoom: 0.2, note: 'tilted angle, poison cloud rises, gods flee', draw(lt, d, t) {
    grad('#2B3A1F', '#4F2C63', '#1B1230'); ctx.save(); ctx.translate(540, 900); ctx.rotate(-0.06); ctx.translate(-540, -900);
    waves(t, GROUND - 30, ['#3D6B3A', '#2C4F2F']); poison(540, GROUND - 40, t, 1.3); const f = eio(seg(lt, 0.3, 2.4));
    for (const [gx, i] of [[160, 0], [320, 1]]) K.being({ x: gx - f * 160, y: GROUND, h: 330, kind: 'god', glow: P.gold, t, dir: -1, walk: t * 9, mood: 'shock' });
    for (const [dx, i] of [[880, 0]]) K.being({ x: dx + f * 160, y: GROUND, h: 420, kind: 'demon', glow: '#E0457B', t, walk: t * 9, mood: 'shock' });
    ctx.restore(); pill(HI ? '' : 'POISON', 540, 230, 1.2, '#C9F0A8');
  } }); cue(cut(5), 'whoosh'); cue(cut(5) + 1.3, 'thud', { gain: 0.6 });
  // 7 Shiva drinks it: midnight blue, hero low-angle shot, blue glow at the throat
  add({ id: 'M07', at: cut(6), cam: [540, 620], zoom: 0.3, note: 'low angle hero shot of Shiva, blue throat', draw(lt, d, t) {
    grad('#0B1B3D', '#16336B', '#1F4E8C'); for (let i = 0; i < 40; i++) circle(rnd(i) * W, 60 + rnd(i + 50) * 900, 2 + rnd(i + 99) * 3, 'rgba(255,255,255,0.7)'); line([[-300, GROUND], [W + 300, GROUND]], '#9EB6E8', 5);
    K.burst(540, GROUND - 640, 360 + 14 * Math.sin(t * 3), '#6EA8FF', 0.45); K.being({ x: 540, y: GROUND, h: 1000, kind: 'god', glow: '#6EA8FF', t, mood: 'bless', arms: K.ARMS.bless, aura: 1 });
    circle(540, GROUND - 780, 30 + eio(seg(lt, 1.0, 2.6)) * 40, 'rgba(70,130,255,0.55)'); pill(HI ? '' : 'NILAKANTHA, THE BLUE-THROATED', 540, 200, 0.8, '#BFD8FF');
  } }); cue(cut(6), 'whoosh'); cue(cut(6) + 1.1, 'sparkle', { gain: 0.6 });
  // 8 wonders rise: pastel rainbow, camera pans left to right across the treasures
  add({ id: 'M08', at: cut(7), cam: [540, 880], zoom: 0.05, note: 'pan across: cow, elephant, horse, Lakshmi', draw(lt, d, t) {
    grad('#FFD1DC', '#E4D1FF', '#BFEAF5'); const pan = lerp(180, -180, eio(seg(lt, 0, d))); ctx.save(); ctx.translate(pan, 0); waves(t, GROUND + 20, ['#BFE6FA', '#8FD0F2']);
    cow(120, GROUND - 40, 1.3); whiteElephant(470, GROUND - 40, 1.3); horse(820, GROUND - 40, 1.3); K.being({ x: 1180, y: GROUND, h: 620, kind: 'god', glow: '#E0457B', t, mood: 'bless', arms: K.ARMS.bless }); K.lotus(1130, GROUND - 100, 1.0); ctx.restore();
    pill(HI ? '' : 'WONDERS FROM THE WAVES', 540, 220, 0.9);
  } }); cue(cut(7), 'whoosh'); cue(cut(7) + 1.0, 'sparkle', { gain: 0.5 });
  // 9 Dhanvantari + amrita: golden close-up, pot lit
  add({ id: 'M09', at: cut(8), cam: [540, 700], zoom: 0.3, note: 'close-up Dhanvantari holds the glowing pot', draw(lt, d, t) {
    grad('#FFF1B8', '#FFD27A', '#FFB45E'); K.burst(540, 700, 480, '#FFFFFF', 0.35); line([[-300, GROUND], [W + 300, GROUND]], INK, 5);
    K.being({ x: 540, y: GROUND, h: 900, kind: 'god', glow: P.gold, t, mood: 'bless', arms: K.ARMS.bless }); amritaPot(742, 560 + Math.sin(t * 2) * 8, 0.7, t); pill(HI ? '' : 'DHANVANTARI', 540, 200, 1.0);
  } }); cue(cut(8), 'whoosh'); cue(cut(8) + 0.8, 'sparkle', { gain: 0.7 });
  // 10 Mohini trick: rose pink, demons grab, then the gods drink
  add({ id: 'M10', at: cut(9), cam: [540, 800], zoom: 0.14, note: 'demons lunge at the pot; Mohini distracts; gods drink', draw(lt, d, t) {
    grad('#FFB3C7', '#FF8FB1', '#E86C9E'); line([[-300, GROUND], [W + 300, GROUND]], INK, 5); const g = lt > 2.2;
    amritaPot(540, GROUND - 340, 0.9, t);
    for (const [dx, i] of [[160, 0], [300, 1]]) K.being({ x: dx + (g ? -40 : 0) + Math.sin(t * 8 + i) * (g ? 0 : 10), y: GROUND, h: 520, kind: 'demon', glow: '#E0457B', t, mood: g ? 'shock' : 'menace', arms: K.ARMS.menace });
    K.being({ x: 800, y: GROUND, h: 760, kind: 'god', glow: P.vishnu, t, dir: -1, mood: 'bless', arms: K.ARMS.bless }); K.being({ x: 980, y: GROUND, h: 340, kind: 'god', glow: P.gold, t, dir: -1, mood: g ? 'bless' : 'shock' });
    pill(HI ? '' : 'MOHINI', 800, 230, 1.0);
  } }); cue(cut(9), 'whoosh'); cue(cut(9) + 2.2, 'sparkle', { gain: 0.6 });
  // 11 close: sunrise over the calm ocean, name card
  add({ id: 'M11', at: cut(10), cam: [540, 800], zoom: 0.06, note: 'sunrise, gods celebrate; name card', draw(lt, d, t) {
    grad('#FFB199', '#FFD6A5', '#9AD8E8'); sun(540, 800, 230); waves(t, 1000, ['#BFE6FA', '#8FD0F2', '#5BB6E8']);
    K.being({ x: 330, y: GROUND - 20, h: 520, kind: 'god', glow: P.gold, t, mood: 'bless', arms: K.ARMS.bless }); K.being({ x: 780, y: GROUND - 20, h: 800, kind: 'god', glow: P.vishnu, t, mood: 'bless', arms: K.ARMS.four });
    K.nameCard(HI ? '' : 'BHAGAVATA PURANA', HI ? '' : 'CANTO 8 · SAMUDRA MANTHAN', 540, 120, 1.0);
  } }); cue(cut(10), 'whoosh'); cue(cut(10) + 0.6, 'sparkle', { gain: 0.5 });
  return { shots: S, cues: CUES };
}
