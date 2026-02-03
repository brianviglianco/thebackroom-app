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

// ─────────────────────────────────────────────────────────────
// TACTICAL SEQUENCES
// Coordinate system: X=0 left, X=100 right, Y=0 top (opponent goal), Y=100 bottom (own goal)
// Goal is centered at x≈42-58, y=0
// Each player/defender has 8 waypoints interpolated over the sequence duration
// ─────────────────────────────────────────────────────────────

const SEQUENCES = [
  {
    // COUNTER-ATTACK: Win ball deep, quick vertical transition, LW finishes
    name: 'Counter-Attack',
    dur: 10000,
    goalAt: 0.88,
    actions: [
      [0, 'Ball won deep...'],
      [0.10, '→ CB plays to CM'],
      [0.22, '→ CM drives forward'],
      [0.38, '→ Finds CF on the turn'],
      [0.55, '⚡ CF threads it to LW!'],
      [0.75, '← LW cuts inside...'],
      [0.88, '⚽ GOAL! Buries it!']
    ],
    players: [
      // P0 LCB — holds deep
      [[16,88],[18,84],[20,80],[22,76],[24,72],[26,68],[28,66],[30,64]],
      // P1 LB — pushes up slowly
      [[38,90],[40,86],[42,80],[44,74],[46,68],[48,64],[50,62],[52,60]],
      // P2 CB — has ball initially, plays it forward
      [[62,90],[62,86],[62,80],[62,76],[62,72],[62,68],[62,66],[62,64]],
      // P3 RCB — holds deep
      [[84,88],[82,84],[80,80],[78,76],[76,72],[74,68],[72,66],[70,64]],
      // P4 LCM — supporting run
      [[30,70],[32,64],[34,56],[36,48],[36,42],[36,38],[36,36],[38,34]],
      // P5 CM — receives from CB, drives, passes to CF
      [[50,72],[50,66],[50,56],[48,46],[46,38],[44,34],[44,32],[44,30]],
      // P6 RCM — supporting run
      [[70,70],[68,64],[66,56],[64,48],[62,42],[60,38],[58,36],[56,34]],
      // P7 LW — holds width, sprints when through ball comes
      [[15,58],[15,54],[17,48],[20,42],[26,36],[34,28],[40,20],[44,14]],
      // P8 CF — receives, holds, plays through ball
      [[50,50],[48,46],[46,40],[44,36],[42,32],[42,30],[44,28],[46,26]],
      // P9 RW — decoy run stretching right
      [[85,58],[84,52],[82,46],[80,40],[78,36],[76,32],[74,30],[72,28]]
    ],
    ball: [
      { t: 0, c: 2 },
      { t: 0.10, c: 5 },
      { t: 0.38, c: 8 },
      { t: 0.55, c: 7 },
      { t: 0.88, shot: [50, 1] }
    ],
    // Defenders: GK + 4 DEF + 4 MID + 2 FWD = 11 players
    // They start in a compact mid-block and retreat as counter progresses
    defenders: [
      // D0 GK — stays on line, small adjustments
      [[50,4],[50,4],[50,4],[50,4],[50,4],[50,5],[48,5],[46,5]],
      // D1 RCB — holds line, shifts left as LW attacks
      [[72,24],[72,24],[70,24],[68,24],[64,24],[58,22],[52,20],[48,18]],
      // D2 CB — anchors, drops slightly
      [[58,22],[58,22],[56,22],[54,22],[52,22],[50,20],[48,18],[46,16]],
      // D3 LCB — tracks CF
      [[42,22],[42,22],[42,22],[42,22],[42,22],[42,20],[42,18],[42,16]],
      // D4 LB — holds wide left
      [[26,24],[26,24],[26,24],[28,24],[28,24],[30,22],[32,20],[34,18]],
      // D5 RCM — drops back as midfield is bypassed
      [[72,38],[72,38],[70,36],[68,34],[64,32],[60,30],[56,28],[52,26]],
      // D6 CM — tries to track CM runner
      [[56,36],[56,36],[54,34],[52,32],[50,30],[48,28],[46,26],[44,24]],
      // D7 LCM — covers center
      [[42,36],[42,36],[42,34],[42,32],[42,30],[42,28],[42,26],[42,24]],
      // D8 LM — stays wide, doesn't get involved
      [[26,38],[26,38],[26,36],[26,34],[28,32],[30,30],[32,28],[34,26]],
      // D9 RF — high press initially, retreats
      [[60,52],[60,50],[58,48],[56,46],[54,44],[52,42],[50,40],[48,38]],
      // D10 LF — high press initially, retreats
      [[40,52],[40,50],[40,48],[40,46],[40,44],[40,42],[40,40],[40,38]]
    ]
  },
  {
    // TIKI-TAKA: Patient buildup, triangles, RW finds pocket, CF finishes
    name: 'Tiki-Taka',
    dur: 11000,
    goalAt: 0.88,
    actions: [
      [0, 'Patient buildup...'],
      [0.08, '→ CM to LCM'],
      [0.18, '← Back to CM'],
      [0.32, '→ Switches to RCM'],
      [0.48, '→ RCM plays RW in pocket'],
      [0.66, '→ RW squares to CF'],
      [0.88, '⚽ GOAL! Clinical finish!']
    ],
    players: [
      // P0 LCB
      [[18,76],[20,72],[22,68],[24,64],[26,60],[28,56],[30,54],[32,52]],
      // P1 LB
      [[38,80],[40,76],[42,72],[44,68],[46,64],[48,60],[50,58],[52,56]],
      // P2 CB
      [[62,80],[62,76],[62,72],[62,68],[62,64],[62,60],[62,58],[62,56]],
      // P3 RB — overlaps late
      [[82,76],[80,72],[78,66],[76,60],[74,54],[72,46],[70,40],[68,36]],
      // P4 LCM — circulates
      [[34,62],[36,58],[38,52],[40,48],[42,44],[44,40],[46,38],[48,36]],
      // P5 CM — orchestrator
      [[50,60],[50,56],[50,50],[50,46],[48,42],[46,38],[44,36],[42,34]],
      // P6 RCM — receives switch
      [[66,62],[66,58],[66,52],[64,46],[62,40],[60,36],[58,34],[56,32]],
      // P7 LW — stretches wide
      [[15,48],[16,44],[18,40],[22,36],[26,32],[30,28],[34,26],[38,24]],
      // P8 CF — lurks, then finishes
      [[50,44],[48,42],[46,40],[44,38],[44,34],[46,30],[48,26],[48,20]],
      // P9 RW — drops into pocket, squares to CF
      [[85,48],[82,44],[78,40],[74,36],[72,32],[70,28],[66,24],[62,20]]
    ],
    ball: [
      { t: 0, c: 5 },
      { t: 0.08, c: 4 },
      { t: 0.18, c: 5 },
      { t: 0.32, c: 6 },
      { t: 0.48, c: 9 },
      { t: 0.66, c: 8 },
      { t: 0.88, shot: [50, 1] }
    ],
    // Defenders: compact low block, shift side to side following ball
    defenders: [
      // D0 GK
      [[50,4],[50,4],[50,4],[50,4],[50,4],[50,4],[50,5],[50,5]],
      // D1 RB — shifts with play
      [[72,20],[72,20],[72,20],[70,20],[68,20],[66,20],[62,18],[58,16]],
      // D2 RCB — holds
      [[58,18],[58,18],[58,18],[56,18],[54,18],[52,18],[50,16],[48,14]],
      // D3 LCB — holds
      [[42,18],[42,18],[42,18],[42,18],[42,18],[42,18],[44,16],[44,14]],
      // D4 LB — holds wide
      [[28,20],[28,20],[28,20],[28,20],[30,20],[32,20],[34,18],[36,16]],
      // D5 RM — tracks RW dropping in
      [[74,34],[74,34],[72,34],[70,32],[68,30],[66,28],[62,26],[58,24]],
      // D6 RCM — stays compact center
      [[58,32],[58,32],[56,32],[54,30],[52,28],[50,26],[48,24],[46,22]],
      // D7 LCM — compact center
      [[42,32],[42,32],[42,32],[42,32],[42,30],[42,28],[42,26],[42,24]],
      // D8 LM — holds shape
      [[26,34],[26,34],[26,34],[28,34],[30,32],[32,30],[34,28],[36,26]],
      // D9 RST — drops back to help
      [[60,48],[60,48],[58,46],[56,44],[54,42],[52,40],[50,38],[48,36]],
      // D10 LST — drops back
      [[40,48],[40,48],[40,46],[40,44],[40,42],[40,40],[40,38],[40,36]]
    ]
  },
  {
    // WING OVERLOAD: Build right, RB overlaps, cross to CF at far post
    name: 'Wing Overload',
    dur: 10500,
    goalAt: 0.89,
    actions: [
      [0, 'Building on the right...'],
      [0.10, '→ RCM finds RW'],
      [0.26, '⚡ RB overlapping!'],
      [0.40, '→ RW plays the overlap'],
      [0.58, '← RB drives to byline'],
      [0.74, '✚ Cross into the box!'],
      [0.89, '⚽ GOAL! Headed in!']
    ],
    players: [
      // P0 LCB — holds
      [[18,74],[20,70],[22,66],[24,62],[26,58],[28,54],[30,52],[32,50]],
      // P1 LB — tucks in
      [[36,78],[38,74],[40,70],[42,66],[44,62],[46,58],[48,56],[50,54]],
      // P2 CB — holds
      [[58,78],[58,74],[58,70],[58,66],[58,62],[58,58],[58,56],[58,54]],
      // P3 RB — THE OVERLAP
      [[82,76],[84,68],[86,56],[88,42],[90,30],[88,18],[84,10],[82,8]],
      // P4 LCM — supporting
      [[34,60],[36,54],[38,48],[40,42],[42,38],[44,34],[46,32],[48,30]],
      // P5 CM — holds shape
      [[50,58],[50,52],[50,46],[50,42],[48,40],[46,38],[44,36],[42,34]],
      // P6 RCM — starts with ball
      [[68,58],[68,52],[66,46],[64,40],[62,36],[60,32],[58,30],[56,28]],
      // P7 LW — pulls to far post for header
      [[14,48],[16,44],[20,38],[24,34],[28,28],[32,24],[36,18],[38,12]],
      // P8 CF — times far post run
      [[50,44],[48,42],[46,40],[44,38],[42,34],[40,28],[38,20],[36,12]],
      // P9 RW — receives, holds, lays off to overlap
      [[84,46],[82,40],[80,34],[78,28],[78,26],[78,24],[78,22],[78,20]]
    ],
    ball: [
      { t: 0, c: 6 },
      { t: 0.10, c: 9 },
      { t: 0.40, c: 3 },
      { t: 0.74, c: 8 },
      { t: 0.89, shot: [44, 1] }
    ],
    // Defenders: shift right to cover overload, get stretched
    defenders: [
      // D0 GK — shifts right, then left for far post cross
      [[50,4],[50,4],[52,4],[54,4],[56,5],[56,5],[52,5],[44,5]],
      // D1 RB — pinned by overload, tracks overlap
      [[74,20],[74,20],[76,18],[78,16],[80,14],[82,12],[84,10],[84,10]],
      // D2 RCB — shifts right to cover
      [[58,18],[58,18],[60,18],[62,18],[64,16],[66,14],[66,12],[64,12]],
      // D3 LCB — stays central, then covers far post
      [[42,18],[42,18],[42,18],[42,18],[42,18],[42,16],[40,14],[38,12]],
      // D4 LB — holds far side
      [[26,20],[26,20],[26,20],[26,20],[28,20],[30,18],[32,16],[34,14]],
      // D5 RM — tracks RW, gets dragged right
      [[74,32],[74,32],[76,30],[78,28],[80,26],[80,24],[80,22],[78,20]],
      // D6 CM — shifts toward overload
      [[56,30],[56,30],[58,30],[60,28],[62,26],[62,24],[60,22],[58,20]],
      // D7 LCM — stays central
      [[42,30],[42,30],[42,30],[42,28],[42,26],[42,24],[42,22],[42,20]],
      // D8 LM — holds wide left
      [[26,32],[26,32],[26,32],[26,30],[26,28],[28,26],[30,24],[32,22]],
      // D9 RST — drops back
      [[62,46],[62,44],[60,42],[58,40],[56,38],[54,36],[52,34],[50,32]],
      // D10 LST — drops back
      [[42,46],[42,44],[42,42],[42,40],[42,38],[42,36],[42,34],[42,32]]
    ]
  },
  {
    // GEGENPRESSING: Lose ball, press immediately, win it back, fast finish
    name: 'Gegenpressing',
    dur: 10000,
    goalAt: 0.82,
    actions: [
      [0, 'Lost possession...'],
      [0.08, '⚡ Pressing immediately!'],
      [0.18, '⚡ AM wins it back!'],
      [0.32, '→ Quick to CF'],
      [0.48, '→ CF lays off to LW'],
      [0.65, '→ LW drives inside...'],
      [0.82, '⚽ GOAL! Curled in!']
    ],
    players: [
      // P0 LCB
      [[18,66],[18,64],[20,60],[22,56],[24,52],[26,48],[28,46],[30,44]],
      // P1 LB
      [[36,70],[36,68],[38,64],[40,60],[42,56],[44,52],[46,50],[48,48]],
      // P2 CB
      [[60,70],[60,68],[60,64],[60,60],[60,56],[60,52],[60,50],[60,48]],
      // P3 RCB
      [[82,66],[82,64],[80,60],[78,56],[76,52],[74,48],[72,46],[70,44]],
      // P4 LCM
      [[34,50],[36,46],[38,42],[40,38],[42,34],[44,30],[46,28],[48,26]],
      // P5 RCM — lost the ball, presses
      [[60,46],[58,42],[56,40],[54,38],[52,36],[50,34],[48,32],[46,30]],
      // P6 LW — receives layoff, drives inside, SHOOTS
      [[16,40],[16,38],[18,34],[22,30],[28,26],[34,22],[40,18],[44,14]],
      // P7 AM — the presser, wins it back
      [[50,48],[50,44],[48,40],[46,36],[44,32],[44,28],[44,24],[46,18]],
      // P8 RW — supports
      [[84,40],[82,36],[78,32],[74,28],[70,24],[66,22],[62,20],[58,18]],
      // P9 CF — receives quick pass, lays off
      [[50,36],[50,34],[48,30],[46,26],[44,22],[42,20],[42,18],[44,16]]
    ],
    ball: [
      { t: 0, c: 5 },
      { t: 0.18, c: 7 },
      { t: 0.32, c: 9 },
      { t: 0.48, c: 6 },
      { t: 0.82, shot: [48, 1] }
    ],
    // Defenders: had the ball briefly, now scramble as pressed
    defenders: [
      // D0 GK
      [[50,4],[50,4],[50,4],[50,4],[50,4],[50,5],[50,5],[48,5]],
      // D1 RB — holds shape
      [[72,18],[72,18],[72,18],[72,18],[70,18],[68,18],[64,16],[60,14]],
      // D2 RCB — shifts toward LW threat
      [[56,16],[56,16],[56,16],[54,16],[52,16],[50,16],[48,14],[46,14]],
      // D3 LCB — covers center
      [[42,16],[42,16],[42,16],[42,16],[42,16],[42,16],[42,14],[42,14]],
      // D4 LB — holds
      [[26,18],[26,18],[26,18],[26,18],[28,18],[30,18],[32,16],[34,14]],
      // D5 RM — had ball, loses it, retreats
      [[68,30],[66,30],[62,28],[58,26],[56,24],[54,22],[52,20],[50,18]],
      // D6 CM — tries to shield
      [[54,28],[54,28],[52,26],[50,24],[48,22],[46,20],[44,18],[42,16]],
      // D7 LCM — drops back
      [[40,28],[40,28],[40,28],[40,26],[40,24],[40,22],[40,20],[40,18]],
      // D8 LM — tucks in
      [[26,30],[26,30],[26,30],[28,28],[30,26],[32,24],[34,22],[36,20]],
      // D9 RST — was pressing, now caught upfield
      [[64,44],[64,44],[62,42],[60,40],[58,38],[56,36],[54,34],[52,32]],
      // D10 LST — caught upfield
      [[40,44],[40,44],[40,42],[40,40],[40,38],[40,36],[40,34],[40,32]]
    ]
  },
  {
    // ROUTE ONE: Goal kick, long ball to CF, flick on, CF2 through on goal
    name: 'Route One',
    dur: 9500,
    goalAt: 0.90,
    actions: [
      [0, 'Goal kick...'],
      [0.12, '← Long ball forward!'],
      [0.28, '→ CF wins the header'],
      [0.40, '→ Flicked on to CF2'],
      [0.56, '⚡ CF2 through on goal!'],
      [0.76, '→ One on one...'],
      [0.90, '⚽ GOAL! No mistake!']
    ],
    players: [
      // P0 LCB
      [[16,88],[18,82],[20,76],[22,72],[24,68],[26,64],[28,62],[30,60]],
      // P1 CB — takes goal kick
      [[40,92],[42,88],[44,82],[46,76],[48,72],[50,68],[52,66],[54,64]],
      // P2 RCB
      [[62,92],[62,88],[62,82],[62,76],[62,72],[62,68],[62,66],[62,64]],
      // P3 RB
      [[84,86],[82,80],[80,74],[78,68],[76,64],[74,60],[72,58],[70,56]],
      // P4 LM
      [[14,68],[16,62],[20,54],[24,48],[28,42],[32,38],[36,34],[40,32]],
      // P5 CM — supports second ball
      [[40,66],[42,60],[44,54],[46,48],[48,44],[50,40],[52,38],[54,36]],
      // P6 RM
      [[62,66],[62,60],[62,54],[62,48],[62,44],[62,40],[62,38],[62,36]],
      // P7 RCM
      [[86,68],[82,62],[78,54],[74,48],[70,42],[68,38],[66,34],[64,32]],
      // P8 CF — target man, wins header, flicks on
      [[44,52],[44,46],[42,40],[40,36],[40,34],[40,32],[42,30],[44,28]],
      // P9 CF2 — runs onto flick, through on goal
      [[56,54],[56,48],[54,42],[52,36],[50,28],[48,20],[48,12],[50,5]]
    ],
    ball: [
      { t: 0, c: 1 },
      { t: 0.12, c: 8 },
      { t: 0.40, c: 9 },
      { t: 0.90, shot: [50, 1] }
    ],
    // Defenders: high line initially, get caught by long ball
    defenders: [
      // D0 GK — comes off line for long ball, retreats, comes out for 1v1
      [[50,4],[50,6],[50,8],[50,6],[50,5],[50,5],[50,6],[48,8]],
      // D1 RCB — high, drops when long ball comes
      [[70,28],[70,26],[68,24],[66,22],[64,20],[62,18],[60,16],[58,14]],
      // D2 CB — challenges for header
      [[56,26],[56,24],[54,22],[50,20],[48,18],[46,16],[46,14],[46,12]],
      // D3 LCB — holds line
      [[42,26],[42,24],[42,22],[42,20],[42,18],[42,16],[42,14],[42,12]],
      // D4 LB — holds line
      [[28,28],[28,26],[28,24],[28,22],[30,20],[32,18],[34,16],[36,14]],
      // D5 RCM — drops back
      [[70,40],[68,38],[66,36],[64,34],[62,32],[60,30],[58,28],[56,26]],
      // D6 CM — drops
      [[56,38],[54,36],[52,34],[50,32],[48,30],[46,28],[44,26],[44,24]],
      // D7 LCM — drops
      [[42,38],[42,36],[42,34],[42,32],[42,30],[42,28],[42,26],[42,24]],
      // D8 LM — holds
      [[26,40],[26,38],[26,36],[28,34],[30,32],[32,30],[34,28],[36,26]],
      // D9 RST — retreats from high position
      [[62,52],[60,50],[58,46],[56,42],[54,40],[52,38],[50,36],[48,34]],
      // D10 LST — retreats
      [[40,52],[40,50],[40,46],[40,42],[40,40],[40,38],[40,36],[40,34]]
    ]
  }
];

const DEF_CLR = '#7B8A96';
const DEF_GK = '#6A9A6A';
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
    let ballArc = 0;

    // History for trails and velocity
    const posHist: number[][][] = Array(10).fill(null).map(() => []);
    const defPosHist: number[][][] = Array(11).fill(null).map(() => []);

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
          passDur = 0.04;
          inPass = true;
        }
        const p = Math.min((t - passStartT) / passDur, 1);
        ballX = passFromX + (cur.shot[0] - passFromX) * smoothstep(p);
        ballY = passFromY + (cur.shot[1] - passFromY) * smoothstep(p);
        const sdx = cur.shot[0] - passFromX;
        const sdy = cur.shot[1] - passFromY;
        const shotDist = Math.sqrt(sdx * sdx + sdy * sdy);
        ballArc = Math.sin(p * Math.PI) * shotDist * 0.08;
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
        passDur = 0.04 + (dist / 100) * 0.08;
        inPass = true;
      }
      prevCarrier = nc;

      const elapsedPass = t - passStartT;
      if (inPass && elapsedPass < passDur && elapsedPass >= 0) {
        const p = elapsedPass / passDur;
        ballX = passFromX + (positions[nc][0] - passFromX) * smoothstep(p);
        ballY = passFromY + (positions[nc][1] - passFromY) * smoothstep(p);
        const dx = positions[nc][0] - passFromX;
        const dy = positions[nc][1] - passFromY;
        const passDist = Math.sqrt(dx * dx + dy * dy);
        const arcFactor = passDist > 50 ? 0.2 : passDist > 25 ? 0.12 : 0.05;
        ballArc = Math.sin(p * Math.PI) * passDist * arcFactor;
      } else {
        inPass = false;
        ballArc = Math.max(ballArc - 0.5, 0);
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
      const dx = ppx(x), dy = ppy(y) - ballArc * 1.2;
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
      ctx!.lineWidth = 1.5;
      ctx!.lineCap = 'round';
      for (let i = 0; i < posHist.length; i++) {
        const h = posHist[i];
        if (h.length < 4) continue;
        for (let j = 1; j < h.length; j++) {
          const alpha = 0.06 * (j / h.length);
          ctx!.strokeStyle = `rgba(196,135,90,${alpha})`;
          ctx!.beginPath();
          ctx!.moveTo(ppx(h[j - 1][0]), ppy(h[j - 1][1]));
          ctx!.lineTo(ppx(h[j][0]), ppy(h[j][1]));
          ctx!.stroke();
        }
      }
    }

    function drawDefTrails() {
      ctx!.lineWidth = 1.5;
      ctx!.lineCap = 'round';
      for (let i = 0; i < defPosHist.length; i++) {
        const h = defPosHist[i];
        if (h.length < 4) continue;
        for (let j = 1; j < h.length; j++) {
          const alpha = 0.04 * (j / h.length);
          ctx!.strokeStyle = `rgba(123,138,150,${alpha})`;
          ctx!.beginPath();
          ctx!.moveTo(ppx(h[j - 1][0]), ppy(h[j - 1][1]));
          ctx!.lineTo(ppx(h[j][0]), ppy(h[j][1]));
          ctx!.stroke();
        }
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

        // Calculate attacker positions via splines
        const positions: number[][] = [];
        for (let i = 0; i < seq.players.length; i++) {
          const pos = spline(seq.players[i], t);
          positions.push(pos);
          posHist[i].push([pos[0], pos[1]]);
          if (posHist[i].length > 30) posHist[i].shift();
        }

        // Calculate defender positions via splines (same system as attackers!)
        const defPositions: number[][] = [];
        for (let i = 0; i < seq.defenders.length; i++) {
          const pos = spline(seq.defenders[i], t);
          defPositions.push(pos);
          defPosHist[i].push([pos[0], pos[1]]);
          if (defPosHist[i].length > 25) defPosHist[i].shift();
        }

        const carrier = updateBall(seq, t, positions);

        // Receiver anticipation: nudge receiver toward ball during pass
        if (inPass && carrier >= 0 && carrier < positions.length) {
          const elP = (t - passStartT) / passDur;
          if (elP > 0.5 && elP < 1) {
            const pullStrength = (elP - 0.5) * 0.3;
            positions[carrier][0] += (ballX - positions[carrier][0]) * pullStrength;
            positions[carrier][1] += (ballY - positions[carrier][1]) * pullStrength;
          }
        }

        // Draw
        drawDefTrails();
        drawTrails();
        for (let i = 0; i < defPositions.length; i++) drawDefDot(defPositions[i][0], defPositions[i][1], i === 0);
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
          for (let i = 0; i < seq.defenders.length; i++) {
            const wp = seq.defenders[i];
            defTransFrom.push({ x: wp[wp.length - 1][0], y: wp[wp.length - 1][1] });
          }
          transBallFrom = [ballX, ballY];

          const nextIdx = (curSeq + 1) % SEQUENCES.length;
          const nextSeq = SEQUENCES[nextIdx];
          transTo = [];
          for (let i = 0; i < nextSeq.players.length; i++) {
            transTo.push({ x: nextSeq.players[i][0][0], y: nextSeq.players[i][0][1] });
          }
          defTransTo = [];
          for (let i = 0; i < nextSeq.defenders.length; i++) {
            defTransTo.push({ x: nextSeq.defenders[i][0][0], y: nextSeq.defenders[i][0][1] });
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
          for (let i = 0; i < 11; i++) defPosHist[i] = [];
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
