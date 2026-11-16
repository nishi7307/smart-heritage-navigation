# HeritageWay — Smart Heritage Navigation

A Next.js + React + TypeScript student project prototype for exploring Indian heritage destinations and comparing crowd-aware route options.

## Added in this version
- Login and registration pages.
- Visitor dashboard with demo sign-in and sign-out.
- Explore page with searchable destination cards.
- Clickable destination cards that open a full detail page.
- Landmark information panels: click a landmark to reveal its description.
- Destination map using Leaflet and OpenStreetMap.
- Route planner with balanced, least-crowded and shortest-route preferences.
- Alerts and visitor reminders page.
- About page and responsive navigation.
- Existing PostgreSQL + Prisma schema and seed data retained.

## Run locally
Requires Node.js 20.9+.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Demo login
The login and registration pages are frontend demonstrations. Enter any valid email address and a password of at least 6 characters. Registration also asks for a name. The display name is stored in browser localStorage so the dashboard can greet the visitor.

**Important:** This is not production authentication. Passwords are not securely stored or verified. Before real deployment, integrate Auth.js or another secure authentication provider, hash passwords on the server, add role-based access control, and protect server APIs.

## Data and map limitations
Crowd values, route distances, walking times and safety scores are sample data. The map markers show approximate site centres, not verified internal walking paths. Live crowd sensing, official opening hours, current closures, verified routes and site-authority data must be integrated before real-world use.

## Database
Optional PostgreSQL setup:
1. Create a PostgreSQL database.
2. Copy `.env.example` to `.env` and update `DATABASE_URL`.
3. Run:

```bash
npx prisma generate
npx prisma migrate dev --name init
npm run db:seed
```

## Main routes
- `/` — Home
- `/login` — Login
- `/register` — Register
- `/dashboard` — Visitor dashboard
- `/explore` — Browse heritage sites
- `/sites/[slug]` — Destination details and clickable landmarks
- `/planner` — Route planner
- `/alerts` — Visitor alerts
- `/about` — About the project


## Latest update
- Added a sign-in gate: visitors must sign in or register before opening the home page, explore pages, destination pages, route planner, alerts or dashboard.
- Added ten more Indian destinations: India Gate, Amer Fort, Mysore Palace, Konark Sun Temple, Ajanta Caves, Ellora Caves, Khajuraho, Charminar, Victoria Memorial and Sanchi Stupa.
- Each destination now has an image URL, location details, visitor points and sample route options.
- Demo sign-in remains browser-local only. It is a UI prototype, not secure authentication; use Auth.js or another server-side authentication system for production.
- Destination photos are loaded from Unsplash URLs and therefore require an internet connection. Verify image rights and replace with licensed/owned images before public deployment.
