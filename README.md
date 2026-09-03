# Wedding Invitation Website

A premium, cinematic wedding invitation website built with React, Vite, and Framer Motion.

## Features

- **Cinematic Hero Section** - Full-screen opening with elegant typography and smooth animations
- **Date Reveal** - Dramatic date presentation with scroll-triggered animations
- **Save the Date** - Beautiful invitation section with emotional messaging
- **Invitation Story** - Editorial section with Bible verse
- **Couple Introduction** - Elegant presentation of bride and groom with parent information
- **Wedding Details** - Clean ceremony and reception information
- **Venue Section** - Immersive venue display with Google Maps integration
- **Dress Code** - Color palette presentation with interactive swatches
- **Final Section** - Closing message with cinematic imagery
- **Music Control** - Elegant audio player with user-initiated playback
- **Minimal Navigation** - Discreet navigation that adapts on scroll
- **Scroll Animations** - Smooth, cinematic animations throughout
- **Mobile-First Design** - Optimized for all screen sizes
- **Performance Optimized** - Lazy loading for images, efficient animations

## Customization

All wedding information is centralized in `src/data/weddingData.js`:

```javascript
export const weddingData = {
  bride: { firstName, lastName, parents },
  groom: { firstName, lastName, parents },
  weddingDate: { day, month, year, fullDate, time },
  ceremony: { venue, address, city, state },
  reception: { venue, location, address },
  mapUrl: "Google Maps URL",
  dressCode: { title, description, colors },
  bibleVerse: { text, reference },
  images: { hero, couple, bride, groom, venue, final },
  music: { url, title },
  navigation: [...]
};
```

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Technologies

- React 19
- Vite
- Framer Motion
- Google Fonts (Cormorant Garamond, Great Vibes, Inter)

## Design Philosophy

This website follows a luxury editorial aesthetic with:
- Warm ivory and champagne color palette
- Elegant serif typography for headings
- Script typography for romantic accents
- Generous whitespace
- Cinematic photography
- Smooth, subtle animations
- Mobile-first responsive design
