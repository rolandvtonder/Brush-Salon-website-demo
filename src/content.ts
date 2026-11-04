/**
 * All copy lives here, taken from the Brush Facebook page and posts.
 * Anything marked TODO is a placeholder for the salon to confirm.
 */

export const brand = {
  name: 'Brush',
  tagline: 'A salon with an extra special feel',
  promise: 'Our job is done if you feel beautiful and blessed when you leave.',
};

export const contact = {
  phoneDisplay: '084 941 5455',
  phoneHref: 'tel:+27849415455',
  whatsapp: '27849415455',
  email: 'brushtygerwaterfront@gmail.com',
  address: ['Tyger Quays building, section 6', 'Tyger Waterfront, Carl Cronje Drive', 'Bellville, Cape Town'],
  mapQuery: 'Tyger Quays, Carl Cronje Drive, Tyger Waterfront, Bellville',
  instagram: {handle: '@brushtygerwaterfront', href: 'https://www.instagram.com/brushtygerwaterfront/'},
  facebook: {handle: 'facebook.com/tygerbrush', href: 'https://www.facebook.com/tygerbrush/'},
};

/** Opening hours, Sunday first to line up with Date.getDay(). */
export const hours: {day: string; time: string | null}[] = [
  {day: 'Sunday', time: null},
  {day: 'Monday', time: null},
  {day: 'Tuesday', time: '09:00 – 17:00'},
  {day: 'Wednesday', time: '09:00 – 17:00'},
  {day: 'Thursday', time: '09:00 – 17:00'},
  {day: 'Friday', time: '09:00 – 17:00'},
  {day: 'Saturday', time: '09:00 – 17:00'},
];

/** A WhatsApp chat with the salon, optionally about a specific service. */
export const whatsappLink = (service?: string) =>
  `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
    service ? `Hi Brush, I'd like to book: ${service}.` : `Hi Brush, I'd like to book an appointment.`,
  )}`;

/** A page address under the site's base path (`/` locally, `/Brush-Salon-website-demo/` on GitHub Pages). */
export const pageUrl = (path = '') => `${import.meta.env.BASE_URL}${path}`;

export type PageId = 'home' | 'services' | 'gallery' | 'team' | 'contact';

export const nav: {id: PageId; label: string; href: string}[] = [
  {id: 'home', label: 'Home', href: pageUrl()},
  {id: 'services', label: 'Services & prices', href: pageUrl('services/')},
  {id: 'gallery', label: 'Gallery', href: pageUrl('gallery/')},
  {id: 'team', label: 'Meet the team', href: pageUrl('team/')},
  {id: 'contact', label: 'Contact & booking', href: pageUrl('contact/')},
];

/** Headline lines; `i` lines are set in italic. */
export type Line = {t: string; i?: boolean};

export const hero = {
  lines: [{t: 'Walk in as'}, {t: 'You.', i: true}, {t: 'Leave feeling'}, {t: 'Blessed.', i: true}] as Line[],
  body: 'A salon with an extra special feel at Tyger Waterfront, Bellville. Cuts, colour, bridal styling and treatments from a team who genuinely care.',
  slides: [
    {src: 'updoCurly', alt: 'Soft curled updo styled at the Brush salon chair'},
    {src: 'updo1', alt: 'Twisted low bun with blonde balayage, in front of the salon’s green chalk wall'},
    {src: 'bride', alt: 'Bride with a soft copper bob holding a wild-flower bouquet'},
    {src: 'bridalParty', alt: 'A bride and her bridesmaids, all styled by Brush'},
  ],
};

/** The three tall panels on the home page, one per kind of visit. */
export const pillars = [
  {id: 'cut-colour', name: ['Cut &', 'Colour'], note: 'Cuts, foils, balayage and root touch-ups', img: 'updo3', tint: '#38353c'},
  {id: 'bridal', name: ['Bridal &', 'Styling'], note: 'Updos, bridal parties and make-up', img: 'bride', tint: '#5f6b55'},
  {id: 'treatments', name: ['Care &', 'Treatments'], note: 'Hair Botox for frizz-free, healthy hair', img: 'updoCurly', tint: '#8a6444'},
];

export type Service = {name: string; detail?: string; price: string};
export type ServiceGroup = {id: string; title: Line[]; intro: string; img: string; items: Service[]};

// TODO(salon): only the Hair Botox and manicure prices were published on
// Facebook. Replace "On consultation" with real prices when available.
export const services: ServiceGroup[] = [
  {
    id: 'cut-colour',
    title: [{t: 'Cut &'}, {t: 'Colour', i: true}],
    intro: 'Precision cuts and colour that suits your skin, your style and your routine.',
    img: 'updo3',
    items: [
      {name: 'Cut & blow-dry', detail: 'Consultation, wash, cut and finish', price: 'On consultation'},
      {name: 'Wash & blow-dry', price: 'On consultation'},
      {name: 'Full colour', detail: 'Permanent colour, root to tip', price: 'On consultation'},
      {name: 'Root touch-up', price: 'On consultation'},
      {name: 'Foil highlights', detail: 'Half or full head', price: 'On consultation'},
      {name: 'Balayage', detail: 'Hand-painted, soft grow-out', price: 'On consultation'},
    ],
  },
  {
    id: 'treatments',
    title: [{t: 'Care &'}, {t: 'Treatments', i: true}],
    intro: 'Your hair deserves the best care. Hair Botox smooths frizz and leaves hair healthy and glossy.',
    img: 'updoCurly',
    items: [
      {name: 'Hair Botox · short', detail: 'Frizz-free, healthy hair', price: 'R450'},
      {name: 'Hair Botox · medium', detail: 'Frizz-free, healthy hair', price: 'R600'},
      {name: 'Hair Botox · long', detail: 'Frizz-free, healthy hair', price: 'R750'},
      {name: 'Deep conditioning treatment', price: 'On consultation'},
    ],
  },
  {
    id: 'bridal',
    title: [{t: 'Bridal &'}, {t: 'Styling', i: true}],
    intro: 'From the bride to the whole bridal party: soft updos, glamorous curls and make-up for your big day.',
    img: 'bridalParty',
    items: [
      {name: 'Bridal hair', detail: 'Includes a trial', price: 'On consultation'},
      {name: 'Bridesmaid & guest styling', price: 'On consultation'},
      {name: 'Updo or event styling', price: 'On consultation'},
      {name: 'Make-up', detail: 'Bridal or occasion', price: 'On consultation'},
    ],
  },
  {
    id: 'nails',
    title: [{t: 'Hands &'}, {t: 'Nails', i: true}],
    intro: 'A little extra spoiling while you are with us.',
    img: 'nails',
    items: [{name: 'Mini manicure', detail: 'Promotion', price: 'R100'}],
  },
];

/** `pos` is the portrait's focal point, so faces stay in the narrow panels. */
export type Member = {id: string; name: string; role: string; bio: string; img?: string; pos?: string};

export const team: Member[] = [
  {id: 'salome', name: 'Salome', role: 'Owner & brand ambassador', bio: 'Passionate owner of Brush, dedicated to bringing you flawless hair and expert care.', img: 'team-salome', pos: '68% 20%'},
  {id: 'melda', name: 'Melda', role: 'Salon manager', bio: 'Our hair-care expert, making sure every client leaves with healthy, gorgeous hair.', img: 'team-melda', pos: '62% 10%'},
  {id: 'lenacia', name: 'Lenacia', role: 'Master stylist', bio: 'Loves spoiling clients and sharing expert tips for flawless hair.', img: 'team-lenacia'},
  {id: 'bridget', name: 'Bridget', role: 'Stylist', bio: 'Known for top-tier service and five-star reviews, because excellence is her standard.', img: 'team-bridget'},
  // TODO(salon): add Jamilla's photo and role.
  {id: 'jamilla', name: 'Jamilla', role: 'Stylist', bio: 'Part of the Brush family, and the hands you are in when you sit in her chair.'},
];

export const reviews = {
  score: '96%',
  summary: 'of 32 Facebook reviewers recommend Brush',
  items: [
    {name: 'Corine du Toit', quote: 'What an awesome hair salon! You feel like a queen when you walk out of there (spoils galore)! Salome is a master stylist. I adore my new cut and color. Everyone there is super warm and friendly.'},
    {name: 'Kelbi Nell', quote: 'Brush Salon has been my family’s go-to salon for many years, and we would not trust anyone else with our hair. They are more than just a salon, Brush is a sanctuary.'},
    {name: 'Clem Donian', quote: 'I have been a client of Salome for many years and love her and her team’s dedication, skill and service. BRUSH always reminds me of what great service should be.'},
    {name: 'Lize Tommey', quote: 'Thank you Salome and the BRUSH team for making me feel amazing! Love my new look and will see you soon.'},
    {name: 'Leandre Pentz', quote: 'Ongelooflike diens! Vandag was ek weer so bederf en mooi gemaak. Duisend dankies vir jou omgee hart.'},
  ],
};

export const gallery: {src: string; alt: string; tag: string}[] = [
  {src: 'updo1', alt: 'Twisted low bun with blonde balayage', tag: 'Updo'},
  {src: 'bride', alt: 'Bride with a soft copper bob and wild-flower bouquet', tag: 'Bridal'},
  {src: 'updoCurly', alt: 'Soft curled updo with loose face-framing pieces', tag: 'Updo'},
  {src: 'bridalParty', alt: 'A bride and two bridesmaids smiling together', tag: 'Bridal'},
  {src: 'updo2', alt: 'Low chignon with caramel balayage', tag: 'Colour'},
  {src: 'makeup', alt: 'Glamour make-up being applied to a client with voluminous curls', tag: 'Make-up'},
  {src: 'updo3', alt: 'Sculpted side bun with brunette balayage', tag: 'Colour'},
  {src: 'updo4', alt: 'Romantic low updo with soft waves', tag: 'Updo'},
  {src: 'updo5', alt: 'Side view of a low twisted bun', tag: 'Updo'},
  {src: 'entrance-wide', alt: 'Melda and Salome at the entrance of the salon', tag: 'Salon'},
];
