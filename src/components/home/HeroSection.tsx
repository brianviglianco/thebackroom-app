'use client';

import { useEffect, useRef } from 'react';

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let W: number, H: number, dpr: number;

    // Coordinate system
    const TOP_M = 0.12;
    const ppx = (x: number) => (x / 100) * W;
    const ppy = (y: number) => (TOP_M + (y / 100) * (1 - TOP_M)) * H;

    // Resize handler
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = window.devicePixelRatio || 1;
      W = rect.width;
      H = rect.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Draw pitch markings
    const drawPitch = () => {
      ctx.clearRect(0, 0, W, H);
      const cx = W * 0.5;
      const gt = TOP_M * H;
      const cl = 'rgba(65,105,58,.28)';
      const cb = 'rgba(78,120,68,.32)';

      // Goal line and halfway
      ctx.strokeStyle = cb;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, gt);
      ctx.lineTo(W, gt);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, H);
      ctx.lineTo(W, H);
      ctx.stroke();

      // Center circle at bottom
      ctx.beginPath();
      ctx.arc(cx, H, W * 0.1, Math.PI, 0);
      ctx.stroke();

      ctx.strokeStyle = cl;

      // Penalty area
      const bw = W * 0.58;
      const bh = (H - gt) * 0.38;
      ctx.beginPath();
      ctx.moveTo(cx - bw / 2, gt);
      ctx.lineTo(cx - bw / 2, gt + bh);
      ctx.lineTo(cx + bw / 2, gt + bh);
      ctx.lineTo(cx + bw / 2, gt);
      ctx.stroke();

      // Goal area
      const sw = W * 0.26;
      const sh = (H - gt) * 0.13;
      ctx.beginPath();
      ctx.moveTo(cx - sw / 2, gt);
      ctx.lineTo(cx - sw / 2, gt + sh);
      ctx.lineTo(cx + sw / 2, gt + sh);
      ctx.lineTo(cx + sw / 2, gt);
      ctx.stroke();

      // Penalty spot
      const spot = gt + (H - gt) * 0.27;
      ctx.fillStyle = cl;
      ctx.beginPath();
      ctx.arc(cx, spot, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Penalty arc
      ctx.strokeStyle = cl;
      ctx.beginPath();
      ctx.arc(cx, spot, W * 0.075, 0.18 * Math.PI, 0.82 * Math.PI);
      ctx.stroke();

      // Goal
      const gw = W * 0.16;
      const gh = 24;
      ctx.strokeStyle = 'rgba(240,230,214,.2)';
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(cx - gw / 2, gt);
      ctx.lineTo(cx - gw / 2, gt - gh);
      ctx.lineTo(cx + gw / 2, gt - gh);
      ctx.lineTo(cx + gw / 2, gt);
      ctx.stroke();
      ctx.lineCap = 'butt';

      // Goal net
      ctx.strokeStyle = 'rgba(240,230,214,.03)';
      ctx.lineWidth = 0.5;
      for (let x = cx - gw / 2 + 5; x < cx + gw / 2; x += 6) {
        ctx.beginPath();
        ctx.moveTo(x, gt);
        ctx.lineTo(x, gt - gh + 2);
        ctx.stroke();
      }
      for (let y = gt - 3; y > gt - gh + 2; y -= 5) {
        ctx.beginPath();
        ctx.moveTo(cx - gw / 2 + 2, y);
        ctx.lineTo(cx + gw / 2 - 2, y);
        ctx.stroke();
      }

      // Corner arcs
      ctx.strokeStyle = cl;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(0, gt, 10, 0, Math.PI * 0.5);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(W, gt, 10, Math.PI * 0.5, Math.PI);
      ctx.stroke();
    };

    // Draw player dot
    const drawDot = (x: number, y: number, highlight: boolean = false) => {
      const dx = ppx(x);
      const dy = ppy(y);

      if (highlight) {
        const g = ctx.createRadialGradient(dx, dy, 0, dx, dy, 18);
        g.addColorStop(0, 'rgba(196,135,90,.22)');
        g.addColorStop(1, 'rgba(196,135,90,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(dx, dy, 18, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = '#C4875A';
      ctx.beginPath();
      ctx.arc(dx, dy, highlight ? 6 : 5, 0, Math.PI * 2);
      ctx.fill();

      // Highlight
      ctx.fillStyle = 'rgba(230,180,130,.3)';
      ctx.beginPath();
      ctx.arc(dx - 1.5, dy - 1.5, 1.8, 0, Math.PI * 2);
      ctx.fill();
    };

    // Draw defender dot
    const drawDefDot = (x: number, y: number, isGK: boolean = false) => {
      const dx = ppx(x);
      const dy = ppy(y);

      const g = ctx.createRadialGradient(dx, dy, 0, dx, dy, isGK ? 14 : 10);
      if (isGK) {
        g.addColorStop(0, 'rgba(106,154,106,.18)');
        g.addColorStop(1, 'rgba(106,154,106,0)');
      } else {
        g.addColorStop(0, 'rgba(123,138,150,.12)');
        g.addColorStop(1, 'rgba(123,138,150,0)');
      }
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(dx, dy, isGK ? 14 : 10, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = isGK ? '#6A9A6A' : '#7B8A96';
      ctx.beginPath();
      ctx.arc(dx, dy, isGK ? 5.5 : 4.5, 0, Math.PI * 2);
      ctx.fill();
    };

    // Draw ball
    const drawBall = (x: number, y: number) => {
      const dx = ppx(x);
      const dy = ppy(y);

      const g = ctx.createRadialGradient(dx, dy, 0, dx, dy, 12);
      g.addColorStop(0, 'rgba(240,230,214,.25)');
      g.addColorStop(1, 'rgba(240,230,214,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(dx, dy, 12, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#F0E6D6';
      ctx.beginPath();
      ctx.arc(dx, dy, 3.5, 0, Math.PI * 2);
      ctx.fill();
    };

    // Simple animation state
    let time = 0;
    const attackers = [
      { x: 50, y: 88 }, // GK
      { x: 18, y: 70 }, // LB
      { x: 39, y: 70 }, // CB
      { x: 61, y: 70 }, // CB
      { x: 82, y: 70 }, // RB
      { x: 28, y: 48 }, // LCM
      { x: 50, y: 52 }, // CM
      { x: 72, y: 48 }, // RCM
      { x: 24, y: 24 }, // LW
      { x: 50, y: 20 }, // CF
      { x: 76, y: 24 }, // RW
    ];

    const defenders = [
      { x: 50, y: 4 }, // GK
      { x: 74, y: 22 },
      { x: 58, y: 19 },
      { x: 42, y: 19 },
      { x: 26, y: 22 },
      { x: 74, y: 38 },
      { x: 58, y: 34 },
      { x: 42, y: 34 },
      { x: 26, y: 38 },
      { x: 58, y: 52 },
      { x: 42, y: 52 },
    ];

    let ballX = 50;
    let ballY = 52;
    let ballCarrier = 6;

    // Animation loop
    const animate = () => {
      time += 0.01;

      drawPitch();

      // Gentle movement
      const t = time * 0.5;
      const positions = attackers.map((p, i) => ({
        x: p.x + Math.sin(t + i * 0.7) * 2,
        y: p.y + Math.cos(t + i * 0.5) * 1.5,
      }));

      const defPositions = defenders.map((p, i) => ({
        x: p.x + Math.sin(t * 0.8 + i * 0.5) * 1.5,
        y: p.y + Math.cos(t * 0.6 + i * 0.7) * 1,
      }));

      // Ball follows carrier
      ballX += (positions[ballCarrier].x - ballX) * 0.1;
      ballY += (positions[ballCarrier].y - ballY) * 0.1;

      // Draw defenders
      defPositions.forEach((p, i) => drawDefDot(p.x, p.y, i === 0));

      // Draw attackers
      positions.forEach((p, i) => drawDot(p.x, p.y, i === ballCarrier));

      // Draw ball
      drawBall(ballX, ballY);

      // Occasionally change ball carrier
      if (Math.random() < 0.005) {
        const nearbyPlayers = positions
          .map((p, i) => ({ i, dist: Math.hypot(p.x - ballX, p.y - ballY) }))
          .filter((p) => p.i !== ballCarrier && p.dist < 30)
          .sort((a, b) => a.dist - b.dist);

        if (nearbyPlayers.length > 0) {
          ballCarrier = nearbyPlayers[0].i;
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    // Initialize
    resize();
    window.addEventListener('resize', resize);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="relative overflow-hidden border-b border-border min-h-[520px]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg via-[#12180f] via-30% to-[#1c2c1a]" />

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 right-0 w-[65%] h-full z-[1]"
      />

      {/* Overlays */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background:
            'linear-gradient(to right, #100E0C 0%, rgba(16,14,12,0.97) 12%, rgba(16,14,12,0.85) 28%, rgba(16,14,12,0.55) 45%, rgba(16,14,12,0.2) 62%, rgba(16,14,12,0) 80%)',
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-[90px] z-[3]"
        style={{
          background:
            'linear-gradient(to bottom, rgba(16,14,12,0.9) 0%, rgba(16,14,12,0.4) 50%, rgba(16,14,12,0) 100%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-[60px] z-[3]"
        style={{
          background: 'linear-gradient(to top, #100E0C, rgba(16,14,12,0))',
        }}
      />

      {/* Content */}
      <div className="relative z-[5] max-w-[540px] ml-[max(48px,calc((100vw-1440px)/2+48px))] pt-[120px] pb-16 flex flex-col justify-center min-h-[520px]">
        <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-copper mb-4 flex items-center gap-2.5">
          <span className="w-[18px] h-px bg-copper" />
          thebackroom.fm
        </div>

        <h1 className="font-serif text-hero font-normal leading-[1.08] tracking-[-0.035em] mb-4">
          Find the right
          <br />
          Football Manager tactic
          <br />
          for <em className="italic font-light text-copper">your save</em>
        </h1>

        <p className="text-[15px] text-cream-secondary max-w-[440px] leading-[1.65] font-light">
          Structured reviews with win rates, team context, and match data from
          real saves. Not hype — evidence.
        </p>
      </div>
    </div>
  );
}
