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


function fish(x, y, s = 1, dir = 1, col = '#F2B84B') { ctx.save(); ctx.translate(x, y); ctx.scale(dir * s, s); ctx.lineWidth = 8; ctx.strokeStyle = INK; ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(-170, 0); ctx.quadraticCurveTo(-30, -110, 120, -20); ctx.quadraticCurveTo(60, 70, -30, 70); ctx.quadraticCurveTo(-120, 70, -170, 0); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-170, 0); ctx.lineTo(-250, -60); ctx.lineTo(-240, 50); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-20, -75); ctx.quadraticCurveTo(10, -140, 50, -60); ctx.fill(); ctx.stroke(); circle(70, -20, 14, INK); circle(74, -23, 5, '#FFFFFF'); ctx.beginPath(); ctx.moveTo(100, -60); ctx.lineTo(160, -140); ctx.stroke(); ctx.restore(); }
function boat(x, y, s = 1, t = 0) { ctx.save(); ctx.translate(x, y + Math.sin(t * 2) * 8); ctx.rotate(Math.sin(t * 1.5) * 0.03); ctx.scale(s, s); ctx.lineWidth = 8; ctx.strokeStyle = INK; ctx.fillStyle = '#B98B5E'; ctx.beginPath(); ctx.moveTo(-230, -40); ctx.lineTo(230, -40); ctx.lineTo(170, 60); ctx.lineTo(-170, 60); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(0, -40); ctx.lineTo(0, -260); ctx.stroke(); ctx.beginPath(); ctx.moveTo(0, -250); ctx.lineTo(120, -80); ctx.lineTo(0, -80); ctx.closePath(); ctx.fillStyle = '#FFF1D6'; ctx.fill(); ctx.stroke(); ctx.restore(); }

export function buildShots() {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.08);
  // 1 hook: close-up golden fish glowing in teal water, camera pushes in
  add({ id: 'F01', at: cut(0), cam: [540, 880], zoom: 0.26, note: 'golden fish glows in the dark water (push-in)', draw(lt, d, t) {
    grad('#0E5A74', '#1B8FA8', '#59C9CF'); for (let i = 0; i < 14; i++) circle((i * 131 + t * 25) % W, 1800 - ((i * 197 + t * 70) % 1600), 8 + (i % 4) * 5, 'rgba(255,255,255,0.35)');
    K.burst(540, 900, 320 + 12 * Math.sin(t * 3), '#FFE29A', 0.45); fish(540 + Math.sin(t * 2) * 20, 900, 1.5, 1); pill(HI ? '' : 'THAT FISH WAS GOD', 540, 260, 0.95);
  } }); cue(0.3, 'whoosh'); cue(1.0, 'sparkle', { gain: 0.5 });
  // 2 king at the river, small fish in his hands (close, eye-level)
  add({ id: 'F02', at: cut(1), cam: [540, 950], zoom: 0.2, note: 'king in the river, tiny fish swims into his palms', draw(lt, d, t) {
    grad('#FFD9A0', '#BFE8F0', '#6CC3D5'); sun(820, 380, 140); waves(t, GROUND - 20, ['#BFE6FA', '#8FD0F2', '#5BB6E8']);
    K.being({ x: 460, y: GROUND + 30, h: 780, kind: 'sage', t, mood: 'bless', arms: K.ARMS.pray }); const a = eio(seg(lt, 0.5, 2.5)); fish(lerp(120, 500, a), lerp(GROUND + 40, GROUND - 330, a), 0.35, 1); pill(HI ? '' : 'KING SATYAVRATA', 540, 240, 0.9);
  } }); cue(cut(1), 'whoosh');
  // 3 fish pleads; king places it in a small pot (low camera angle on the pot)
  add({ id: 'F03', at: cut(2), cam: [600, 1150], zoom: 0.2, note: 'low angle on the pot with the small fish', draw(lt, d, t) {
    grad('#FFE6B8', '#FFD1A0', '#FFB88A'); line([[-300, GROUND], [W + 300, GROUND]], INK, 5);
    K.being({ x: 300, y: GROUND, h: 840, kind: 'sage', t, mood: 'bless', arms: K.ARMS.bless }); pot(760, GROUND - 60, 2.0); fish(760, GROUND - 210 + Math.sin(t * 3) * 10, 0.3, 1); pill(HI ? '' : 'SAVE ME', 760, 330, 1.0);
  } }); cue(cut(2), 'whoosh'); cue(cut(2) + 1.8, 'thud', { gain: 0.4 });
  // 4 growth: pot, pond, lake, river, sea; the fish keeps scaling up
  add({ id: 'F04', at: cut(3), cam: [540, 900], zoom: 0.14, note: 'fish grows through pot, pond, lake, river, sea', draw(lt, d, t) {
    const u = seg(lt, 0, d); const stage = Math.min(4, Math.floor(u * 5)); const cols = [['#FFE6B8', '#FFD1A0'], ['#C9E8A8', '#8FD0F2'], ['#BFD8F5', '#6CA9E8'], ['#A8D8E8', '#4FA3C7'], ['#7FC1E0', '#1F6FA8']][stage];
    grad(cols[0], cols[1], cols[1]); waves(t, 1050, [cols[1] === '#FFD1A0' ? '#E0B58A' : '#BFE6FA', '#8FD0F2']); fish(540, 1000 - stage * 20, lerp(0.3, 1.6, eio(u)), 1);
    pill(HI ? '' : ['A POT', 'A POND', 'A LAKE', 'A RIVER', 'THE SEA'][stage], 540, 230, 1.2);
  } }); cue(cut(3), 'whoosh'); cue(cut(3) + 1.5, 'sparkle', { gain: 0.4 });
  // 5 revelation: king bows, Vishnu glow behind the fish
  add({ id: 'F05', at: cut(4), cam: [540, 700], zoom: 0.26, note: 'king bows before a glowing giant fish', draw(lt, d, t) {
    grad('#1B2F6B', '#3F5DB8', '#7FA8E8'); K.burst(700, 720, 420 + 14 * Math.sin(t * 3), '#FFE29A', 0.45); fish(720, 760, 1.7, -1); K.being({ x: 220, y: GROUND, h: 700, kind: 'sage', t, mood: 'shock', arms: K.ARMS.pray }); line([[-300, GROUND], [W + 300, GROUND]], '#9EB6E8', 5); pill(HI ? '' : 'WHO ARE YOU?', 300, 250, 1.0);
  } }); cue(cut(4), 'whoosh'); cue(cut(4) + 1.0, 'sparkle', { gain: 0.6 });
  // 6 Vishnu as golden fish warns of the flood: dark storm
  add({ id: 'F06', at: cut(5), cam: [540, 760], zoom: 0.22, note: 'tilted storm sky, seven-day warning', draw(lt, d, t) {
    grad('#2A2F4F', '#4E4A7F', '#7E5E9A'); for (let i = 0; i < 6; i++) circle(100 + i * 190 + Math.sin(t + i) * 25, 240 + (i % 2) * 100, 100, 'rgba(25,20,55,0.6)');
    ctx.save(); ctx.translate(540, 900); ctx.rotate(-0.05); ctx.translate(-540, -900); K.burst(540, 900, 320, '#FFE29A', 0.4); fish(540, 900, 1.6, 1); ctx.restore(); pill(HI ? '' : '7 DAYS', 540, 220, 1.3, '#FFB3B3');
  } }); cue(cut(5), 'whoosh'); cue(cut(5) + 1.2, 'thud', { gain: 0.6 });
  // 7 load the boat: seeds, herbs, animals, seven sages (wide, pan right)
  add({ id: 'F07', at: cut(6), cam: [540, 900], zoom: 0.04, note: 'loading the boat, slow pan', draw(lt, d, t) {
    grad('#FFE0A8', '#FFC98A', '#BFE8F0'); const pan = lerp(-100, 100, eio(seg(lt, 0, d))); ctx.save(); ctx.translate(pan, 0); waves(t, GROUND - 10, ['#BFE6FA', '#8FD0F2']); boat(540, GROUND - 90, 1.6, t);
    for (const [sx, i] of [[130, 0], [270, 1], [410, 2]]) K.being({ x: sx, y: GROUND + 20, h: 380, kind: 'sage', t, walk: t * 5, mood: 'bless' }); for (let i = 0; i < 4; i++) circle(800 + i * 55, GROUND - 40, 16, ['#7CC27A', '#F2B84B', '#E0457B', '#8E6AD0'][i]); ctx.restore(); pill(HI ? '' : 'SEEDS, HERBS, SAGES', 540, 220, 0.9);
  } }); cue(cut(6), 'whoosh');
  // 8 the flood: boat tied to the fish's horn with Vasuki (low wide angle)
  add({ id: 'F08', at: cut(7), cam: [540, 1000], zoom: 0.18, note: 'flood: boat tied to the horn with the serpent rope', draw(lt, d, t) {
    grad('#27315C', '#3E5A9A', '#5B87C7'); for (let i = 0; i < 24; i++) line([[(i * 61 + t * 600) % (W + 200) - 100, (i * 83) % 900], [(i * 61 + t * 600) % (W + 200) - 140, ((i * 83) % 900) + 70]], 'rgba(255,255,255,0.4)', 3); waves(t, 1150, ['#6EA8E8', '#4F86C7', '#3A67A8']);
    fish(220, 1100, 1.3, 1); ctx.save(); ctx.beginPath(); ctx.strokeStyle = '#8E6AD0'; ctx.lineWidth = 16; for (let x = 330; x <= 640; x += 12) { const yy = 980 + Math.sin(x * 0.05 + t * 3) * 10; x === 330 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy); } ctx.stroke(); ctx.restore(); boat(840, 1040, 1.2, t); pill(HI ? '' : 'THE GREAT FLOOD', 540, 240, 1.0);
  } }); cue(cut(7), 'whoosh'); cue(cut(7) + 0.8, 'thud', { gain: 0.5 });
  // 9 the fish pulls the boat through the dark waters; the king learns (wide to close)
  add({ id: 'F09', at: cut(8), cam: [640, 900], zoom: 0.24, note: 'fish pulls the boat; golden light of wisdom', draw(lt, d, t) {
    grad('#0B1B3D', '#16336B', '#2E5A9E'); for (let i = 0; i < 40; i++) circle(rnd(i) * W, 60 + rnd(i + 50) * 800, 2 + rnd(i + 99) * 3, 'rgba(255,255,255,0.7)'); waves(t, 1120, ['#4F86C7', '#2E5A9E', '#1F4478']);
    const x = lerp(260, 420, eio(seg(lt, 0, d))); fish(x - 220, 1090, 1.2, 1); boat(x + 260, 1010, 1.2, t); K.being({ x: x + 260, y: 1010, h: 380, kind: 'sage', t, mood: 'bless' }); K.burst(x + 260, 700, 220 + 10 * Math.sin(t * 3), '#FFE29A', 0.35); pill(HI ? '' : 'WISDOM', 540, 220, 1.0);
  } }); cue(cut(8), 'whoosh'); cue(cut(8) + 1.2, 'sparkle', { gain: 0.5 });
  // 10 Hayagriva: demon vs fish, Vedas returned (dramatic low angle)
  add({ id: 'F10', at: cut(9), cam: [540, 1000], zoom: 0.2, note: 'demon Hayagriva vs the fish, glowing Vedas', draw(lt, d, t) {
    grad('#3B1F4F', '#6E2F6E', '#B3487A'); waves(t, 1180, ['#7A3E8E', '#552A6E']); const win = lt > 2.0;
    if (!win) K.being({ x: 780, y: 1180, h: 900, kind: 'demon', glow: '#E0457B', t, dir: -1, mood: 'menace', arms: K.ARMS.menace }); fish(win ? 540 : 300, 1050, 1.4, 1);
    if (win) { K.burst(540, 600, 320, '#FFE29A', 0.5); ctx.save(); ctx.translate(540, 560); ctx.lineWidth = 7; ctx.strokeStyle = INK; for (let i = -1; i <= 1; i++) { rr(i * 110 - 45, -60, 90, 120, 10); ctx.fillStyle = '#FFF1D6'; ctx.fill(); ctx.stroke(); } ctx.restore(); }
    pill(HI ? '' : (win ? 'THE VEDAS RETURN' : 'HAYAGRIVA'), 540, 220, 0.95, win ? P.gold : '#FFB3B3');
  } }); cue(cut(9), 'whoosh'); cue(cut(9) + 2.0, 'sparkle', { gain: 0.7 });
  // 11 close: calm sunrise, king as Manu, name card
  add({ id: 'F11', at: cut(10), cam: [540, 820], zoom: 0.06, note: 'calm sunrise; Manu and the boat; name card', draw(lt, d, t) {
    grad('#FFB199', '#FFD6A5', '#9AD8E8'); sun(540, 820, 230); waves(t, 1010, ['#BFE6FA', '#8FD0F2', '#5BB6E8']); boat(300, 1000, 1.0, t); K.being({ x: 780, y: GROUND - 20, h: 780, kind: 'sage', t, mood: 'bless', arms: K.ARMS.bless, aura: 1, glow: P.gold });
    K.nameCard(HI ? '' : 'BHAGAVATA PURANA', HI ? '' : 'CANTO 8 · MATSYA', 540, 120, 1.0);
  } }); cue(cut(10), 'whoosh'); cue(cut(10) + 0.6, 'sparkle', { gain: 0.5 });
  return { shots: S, cues: CUES };
}
