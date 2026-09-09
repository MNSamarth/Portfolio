'use client';

import { useState } from 'react';
import type { CSSProperties } from 'react';

function NeutralFrame({ captured = false }: { captured?: boolean }) {
  return (
    <div className={captured ? 'neutral-ui is-captured' : 'neutral-ui'}>
      <div className="neutral-top"><i /><i /><i /><span /></div>
      <div className="neutral-body">
        <aside><i /><i /><i /><i /></aside>
        <div className="neutral-content">
          <div className="neutral-title" />
          <div className="neutral-copy"><i /><i /><i /></div>
          <div className="neutral-panels"><span /><span /><span /></div>
        </div>
      </div>
      {captured && <div className="anomaly anomaly-one"><span className="mono">Δ 03</span></div>}
      {captured && <div className="anomaly anomaly-two"><span className="mono">Δ 08</span></div>}
    </div>
  );
}

export function ComparisonSlider() {
  const [position, setPosition] = useState(56);
  const style = { '--compare-position': `${position}%` } as CSSProperties;

  return (
    <div className="comparison-demo" style={style}>
      <div className="compare-meta mono">
        <span>ALIGNMENT: LOCKED</span>
        <span>SSIM: 0.97</span>
        <span>ANOMALIES: 02</span>
      </div>
      <div className="compare-stage">
        <div className="compare-layer reference-layer">
          <span className="frame-tag mono">REFERENCE</span>
          <NeutralFrame />
        </div>
        <div className="compare-layer captured-layer">
          <span className="frame-tag mono">CAPTURED + DIFFERENCE</span>
          <NeutralFrame captured />
        </div>
        <div className="compare-handle" aria-hidden="true"><i /><span>↔</span></div>
        <input
          className="compare-range"
          type="range"
          min="5"
          max="95"
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-label="Compare reference and captured interface visualization"
        />
      </div>
      <div className="compare-footer">
        <p className="mono">TECHNIQUE VISUALIZATION — NOT SAMSUNG PRODUCT UI</p>
        <div className="compare-metric"><strong>20M → &lt;1M</strong><span className="mono">VISION VERIFICATION</span></div>
      </div>
    </div>
  );
}