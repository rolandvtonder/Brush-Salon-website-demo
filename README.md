# Brush Salon — website demo

A five-page website for [Brush Salon](https://www.facebook.com/tygerbrush/), Tyger Waterfront, Bellville:
Home, Services & prices, Gallery, Meet the team, and Contact & booking.

Built with Vite, React, TypeScript, Tailwind CSS v4 and Lenis smooth scrolling.

## Run it locally

```bash
npm install
npm run dev
```

Then open the address Vite prints (usually http://localhost:5173).

## Build for hosting

```bash
npm run build
```

Upload the `dist/` folder to any static host. Each page is its own HTML file (`/services/`, `/gallery/`, …), so no server rewrites are needed.

## Editing content

All text, prices, opening hours, team members and reviews live in `src/content.ts`. Items marked `TODO(salon)` are placeholders still to confirm with the salon. Photos are in `public/media/`.
