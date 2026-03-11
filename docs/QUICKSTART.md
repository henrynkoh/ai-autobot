# Quickstarter — AFH Conversion Planner

Get from zero to a completed plan snapshot in under 5 minutes.

## 1. Run the app

```bash
cd afh-planner
npm install
npm run dev
```

Open **http://localhost:3000** in your browser.

## 2. Complete the 4 steps

| Step | What to enter | Tip |
|------|----------------|-----|
| **1 – Property** | MLS number and/or full address | At least one is required. |
| **2 – Location** | City and county | Use the actual permit jurisdiction. |
| **3 – Goals** | 30-day focus and 12-month outcome | One or both; be specific. |
| **4 – Profile** | Role (Provider / Investor / Agent), knowledge level, communities | Affects how the “agent cluster” would respond. |

Use **Back** and **Next step** as needed. On step 4, click **Launch AFH agent cluster**.

## 3. Use the result

- **Agent Cluster Overview** (right panel): Shows how CTO, UX, Dev, and Compliance would use your inputs. In a full setup, this would trigger real agents.
- **Draft plan snapshot**: Summarizes all your inputs. Copy or export this to share with your team, permit expeditor, or automation.

## Optional: Deploy

```bash
npm run build
npm run start
```

Or deploy to [Vercel](https://vercel.com) by connecting your repo and using the default Next.js settings.

---

Next: [Manual](MANUAL.md) · [Tutorial](TUTORIAL.md)
