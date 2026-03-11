# AFH Conversion Planner — User Manual

This manual describes every part of the AFH Conversion Planner: the wizard steps, the agent cluster panel, and how to use the plan snapshot.

---

## 1. Overview

The app is a **4-step wizard** that collects:

1. **Property / MLS** — What you’re converting  
2. **City & county** — Where permits and inspections happen  
3. **Goals** — What you want in 30 days and in 12 months  
4. **Profile** — Who you are (provider, investor, agent) and your AFH/code knowledge  

At the end you get a **plan snapshot** and a view of how an **agent cluster** (CTO, UX, Dev, Compliance) would use that data. The cluster is simulated in-app; you can later connect it to real AI agents (e.g. Popebot-style) via webhooks or GitHub.

---

## 2. Step 1 — Property or MLS

**Purpose:** Give the system a concrete property so any downstream plans (drawings, permits, inspections) refer to a real place.

| Field | Required | Notes |
|-------|----------|--------|
| **MLS Number** | No | Ideal if you have it (e.g. `22123456`). |
| **Property address** | No* | Full address: street, city, state. *At least one of MLS or address is required. |

**Tips:**

- If you only have an address, that’s enough.
- More detail (lot size, zoning, parking) can be added later when you connect real agents or data sources.

---

## 3. Step 2 — City & County

**Purpose:** AFH rules, WABO, fire marshal, and inspections vary by city and county. This drives permit strategy and checklist content.

| Field | Required | Notes |
|-------|----------|--------|
| **City** | Yes | Where the property is (e.g. Federal Way, Tacoma, Bellevue). |
| **County** | Yes | County for WABO, fire, and inspection expectations (e.g. King, Pierce). |

**Tips:**

- Use the jurisdiction that will issue the AFH license and conduct inspections.
- If you’re unsure, use the county assessor or tax records for the address.

---

## 4. Step 3 — Goals & Timelines

**Purpose:** So the “cluster” can prioritize: offer evaluation, licensing, build-out, refinance, marketing, etc.

| Field | Required | Notes |
|-------|----------|--------|
| **30-day focus** | No* | What would make the next 30 days a win. *At least one of 30-day or 12-month is recommended. |
| **12-month outcome** | No* | Where you want to be in a year (licensed, stabilized, sold, refinanced, etc.). |

**Examples by role:**

- **Provider:** “Validate AFH viability, rough budget, talk to city planner, get initial drawings.”  
- **Investor:** “Underwrite deal, confirm zoning, get ballpark capex and timeline.”  
- **Agent:** “Listing language, AFH buyer/seller talking points, referral to AFH specialist.”

---

## 5. Step 4 — Profile & Communities

**Purpose:** Tailors tone and depth (plain language vs. code-heavy) and surfaces relevant communities.

| Field | Required | Notes |
|-------|----------|--------|
| **Primary role** | Yes | **Provider** (operator), **Investor**, or **Real estate agent**. |
| **AFH / code knowledge** | Yes | **New to AFH**, **Some experience**, or **Very experienced / expert**. |
| **Communities, mentors, pages** | No | AFH Facebook groups, DSHS, local meetups, YouTube, etc. |

**How it’s used:**

- **Role** — Shifts focus (operations vs. returns vs. listing/buyer support).  
- **Knowledge** — New = plain language + code references; Expert = edge cases and consultant-level detail.  
- **Communities** — Stored in the plan snapshot for context; future agents can reference them.

---

## 6. Agent Cluster Panel (right side)

After you complete the wizard and click **Launch AFH agent cluster**, the right panel shows:

- **Status** — “Idle / ready” vs “Running plan” (after launch).  
- **Four tracks:**  
  - **CTO / AFH Strategy** — Viability, zoning, phasing.  
  - **UX & Family Experience** — Resident experience, tours, floor plan flow.  
  - **Systems & Automation** — Checklists, documentation, repeatable processes.  
  - **City / WABO / Licensing** — Permits, fire, inspections.  

Each track explains what it would do and how it adapts to your **role** and **knowledge level**. In a full setup, these would be real agents triggered by your snapshot (e.g. via GitHub labels, webhooks, or file watches).

---

## 7. Draft Plan Snapshot

The **Draft plan snapshot** card is a one-page summary of:

- Property context (MLS, address, city, county)  
- Your role and knowledge level  
- 30-day and 12-month goals  
- Communities / sources you follow  

**Use it to:**

- Send to a permit expeditor or consultant  
- Paste into a GitHub issue or shared doc for agent workflows  
- Keep as a brief for yourself or your team  

---

## 8. Navigation & Buttons

- **Back** — Previous step (disabled on step 1).  
- **Next step** — Next step; on step 4 the label becomes **Launch AFH agent cluster**.  
- **Next** is disabled until required fields for the current step are filled (see Step 1–4 tables above).

---

## 9. Browser & Devices

The app is responsive. Use any modern browser (Chrome, Firefox, Safari, Edge). No account or login is required; data stays in your browser until you copy or export the snapshot.

---

Next: [Tutorial](TUTORIAL.md) · [Quickstarter](QUICKSTART.md)
