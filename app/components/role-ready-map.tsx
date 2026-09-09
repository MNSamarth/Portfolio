'use client';

import { useState } from 'react';

type RouteId = 'github' | 'jira' | 'confluence' | 'content' | 'mindmap' | 'video';

const sources: { id: RouteId; label: string; detail: string }[] = [
  { id: 'github', label: 'GITHUB', detail: 'CODE + DOCS' },
  { id: 'jira', label: 'JIRA', detail: 'ISSUES + CONTEXT' },
  { id: 'confluence', label: 'CONFLUENCE', detail: 'KNOWLEDGE' },
];

const outputs: { id: RouteId; label: string; detail: string }[] = [
  { id: 'content', label: 'CONTENT', detail: 'STRUCTURED LEARNING' },
  { id: 'mindmap', label: 'MINDMAP', detail: 'INTERACTIVE MAP' },
  { id: 'video', label: 'VIDEO', detail: 'EDUCATIONAL MEDIA' },
];

export function RoleReadyMap() {
  const [active, setActive] = useState<RouteId | null>(null);
  const isSource = active === 'github' || active === 'jira' || active === 'confluence';
  const isOutput = active === 'content' || active === 'mindmap' || active === 'video';
  const sourceIndex = sources.findIndex((item) => item.id === active);
  const outputIndex = outputs.findIndex((item) => item.id === active);

  function activate(id: RouteId) {
    setActive(id);
  }

  function clearDesktopPath() {
    if (window.matchMedia('(hover: hover)').matches) setActive(null);
  }

  return (
    <div className="rr-map" onPointerLeave={clearDesktopPath}>
      <div className="rr-map-heading mono">
        <span>LIVE ARCHITECTURE / SELECT A SOURCE OR OUTPUT</span>
        <span>{active ? `PATH: ${active.toUpperCase()}` : 'ALL SIGNALS IDLE'}</span>
      </div>

      <div className="rr-map-stage">
        <svg className="rr-paths" viewBox="0 0 1000 620" preserveAspectRatio="none" aria-hidden="true">
          <path className={isSource && sourceIndex === 0 ? 'is-active' : ''} d="M84 94 C150 94 155 238 254 238" />
          <path className={isSource && sourceIndex === 1 ? 'is-active' : ''} d="M84 214 C158 214 166 238 254 238" />
          <path className={isSource && sourceIndex === 2 ? 'is-active' : ''} d="M84 334 C150 334 155 238 254 238" />
          <path className={active ? 'is-active shared-path' : ''} d="M284 238 C348 238 340 126 424 126" />
          <path className={active ? 'is-active shared-path' : ''} d="M454 126 C528 126 510 286 594 286" />
          <path className={active ? 'is-active shared-path' : ''} d="M624 286 C700 286 683 192 760 192" />
          <path className={isOutput && outputIndex === 0 ? 'is-active' : ''} d="M790 192 C860 192 860 84 932 84" />
          <path className={isOutput && outputIndex === 1 ? 'is-active' : ''} d="M790 192 C858 192 862 220 932 220" />
          <path className={isOutput && outputIndex === 2 ? 'is-active' : ''} d="M790 192 C858 192 862 356 932 356" />
          <path className="return-path" d="M932 412 C780 540 320 548 84 420" />
        </svg>

        <div className="rr-sources" aria-label="Knowledge sources">
          {sources.map((source) => (
            <button
              key={source.id}
              className={`rr-endpoint ${active === source.id ? 'is-active' : ''}`}
              type="button"
              onClick={() => activate(source.id)}
              onPointerEnter={() => setActive(source.id)}
              onFocus={() => setActive(source.id)}
              onBlur={() => setActive(null)}
              aria-pressed={active === source.id}
            >
              <i />
              <strong>{source.label}</strong>
              <small className="mono">{source.detail}</small>
            </button>
          ))}
        </div>

        <div className="rr-core" aria-label="Processing pipeline">
          <div className={active ? 'rr-core-node is-active ingestion' : 'rr-core-node ingestion'}><i /><span>INGESTION</span><small className="mono">NORMALIZE</small></div>
          <div className={active ? 'rr-core-node is-active vector' : 'rr-core-node vector'}><i /><span>PGVECTOR</span><small className="mono">EMBED + STORE</small></div>
          <div className={active ? 'rr-core-node is-active retrieval' : 'rr-core-node retrieval'}><i /><span>RETRIEVAL</span><small className="mono">SEMANTIC SEARCH</small></div>
          <div className={active ? 'rr-core-node is-active gemini' : 'rr-core-node gemini'}><i /><span>GEMINI</span><small className="mono">GENERATE</small></div>
        </div>

        <div className="rr-outputs" aria-label="Generated outputs">
          {outputs.map((output) => (
            <button
              key={output.id}
              className={`rr-endpoint output ${active === output.id ? 'is-active' : ''}`}
              type="button"
              onClick={() => activate(output.id)}
              onPointerEnter={() => setActive(output.id)}
              onFocus={() => setActive(output.id)}
              onBlur={() => setActive(null)}
              aria-pressed={active === output.id}
            >
              <i />
              <strong>{output.label}</strong>
              <small className="mono">{output.detail}</small>
            </button>
          ))}
        </div>
      </div>
      <p className="rr-map-note mono">TAP ANY LABEL ON MOBILE · INTERACTION IS OPTIONAL</p>
    </div>
  );
}