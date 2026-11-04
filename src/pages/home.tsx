import type {CSSProperties} from 'react';
import {Eyebrow} from '../components/Headline';
import {Hero} from '../components/Hero';
import {Pillars} from '../components/Pillars';
import {WhatsAppIcon} from '../components/Layout';
import {brand, contact, gallery, pageUrl, reviews, whatsappLink} from '../content';
import {useReveals} from '../hooks/useReveals';
import {media, photo} from '../lib/media';
import {mount} from './mount';

function Story() {
  const ref = useReveals<HTMLElement>();
  return (
    <section ref={ref} className="on-paper bg-paper px-5 py-24 text-ink md:px-12 md:py-36">
      <div className="mx-auto grid max-w-[1480px] items-end gap-14 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <Eyebrow n="01" className="text-ink/60" >
            The salon
          </Eyebrow>
          <h2 data-reveal className="display mt-6 text-[clamp(48px,6.4vw,112px)]">
            A salon with an
            <span className="it block">extra special</span>
            feel.
          </h2>
          <div data-reveal style={{'--d': '0.12s'} as CSSProperties} className="copy mt-10 max-w-[52ch] space-y-5 text-ink/80">
            <p>
              Tucked into the Tyger Quays building on the Tyger Waterfront, Brush is all sage-green walls, warm wood, fresh flowers and coffee on the go. Clients
              have called it more than a salon: a sanctuary.
            </p>
            <p>{brand.promise}</p>
          </div>
          <a data-reveal style={{'--d': '0.2s'} as CSSProperties} href={pageUrl('team/')} className="caps mt-10 inline-flex min-h-11 items-center gap-3 border-b border-ink/40 pb-1 hover:border-ink">
            Meet the team <span aria-hidden>→</span>
          </a>
        </div>
        <figure data-reveal style={{'--d': '0.1s'} as CSSProperties} className="relative">
          <img
            src={media('entrance-wide-1600.webp')}
            alt="Melda and Salome smiling at the glass entrance of Brush"
            width={1440}
            height={770}
            loading="lazy"
            className="aspect-[4/3] w-full object-cover object-[50%_30%]"
          />
          <figcaption className="caps mt-3 text-ink/60">Melda & Salome at the door</figcaption>
        </figure>
      </div>
    </section>
  );
}

function Reviews() {
  const ref = useReveals<HTMLElement>();
  return (
    <section ref={ref} className="on-paper bg-sage px-5 py-24 text-ink md:px-12 md:py-32">
      <div className="mx-auto max-w-[1480px]">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Eyebrow n="02" className="text-ink/70">
              Kind words
            </Eyebrow>
            <p data-reveal className="display mt-6 text-[clamp(88px,13vw,220px)] leading-[0.8]">
              {reviews.score}
            </p>
            <p data-reveal className="caps mt-4 text-ink/80">{reviews.summary}</p>
          </div>
          <a href={contact.facebook.href} target="_blank" rel="noopener" className="caps inline-flex min-h-11 items-center gap-3 self-start border-b border-ink/40 pb-1 hover:border-ink md:self-end">
            Read reviews on Facebook <span aria-hidden>↗</span>
          </a>
        </div>
        <ul className="mt-16 grid gap-[3px] md:grid-cols-3">
          {reviews.items.slice(0, 3).map((r, i) => (
            <li key={r.name} data-reveal style={{'--d': `${i * 0.1}s`} as CSSProperties} className="bg-paper/55 p-8 md:p-10">
              <blockquote>
                <p className="display it text-[clamp(24px,2vw,32px)] leading-[1.1] normal-case">“{r.quote}”</p>
                <footer className="caps mt-8 text-ink/70">{r.name}</footer>
              </blockquote>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function GalleryTeaser() {
  const ref = useReveals<HTMLElement>();
  const picks = gallery.slice(0, 4);
  return (
    <section ref={ref} className="bg-ink px-5 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1480px]">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow n="03" className="text-white/60">
              Recent work
            </Eyebrow>
            <h2 data-reveal className="display mt-6 text-[clamp(48px,6.4vw,112px)]">
              Fresh from <span className="it">the chair</span>
            </h2>
          </div>
          <a href={pageUrl('gallery/')} className="caps inline-flex min-h-11 items-center gap-3 self-start border-b border-white/40 pb-1 hover:border-white md:self-end">
            See the gallery <span aria-hidden>→</span>
          </a>
        </div>
        <ul className="mt-14 grid grid-cols-2 gap-[3px] md:grid-cols-4">
          {picks.map((g, i) => {
            const p = photo(g.src);
            return (
              <li key={g.src} data-reveal style={{'--d': `${i * 0.08}s`} as CSSProperties} className={i % 2 ? 'md:mt-16' : ''}>
                <img src={p.src} srcSet={p.srcSet} sizes="(max-width: 767px) 50vw, 25vw" alt={g.alt} loading="lazy" className="aspect-[3/4] w-full object-cover" />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function Visit() {
  const ref = useReveals<HTMLElement>();
  return (
    <section ref={ref} className="on-paper relative overflow-hidden bg-paper px-5 py-24 text-ink md:px-12 md:py-36">
      <div className="mx-auto grid max-w-[1480px] gap-14 lg:grid-cols-[1.3fr_1fr] lg:items-end">
        <div>
          <Eyebrow n="04" className="text-ink/60">
            Visit us
          </Eyebrow>
          <h2 data-reveal className="display mt-6 text-[clamp(56px,8vw,140px)]">
            Book your
            <span className="it block md:pl-[1.2em]">next visit.</span>
          </h2>
        </div>
        <div data-reveal style={{'--d': '0.12s'} as CSSProperties}>
          <p className="copy text-ink/80">
            Open Tuesday to Saturday, 09:00 – 17:00, at {contact.address[1]}, Bellville. Send us a WhatsApp and we’ll find you a spot.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={whatsappLink()} target="_blank" rel="noopener" className="caps inline-flex min-h-12 items-center gap-3 bg-ink px-7 py-3.5 text-white transition-colors hover:bg-moss">
              <WhatsAppIcon /> WhatsApp {contact.phoneDisplay}
            </a>
            <a href={pageUrl('contact/')} className="caps inline-flex min-h-12 items-center gap-3 border border-ink/30 px-7 py-3.5 transition-colors hover:border-ink">
              Directions & hours
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

mount(
  'home',
  <>
    <Hero />
    <Pillars />
    <Story />
    <Reviews />
    <GalleryTeaser />
    <Visit />
  </>,
);
