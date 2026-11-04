import type {CSSProperties} from 'react';
import {Eyebrow} from '../components/Headline';
import {PageHeader} from '../components/PageHeader';
import {WhatsAppIcon} from '../components/Layout';
import {contact, hours, whatsappLink} from '../content';
import {useReveals} from '../hooks/useReveals';
import {mount} from './mount';

// Monday first reads naturally in a week table.
const week = [...hours.slice(1), hours[0]];

function Details() {
  const ref = useReveals<HTMLElement>();
  const today = hours[new Date().getDay()].day;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(contact.mapQuery)}&output=embed`;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(contact.mapQuery)}`;

  return (
    <section ref={ref} className="on-paper bg-paper px-5 py-20 text-ink md:px-12 md:py-28">
      <div className="mx-auto grid max-w-[1480px] gap-[3px] lg:grid-cols-3">
        <div data-reveal className="bg-ink p-8 text-white md:p-10">
          <Eyebrow className="text-white/65">Book</Eyebrow>
          <h2 className="display mt-5 text-[clamp(44px,4vw,68px)]">
            Message <span className="it">us</span>
          </h2>
          <p className="copy mt-5 text-[15px] text-white/80">The quickest way to book is WhatsApp. Tell us what you’d like done and when suits you.</p>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener"
            className="caps mt-8 flex min-h-12 items-center justify-center gap-3 bg-paper px-6 py-3.5 text-ink transition-colors hover:bg-sage"
          >
            <WhatsAppIcon /> WhatsApp {contact.phoneDisplay}
          </a>
          <div className="mt-8 space-y-4 border-t border-white/15 pt-6">
            <p>
              <span className="caps block text-white/60">Call</span>
              <a href={contact.phoneHref} className="copy hover:text-sage">
                {contact.phoneDisplay}
              </a>
            </p>
            <p>
              <span className="caps block text-white/60">Email</span>
              <a href={`mailto:${contact.email}`} className="copy break-all hover:text-sage">
                {contact.email}
              </a>
            </p>
            <p>
              <span className="caps block text-white/60">Follow</span>
              <a href={contact.instagram.href} target="_blank" rel="noopener" className="copy hover:text-sage">
                Instagram
              </a>
              <span className="text-white/40"> · </span>
              <a href={contact.facebook.href} target="_blank" rel="noopener" className="copy hover:text-sage">
                Facebook
              </a>
            </p>
          </div>
        </div>

        <div data-reveal style={{'--d': '0.08s'} as CSSProperties} className="bg-sand p-8 md:p-10">
          <Eyebrow className="text-ink/65">Opening hours</Eyebrow>
          <h2 className="display mt-5 text-[clamp(44px,4vw,68px)]">
            Tue <span className="it">to</span> Sat
          </h2>
          <table className="copy mt-8 w-full text-[16px]">
            <caption className="sr-only">Opening hours</caption>
            <tbody>
              {week.map((h) => {
                const isToday = h.day === today;
                return (
                  <tr key={h.day} className={`border-b border-ink/15 ${isToday ? 'font-bold' : ''}`}>
                    <th scope="row" className="py-3 text-left font-[inherit]">
                      {h.day}
                      {isToday && <span className="caps ml-3 bg-ink px-2 py-0.5 text-[10px] text-white">Today</span>}
                    </th>
                    <td className={`py-3 text-right tabular-nums ${h.time ? '' : 'text-ink/60'}`}>{h.time ?? 'Closed'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div data-reveal style={{'--d': '0.16s'} as CSSProperties} className="flex flex-col bg-sage">
          <div className="p-8 md:p-10">
            <Eyebrow className="text-ink/70">Find us</Eyebrow>
            <address className="copy mt-5 text-[17px] not-italic">
              {contact.address.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
            <a
              href={directions}
              target="_blank"
              rel="noopener"
              className="caps mt-6 inline-flex min-h-11 items-center gap-3 border-b border-ink/40 pb-1 hover:border-ink"
            >
              Get directions <span aria-hidden>↗</span>
            </a>
          </div>
          <iframe
            title="Map showing Brush Salon at Tyger Quays, Tyger Waterfront, Bellville"
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="min-h-[300px] w-full flex-1 border-0 grayscale-[0.6]"
          />
        </div>
      </div>
    </section>
  );
}

mount(
  'contact',
  <>
    <PageHeader
      n="05"
      label="Contact & booking"
      lines={[{t: 'Come'}, {t: 'Visit.', i: true}]}
      intro={`Find us in the Tyger Quays building on the Tyger Waterfront. Open Tuesday to Saturday, 09:00 – 17:00.`}
      img="entrance-wide"
      alt="Melda and Salome at the salon entrance"
      position="50% 20%"
    />
    <Details />
  </>,
);
