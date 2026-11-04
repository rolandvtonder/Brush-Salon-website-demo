import {useEffect, useRef, useState} from 'react';
import {hero} from '../content';
import {useReducedMotion} from '../hooks/useReducedMotion';
import {useRecede} from '../hooks/useRecede';
import {photo} from '../lib/media';
import {Lines} from './Headline';

const HOLD = 6500;

/**
 * The home hero: the salon's own photos crossfade with a slow push-in, so it
 * reads like film without a video, under the mixed upright/italic headline.
 * Scrolling on, the whole stage recedes as the page transition. The slideshow
 * pauses off screen and on reduced motion.
 */
export function Hero() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState(-1);
  // Bumped each time a slide comes up, so its push-in restarts from the top.
  const [runs, setRuns] = useState(() => hero.slides.map(() => 0));
  const current = useRef(0);
  const offscreen = useRef(false);
  const {root, stage} = useRecede((p) => {
    offscreen.current = p > 0.98;
  });

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      if (offscreen.current || document.hidden) return;
      const cur = current.current;
      const next = (cur + 1) % hero.slides.length;
      current.current = next;
      setPrev(cur);
      setIndex(next);
      setRuns((r) => r.map((v, k) => (k === next ? v + 1 : v)));
    }, HOLD);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <section ref={root} className="relative h-svh min-h-[620px] overflow-hidden bg-ink" aria-label="Welcome to Brush">
      <div ref={stage} className="absolute inset-0 origin-center will-change-transform">
        {hero.slides.map((s, i) => {
          const p = photo(s.src);
          const live = i === index || i === prev;
          return (
            <img
              key={`${i}:${runs[i]}`}
              src={p.src}
              srcSet={p.srcSet}
              sizes="100vw"
              alt={i === index ? s.alt : ''}
              aria-hidden={i !== index}
              fetchPriority={i === 0 ? 'high' : 'low'}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1600ms] ease-silk ${live && !reduced ? 'kenburns' : ''} ${
                i === index ? 'opacity-100' : 'opacity-0'
              }`}
            />
          );
        })}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(34_31_36/0.62),rgb(34_31_36/0.1)_60%),linear-gradient(0deg,rgb(34_31_36/0.45),transparent_40%)]" />

        <div className="absolute inset-0 mx-auto max-w-[1680px] px-5 pt-[clamp(110px,15vh,160px)] md:px-12">
          <h1 className="display text-[clamp(56px,8.4vw,150px)] text-white drop-shadow-[0_4px_30px_rgb(0_0_0/0.35)]">
            <span className="sr-only">Brush Salon, Tyger Waterfront. </span>
            <Lines lines={hero.lines} indentFirst />
          </h1>
          <p className="copy mt-9 ml-[clamp(0px,19vw,330px)] max-w-[36ch] text-white/90 max-md:ml-0">{hero.body}</p>
        </div>
      </div>

    </section>
  );
}
