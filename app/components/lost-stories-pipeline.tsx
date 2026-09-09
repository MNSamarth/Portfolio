export function LostStoriesPipeline({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? 'transcription-viz is-compact' : 'transcription-viz'}>
      <div className="transcription-labels mono" aria-hidden="true">
        <span>03:00:00 / SOURCE AUDIO</span>
        <span>PARALLEL WORKERS / 06</span>
        <span>00:12:00 / TRANSCRIPT</span>
      </div>
      <svg viewBox="0 0 1200 520" role="img" aria-label="Audio waveform split into parallel chunks, processed simultaneously, and recombined into a transcript">
        <defs>
          <linearGradient id={compact ? 'wave-fade-small' : 'wave-fade'} x1="0" x2="1">
            <stop offset="0" stopColor="currentColor" stopOpacity=".15" />
            <stop offset=".45" stopColor="currentColor" stopOpacity="1" />
            <stop offset="1" stopColor="currentColor" stopOpacity=".15" />
          </linearGradient>
        </defs>
        <g className="source-wave" fill="none" stroke={`url(#${compact ? 'wave-fade-small' : 'wave-fade'})`}>
          <path d="M40 260 L62 260 L72 222 L84 302 L97 190 L110 326 L124 242 L136 274 L149 213 L163 308 L176 250 L190 266 L205 232 L220 289 L236 260 L258 260" />
        </g>
        <g className="splitter" fill="none">
          <path d="M258 260 C310 260 302 75 360 75" />
          <path d="M258 260 C310 260 302 145 360 145" />
          <path d="M258 260 C310 260 302 215 360 215" />
          <path d="M258 260 C310 260 302 285 360 285" />
          <path d="M258 260 C310 260 302 355 360 355" />
          <path d="M258 260 C310 260 302 425 360 425" />
        </g>
        <g className="worker-tracks" fill="none">
          {[75,145,215,285,355,425].map((y, index) => (
            <g key={y}>
              <path d={`M360 ${y} H820`} />
              <rect x={430 + index * 13} y={y - 16} width="62" height="32" rx="16" />
              <circle className={`audio-pulse pulse-${index + 1}`} cx="370" cy={y} r="5" />
            </g>
          ))}
        </g>
        <g className="recombine" fill="none">
          <path d="M820 75 C880 75 872 260 934 260" />
          <path d="M820 145 C880 145 872 260 934 260" />
          <path d="M820 215 C880 215 872 260 934 260" />
          <path d="M820 285 C880 285 872 260 934 260" />
          <path d="M820 355 C880 355 872 260 934 260" />
          <path d="M820 425 C880 425 872 260 934 260" />
        </g>
        <g className="output-lines">
          <rect x="934" y="208" width="226" height="104" rx="4" />
          <line x1="965" y1="238" x2="1128" y2="238" />
          <line x1="965" y1="260" x2="1094" y2="260" />
          <line x1="965" y1="282" x2="1112" y2="282" />
        </g>
      </svg>
      {!compact && (
        <div className="transcription-result">
          <div><strong>3H</strong><span className="mono">SERIAL</span></div>
          <i aria-hidden="true">→</i>
          <div className="is-fast"><strong>12M</strong><span className="mono">PARALLEL</span></div>
        </div>
      )}
    </div>
  );
}