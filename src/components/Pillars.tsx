import type {CSSProperties} from 'react';
import {pageUrl, pillars} from '../content';
import {useInView} from '../hooks/useInView';
import {photo} from '../lib/media';

/**
 * Three tall panels slide in from the right one after another, one per kind
 * of visit, each linking to its part of the services page.
 */
export function Pillars() {
  const [root, shown] = useInView<HTMLElement>(0.2);

  return (
    <section ref={root} className="relative bg-ink" aria-label="What we do">
      <div className="grid h-svh min-h-[620px] grid-cols-3 gap-[3px] overflow-hidden max-md:h-auto max-md:grid-cols-1">
        {pillars.map((b, i) => {
          const p = photo(b.img);
          return (
            <a
              key={b.id}
              href={pageUrl(`services/#${b.id}`)}
              className={`group relative block overflow-hidden transition-transform duration-[1100ms] ease-wipe max-md:h-[78svh] ${shown ? 'translate-x-0' : 'translate-x-[calc(100%_+_100vw)]'}`}
              style={{transitionDelay: `${0.12 + i * 0.16}s`, background: b.tint} as CSSProperties}
            >
              <img
                src={p.src}
                srcSet={p.srcSet}
                sizes="(max-width: 767px) 100vw, 34vw"
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-silk group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(34_31_36/0.6),transparent_40%,rgb(34_31_36/0.55))]" />
              <div className="relative flex h-full flex-col justify-between p-7 pt-24 md:p-9 md:pt-28">
                <h2 className="display text-[clamp(38px,3.6vw,64px)] text-white">
                  <span className="block">{b.name[0]}</span>
                  <span className="it block">{b.name[1]}</span>
                </h2>
                <div className={`transition-opacity delay-[1400ms] duration-700 ${shown ? 'opacity-100' : 'opacity-0'}`}>
                  <p className="copy max-w-[28ch] text-[15px] text-white/90">{b.note}</p>
                  <p className="caps mt-4 inline-flex items-center gap-3 text-white">
                    View prices
                    <span aria-hidden className="transition-transform duration-500 ease-silk group-hover:translate-x-1.5">→</span>
                  </p>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
