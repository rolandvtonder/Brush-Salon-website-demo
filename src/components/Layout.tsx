import {useCallback, useEffect, useRef, useState, type ReactNode} from 'react';
import {contact, pageUrl, whatsappLink, type PageId} from '../content';
import {useReducedMotion} from '../hooks/useReducedMotion';
import {media} from '../lib/media';
import {lockScroll, startScroll} from '../lib/scroll';
import {consumeArrival, markLeaving} from '../lib/transition';
import {Cover} from './Cover';
import {Footer} from './Footer';
import {Menu} from './Menu';

/**
 * Everything every page shares: the logo, the Menu and Book buttons, the
 * menu itself, the page-to-page wipe, the footer and the film grain.
 */
export function Layout({page, children}: {page: PageId; children: ReactNode}) {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [cover, setCover] = useState<'arriving' | 'leaving' | 'idle'>(() => (consumeArrival() ? 'arriving' : 'idle'));
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => startScroll(reduced), [reduced]);
  useEffect(() => lockScroll(open), [open]);

  // The page wipe starts covered on arrival and slides away once painted.
  useEffect(() => {
    if (cover !== 'arriving') return;
    const id = window.setTimeout(() => setCover('idle'), 60);
    return () => window.clearTimeout(id);
  }, [cover]);

  const close = useCallback(() => {
    setOpen(false);
    menuButton.current?.focus();
  }, []);

  // Every same-site link leaves through the wipe instead of a hard cut.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest('a');
      if (!a || a.target || a.hasAttribute('download')) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      e.preventDefault();
      if (reduced) {
        location.href = url.href;
        return;
      }
      setCover('leaving');
      window.setTimeout(() => {
        markLeaving();
        location.href = url.href;
      }, 900);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [reduced]);

  // Coming back via the browser's back button restores a covered page from cache.
  useEffect(() => {
    const onShow = (e: PageTransitionEvent) => e.persisted && setCover('idle');
    window.addEventListener('pageshow', onShow);
    return () => window.removeEventListener('pageshow', onShow);
  }, []);

  return (
    <>
      <a href="#main" className="caps sr-only z-[70] bg-paper px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4">
        Skip to content
      </a>

      <a href={pageUrl()} className="fixed top-5 left-5 z-[55] block mix-blend-difference md:top-7 md:left-12" aria-label="Brush Salon, home">
        <img src={media('logo-white.png')} alt="" width={481} height={156} className="h-auto w-[118px] md:w-[148px]" />
      </a>

      <button
        ref={menuButton}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="site-menu"
        className={`caps fixed top-5 right-5 z-[55] flex min-h-11 cursor-pointer items-center gap-4 px-6 py-3 backdrop-blur-md transition-colors duration-500 md:top-7 md:right-8 ${
          open ? 'bg-ink text-white' : 'bg-charcoal/60 text-white hover:bg-charcoal/85'
        }`}
      >
        {open ? 'Close' : 'Menu'}
        <span aria-hidden className={`text-[16px] leading-none transition-transform duration-500 ease-silk ${open ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>

      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener"
        className={`caps fixed right-5 bottom-5 z-[55] flex min-h-11 items-center gap-3 px-7 py-3.5 shadow-[0_10px_40px_rgb(0_0_0/0.25)] transition-colors duration-500 md:right-8 md:bottom-7 ${
          open ? 'bg-sage text-ink' : 'bg-paper text-ink hover:bg-sage'
        }`}
      >
        <WhatsAppIcon />
        <span>
          Book <em className="normal-case">your visit</em>
        </span>
      </a>

      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />

      <Menu id="site-menu" open={open} current={page} onClose={close} phone={contact.phoneDisplay} />
      <Cover state={cover} />
      <div className="grain" aria-hidden />
    </>
  );
}

export function WhatsAppIcon({className = 'size-4'}: {className?: string}) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2c0 1.3 1 2.6 1.1 2.8.1.2 1.9 2.9 4.6 4 1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.1-1.2l-.5-.3Z" />
    </svg>
  );
}
