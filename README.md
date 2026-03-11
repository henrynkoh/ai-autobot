# AFH Conversion Planner

A Next.js app that helps **providers, investors, and real estate agents** create practical, realistic **Adult Family Home (AFH) conversion plans** for a given property or MLS number. It guides you through property context, city/county permitting, goals, and your experience level—then prepares a structured “plan snapshot” ready for an AI agent cluster (Popebot-style) to produce conversion plans, drawings, permit strategies, and WABO/inspection roadmaps.

## What it does

- **4-step wizard**: Property/MLS → City & county → Goals & timelines → Your role & AFH knowledge
- **Role-aware**: Tailors language and focus for **AFH providers**, **investors**, or **real estate agents**
- **Agent cluster panel**: Simulates a CTO, UX, Dev, and Compliance “team” that would use your inputs to draft plans (ready to wire to real agents via webhooks or GitHub)
- **Plan snapshot**: One-page summary of everything you entered—ideal to hand off to consultants, permit expeditors, or automation

## Quick start

```bash
cd afh-planner
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The **home page** is a landing page with a left sidebar (scrollable nav to all sections) and a **GitHub** link on the bottom right. The **planner wizard** is at [/planner](http://localhost:3000/planner). To point the GitHub button to your repo, set `NEXT_PUBLIC_GITHUB_REPO_URL` (e.g. `https://github.com/your-org/afh-planner`).

- **Full setup**: See [QUICKSTART.md](docs/QUICKSTART.md)  
- **User manual**: [docs/MANUAL.md](docs/MANUAL.md)  
- **Step-by-step tutorial**: [docs/TUTORIAL.md](docs/TUTORIAL.md)  
- **Marketing copy**: [docs/ads/](docs/ads/) — Facebook, Instagram, Threads, Blogger, Naver Blog, Tistory, WordPress, newsletter, email

## Tech stack

- **Next.js 16** (App Router)
- **React 19**, **TypeScript**, **Tailwind CSS**

## Scripts

| Command       | Description              |
|--------------|--------------------------|
| `npm run dev`  | Start dev server (port 3000) |
| `npm run build`| Production build         |
| `npm run start`| Start production server  |
| `npm run lint` | Run ESLint               |

## Inspiration

Workflow and “cluster” concept are inspired by [Popebot](https://youtube.com/watch?v=Kqk_i1rkWgg)—using AI agents (CTO, UX, Developer, Compliance) that collaborate via shared context. This app collects that context so you can later plug it into GitHub labels, webhooks, or file-based triggers.

## License

Private / use as you like.
