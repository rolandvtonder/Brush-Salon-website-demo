import {useEffect, useState, type CSSProperties} from 'react';
import {media} from '../lib/media';

type Pos = 'right' | 'center' | 'left';

/**
 * The page wipe: paper, sage and ink slabs sweep in from the right when you
 * leave a page and carry on out to the left when the next one arrives, so the
 * two halves read as one continuous move. Once off to the left they are
 * parked back on the right, without animating, ready for the next exit.
 */
export function Cover({state}: {state: 'arriving' | 'leaving' | 'idle'}) {
  const [pos, setPos] = useState<Pos>(state === 'arriving' ? 'center' : 'right');
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (state === 'leaving') {
      setAnimate(true);
      setPos('center');
    } else if (state === 'idle' && pos === 'center') {
      setAnimate(true);
      setPos('left');
      const id = window.setTimeout(() => {
        setAnimate(false);
        setPos('right');
      }, 1300);
      return () => window.clearTimeout(id);
    }
    // pos is only read to know where we came from; reacting to it would loop.
  }, [state]);

  const x = pos === 'center' ? 'translate-x-0' : pos === 'left' ? '-translate-x-[104%]' : 'translate-x-[104%]';
  // Entering: paper, sage, ink in turn. Leaving: ink goes first.
  const delay = (k: number): CSSProperties => ({transitionDelay: animate ? `${pos === 'center' ? k * 0.1 : (2 - k) * 0.09}s` : '0s'});
  const slab = `absolute inset-0 ${animate ? 'transition-transform duration-[750ms] ease-wipe' : ''} ${x}`;

  return (
    <div aria-hidden className={`fixed inset-0 z-[65] overflow-hidden ${pos === 'center' ? '' : 'pointer-events-none'}`}>
      <div className={`${slab} bg-paper`} style={delay(0)} />
      <div className={`${slab} bg-sage`} style={delay(1)} />
      <div className={`${slab} flex items-center justify-center bg-ink`} style={delay(2)}>
        <img src={media('logo-white.png')} alt="" width={481} height={156} className="w-[min(46vw,260px)] opacity-90" />
      </div>
    </div>
  );
}
