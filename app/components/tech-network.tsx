'use client';

import { useState } from 'react';

type Tool = { name: string; work: string[] };

const tools: Tool[] = [
  { name: 'PYTHON', work: ['ROLEREADY', 'LOST STORIES', 'SAMSUNG'] },
  { name: 'TYPESCRIPT', work: ['PROMPTQUEST'] },
  { name: 'FASTAPI', work: ['ROLEREADY'] },
  { name: 'NODE.JS', work: ['LOST STORIES'] },
  { name: 'POSTGRESQL', work: ['ROLEREADY'] },
  { name: 'REACT', work: ['PROMPTQUEST', 'LOST STORIES'] },
  { name: 'DOCKER', work: ['PROMPTQUEST'] },
  { name: 'AWS', work: ['LOST STORIES'] },
  { name: 'GCP', work: ['ROLEREADY', 'PROMPTQUEST'] },
  { name: 'LANGCHAIN', work: ['ROLEREADY'] },
  { name: 'PGVECTOR', work: ['ROLEREADY'] },
  { name: 'FLASK', work: ['PROMPTQUEST', 'LOST STORIES'] },
  { name: 'MONGODB', work: ['LOST STORIES'] },
  { name: 'OPENCV', work: ['SAMSUNG'] },
  { name: 'TENSORFLOW', work: ['ISL INTERPRETER'] },
  { name: 'LINUX', work: ['CLOUD DEPLOYMENT'] },
];

const workNames = ['ROLEREADY', 'PROMPTQUEST', 'LOST STORIES', 'SAMSUNG', 'ISL INTERPRETER', 'CLOUD DEPLOYMENT'];

export function TechNetwork() {
  const [active, setActive] = useState('PYTHON');
  const selected = tools.find((tool) => tool.name === active) ?? tools[0];

  return (
    <div className="tech-network">
      <div className="tech-selector" role="list" aria-label="Technologies">
        {tools.map((tool) => (
          <button
            key={tool.name}
            type="button"
            className={active === tool.name ? 'is-active mono' : 'mono'}
            onClick={() => setActive(tool.name)}
            onPointerEnter={() => setActive(tool.name)}
            onFocus={() => setActive(tool.name)}
            aria-pressed={active === tool.name}
          >
            <i />{tool.name}
          </button>
        ))}
      </div>
      <div className="tech-signal" aria-hidden="true"><i /><i /><i /><span /></div>
      <div className="work-targets" aria-live="polite">
        <div className="work-target-heading mono">USED IN / {selected.work.length.toString().padStart(2, '0')}</div>
        {workNames.map((work, index) => (
          <div key={work} className={selected.work.includes(work) ? 'work-target is-active' : 'work-target'}>
            <span className="mono">0{index + 1}</span>
            <strong>{work}</strong>
            <i aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  );
}