import type {CSSProperties} from 'react';
import {Eyebrow} from '../components/Headline';
import {PageHeader} from '../components/PageHeader';
import {WhatsAppIcon} from '../components/Layout';
import {team, whatsappLink} from '../content';
import {useInView} from '../hooks/useInView';
import {useReveals} from '../hooks/useReveals';
import {media} from '../lib/media';
import {mount} from './mount';

const tints = ['#38353c', '#5f6b55', '#8a6444', '#38353c', '#5f6b55'];

/** The stylists as tall panels that slide in from the right one after another. */
function Panels() {
  const [root, shown] = useInView<HTMLElement>(0.15);
  return (
    <section ref={root} className="bg-ink" aria-label="The team">
      <ul className="grid gap-[3px] overflow-hidden md:grid-cols-2 xl:grid-cols-5">
        {team.map((m, i) => (
          <li
            key={m.id}
            className={`relative h-[82svh] min-h-[520px] overflow-hidden transition-transform duration-[1100ms] ease-wipe xl:h-[88svh] ${
              shown ? 'translate-x-0' : 'translate-x-[calc(100%_+_100vw)]'
            } ${i === team.length - 1 ? 'md:max-xl:col-span-2' : ''}`}
            style={{transitionDelay: `${0.1 + i * 0.13}s`, background: tints[i]} as CSSProperties}
          >
            {m.img ? (
              <img src={media(`${m.img}.webp`)} alt={`${m.name}, ${m.role}`} loading="lazy" className="absolute inset-0 h-full w-full object-cover" style={{objectPosition: m.pos ?? '50% 15%'}} />
            ) : (
              <span aria-hidden className="display it absolute inset-0 flex items-center justify-center text-[clamp(180px,22vw,320px)] text-white/15">
                {m.name[0]}
              </span>
            )}
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgb(34_31_36/0.85),rgb(34_31_36/0.15)_50%,transparent)]" />
            <div className="absolute inset-x-0 bottom-0 p-7 md:p-8">
              <p className="caps text-white/75">{m.role}</p>
              <h2 className="display mt-2 text-[clamp(44px,3.6vw,64px)] text-white">{m.name}</h2>
              <p className={`copy mt-4 max-w-[34ch] text-[15px] text-white/85 transition-opacity delay-[1300ms] duration-700 ${shown ? 'opacity-100' : 'opacity-0'}`}>
                {m.bio}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Together() {
  const ref = useReveals<HTMLElement>();
  return (
    <section ref={ref} className="on-paper bg-paper px-5 py-24 text-ink md:px-12 md:py-32">
      <div className="mx-auto grid max-w-[1480px] items-center gap-14 lg:grid-cols-2">
        <img
          data-reveal
          src={media('entrance-wide-1600.webp')}
          alt="Melda and Salome at the salon entrance"
          width={1440}
          height={770}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover object-[50%_30%]"
        />
        <div>
          <Eyebrow className="text-ink/60">
            The Brush family
          </Eyebrow>
          <h2 data-reveal className="display mt-6 text-[clamp(48px,5.6vw,96px)]">
            Warm, professional
            <span className="it block">and on your side.</span>
          </h2>
          <p data-reveal style={{'--d': '0.1s'} as CSSProperties} className="copy mt-8 max-w-[48ch] text-ink/80">
            Clients come back to the same chair for years. Ask for your favourite stylist when you book, or tell us what you’d like done and we’ll match you with
            the right hands.
          </p>
          <a
            data-reveal
            style={{'--d': '0.16s'} as CSSProperties}
            href={whatsappLink()}
            target="_blank"
            rel="noopener"
            className="caps mt-10 inline-flex min-h-12 items-center gap-3 bg-ink px-7 py-3.5 text-white transition-colors hover:bg-moss"
          >
            <WhatsAppIcon /> Book with the team
          </a>
        </div>
      </div>
    </section>
  );
}

mount(
  'team',
  <>
    <PageHeader
      n="04"
      label="Meet the team"
      lines={[{t: 'In great'}, {t: 'Hands.', i: true}]}
      intro="The people behind the chairs: stylists who love spoiling you and genuinely care about every client."
      img="bridalParty"
      alt="A bride and two bridesmaids smiling, all styled by the Brush team"
      position="50% 30%"
    />
    <Panels />
    <Together />
  </>,
);
