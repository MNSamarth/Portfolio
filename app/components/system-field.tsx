'use client';

import { useEffect, useRef } from 'react';

type SignalNode = {
  x: number;
  y: number;
  radius: number;
  label?: string;
  cluster: 'backend' | 'ai' | 'product';
};

const nodes: SignalNode[] = [
  { x: .08, y: .2, radius: 2, label: 'REQUEST', cluster: 'backend' },
  { x: .2, y: .34, radius: 3, cluster: 'backend' },
  { x: .12, y: .57, radius: 2, label: 'API', cluster: 'backend' },
  { x: .31, y: .62, radius: 4, cluster: 'backend' },
  { x: .42, y: .43, radius: 3, label: 'VECTOR', cluster: 'ai' },
  { x: .55, y: .23, radius: 2, cluster: 'ai' },
  { x: .62, y: .5, radius: 5, label: 'MODEL', cluster: 'ai' },
  { x: .76, y: .34, radius: 3, cluster: 'product' },
  { x: .88, y: .18, radius: 2, label: 'INTERFACE', cluster: 'product' },
  { x: .9, y: .58, radius: 4, cluster: 'product' },
  { x: .73, y: .75, radius: 2, label: 'FEEDBACK', cluster: 'product' },
  { x: .47, y: .8, radius: 3, cluster: 'ai' },
  { x: .22, y: .82, radius: 2, label: 'STORE', cluster: 'backend' },
];

const links: [number, number][] = [
  [0,1],[0,2],[1,3],[2,3],[3,4],[3,12],[4,5],[4,6],[5,6],
  [6,7],[6,10],[6,11],[7,8],[7,9],[8,9],[9,10],[10,11],[11,12],
];

const signalLinks = [1, 4, 8, 10, 13, 16];

export function SystemField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasValue = ref.current;
    if (!canvasValue) return;
    const canvas = canvasValue as HTMLCanvasElement;
    const contextValue = canvas.getContext('2d');
    if (!contextValue) return;
    const context = contextValue;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let pointer = { x: -1000, y: -1000 };
    let frame = 0;
    let width = 0;
    let height = 0;
    let ratio = 1;

    function resize() {
      ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function point(node: SignalNode) {
      return { x: node.x * width, y: node.y * height };
    }

    function draw(time = 0) {
      const styles = getComputedStyle(document.documentElement);
      const lineColor = styles.getPropertyValue('--system-line').trim();
      const nodeColor = styles.getPropertyValue('--system-node').trim();
      const textColor = styles.getPropertyValue('--secondary').trim();
      const accent = styles.getPropertyValue('--accent').trim();
      context.clearRect(0, 0, width, height);

      links.forEach(([fromIndex, toIndex]) => {
        const from = point(nodes[fromIndex]);
        const to = point(nodes[toIndex]);
        context.beginPath();
        context.moveTo(from.x, from.y);
        context.lineTo(to.x, to.y);
        context.strokeStyle = lineColor;
        context.lineWidth = 1;
        context.stroke();
      });

      if (!reducedMotion.matches) {
        signalLinks.forEach((linkIndex, index) => {
          const cycle = (time * (.000045 + index * .000002) + index * .17) % 1;
          if (cycle > .72) return;
          const progress = cycle / .72;
          const [fromIndex, toIndex] = links[linkIndex];
          const from = point(nodes[fromIndex]);
          const to = point(nodes[toIndex]);
          const x = from.x + (to.x - from.x) * progress;
          const y = from.y + (to.y - from.y) * progress;
          const glow = context.createRadialGradient(x, y, 0, x, y, 12);
          glow.addColorStop(0, accent);
          glow.addColorStop(1, 'transparent');
          context.fillStyle = glow;
          context.fillRect(x - 12, y - 12, 24, 24);
          context.beginPath();
          context.arc(x, y, 2.2, 0, Math.PI * 2);
          context.fillStyle = accent;
          context.fill();
        });
      }

      nodes.forEach((node) => {
        const position = point(node);
        const distance = Math.hypot(pointer.x - position.x, pointer.y - position.y);
        const proximity = Math.max(0, 1 - distance / 155);
        const radius = node.radius + proximity * 5;
        if (proximity > .05) {
          context.beginPath();
          context.arc(position.x, position.y, 26 + proximity * 18, 0, Math.PI * 2);
          context.strokeStyle = `color-mix(in srgb, ${accent} ${Math.round(proximity * 45)}%, transparent)`;
          context.lineWidth = 1;
          context.stroke();
        }
        context.beginPath();
        context.arc(position.x, position.y, radius, 0, Math.PI * 2);
        context.fillStyle = proximity > .18 ? accent : nodeColor;
        context.fill();

        if (node.label) {
          context.font = '500 9px IBM Plex Mono, monospace';
          context.letterSpacing = '1px';
          context.fillStyle = proximity > .18 ? accent : textColor;
          context.fillText(node.label, position.x + 12, position.y - 10);
        }
      });

      if (!reducedMotion.matches) frame = requestAnimationFrame(draw);
    }

    function onPointerMove(event: PointerEvent) {
      const bounds = canvas.getBoundingClientRect();
      pointer = { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
    }

    function onPointerLeave() {
      pointer = { x: -1000, y: -1000 };
    }

    const observer = new ResizeObserver(() => {
      resize();
      if (reducedMotion.matches) draw();
    });
    observer.observe(canvas);
    canvas.addEventListener('pointermove', onPointerMove, { passive: true });
    canvas.addEventListener('pointerleave', onPointerLeave);
    resize();
    draw();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return (
    <div className="system-field-wrap" aria-hidden="true">
      <canvas ref={ref} className="system-field" />
      <div className="system-legend mono">
        <span><i /> BACKEND SYSTEMS</span>
        <span><i /> AI INTEGRATION</span>
        <span><i /> PRODUCT ENGINEERING</span>
      </div>
    </div>
  );
}