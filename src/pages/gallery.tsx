import {useCallback, useEffect, useRef, useState, type CSSProperties} from 'react';
import {PageHeader} from '../components/PageHeader';
import {contact, gallery} from '../content';
import {useReveals} from '../hooks/useReveals';
import {lockScroll} from '../lib/scroll';
import {photo} from '../lib/media';
import {mount} from './mount';

/** Full-screen viewer: arrow keys / buttons step through, Esc or Close leaves. */
function Lightbox({index, onClose, onStep}: {index: number; onClose: () => void; onStep: (d: number) => void}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const g = gallery[index];
  const p = photo(g.src);

  useEffect(() => {
    dialog.current?.showModal();
    lockScroll(true);
    return () => lockScroll(false);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') onStep(1);
      if (e.key === 'ArrowLeft') onStep(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onStep]);

  return (
    <dialog
      ref={dialog}
      onClose={onClose}
      aria-label={`Photo ${index + 1} of ${gallery.length}`}
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-ink/95 p-0 text-white backdrop:bg-ink/80"
    >
      <div className="grid h-full grid-rows-[auto_1fr_auto] gap-4 p-5 md:p-8">
        <div className="flex items-center justify-between">
          <p className="caps text-white/70" aria-live="polite">
            {String(index + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')} · {g.tag}
          </p>
          <button type="button" onClick={() => dialog.current?.close()} className="caps min-h-11 cursor-pointer bg-white/15 px-6 hover:bg-white/25">
            Close
          </button>
        </div>
        <figure className="flex min-h-0 flex-col items-center justify-center">
          <img key={g.src} src={p.src} alt={g.alt} className="max-h-full min-h-0 w-auto max-w-full object-contain" />
          <figcaption className="copy mt-3 text-center text-[15px] text-white/75">{g.alt}</figcaption>
        </figure>
        <div className="flex justify-center gap-3">
          <button type="button" onClick={() => onStep(-1)} className="caps min-h-11 cursor-pointer border border-white/30 px-6 hover:border-white">
            ← Previous
          </button>
          <button type="button" onClick={() => onStep(1)} className="caps min-h-11 cursor-pointer border border-white/30 px-6 hover:border-white">
            Next →
          </button>
        </div>
      </div>
    </dialog>
  );
}

function Grid() {
  const ref = useReveals<HTMLElement>();
  const [open, setOpen] = useState(-1);
  const opener = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => {
    setOpen(-1);
    opener.current?.focus();
  }, []);
  const step = useCallback((d: number) => setOpen((i) => (i + d + gallery.length) % gallery.length), []);

  return (
    <section ref={ref} className="bg-ink px-5 py-20 md:px-12 md:py-28" aria-label="Photos">
      <ul className="mx-auto max-w-[1480px] columns-2 gap-[3px] md:columns-3">
        {gallery.map((g, i) => {
          const p = photo(g.src);
          return (
            <li key={g.src} data-reveal style={{'--d': `${(i % 4) * 0.07}s`} as CSSProperties} className="mb-[3px] break-inside-avoid">
              <button
                type="button"
                onClick={(e) => {
                  opener.current = e.currentTarget;
                  setOpen(i);
                }}
                className="group relative block w-full cursor-zoom-in overflow-hidden"
              >
                <img
                  src={p.src}
                  srcSet={p.srcSet}
                  sizes="(max-width: 767px) 50vw, 33vw"
                  alt={g.alt}
                  loading="lazy"
                  className={`w-full object-cover transition-transform duration-[1200ms] ease-silk group-hover:scale-[1.04] ${i % 3 === 1 ? 'aspect-square' : 'aspect-[4/5]'}`}
                />
                <span className="caps absolute bottom-3 left-3 bg-ink/70 px-3 py-1 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  {g.tag}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <p className="caps mx-auto mt-14 max-w-[1480px] text-white/65">
        More on Instagram:{' '}
        <a href={contact.instagram.href} target="_blank" rel="noopener" className="text-white underline-offset-4 hover:underline">
          {contact.instagram.handle}
        </a>
      </p>
      {open >= 0 && <Lightbox index={open} onClose={close} onStep={step} />}
    </section>
  );
}

mount(
  'gallery',
  <>
    <PageHeader
      n="03"
      label="Gallery"
      lines={[{t: 'Fresh from'}, {t: 'the chair.', i: true}]}
      intro="Soft updos, lived-in colour, bridal mornings and a little glamour. A few favourites from the salon."
      img="updo1"
      alt="Twisted low bun with blonde balayage in front of the salon’s green chalk wall"
      position="50% 40%"
    />
    <Grid />
  </>,
);
