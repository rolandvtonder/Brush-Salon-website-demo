import {contact, hours, nav, whatsappLink} from '../content';
import {media} from '../lib/media';

export function Footer() {
  return (
    <footer className="relative bg-ink px-5 pt-20 pb-28 text-white md:px-12 md:pb-12">
      <div className="mx-auto grid max-w-[1480px] gap-12 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <img src={media('logo-white.png')} alt="Brush Salon" width={481} height={156} loading="lazy" className="h-auto w-[200px]" />
          <p className="copy mt-6 max-w-[34ch] text-[15px] text-white/70">A salon with an extra special feel. Our job is done if you feel beautiful and blessed when you leave.</p>
        </div>

        <div>
          <h2 className="caps text-white/55">Visit</h2>
          <address className="copy mt-3 text-[15px] text-white/85 not-italic">
            {contact.address.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </address>
        </div>

        <div>
          <h2 className="caps text-white/55">Hours</h2>
          <p className="copy mt-3 text-[15px] text-white/85">
            Tuesday – Saturday
            <br />
            {hours[2].time}
            <br />
            <span className="text-white/60">Sunday & Monday closed</span>
          </p>
        </div>

        <div>
          <h2 className="caps text-white/55">Contact</h2>
          <ul className="copy mt-3 space-y-1 text-[15px] text-white/85">
            <li>
              <a href={contact.phoneHref} className="hover:text-sage">{contact.phoneDisplay}</a>
            </li>
            <li>
              <a href={whatsappLink()} target="_blank" rel="noopener" className="hover:text-sage">WhatsApp us</a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="break-all hover:text-sage">{contact.email}</a>
            </li>
            <li>
              <a href={contact.instagram.href} target="_blank" rel="noopener" className="hover:text-sage">Instagram</a>
              {' · '}
              <a href={contact.facebook.href} target="_blank" rel="noopener" className="hover:text-sage">Facebook</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-[1480px] flex-col gap-4 border-t border-white/15 pt-6 md:flex-row md:items-center md:justify-between">
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {nav.map((n) => (
              <li key={n.id}>
                <a href={n.href} className="caps text-white/70 hover:text-white">{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="caps text-white/50">© {new Date().getFullYear()} Brush Salon · Tyger Waterfront</p>
      </div>
    </footer>
  );
}
