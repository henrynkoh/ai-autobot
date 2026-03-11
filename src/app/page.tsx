"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "features", label: "Features" },
  { id: "how-it-works", label: "How it works" },
  { id: "quick-start", label: "Quick start" },
  { id: "docs", label: "Docs & resources" },
  { id: "marketing", label: "Marketing & ads" },
  { id: "tech", label: "Tech stack" },
  { id: "try-it", label: "Try the planner" },
] as const;

const GITHUB_URL =
  process.env.NEXT_PUBLIC_GITHUB_REPO_URL ?? "https://github.com";

export default function LandingPage() {
  const [activeId, setActiveId] = useState<string>(SECTIONS[0].id);
  const mainRef = useRef<HTMLDivElement>(null);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { root: main, rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#0c0c0f] text-slate-100">
      {/* Left sidebar — scrollable nav */}
      <aside
        className="sticky top-0 flex h-screen w-56 shrink-0 flex-col border-r border-white/10 bg-black/40 backdrop-blur-xl lg:w-64"
        aria-label="Page navigation"
      >
        <div className="border-b border-white/10 px-4 py-5">
          <Link
            href="/"
            className="text-lg font-bold tracking-tight text-white transition hover:text-emerald-400"
          >
            AFH Planner
          </Link>
        </div>
        <nav
          className="flex-1 overflow-y-auto overscroll-contain px-3 py-4"
          style={{ scrollBehavior: "smooth" }}
        >
          <ul className="space-y-0.5">
            {SECTIONS.map(({ id, label }) => (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => scrollToSection(id)}
                  className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition ${
                    activeId === id
                      ? "bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/40"
                      : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                  }`}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="border-t border-white/10 px-4 py-3">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-slate-500 transition hover:text-slate-300"
          >
            <GitHubIcon className="h-4 w-4" />
            View on GitHub
          </a>
        </div>
      </aside>

      {/* Main content — scrollable */}
      <main
        ref={mainRef}
        className="flex-1 overflow-y-auto overscroll-contain"
        style={{ scrollBehavior: "smooth" }}
      >
        <div className="mx-auto max-w-3xl px-6 py-12 lg:px-10 lg:py-16">
          {/* Hero / Overview */}
          <section
            id="overview"
            className="scroll-mt-8 rounded-3xl border border-white/10 bg-gradient-to-br from-violet-950/30 via-slate-900/50 to-emerald-950/20 p-8 shadow-2xl lg:p-10"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
              Adult Family Home · Conversion planning
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
              AFH Conversion Planner
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-300">
              Turn any property or MLS number into a realistic Adult Family Home conversion plan.
              Enter address, city & county, your goals, and your role—get a structured plan
              snapshot ready for permits, WABO, and inspections.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/planner"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-emerald-950 shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-400"
              >
                Open planner
              </Link>
              <button
                type="button"
                onClick={() => scrollToSection("quick-start")}
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-white/10"
              >
                Quick start
              </button>
            </div>
          </section>

          {/* Features */}
          <section
            id="features"
            className="scroll-mt-8 pt-14"
          >
            <h2 className="text-2xl font-bold text-white">Features</h2>
            <p className="mt-2 text-slate-400">
              Everything you need to structure an AFH conversion from one property or MLS listing.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "4-step wizard",
                  desc: "Property/MLS → City & county → Goals → Your role & AFH knowledge.",
                  color: "from-violet-500/20 to-fuchsia-500/20 border-violet-500/30",
                },
                {
                  title: "Role-aware",
                  desc: "Tailored for AFH providers, investors, and real estate agents.",
                  color: "from-amber-500/20 to-orange-500/20 border-amber-500/30",
                },
                {
                  title: "Agent cluster view",
                  desc: "CTO, UX, Dev, and Compliance tracks—ready to wire to real AI agents.",
                  color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30",
                },
                {
                  title: "Plan snapshot",
                  desc: "One-page summary to share with team, permit expeditor, or automation.",
                  color: "from-sky-500/20 to-cyan-500/20 border-sky-500/30",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className={`rounded-2xl border bg-gradient-to-br p-5 ${item.color}`}
                >
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-300">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* How it works */}
          <section
            id="how-it-works"
            className="scroll-mt-8 pt-14"
          >
            <h2 className="text-2xl font-bold text-white">How it works</h2>
            <p className="mt-2 text-slate-400">
              Inspired by Popebot: a cluster of agents that collaborate on your plan.
            </p>
            <ol className="mt-6 space-y-4">
              {[
                "Enter property or MLS number and address.",
                "Add city and county for permit and inspection context.",
                "Set 30-day and 12-month goals (licensing, build-out, sale, etc.).",
                "Choose your role (provider, investor, agent) and AFH knowledge level.",
                "Launch the agent cluster and get your plan snapshot.",
              ].map((step, i) => (
                <li
                  key={step}
                  className="flex gap-4 rounded-xl border border-white/10 bg-white/5 p-4"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-sm font-bold text-emerald-300">
                    {i + 1}
                  </span>
                  <span className="text-slate-200">{step}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* Quick start */}
          <section
            id="quick-start"
            className="scroll-mt-8 pt-14"
          >
            <h2 className="text-2xl font-bold text-white">Quick start</h2>
            <p className="mt-2 text-slate-400">
              Run locally in a few commands.
            </p>
            <pre className="mt-6 overflow-x-auto rounded-2xl border border-white/10 bg-slate-950/80 p-5 text-sm text-slate-200">
              <code>{`cd afh-planner
npm install
npm run dev`}</code>
            </pre>
            <p className="mt-4 text-sm text-slate-400">
              Open <a href="http://localhost:3000" className="text-emerald-400 hover:underline">http://localhost:3000</a> and go to{" "}
              <Link href="/planner" className="text-emerald-400 hover:underline">/planner</Link> to use the wizard.
            </p>
          </section>

          {/* Docs */}
          <section
            id="docs"
            className="scroll-mt-8 pt-14"
          >
            <h2 className="text-2xl font-bold text-white">Docs & resources</h2>
            <p className="mt-2 text-slate-400">
              Manual, tutorial, and quickstarter in the repo.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                { name: "Quickstarter", path: "docs/QUICKSTART.md" },
                { name: "User manual", path: "docs/MANUAL.md" },
                { name: "Tutorial", path: "docs/TUTORIAL.md" },
              ].map((doc) => (
                <li key={doc.path}>
                  <span className="font-medium text-slate-200">{doc.name}</span>
                  <span className="text-slate-500"> — {doc.path}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Marketing */}
          <section
            id="marketing"
            className="scroll-mt-8 pt-14"
          >
            <h2 className="text-2xl font-bold text-white">Marketing & ads</h2>
            <p className="mt-2 text-slate-400">
              Ready-to-use copy for social and email.
            </p>
            <p className="mt-4 text-slate-300">
              In <code className="rounded bg-white/10 px-1.5 py-0.5 text-sm">docs/ads/</code> you’ll find
              posts and copy for Facebook, Instagram, Threads, Blogger, Naver Blog, Tistory,
              WordPress, newsletter, and email. Replace <code className="rounded bg-white/10 px-1.5 py-0.5 text-sm">[YOUR_URL]</code> before publishing.
            </p>
          </section>

          {/* Tech */}
          <section
            id="tech"
            className="scroll-mt-8 pt-14"
          >
            <h2 className="text-2xl font-bold text-white">Tech stack</h2>
            <p className="mt-2 text-slate-400">
              Modern, up-to-date stack.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {["Next.js 16", "React 19", "TypeScript", "Tailwind CSS"].map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Try it CTA */}
          <section
            id="try-it"
            className="scroll-mt-8 pt-14 pb-24"
          >
            <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 to-slate-900/60 p-8 text-center lg:p-10">
              <h2 className="text-2xl font-bold text-white">Ready to plan?</h2>
              <p className="mt-2 text-slate-300">
                Open the planner and complete the 4-step wizard to get your AFH conversion plan snapshot.
              </p>
              <Link
                href="/planner"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-emerald-950 shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-400"
              >
                Open AFH Conversion Planner
              </Link>
            </div>
          </section>
        </div>
      </main>

      {/* Bottom-right: GitHub link */}
      <a
        href={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-white/20 bg-slate-900/90 px-4 py-2.5 text-sm font-medium text-slate-200 shadow-xl backdrop-blur transition hover:border-emerald-500/50 hover:bg-slate-800/95 hover:text-white"
        aria-label="View on GitHub"
      >
        <GitHubIcon className="h-5 w-5" />
        GitHub
      </a>
    </div>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}
