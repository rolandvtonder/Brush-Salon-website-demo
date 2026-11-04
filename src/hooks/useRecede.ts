import {useEffect, useRef} from 'react';
import {clamp} from '../lib/math';
import {onFrame} from '../lib/scroll';

/**
 * The hero transition is a camera move, not a fade: as the next section
 * arrives, the stage drifts down, blurs, dims and shrinks back. Returns refs
 * for the section and the stage inside it. `onProgress` lets the caller react
 * (e.g. pause a slideshow once it is off screen) without React state.
 */
export function useRecede(onProgress?: (p: number) => void) {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const cb = useRef(onProgress);
  cb.current = onProgress;

  useEffect(
    () =>
      onFrame(() => {
        const el = root.current;
        const s = stage.current;
        if (!el || !s) return;
        const r = el.getBoundingClientRect();
        const h = Math.max(1, r.height);
        const p = clamp(-r.top / h);
        cb.current?.(p);
        s.style.transform = `translate3d(0, ${(p * h * 0.5).toFixed(1)}px, 0) scale(${(1 - p * 0.08).toFixed(4)})`;
        s.style.filter = p > 0.01 ? `blur(${(p * 18).toFixed(1)}px) brightness(${(1 - p * 0.5).toFixed(3)})` : 'none';
      }),
    [],
  );

  return {root, stage};
}
