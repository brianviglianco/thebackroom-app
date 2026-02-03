'use client';

import { useEffect, useRef, useState } from 'react';

// Catmull-Rom spline interpolation
function cr(p0: number, p1: number, p2: number, p3: number, t: number): number {
  const t2 = t * t;
  const t3 = t2 * t;
  return 0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3);
}

function spline(wp: number[][], t: number): [number, number] {
  const n = wp.length - 1;
  const s = Math.min(Math.floor(t * n), n - 1);
  const lt = t * n - s;
  const i0 = Math.max(s - 1, 0);
  const i1 = s;
  const i2 = Math.min(s + 1, n);
  const i3 = Math.min(s + 2, n);
  return [
    cr(wp[i0][0], wp[i1][0], wp[i2][0], wp[i3][0], lt),
    cr(wp[i0][1], wp[i1][1], wp[i2][1], wp[i3][1], lt)
  ];
}

// Tactical sequences
const SEQUENCES = [
  {
    name: 'Counter-Attack',
    dur: 10000,
    goalAt: 0.88,
    actions: [
      [0, 'Ball won deep...'],
      [0.08, '→ CB plays to CM'],
      [0.18, '→ CM finds RCM'],
      [0.30, '← Back to CM driving'],
      [0.44, '→ Plays CF'],
      [0.60, '⚡ CF releases LW!'],
      [0.88, '⚽ GOAL! Far post!']
    ],
    players: [
      [[16,88],[18,82],[20,76],[22,70],[24,64],[26,60],[28,56],[30,54]],
      [[38,92],[40,86],[42,80],[44,76],[46,72],[48,68],[50,66],[52,64]],
      [[62,92],[62,86],[62,80],[62,76],[62,72],[62,68],[62,66],[62,64]],
      [[84,88],[82,82],[80,76],[78,70],[76,64],[74,60],[72,56],[70,54]],
      [[30,72],[32,66],[34,58],[36,48],[34,38],[32,30],[32,26],[34,24]],
      [[50,72],[50,68],[50,56],[48,44],[46,38],[44,34],[42,30],[40,28]],
      [[70,72],[68,66],[66,60],[64,52],[62,44],[60,38],[58,34],[56,32]],
      [[15,55],[15,50],[17,42],[21,34],[27,26],[33,22],[38,19],[40,18]],
      [[50,48],[48,44],[46,38],[44,32],[42,28],[42,24],[44,21],[46,19]],
      [[85,55],[82,50],[78,42],[74,34],[70,28],[66,24],[62,21],[60,19]]
    ],
    ball: [
      { t: 0, c: 2 },
      { t: 0.08, c: 5 },
      { t: 0.18, c: 6 },
      { t: 0.30, c: 5 },
      { t: 0.44, c: 8 },
      { t: 0.60, c: 7 },
      { t: 0.88, shot: [57, -3] }
    ],
    defBase: [
      [50,4],[74,32],[58,28],[42,28],[26,32],
      [76,54],[60,50],[40,50],[24,54],[58,70],[42,70]
    ]
  },
  {
    name: 'Tiki-Taka',
    dur: 11000,
    goalAt: 0.87,
    actions: [
      [0, 'Patient buildup...'],
      [0.08, '→ CM to LCM'],
      [0.18, '→ Triangle back to CM'],
      [0.30, '← Switches to RCM'],
      [0.44, '→ RCM finds RW'],
      [0.62, '→ Cut back to CF'],
      [0.87, '⚽ GOAL! Placed finish!']
    ],
    players: [
      [[18,76],[20,72],[22,68],[24,64],[26,60],[28,56],[30,54],[32,52]],
      [[38,82],[40,78],[42,74],[44,70],[46,66],[48,64],[50,62],[52,60]],
      [[62,82],[62,78],[62,74],[62,70],[62,66],[62,64],[62,62],[62,60]],
      [[82,76],[80,72],[78,68],[76,64],[74,60],[72,56],[70,54],[68,52]],
      [[34,60],[36,56],[38,50],[40,46],[42,40],[44,36],[46,32],[48,28]],
      [[50,58],[50,54],[50,48],[50,44],[48,38],[46,34],[44,30],[42,26]],
      [[66,60],[66,56],[66,50],[64,44],[62,38],[60,32],[58,28],[56,26]],
      [[15,44],[18,40],[22,34],[26,28],[30,22],[34,18],[38,16],[40,15]],
      [[50,40],[48,38],[46,36],[44,32],[44,26],[46,22],[48,19],[48,17]],
      [[85,44],[82,40],[78,34],[74,28],[70,22],[66,18],[64,16],[62,15]]
    ],
    ball: [
      { t: 0, c: 5 },
      { t: 0.08, c: 4 },
      { t: 0.18, c: 5 },
      { t: 0.30, c: 6 },
      { t: 0.44, c: 9 },
      { t: 0.62, c: 8 },
      { t: 0.87, shot: [43, -3] }
    ],
    defBase: [
      [50,4],[72,22],[56,19],[44,19],[28,22],
      [72,38],[56,34],[44,34],[28,38],[56,52],[44,52]
    ]
  },
  {
    name: 'Wing Overload',
    dur: 10500,
    goalAt: 0.89,
    actions: [
      [0, 'Building on the right...'],
      [0.10, '→ Ball out to RW'],
      [0.24, '⚡ RB overlapping!'],
      [0.38, '→ Plays the overlap'],
      [0.56, '← RB at the byline'],
      [0.72, '✚ Cross to far post!'],
      [0.89, '⚽ GOAL! Header!']
    ],
    players: [
      [[18,76],[20,72],[22,66],[24,62],[26,58],[28,54],[30,52],[32,50]],
      [[38,82],[40,78],[42,74],[44,70],[46,66],[48,62],[50,60],[52,58]],
      [[62,82],[62,78],[62,74],[64,70],[64,66],[64,62],[64,60],[64,58]],
      [[82,78],[84,70],[86,56],[88,42],[90,28],[88,16],[84,10],[82,8]],
      [[34,60],[36,54],[38,48],[40,42],[42,38],[44,34],[46,30],[48,28]],
      [[50,58],[50,52],[50,46],[50,40],[48,36],[46,32],[44,30],[42,28]],
      [[68,60],[68,54],[66,48],[64,42],[62,38],[60,34],[58,30],[56,28]],
      [[14,44],[18,38],[24,32],[30,26],[36,20],[38,18],[40,15],[38,12]],
      [[50,40],[48,36],[46,32],[44,28],[42,24],[40,20],[38,14],[36,11]],
      [[84,44],[82,38],[80,30],[78,24],[76,20],[74,16],[72,14],[70,14]]
    ],
    ball: [
      { t: 0, c: 6 },
      { t: 0.10, c: 9 },
      { t: 0.38, c: 3 },
      { t: 0.72, c: 8 },
      { t: 0.89, shot: [42, -3] }
    ],
    defBase: [
      [50,4],[74,20],[58,16],[42,16],[26,20],
      [76,38],[58,34],[42,34],[24,38],[58,54],[42,54]
    ]
  },
  {
    name: 'Gegenpressing',
    dur: 9500,
    goalAt: 0.90,
    actions: [
      [0, 'Pressing high...'],
      [0.12, '⚡ AM wins the ball!'],
      [0.26, '→ Plays CF'],
      [0.40, '→ CF lays back'],
      [0.56, '→ Quick to LW'],
      [0.72, '← AM driving at goal...'],
      [0.90, '⚽ GOAL! Top corner!']
    ],
    players: [
      [[18,72],[20,68],[22,64],[24,60],[26,56],[28,52],[30,50],[32,48]],
      [[38,78],[40,74],[42,70],[44,66],[46,62],[48,58],[50,56],[52,54]],
      [[62,78],[62,74],[62,70],[62,66],[62,62],[62,58],[62,56],[62,54]],
      [[82,72],[80,68],[78,64],[76,60],[74,56],[72,52],[70,50],[68,48]],
      [[36,56],[38,50],[40,44],[42,38],[44,34],[46,30],[48,28],[48,26]],
      [[64,56],[64,50],[62,44],[60,38],[58,34],[56,30],[54,28],[52,26]],
      [[18,38],[20,34],[24,28],[28,22],[32,18],[36,14],[40,10],[42,8]],
      [[50,42],[50,38],[48,34],[46,28],[44,24],[44,22],[44,22],[44,22]],
      [[82,38],[78,32],[74,26],[70,20],[66,16],[62,12],[58,10],[56,8]],
      [[50,34],[48,30],[46,24],[44,20],[42,16],[40,14],[40,13],[42,12]]
    ],
    ball: [
      { t: 0, c: 7 },
      { t: 0.12, c: 7 },
      { t: 0.26, c: 9 },
      { t: 0.40, c: 7 },
      { t: 0.56, c: 6 },
      { t: 0.72, c: 7 },
      { t: 0.90, shot: [55, -3] }
    ],
    defBase: [
      [50,4],[78,14],[58,12],[42,12],[22,14],
      [74,32],[58,28],[42,28],[26,32],[60,50],[40,50]
    ]
  },
  {
    name: 'Route One',
    dur: 9500,
    goalAt: 0.90,
    actions: [
      [0, 'Goal kick...'],
      [0.10, '← Long ball forward!'],
      [0.24, '→ CF wins the flick'],
      [0.36, '→ CF2 runs onto it'],
      [0.54, '⚡ Through on goal!'],
      [0.74, '→ Rounds the keeper'],
      [0.90, '⚽ GOAL! Slots it home!']
    ],
    players: [
      [[16,88],[18,82],[20,76],[22,70],[24,64],[26,60],[28,58],[30,56]],
      [[38,94],[40,88],[42,82],[44,76],[46,72],[48,68],[50,66],[52,64]],
      [[62,94],[62,88],[62,82],[62,76],[62,72],[62,68],[62,66],[62,64]],
      [[84,88],[82,82],[80,76],[78,70],[76,64],[74,60],[72,58],[70,56]],
      [[14,70],[18,62],[22,52],[26,44],[30,38],[34,34],[38,30],[40,28]],
      [[38,68],[40,62],[42,54],[44,48],[46,42],[48,38],[50,34],[52,32]],
      [[62,68],[62,62],[62,54],[62,48],[62,42],[62,38],[62,34],[62,32]],
      [[86,70],[82,62],[78,52],[74,44],[70,38],[68,34],[66,30],[64,28]],
      [[38,50],[38,44],[36,38],[34,32],[32,28],[32,24],[34,20],[36,18]],
      [[62,50],[62,44],[62,36],[62,28],[60,18],[56,12],[52,7],[50,5]]
    ],
    ball: [
      { t: 0, c: 1 },
      { t: 0.10, c: 8 },
      { t: 0.36, c: 9 },
      { t: 0.90, shot: [50, -3] }
    ],
    defBase: [
      [50,5],[74,28],[58,26],[42,26],[26,28],
      [74,46],[58,42],[42,42],[26,46],[58,62],[42,62]
    ]
  }
];

const DEF_CLR = '#7B8A96';
const DEF_GK = '#6A9A6A';
const DEF_COUNT = 11;
const TOP_M = 0.12;

interface HeroCanvasProps {
  onActionChange?: (action: string, name: string) => void;
}

export default function HeroCanvas({ onActionChange }: HeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentAction, setCurrentAction] = useState('');
  const [sequenceName, setSequenceName] = useState('');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W: number, H: number, dpr: number;
    let animationId: number;

    // State
    let state = 'playing';
    let curSeq = 0;
    let elapsed = 0;
    let lastTime = 0;
    let transStart = 0;
    const transDur = 1800;
    let transFrom: { x: number; y: number }[] = [];
    let transTo: { x: number; y: number }[] = [];
    let defTransFrom: { x: number; y: number }[] = [];
    let defTransTo: { x: number; y: number }[] = [];
    let transBallFrom = [0, 0];
    let transBallTo = [0, 0];

    // Ball state
    let ballX = 50;
    let ballY = 80;
    let passFromX = 0;
    let passFromY = 0;
    let passStartT = -1;
    let passDur = 0;
    let inPass = false;
    let prevCarrier = -1;
    let goalAlpha = 0;

    // Defender state
    const defCurrent: number[][] = [];
    const defTargets: number[][] = [];
    let prevMarkAssignment: number[] = [];

    // History for velocity calculation
    const posHist: number[][][] = Array(10).fill(null).map(() => []);
    const defPosHist: number[][][] = Array(DEF_COUNT).fill(null).map(() => []);

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      dpr = window.devicePixelRatio || 1;
      W = rect.width;
      H = rect.height;
      canvas!.width = W * dpr;
      canvas!.height = H * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function ppx(x: number) { return (x / 100) * W; }
    function ppy(y: number) { return (TOP_M + (y / 100) * (1 - TOP_M)) * H; }

    function drawPitch() {
      ctx!.clearRect(0, 0, W, H);
      const cx = W * 0.5;
      const gt = TOP_M * H;
      const cl = 'rgba(65,105,58,.28)';
      const cb = 'rgba(78,120,68,.32)';

      ctx!.strokeStyle = cb;
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      ctx!.moveTo(0, gt);
      ctx!.lineTo(W, gt);
      ctx!.stroke();

      ctx!.beginPath();
      ctx!.moveTo(0, H);
      ctx!.lineTo(W, H);
      ctx!.stroke();

      ctx!.beginPath();
      ctx!.arc(cx, H, W * 0.1, Math.PI, 0);
      ctx!.stroke();

      ctx!.strokeStyle = cl;
      const bw = W * 0.58;
      const bh = (H - gt) * 0.38;
      ctx!.beginPath();
      ctx!.moveTo(cx - bw / 2, gt);
      ctx!.lineTo(cx - bw / 2, gt + bh);
      ctx!.lineTo(cx + bw / 2, gt + bh);
      ctx!.lineTo(cx + bw / 2, gt);
      ctx!.stroke();

      const sw = W * 0.26;
      const sh = (H - gt) * 0.13;
      ctx!.beginPath();
      ctx!.moveTo(cx - sw / 2, gt);
      ctx!.lineTo(cx - sw / 2, gt + sh);
      ctx!.lineTo(cx + sw / 2, gt + sh);
      ctx!.lineTo(cx + sw / 2, gt);
      ctx!.stroke();

      const spot = gt + (H - gt) * 0.27;
      ctx!.fillStyle = cl;
      ctx!.beginPath();
      ctx!.arc(cx, spot, 2.5, 0, Math.PI * 2);
      ctx!.fill();

      ctx!.strokeStyle = cl;
      ctx!.beginPath();
      ctx!.arc(cx, spot, W * 0.075, 0.18 * Math.PI, 0.82 * Math.PI);
      ctx!.stroke();

      // Goal
      const gw = W * 0.16;
      const gh = 24;
      ctx!.strokeStyle = 'rgba(240,230,214,.2)';
      ctx!.lineWidth = 2.5;
      ctx!.lineCap = 'round';
      ctx!.beginPath();
      ctx!.moveTo(cx - gw / 2, gt);
      ctx!.lineTo(cx - gw / 2, gt - gh);
      ctx!.lineTo(cx + gw / 2, gt - gh);
      ctx!.lineTo(cx + gw / 2, gt);
      ctx!.stroke();
      ctx!.lineCap = 'butt';

      // Goal net
      ctx!.strokeStyle = 'rgba(240,230,214,.03)';
      ctx!.lineWidth = 0.5;
      for (let x = cx - gw / 2 + 5; x < cx + gw / 2; x += 6) {
        ctx!.beginPath();
        ctx!.moveTo(x, gt);
        ctx!.lineTo(x, gt - gh + 2);
        ctx!.stroke();
      }
      for (let y = gt - 3; y > gt - gh + 2; y -= 5) {
        ctx!.beginPath();
        ctx!.moveTo(cx - gw / 2 + 2, y);
        ctx!.lineTo(cx + gw / 2 - 2, y);
        ctx!.stroke();
      }

      ctx!.strokeStyle = cl;
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      ctx!.arc(0, gt, 10, 0, Math.PI * 0.5);
      ctx!.stroke();
      ctx!.beginPath();
      ctx!.arc(W, gt, 10, Math.PI * 0.5, Math.PI);
      ctx!.stroke();
    }

    function smoothstep(t: number) { return t * t * (3 - 2 * t); }

    function getVel(i: number): [number, number] {
      const h = posHist[i];
      if (h.length < 4) return [0, 0];
      return [(h[h.length - 1][0] - h[h.length - 4][0]) / 3, (h[h.length - 1][1] - h[h.length - 4][1]) / 3];
    }

    function initDefPositions(base: number[][]) {
      for (let i = 0; i < DEF_COUNT; i++) {
        defCurrent[i] = [base[i][0], base[i][1]];
        defTargets[i] = [base[i][0], base[i][1]];
      }
      prevMarkAssignment = new Array(DEF_COUNT - 1).fill(-1);
    }

    function computeDefTargets(base: number[][], bx: number, by: number, atkPos: number[][]): number[][] {
      const targets: number[][] = [];
      const ballDepth = Math.max(0, Math.min(1, (80 - by) / 80));
      const lateralShift = (bx - 50) * 0.03;
      
      const atkSorted = atkPos.map((p, i) => ({ x: p[0], y: p[1], idx: i })).sort((a, b) => a.y - b.y);
      const deepest2 = atkSorted[1] ? atkSorted[1].y : 50;
      const defLineY = Math.max(14, Math.min(deepest2 - 1.5, base[2][1]));

      // GK
      if (by < 22) {
        const gkx = 50 + (bx - 50) * 0.22;
        const gky = base[0][1] + Math.max(0, (22 - by) * 0.2);
        targets.push([Math.max(35, Math.min(65, gkx)), Math.max(1, Math.min(14, gky))]);
      } else {
        const gkx = 50 + (bx - 50) * 0.12;
        targets.push([Math.max(38, Math.min(62, gkx)), base[0][1]]);
      }

      // Outfield
      const baseTargets: { x: number; y: number; role: number; defIdx: number }[] = [];
      const ROLE_DEF = 1, ROLE_MID = 2, ROLE_FWD = 3;
      const DEF_ROLES = [0, ROLE_DEF, ROLE_DEF, ROLE_DEF, ROLE_DEF, ROLE_MID, ROLE_MID, ROLE_MID, ROLE_MID, ROLE_FWD, ROLE_FWD];

      for (let i = 1; i < DEF_COUNT; i++) {
        let tx = base[i][0];
        let ty = base[i][1];
        const role = DEF_ROLES[i];
        const latFactor = role === ROLE_DEF ? 1.0 : role === ROLE_MID ? 0.7 : 0.4;
        tx += lateralShift * latFactor;

        if (role === ROLE_DEF) {
          const baseLineY = (base[1][1] + base[2][1] + base[3][1] + base[4][1]) / 4;
          const yOffset = base[i][1] - baseLineY;
          ty = defLineY + yOffset * 0.25;
          ty = Math.max(6, ty);
        }
        if (role === ROLE_MID) {
          const retreatAmount = Math.max(0, ballDepth - 0.35) * 6;
          ty -= retreatAmount;
          const midLimit = defLineY + 10;
          ty = Math.max(midLimit, ty);
        }
        if (role === ROLE_FWD) {
          const retreatAmount = Math.max(0, ballDepth - 0.4) * 6;
          ty -= retreatAmount;
          const fwdLimit = defLineY + 26;
          ty = Math.max(fwdLimit, ty);
        }

        tx = Math.max(4, Math.min(96, tx));
        ty = Math.max(5, Math.min(90, ty));
        baseTargets.push({ x: tx, y: ty, role, defIdx: i });
      }

      // Marking assignment
      const assigned = new Set<number>();
      const markAssignment = new Array(baseTargets.length).fill(-1);
      const markRanges: Record<number, number> = { [ROLE_DEF]: 36, [ROLE_MID]: 38, [ROLE_FWD]: 28 };

      for (let di = 0; di < baseTargets.length; di++) {
        const prevMark = prevMarkAssignment[di];
        if (prevMark >= 0 && !assigned.has(prevMark)) {
          const d = baseTargets[di];
          const dx = atkPos[prevMark][0] - d.x;
          const dy = atkPos[prevMark][1] - d.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const range = markRanges[d.role] || 26;
          if (dist < range * 1.5) {
            markAssignment[di] = prevMark;
            assigned.add(prevMark);
          }
        }
      }

      const defOrder = baseTargets.map((d, i) => {
        let minD = Infinity;
        for (let j = 0; j < atkPos.length; j++) {
          const dx = atkPos[j][0] - d.x;
          const dy = atkPos[j][1] - d.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < minD) minD = dist;
        }
        return { i, minD };
      }).sort((a, b) => a.minD - b.minD);

      for (const { i: di } of defOrder) {
        if (markAssignment[di] >= 0) continue;
        const d = baseTargets[di];
        let bestJ = -1, bestDist = Infinity;
        for (let j = 0; j < atkPos.length; j++) {
          if (assigned.has(j)) continue;
          const dx = atkPos[j][0] - d.x;
          const dy = atkPos[j][1] - d.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < bestDist) {
            bestDist = dist;
            bestJ = j;
          }
        }
        const range = markRanges[d.role] || 26;
        if (bestJ >= 0 && bestDist < range) {
          markAssignment[di] = bestJ;
          assigned.add(bestJ);
        }
      }

      for (let di = 0; di < markAssignment.length; di++) {
        prevMarkAssignment[di] = markAssignment[di];
      }

      // Apply marking
      for (let di = 0; di < baseTargets.length; di++) {
        const d = baseTargets[di];
        let tx = d.x;
        let ty = d.y;
        const markIdx = markAssignment[di];
        
        if (markIdx >= 0) {
          const ax = atkPos[markIdx][0];
          const ay = atkPos[markIdx][1];
          const dx = ax - tx;
          const dy = ay - ty;
          let markStr = d.role === 1 ? 0.35 : d.role === 2 ? 0.28 : 0.15;
          
          if (d.role === 1) {
            const goalSideY = Math.max(6, ay - 3);
            if (ty > goalSideY) {
              tx += dx * markStr;
              ty = goalSideY + (ty - goalSideY) * (1 - markStr * 0.3);
            } else {
              tx += dx * markStr;
              ty += dy * markStr;
            }
          } else {
            tx += dx * markStr;
            ty += dy * markStr;
          }
        }

        const distToBall = Math.sqrt((tx - bx) * (tx - bx) + (ty - by) * (ty - by));
        if (distToBall < 15) {
          const pressFactor = 0.15 * (1 - distToBall / 15);
          tx += (bx - tx) * pressFactor;
          ty += (by - ty) * pressFactor;
        }

        tx = Math.max(4, Math.min(96, tx));
        ty = Math.max(5, Math.min(90, ty));
        targets.push([tx, ty]);
      }

      return targets;
    }

    function updateBall(seq: typeof SEQUENCES[0], t: number, positions: number[][]): number {
      const bp = seq.ball;
      let ci = 0;
      for (let i = bp.length - 1; i >= 0; i--) {
        if (t >= bp[i].t) { ci = i; break; }
      }
      const cur = bp[ci];

      if ('shot' in cur && cur.shot) {
        if (passStartT !== cur.t) {
          passFromX = ballX;
          passFromY = ballY;
          passStartT = cur.t;
          passDur = 0.022;
          inPass = true;
        }
        const p = Math.min((t - passStartT) / passDur, 1);
        ballX = passFromX + (cur.shot[0] - passFromX) * smoothstep(p);
        ballY = passFromY + (cur.shot[1] - passFromY) * smoothstep(p);
        return -1;
      }

      const nc = cur.c!;
      if (nc !== prevCarrier && prevCarrier !== -1) {
        passFromX = ballX;
        passFromY = ballY;
        passStartT = cur.t;
        const dx = positions[nc][0] - passFromX;
        const dy = positions[nc][1] - passFromY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        passDur = 0.015 + (dist / 100) * 0.04;
        inPass = true;
      }
      prevCarrier = nc;

      const elapsedPass = t - passStartT;
      if (inPass && elapsedPass < passDur && elapsedPass >= 0) {
        const p = elapsedPass / passDur;
        ballX = passFromX + (positions[nc][0] - passFromX) * smoothstep(p);
        ballY = passFromY + (positions[nc][1] - passFromY) * smoothstep(p);
      } else {
        inPass = false;
        const [vx, vy] = getVel(nc);
        const spd = Math.sqrt(vx * vx + vy * vy);
        const offset = Math.min(spd * 6, 2.2);
        if (spd > 0.02) {
          ballX = positions[nc][0] + (vx / spd) * offset;
          ballY = positions[nc][1] + (vy / spd) * offset;
        } else {
          ballX = positions[nc][0];
          ballY = positions[nc][1];
        }
      }
      return nc;
    }

    function drawDot(x: number, y: number, isCarrier: boolean) {
      const dx = ppx(x), dy = ppy(y);
      if (isCarrier) {
        const g = ctx!.createRadialGradient(dx, dy, 0, dx, dy, 18);
        g.addColorStop(0, 'rgba(196,135,90,.22)');
        g.addColorStop(1, 'rgba(196,135,90,0)');
        ctx!.fillStyle = g;
        ctx!.beginPath();
        ctx!.arc(dx, dy, 18, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.fillStyle = '#C4875A';
      ctx!.beginPath();
      ctx!.arc(dx, dy, isCarrier ? 6 : 5, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.fillStyle = 'rgba(230,180,130,.3)';
      ctx!.beginPath();
      ctx!.arc(dx - 1.5, dy - 1.5, 1.8, 0, Math.PI * 2);
      ctx!.fill();
    }

    function drawDefDot(x: number, y: number, isGK: boolean) {
      const dx = ppx(x), dy = ppy(y);
      const g = ctx!.createRadialGradient(dx, dy, 0, dx, dy, isGK ? 14 : 10);
      if (isGK) {
        g.addColorStop(0, 'rgba(106,154,106,.18)');
        g.addColorStop(1, 'rgba(106,154,106,0)');
      } else {
        g.addColorStop(0, 'rgba(123,138,150,.12)');
        g.addColorStop(1, 'rgba(123,138,150,0)');
      }
      ctx!.fillStyle = g;
      ctx!.beginPath();
      ctx!.arc(dx, dy, isGK ? 14 : 10, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.fillStyle = isGK ? DEF_GK : DEF_CLR;
      ctx!.beginPath();
      ctx!.arc(dx, dy, isGK ? 5.5 : 4.5, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.fillStyle = isGK ? 'rgba(140,200,140,.22)' : 'rgba(160,175,190,.2)';
      ctx!.beginPath();
      ctx!.arc(dx - 1.2, dy - 1.2, 1.4, 0, Math.PI * 2);
      ctx!.fill();
    }

    function drawBall(x: number, y: number, flight: boolean) {
      const dx = ppx(x), dy = ppy(y);
      const glR = flight ? 16 : 12;
      const glA = flight ? 0.35 : 0.25;
      const g = ctx!.createRadialGradient(dx, dy, 0, dx, dy, glR);
      g.addColorStop(0, `rgba(240,230,214,${glA})`);
      g.addColorStop(1, 'rgba(240,230,214,0)');
      ctx!.fillStyle = g;
      ctx!.beginPath();
      ctx!.arc(dx, dy, glR, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.fillStyle = '#F0E6D6';
      ctx!.beginPath();
      ctx!.arc(dx, dy, 3.5, 0, Math.PI * 2);
      ctx!.fill();
    }

    function drawTrails() {
      for (let i = 0; i < posHist.length; i++) {
        const h = posHist[i];
        if (h.length < 4) continue;
        ctx!.strokeStyle = 'rgba(196,135,90,.025)';
        ctx!.lineWidth = 2;
        ctx!.lineCap = 'round';
        ctx!.beginPath();
        ctx!.moveTo(ppx(h[0][0]), ppy(h[0][1]));
        for (let j = 1; j < h.length; j++) ctx!.lineTo(ppx(h[j][0]), ppy(h[j][1]));
        ctx!.stroke();
      }
    }

    function drawDefTrails() {
      for (let i = 0; i < defPosHist.length; i++) {
        const h = defPosHist[i];
        if (h.length < 4) continue;
        ctx!.strokeStyle = 'rgba(123,138,150,.018)';
        ctx!.lineWidth = 1.5;
        ctx!.lineCap = 'round';
        ctx!.beginPath();
        ctx!.moveTo(ppx(h[0][0]), ppy(h[0][1]));
        for (let j = 1; j < h.length; j++) ctx!.lineTo(ppx(h[j][0]), ppy(h[j][1]));
        ctx!.stroke();
      }
    }

    function drawGoalFlash() {
      if (goalAlpha <= 0) return;
      const gt = TOP_M * H;
      const g = ctx!.createRadialGradient(W * 0.5, gt, 0, W * 0.5, gt, H * 0.45);
      g.addColorStop(0, `rgba(196,135,90,${goalAlpha * 0.35})`);
      g.addColorStop(1, 'rgba(196,135,90,0)');
      ctx!.fillStyle = g;
      ctx!.fillRect(0, 0, W, H);
    }

    let lastActionIdx = -1;

    function render(time: number) {
      if (lastTime === 0) lastTime = time;
      const dt = Math.min(time - lastTime, 80);
      lastTime = time;

      if (state === 'playing') {
        elapsed += dt;
        const seq = SEQUENCES[curSeq];
        const t = Math.min(elapsed / seq.dur, 1);

        drawPitch();

        const positions: number[][] = [];
        for (let i = 0; i < seq.players.length; i++) {
          const pos = spline(seq.players[i], t);
          positions.push(pos);
          posHist[i].push([pos[0], pos[1]]);
          if (posHist[i].length > 30) posHist[i].shift();
        }

        const carrier = updateBall(seq, t, positions);
        const targets = computeDefTargets(seq.defBase, ballX, ballY, positions);
        const speed = 1 - Math.pow(0.945, dt / 16.67);

        for (let i = 0; i < DEF_COUNT; i++) {
          defCurrent[i][0] += (targets[i][0] - defCurrent[i][0]) * speed;
          defCurrent[i][1] += (targets[i][1] - defCurrent[i][1]) * speed;
          defPosHist[i].push([defCurrent[i][0], defCurrent[i][1]]);
          if (defPosHist[i].length > 25) defPosHist[i].shift();
        }

        drawDefTrails();
        drawTrails();
        for (let i = 0; i < DEF_COUNT; i++) drawDefDot(defCurrent[i][0], defCurrent[i][1], i === 0);
        for (let i = 0; i < positions.length; i++) drawDot(positions[i][0], positions[i][1], i === carrier);
        drawBall(ballX, ballY, inPass);

        if (t >= seq.goalAt && t < seq.goalAt + 0.06) goalAlpha = Math.min(goalAlpha + 0.08, 1);
        else goalAlpha = Math.max(goalAlpha - 0.015, 0);
        drawGoalFlash();

        // Update action
        let currentActionIdx = -1;
        for (let i = seq.actions.length - 1; i >= 0; i--) {
          if (t >= (seq.actions[i][0] as number)) { currentActionIdx = i; break; }
        }
        if (currentActionIdx >= 0 && currentActionIdx !== lastActionIdx) {
          setCurrentAction(seq.actions[currentActionIdx][1] as string);
          setSequenceName(seq.name);
          onActionChange?.(seq.actions[currentActionIdx][1] as string, seq.name);
          lastActionIdx = currentActionIdx;
        }

        if (t >= 1) {
          transFrom = [];
          for (let i = 0; i < seq.players.length; i++) {
            const wp = seq.players[i];
            transFrom.push({ x: wp[wp.length - 1][0], y: wp[wp.length - 1][1] });
          }
          defTransFrom = [];
          for (let i = 0; i < DEF_COUNT; i++) {
            defTransFrom.push({ x: defCurrent[i][0], y: defCurrent[i][1] });
          }
          transBallFrom = [ballX, ballY];

          const nextIdx = (curSeq + 1) % SEQUENCES.length;
          const nextSeq = SEQUENCES[nextIdx];
          transTo = [];
          for (let i = 0; i < nextSeq.players.length; i++) {
            transTo.push({ x: nextSeq.players[i][0][0], y: nextSeq.players[i][0][1] });
          }
          defTransTo = [];
          for (let i = 0; i < DEF_COUNT; i++) {
            defTransTo.push({ x: nextSeq.defBase[i][0], y: nextSeq.defBase[i][1] });
          }
          const nextFC = nextSeq.ball[0].c!;
          transBallTo = [nextSeq.players[nextFC][0][0], nextSeq.players[nextFC][0][1]];

          state = 'goal_pause';
          transStart = time;
        }

      } else if (state === 'goal_pause') {
        drawPitch();
        drawDefTrails();
        drawTrails();
        for (let i = 0; i < defTransFrom.length; i++) drawDefDot(defTransFrom[i].x, defTransFrom[i].y, i === 0);
        for (let i = 0; i < transFrom.length; i++) drawDot(transFrom[i].x, transFrom[i].y, false);
        drawBall(ballX, ballY, false);
        goalAlpha = Math.max(goalAlpha - 0.008, 0);
        drawGoalFlash();

        if (time - transStart > 1500) {
          state = 'transitioning';
          transStart = time;
          for (let i = 0; i < 10; i++) posHist[i] = [];
          for (let i = 0; i < DEF_COUNT; i++) defPosHist[i] = [];
          lastActionIdx = -1;
          const nextIdx = (curSeq + 1) % SEQUENCES.length;
          setSequenceName(SEQUENCES[nextIdx].name);
          setCurrentAction('');
        }

      } else if (state === 'transitioning') {
        const p = Math.min((time - transStart) / transDur, 1);
        const ep = smoothstep(p);

        drawPitch();

        const atkPositions: number[][] = [];
        for (let i = 0; i < transFrom.length; i++) {
          const x = transFrom[i].x + (transTo[i].x - transFrom[i].x) * ep;
          const y = transFrom[i].y + (transTo[i].y - transFrom[i].y) * ep;
          atkPositions.push([x, y]);
          posHist[i].push([x, y]);
          if (posHist[i].length > 30) posHist[i].shift();
        }

        const defPositions: number[][] = [];
        for (let i = 0; i < defTransFrom.length; i++) {
          const x = defTransFrom[i].x + (defTransTo[i].x - defTransFrom[i].x) * ep;
          const y = defTransFrom[i].y + (defTransTo[i].y - defTransFrom[i].y) * ep;
          defPositions.push([x, y]);
          defPosHist[i].push([x, y]);
          if (defPosHist[i].length > 25) defPosHist[i].shift();
        }

        drawDefTrails();
        drawTrails();
        for (let i = 0; i < defPositions.length; i++) drawDefDot(defPositions[i][0], defPositions[i][1], i === 0);
        for (let i = 0; i < atkPositions.length; i++) drawDot(atkPositions[i][0], atkPositions[i][1], false);

        const ballAlpha = p < 0.3 ? 1 - p / 0.3 : p > 0.7 ? (p - 0.7) / 0.3 : 0;
        if (ballAlpha > 0) {
          const bx = p < 0.5 ? transBallFrom[0] : transBallTo[0];
          const by = p < 0.5 ? transBallFrom[1] : transBallTo[1];
          const dx = ppx(bx), dy = ppy(by);
          ctx!.globalAlpha = ballAlpha;
          ctx!.fillStyle = '#F0E6D6';
          ctx!.beginPath();
          ctx!.arc(dx, dy, 3.5, 0, Math.PI * 2);
          ctx!.fill();
          ctx!.globalAlpha = 1;
        }

        goalAlpha = Math.max(goalAlpha - 0.015, 0);
        drawGoalFlash();

        if (p >= 1) {
          curSeq = (curSeq + 1) % SEQUENCES.length;
          const seq = SEQUENCES[curSeq];
          inPass = false;
          prevCarrier = -1;
          passStartT = -1;
          goalAlpha = 0;
          const fc = seq.ball[0].c!;
          ballX = seq.players[fc][0][0];
          ballY = seq.players[fc][0][1];
          prevCarrier = fc;
          initDefPositions(seq.defBase);
          elapsed = 0;
          lastTime = 0;
          state = 'playing';
        }
      }

      animationId = requestAnimationFrame(render);
    }

    // Initialize
    resize();
    window.addEventListener('resize', resize);
    
    const seq = SEQUENCES[0];
    const fc = seq.ball[0].c!;
    ballX = seq.players[fc][0][0];
    ballY = seq.players[fc][0][1];
    prevCarrier = fc;
    initDefPositions(seq.defBase);
    setSequenceName(seq.name);
    
    animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [onActionChange]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 right-0 w-[65%] h-full z-[1]"
      style={{ display: 'block' }}
    />
  );
}
