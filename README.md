# Barbar Charity — Angular + NestJS

A charity website inspired by the Barbar Charity layout, built with **Angular 17** (RTL Arabic) and **NestJS 10**.

## Structure

```
Barbar/
├── backend/          NestJS API (projects, campaigns, news, stats, donations, contact)
└── frontend/         Angular standalone app with RTL layout
```

## Prerequisites

- Node.js 18+ and npm 9+

## Install

From the repo root:

```bash
npm run install:all
```

Or install each app separately:

```bash
cd backend && npm install
cd ../frontend && npm install
```

## Run (development)

Open two terminals.

**Terminal 1 — backend (port 3000):**
```bash
npm run dev:backend
```

**Terminal 2 — frontend (port 4200):**
```bash
npm run dev:frontend
```

Then open `http://localhost:4200`.

## API endpoints

Base URL: `http://localhost:3000/api`

| Method | Path                  | Description                |
|--------|-----------------------|----------------------------|
| GET    | `/projects`           | List all projects          |
| GET    | `/projects/:slug`     | Get one project            |
| GET    | `/campaigns`          | List donation campaigns    |
| GET    | `/campaigns/featured` | Featured campaigns only    |
| GET    | `/news`               | List news articles         |
| GET    | `/news/:slug`         | Get one article            |
| GET    | `/stats`              | Impact statistics          |
| POST   | `/donations`          | Create a donation          |
| POST   | `/contact`            | Submit a contact message   |

## Build for production

```bash
npm run build:backend     # output: backend/dist
npm run build:frontend    # output: frontend/dist/barbar
```

Run the backend in production:

```bash
node backend/dist/main.js
```

Serve the frontend `dist/barbar/browser` folder behind any static server (nginx, Caddy) and proxy `/api` to the NestJS port.

## Pages

- `/`         — Home (hero slider, donation hub, projects, stats, news, sponsors)
- `/about`    — About / vision / board
- `/projects` — Projects grid with progress bars
- `/news`     — News archive
- `/donate`   — Donation form with campaign picker
- `/contact`  — Contact form

## Customizing

- **Colors / typography**: `frontend/src/styles/global.scss` (CSS variables at the top)
- **Navigation links**: `frontend/src/app/layout/header/header.component.ts`
- **Seed data** (mock projects, campaigns, news, stats): inside each NestJS service file under `backend/src/modules/*`
- **API base URL**: `frontend/src/environments/environment.ts`

## Notes

- The design is *inspired by* the reference site's section structure — all copy and assets are original placeholders. Replace logo, images, IBAN, contact info, and statistics with your real data before publishing.
- Backend currently uses in-memory data. Wire it to a database (TypeORM/Prisma + Postgres or MongoDB) and add real payment integration (Benefit, Stripe, etc.) before going live.
