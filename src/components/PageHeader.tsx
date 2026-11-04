import type {ReactNode} from 'react';
import type {Line} from '../content';
import {useRecede} from '../hooks/useRecede';
import {photo} from '../lib/media';
import {Eyebrow, Lines} from './Headline';

/**
 * The opening of every inner page: one photo behind the condensed headline,
 * receding (blur, dim, shrink) as you scroll into the page.
 */
export function PageHeader({
  n,
  label,
  lines,
  intro,
  img,
  alt,
  position = 'center',
  children,
}: {
  n: string;
  label: string;
  lines: Line[];
  intro: string;
  img: string;
  alt: string;
  position?: string;
  children?: ReactNode;
}) {
  const {root, stage} = useRecede();
  const p = photo(img);

  return (
    <section ref={root} className="relative h-[88svh] min-h-[560px] overflow-hidden bg-ink">
      <div ref={stage} className="absolute inset-0 origin-center will-change-transform">
        <img
          src={p.src}
          srcSet={p.srcSet}
          sizes="100vw"
          alt={alt}
          fetchPriority="high"
          className="kenburns absolute inset-0 h-full w-full object-cover"
          style={{objectPosition: position, animationDuration: '14s'}}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(34_31_36/0.72),rgb(34_31_36/0.15)_65%),linear-gradient(0deg,rgb(34_31_36/0.6),transparent_45%)]" />

        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1680px] px-5 pb-[clamp(96px,14vh,150px)] md:px-12">
          <Eyebrow n={n} className="text-white/80">
            {label}
          </Eyebrow>
          <h1 className="display mt-5 text-[clamp(56px,9vw,156px)] text-white drop-shadow-[0_4px_30px_rgb(0_0_0/0.35)]">
            <Lines lines={lines} />
          </h1>
          <p className="copy mt-7 max-w-[44ch] text-white/90">{intro}</p>
          {children}
        </div>
      </div>
    </section>
  );
}
