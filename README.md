# Inclusa — Inclusive Design Challenge

An adaptive accessibility platform built with React + Vite + Tailwind CSS v4 + Framer Motion + React Router.

## Run it

```
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

## Build for production

```
npm run build
npm run preview
```

## What's here

- **Landing** (`/`) — choose one of 8 user-group experiences (Elderly, Visual Accessibility,
  Deaf/Hard of Hearing, Neurodivergent, Low-Income Community, Refugee/Migrant, Mobility Support,
  Rural/Low Connectivity).
- **Onboarding** (`/onboarding`) — 3-step preference flow.
- **Dashboard** (`/dashboard`) — adaptive widget engine: each profile shows a different set and
  order of widgets, driven by `src/data/profiles.js` + `src/data/widgetContent.js`.
- **Assistant** (`/assistant`) — mock AI companion with resource-aware replies.
- **Find Support** (`/resources`, `/resources/:id`) — searchable/filterable resource directory
  with a simulated map.
- **Emergency** (`/emergency`) — confirm-before-acting emergency actions.
- **Accessibility Center** (`/accessibility`) — text size, contrast, motion, voice, captions,
  low-data — all apply live via `ProfileContext`.
- **Community** (`/community`), **Profile** (`/profile`, includes a judge Demo Mode to switch
  profiles live), **Impact** (`/impact`), plus `/voice`, `/focus`, `/languages`.

## Where the "adaptive engine" actually lives

- `src/data/profiles.js` — one config object per user group: default accessibility settings,
  which nav items show, and which dashboard widgets appear, in what order.
- `src/context/ProfileContext.jsx` — holds the selected profile + accessibility state, persists
  to `localStorage`, and applies CSS variables/classes (`--profile-hue`, `--base-font-scale`,
  `.reduce-motion`, `.high-contrast`) to the document root so the whole app responds.
- `src/components/common/AdaptiveMark.jsx` — the signature brand mark; its stroke weight and
  rotation are literally driven by the current profile's accessibility settings.

## Notes

- All data (resources, community posts, impact numbers) is realistic mock data — no backend.
- Built to a working core rather than every route in the original brief; extending a new
  profile-specific page just means adding a route + a widget entry, the adaptive plumbing
  is already there.
