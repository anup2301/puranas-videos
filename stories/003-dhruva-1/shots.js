// DHRUVA, PART 1 OF 2 (Bhagavata Purana, Canto 4, ch. 8-9). Divine Lines.
import { ctx, W, H, TAU, lerp, seg, eio, eob, rr, circle, ell, line, fillAll } from './core/lib.js';
import { L, Le } from './core/timing.js';
import * as K from './core/kit.js';
const { P, GROUND } = K, INK = P.ink;
const HI = __HI__;
const fr = (i, f) => L(i) + f * (Le(i) - L(i));

function throne(x, y, s=1) {
  rr(x-110*s,y-220*s,220*s,220*s,14*s); ctx.fillStyle=P.saffron; ctx.fill(); ctx.strokeStyle=INK; ctx.lineWidth=8*s; ctx.lineJoin='round'; ctx.stroke();
  rr(x-130*s,y-240*s,260*s,40*s,8*s); ctx.fillStyle=P.gold; ctx.fill(); ctx.strokeStyle=INK; ctx.lineWidth=8*s; ctx.stroke();
  rr(x-10*s,y,20*s,60*s,4*s); ctx.fillStyle='#8B5A2B'; ctx.fill(); ctx.strokeStyle=INK; ctx.lineWidth=6*s; ctx.stroke();
}
function star(x,y,r,t){ for(let i=0;i<8;i++){const a=i*TAU/8+t*0.5;line([[x+Math.cos(a)*r*0.6,y+Math.sin(a)*r*0.6],[x+Math.cos(a)*r,y+Math.sin(a)*r]],P.gold,r*0.18);} circle(x,y,r*0.45,P.gold); circle(x,y,r*0.28,'#FFFFFF'); }
function tear(x,y,s,a){ ctx.save(); ctx.globalAlpha=a; ctx.beginPath(); ctx.arc(x,y-12*s,16*s,0,Math.PI); ctx.bezierCurveTo(x+16*s,y-12*s,x+10*s,y+18*s,x,y+24*s); ctx.bezierCurveTo(x-10*s,y+18*s,x-16*s,y-12*s,x,y-12*s); ctx.closePath(); ctx.fillStyle='#6EC6F5'; ctx.fill(); ctx.restore(); }
function tree(x,y,s=1){ rr(x-12*s,y-20*s,24*s,120*s,4*s); ctx.fillStyle='#8B5A2B'; ctx.fill(); ctx.strokeStyle=INK; ctx.lineWidth=6*s; ctx.stroke(); for(const[ox,oy,r]of[[0,-55,70],[-30,-20,55],[30,-20,55]]){circle(x+ox*s,y+oy*s,r*s,INK); circle(x+ox*s,y+oy*s,(r-7)*s,'#BFE3B4');} }

export function buildShots() {
  const S=[],CUES=[],add=(o)=>(S.push(o),o),cue=(t,type,o={})=>CUES.push({t:+t.toFixed(3),type,...o});
  const cut=(i)=>(i===0?0:L(i)-0.08);

  add({id:'S01',at:cut(0),cam:[540,850],zoom:0.08,note:'two wives on two sides of the king',draw(lt,d,t){
    K.heaven(t); K.shadow(540,GROUND,230);
    K.being({x:540,y:GROUND,h:780,kind:'god',glow:P.gold,t,mood:'bless',arms:K.ARMS.down});
    const al=eob(seg(lt,0.1,0.5)); ctx.save(); ctx.globalAlpha=al; K.being({x:230,y:GROUND,h:580,dir:1,kind:'human',mood:'bless',aura:0,arms:K.ARMS.down}); ctx.restore();
    const ar=eob(seg(lt,fr(0,0.42)-cut(0),fr(0,0.42)-cut(0)+0.4)); ctx.save(); ctx.globalAlpha=ar; K.being({x:850,y:GROUND,h:580,dir:-1,kind:'human',mood:'wise',aura:0,arms:K.ARMS.down}); ctx.restore();
  }}); cue(0.3,'whoosh');

  add({id:'S02',at:cut(1),cam:[480,850],zoom:0.07,note:'mother holds tiny Dhruva, name glows',draw(lt,d,t){
    K.heaven(t); K.shadow(380,GROUND,190);
    K.being({x:380,y:GROUND,h:740,kind:'human',mood:'bless',dir:1,arms:[[30,90],[-100,-20]],aura:0});
    K.being({x:510,y:GROUND-180,h:280,kind:'human',mood:'bless',aura:0,arms:K.ARMS.down});
    const a=eob(seg(lt,fr(1,0.68)-cut(1),fr(1,0.72)-cut(1)));
    if(a>0){ctx.save();ctx.translate(510,GROUND-560);ctx.globalAlpha=a;ctx.font='900 88px Inter, NotoDev';ctx.textAlign='center';ctx.textBaseline='middle';ctx.lineWidth=16;ctx.lineJoin='round';ctx.strokeStyle=INK;ctx.strokeText('DHRUVA',0,0);ctx.fillStyle=P.gold;ctx.fillText('DHRUVA',0,0);ctx.restore();}
  }}); cue(cut(1),'whoosh'); cue(cut(1)+fr(1,0.68)-cut(1),'pop');

  add({id:'S03',at:cut(2),cam:[600,850],zoom:0.08,note:'throne, king seated, tiny child approaches',draw(lt,d,t){
    K.heaven(t); throne(620,GROUND,1.1); K.shadow(620,GROUND,180);
    K.being({x:620,y:GROUND,h:700,kind:'god',glow:P.gold,t,mood:'bless',arms:K.ARMS.down});
    const p=eio(seg(lt,0.2,fr(2,0.55)-cut(2)+0.3));
    K.being({x:lerp(200,480,p),y:GROUND-100,h:260,kind:'human',mood:'bless',aura:0,arms:[[110,50],[-80,-20]]});
  }}); cue(cut(2),'whoosh');

  {const st=cut(3),pu=fr(3,0.4)-st;
  add({id:'S04',at:st,cam:[540,850],zoom:0.08,note:'stepmother pushes child off; father watches silently',draw(lt,d,t){
    K.heaven(t); throne(540,GROUND,1.1); K.shadow(540,GROUND,180);
    K.being({x:540,y:GROUND,h:700,kind:'god',glow:'#888',t,mood:lt>pu?'shock':'bless',arms:K.ARMS.down});
    K.being({x:lt<pu?820:820+eob(seg(lt,pu,pu+0.3))*50,y:GROUND,h:600,kind:'human',dir:-1,mood:'angry',aura:0,arms:lt>pu?K.ARMS.point:[[100,30],[-100,-30]]});
    const fall=eob(seg(lt,pu,pu+0.35)),bx=lerp(460,210,fall),by=GROUND-60-Math.sin(fall*Math.PI)*120;
    K.being({x:bx,y:by+60,h:240,kind:'human',mood:'shock',aura:0,arms:[[130,40],[-130,-40]]});
    if(lt>pu)K.burst(460,GROUND-100,160*eob(seg(lt,pu,pu+0.25)),P.red,1-seg(lt,pu+0.25,pu+0.8));
  }}); cue(cut(3),'whoosh'); cue(cut(3)+fr(3,0.4)-cut(3),'thud');}

  add({id:'S05',at:cut(4),cam:[540,850],zoom:0.08,note:'king on throne looks away, says nothing',draw(lt,d,t){
    K.heaven(t); throne(540,GROUND,1.1); K.shadow(540,GROUND,180);
    K.being({x:540,y:GROUND,h:700,kind:'god',glow:'#888',t,mood:'wise',arms:K.ARMS.down});
    K.being({x:190,y:GROUND-60,h:240,kind:'human',mood:'shock',aura:0,arms:[[110,40],[-110,-40]]});
    tear(190,GROUND-320,1.4,eob(seg(lt,0.4,0.9)));
  }}); cue(cut(4),'whoosh');

  add({id:'S06',at:cut(5),cam:[400,850],zoom:0.07,note:'boy runs to mother who holds him',draw(lt,d,t){
    K.heaven(t); K.shadow(360,GROUND,200);
    K.being({x:360,y:GROUND,h:720,kind:'human',mood:'bless',dir:1,arms:[[30,90],[-100,-20]],aura:0});
    const p=eio(seg(lt,0.2,0.9));
    K.being({x:lerp(880,460,p),y:GROUND-100,h:260,kind:'human',mood:'shock',aura:0,arms:K.ARMS.down,walk:lt*10});
    tear(500,GROUND-380,1.2,eob(seg(lt,0.5,0.9)));
  }}); cue(cut(5),'whoosh');

  {const st=cut(6),vs=fr(6,0.72)-st;
  add({id:'S07',at:st,cam:[480,800],zoom:0.07,note:'mother points upward; Vishnu appears faintly above',draw(lt,d,t){
    K.heaven(t); K.shadow(360,GROUND,190);
    K.being({x:360,y:GROUND,h:720,kind:'human',mood:'bless',dir:1,arms:K.ARMS.point,aura:0});
    K.being({x:510,y:GROUND-150,h:260,kind:'human',mood:'calm',aura:0,arms:[[30,70],[-80,-20]]});
    const a=eob(seg(lt,vs,vs+0.4));
    if(a>0){ctx.save();ctx.globalAlpha=Math.min(1,a*1.5);K.being({x:540,y:580+20*(1-a),h:300*Math.min(1,a),kind:'god',glow:P.vishnu,t,arms:K.ARMS.bless,hold:(i,x,y)=>{if(i===2)K.chakra(x-3,y-4,0.5,t);if(i===3)K.lotus(x,y-3,0.6);}});ctx.restore();K.burst(540,580,220*a,P.vishnu,a*0.6);}
  }}); cue(cut(6),'whoosh'); cue(cut(6)+vs,'sparkle',{gain:0.6});}

  add({id:'S08',at:cut(7),cam:[540,850],zoom:0.07,note:'tiny child walks alone into trees',draw(lt,d,t){
    K.heaven(t); for(const[tx,ts]of[[160,1.4],[340,1.1],[760,1.3],[930,1.0]])tree(tx,GROUND,ts);
    const p=eio(seg(lt,0.3,1.5));
    K.being({x:lerp(820,470,p),y:GROUND-100,h:260,kind:'human',mood:'bless',dir:-1,aura:0,walk:lt*9});
  }}); cue(cut(7),'whoosh');

  {const st=cut(8),na=fr(8,0.44)-st;
  add({id:'S09',at:st,cam:[540,850],zoom:0.07,note:'Narada appears; boy looks up',draw(lt,d,t){
    K.heaven(t); for(const[tx,ts]of[[130,1.3],[920,1.2]])tree(tx,GROUND,ts);
    K.being({x:680,y:GROUND-110,h:260,kind:'human',mood:'bless',dir:1,aura:0,arms:[[30,70],[-60,-20]]});
    const a=eob(seg(lt,na,na+0.4));
    if(a>0){ctx.save();ctx.globalAlpha=Math.min(1,a*1.6);K.being({x:300,y:GROUND-20*(1-a),h:680*Math.min(1,a),kind:'sage',t,arms:K.ARMS.point});ctx.restore();}
  }}); cue(cut(8),'whoosh'); cue(cut(8)+na,'pop');}

  add({id:'S10',at:cut(9),cam:[480,850],zoom:0.07,note:'boy speaks firmly to Narada',draw(lt,d,t){
    K.heaven(t);
    K.being({x:300,y:GROUND,h:680,kind:'sage',t,arms:K.ARMS.bless});
    K.being({x:680,y:GROUND-110,h:260,kind:'human',mood:'bless',dir:1,aura:0,arms:K.ARMS.point});
    const a=eob(seg(lt,0.5,1.0));
    if(a>0){ctx.save();ctx.translate(680,GROUND-480);ctx.globalAlpha=a;ctx.font='900 70px Inter, NotoDev';ctx.textAlign='center';ctx.textBaseline='middle';ctx.lineWidth=14;ctx.lineJoin='round';ctx.strokeStyle=INK;ctx.strokeText('VISHNU',0,0);ctx.fillStyle=P.gold;ctx.fillText('VISHNU',0,0);ctx.restore();}
  }}); cue(cut(9),'whoosh'); cue(cut(9)+0.6,'sparkle',{gain:0.4});

  {const st=cut(10),nm=fr(10,0.6)-st;
  add({id:'S11',at:st,cam:[480,850],zoom:0.07,note:'Narada points home; boy sits and does not move',draw(lt,d,t){
    K.heaven(t); for(const[tx,ts]of[[130,1.3],[920,1.2]])tree(tx,GROUND,ts);
    K.being({x:300,y:GROUND,h:680,kind:'sage',t,arms:lt<nm?K.ARMS.point:K.ARMS.bless});
    if(lt<nm)K.being({x:700,y:GROUND-110,h:260,kind:'human',mood:'bless',dir:1,aura:0,arms:[[110,50],[-80,-20]]});
    else{K.being({x:700,y:GROUND-110,h:260,kind:'human',mood:'calm',dir:1,aura:0,arms:K.ARMS.pray});star(700,GROUND-390,46,t*0.6);}
  }}); cue(cut(10),'whoosh'); cue(cut(10)+nm,'sparkle',{gain:0.5});}

  {const st=cut(11);
  add({id:'S12',at:st,cam:[540,800],zoom:0.08,note:'night sky, tiny Dhruva meditates, pole star above',draw(lt,d,t){
    K.nightSky(t); star(540,220,70+8*Math.sin(t*3),t*0.4);
    K.being({x:540,y:GROUND-110,h:260,kind:'human',mood:'calm',aura:0,arms:K.ARMS.pray});
    K.nameCard('BHAGAVATA PURANA','CANTO 4 · DHRUVA',540,150-130*(1-eob(seg(lt,0.1,0.5))),1.15);
    K.partTag('PART 1 OF 2',540,285,1.2);
  }}); cue(cut(11),'whoosh'); cue(cut(11)+0.6,'sparkle',{gain:0.5});}

  return {shots:S,cues:CUES};
}
