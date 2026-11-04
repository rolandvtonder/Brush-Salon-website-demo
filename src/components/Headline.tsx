import type {Line} from '../content';

/** Display lines from content; `i` lines are set in italic. */
export function Lines({lines, indentFirst = false}: {lines: Line[]; indentFirst?: boolean}) {
  return (
    <>
      {lines.map((l, i) => (
        <span key={l.t} className={`block ${l.i ? 'it' : ''} ${indentFirst && i === 0 ? 'md:pl-[1.6em]' : ''}`}>
          {l.t}
        </span>
      ))}
    </>
  );
}

/** Small numbered label above a section, e.g. "02 — Services & prices". */
export function Eyebrow({n, children, className = ''}: {n?: string; children: string; className?: string}) {
  return (
    <p className={`caps flex items-center gap-3 ${className}`}>
      {n && <span>{n}</span>}
      {n && <span aria-hidden className="h-px w-8 bg-current opacity-50" />}
      <span>{children}</span>
    </p>
  );
}
