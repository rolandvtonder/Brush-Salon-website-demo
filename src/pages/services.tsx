import type {CSSProperties} from 'react';
import {Eyebrow, Lines} from '../components/Headline';
import {PageHeader} from '../components/PageHeader';
import {services, whatsappLink, type ServiceGroup} from '../content';
import {useReveals} from '../hooks/useReveals';
import {photo} from '../lib/media';
import {mount} from './mount';

function Group({g, n}: {g: ServiceGroup; n: number}) {
  const ref = useReveals<HTMLElement>();
  const p = photo(g.img);
  const flip = n % 2 === 1;
  return (
    <section ref={ref} id={g.id} className="scroll-mt-24 border-t border-ink/15 py-20 md:py-28" aria-labelledby={`${g.id}-title`}>
      <div className={`grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20 ${flip ? 'lg:[&>*:first-child]:order-2' : ''}`}>
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow n={`0${n + 1}`} className="text-ink/60">
            Services
          </Eyebrow>
          <h2 id={`${g.id}-title`} data-reveal className="display mt-5 text-[clamp(52px,6vw,104px)]">
            <Lines lines={g.title} />
          </h2>
          <p data-reveal style={{'--d': '0.1s'} as CSSProperties} className="copy mt-6 max-w-[40ch] text-ink/80">
            {g.intro}
          </p>
          <img
            data-reveal
            style={{'--d': '0.16s'} as CSSProperties}
            src={p.src}
            srcSet={p.srcSet}
            sizes="(max-width: 1023px) 100vw, 38vw"
            alt=""
            loading="lazy"
            className="mt-10 aspect-[4/3] w-full object-cover max-lg:hidden"
          />
        </div>

        <ul className="divide-y divide-ink/15 border-y border-ink/15">
          {g.items.map((s, i) => (
            <li key={s.name} data-reveal style={{'--d': `${i * 0.05}s`} as CSSProperties} className="group flex flex-wrap items-baseline gap-x-6 gap-y-2 py-6">
              <div className="min-w-0 flex-1 basis-[16rem]">
                <h3 className="display text-[clamp(26px,2.3vw,36px)] leading-none">{s.name}</h3>
                {s.detail && <p className="copy mt-2 text-[15px] text-ink/70">{s.detail}</p>}
              </div>
              <p className={`caps text-[13px] tabular-nums ${s.price.startsWith('R') ? 'text-ink' : 'text-ink/65'}`}>{s.price}</p>
              <a
                href={whatsappLink(s.name)}
                target="_blank"
                rel="noopener"
                className="caps inline-flex min-h-11 items-center gap-2 border border-ink/25 px-4 transition-colors hover:border-ink hover:bg-ink hover:text-white"
              >
                Book <span className="sr-only">{s.name} on WhatsApp</span>
                <span aria-hidden>→</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

mount(
  'services',
  <>
    <PageHeader
      n="02"
      label="Services & prices"
      lines={[{t: 'The'}, {t: 'Menu.', i: true}]}
      intro="Cuts, colour, care and occasion styling. Every visit starts with a chat about what you love and what your hair needs."
      img="updo3"
      alt="Sculpted side bun with brunette balayage"
      position="50% 35%"
    />
    <div className="on-paper bg-paper px-5 text-ink md:px-12">
      <div className="mx-auto max-w-[1480px]">
        <nav aria-label="Service categories" className="flex flex-wrap gap-2 py-10">
          {services.map((g) => (
            <a key={g.id} href={`#${g.id}`} className="caps inline-flex min-h-11 items-center border border-ink/25 px-5 transition-colors hover:border-ink hover:bg-ink hover:text-white">
              {g.title.map((l) => l.t).join(' ')}
            </a>
          ))}
        </nav>
        {services.map((g, i) => (
          <Group key={g.id} g={g} n={i} />
        ))}
        <p className="copy border-t border-ink/15 py-12 text-[15px] text-ink/70">
          Prices depend on hair length and thickness, so we confirm yours at your consultation. Not sure what to book? WhatsApp us a photo and we’ll advise.
        </p>
      </div>
    </div>
  </>,
);
