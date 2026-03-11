"use client";

import { useMemo, useState } from "react";

type UserRole = "provider" | "investor" | "agent";

type KnowledgeLevel = "new" | "intermediate" | "expert";

type AgentTrack = "cto" | "ux" | "dev" | "compliance";

const agentTrackLabels: Record<AgentTrack, string> = {
  cto: "CTO / AFH Strategy",
  ux: "UX & Family Experience",
  dev: "Systems & Automation",
  compliance: "City / WABO / Licensing",
};

const totalSteps = 4;

export default function PlannerPage() {
  const [step, setStep] = useState(1);
  const [mlsNumber, setMlsNumber] = useState("");
  const [propertyAddress, setPropertyAddress] = useState("");
  const [city, setCity] = useState("");
  const [county, setCounty] = useState("");
  const [role, setRole] = useState<UserRole>("provider");
  const [knowledge, setKnowledge] = useState<KnowledgeLevel>("new");
  const [goals30, setGoals30] = useState("");
  const [goals365, setGoals365] = useState("");
  const [communities, setCommunities] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const canGoNext = useMemo(() => {
    if (step === 1) {
      return !!mlsNumber.trim() || !!propertyAddress.trim();
    }
    if (step === 2) {
      return !!city.trim() && !!county.trim();
    }
    if (step === 3) {
      return !!goals30.trim() || !!goals365.trim();
    }
    if (step === 4) {
      return !!knowledge;
    }
    return true;
  }, [step, mlsNumber, propertyAddress, city, county, goals30, goals365, knowledge]);

  const handleNext = () => {
    if (step < totalSteps) {
      setStep((s) => s + 1);
    } else {
      setSubmitted(true);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((s) => s - 1);
    }
  };

  const activeAgentTracks: AgentTrack[] = useMemo(() => {
    const tracks: AgentTrack[] = ["cto", "ux", "dev", "compliance"];
    return tracks;
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-4 py-10 md:px-8 lg:px-12">
        <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              AFH Conversion Planner
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-300 md:text-base">
              Enter a property or MLS number and let an AI-powered "20-person dev team"
              draft the most realistic AFH conversion plan, drawings, permit strategy,
              and inspection roadmap for your city and county.
            </p>
          </div>
          <div className="rounded-full border border-slate-700 bg-slate-900/60 px-4 py-2 text-xs text-slate-300 shadow-lg shadow-slate-900/40 md:text-sm">
            Inspired by Popebot cluster mode · CTO · UX · Dev · Compliance
          </div>
        </header>

        <main className="grid flex-1 gap-6 md:grid-cols-[minmax(0,3fr),minmax(0,2fr)]">
          <section className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-xl shadow-slate-950/40 md:p-6">
            <WizardProgress step={step} />
            <div className="mt-2 flex-1">
              {step === 1 && (
                <StepProperty
                  mlsNumber={mlsNumber}
                  propertyAddress={propertyAddress}
                  setMlsNumber={setMlsNumber}
                  setPropertyAddress={setPropertyAddress}
                />
              )}
              {step === 2 && (
                <StepLocation
                  city={city}
                  county={county}
                  setCity={setCity}
                  setCounty={setCounty}
                />
              )}
              {step === 3 && (
                <StepGoals
                  goals30={goals30}
                  goals365={goals365}
                  setGoals30={setGoals30}
                  setGoals365={setGoals365}
                  role={role}
                />
              )}
              {step === 4 && (
                <StepProfile
                  role={role}
                  setRole={setRole}
                  knowledge={knowledge}
                  setKnowledge={setKnowledge}
                  communities={communities}
                  setCommunities={setCommunities}
                />
              )}
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleBack}
                disabled={step === 1}
                className="inline-flex items-center justify-center rounded-full border border-slate-700 px-4 py-2 text-xs font-medium text-slate-200 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:border-slate-800 disabled:text-slate-500 disabled:hover:bg-transparent md:text-sm"
              >
                Back
              </button>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!canGoNext}
                  className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-2 text-xs font-semibold text-emerald-950 shadow-md shadow-emerald-500/40 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-emerald-950 disabled:text-emerald-600 md:text-sm"
                >
                  {step < totalSteps ? "Next step" : "Launch AFH agent cluster"}
                </button>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 shadow-xl shadow-slate-950/40 md:p-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400 md:text-xs">
              Agent Cluster Overview
            </h2>
            <p className="text-xs text-slate-300 md:text-sm">
              This panel simulates how a Popebot-style cluster of agents would pick up your
              onboarding data and collaborate on an AFH conversion plan. You can later wire
              this to real agents via GitHub labels, webhooks, or file-based triggers.
            </p>
            <AgentTracks
              activeTracks={activeAgentTracks}
              role={role}
              knowledge={knowledge}
              submitted={submitted}
            />
            <PlanPreview
              mlsNumber={mlsNumber}
              propertyAddress={propertyAddress}
              city={city}
              county={county}
              role={role}
              goals30={goals30}
              goals365={goals365}
              knowledge={knowledge}
              communities={communities}
              submitted={submitted}
            />
          </section>
        </main>
      </div>
    </div>
  );
}

function WizardProgress({ step }: { step: number }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs font-medium text-slate-300 md:text-sm">
        <span>Step {step} of {totalSteps}</span>
        <span>
          {step === 1 && "Basic property / MLS info"}
          {step === 2 && "City & county context"}
          {step === 3 && "Goals & timelines"}
          {step === 4 && "Profile & communities"}
        </span>
      </div>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-400 transition-all"
          style={{ width: `${(step / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );
}

function FieldLabel({ label, hint }: { label: string; hint?: string }) {
  return (
    <div className="mb-1.5 flex flex-col gap-0.5">
      <span className="text-xs font-medium text-slate-100 md:text-sm">
        {label}
      </span>
      {hint && (
        <span className="text-[11px] text-slate-400 md:text-xs">
          {hint}
        </span>
      )}
    </div>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 outline-none ring-0 transition focus:border-emerald-400/60 focus:bg-slate-900 focus:ring-2 focus:ring-emerald-500/40 md:text-sm"
    />
  );
}

function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className="w-full rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 outline-none ring-0 transition focus:border-emerald-400/60 focus:bg-slate-900 focus:ring-2 focus:ring-emerald-500/40 md:text-sm"
    />
  );
}

function StepProperty(props: {
  mlsNumber: string;
  propertyAddress: string;
  setMlsNumber: (v: string) => void;
  setPropertyAddress: (v: string) => void;
}) {
  const { mlsNumber, propertyAddress, setMlsNumber, setPropertyAddress } = props;

  return (
    <div className="space-y-4">
      <h2 className="text-base font-semibold text-slate-50 md:text-lg">
        Property or MLS starting point
      </h2>
      <p className="text-xs text-slate-300 md:text-sm">
        Use the actual MLS number or a simple address so the agents have a
        concrete property to reason about (lot size, zoning, parking, fire
        access, etc.).
      </p>
      <div className="space-y-3">
        <div>
          <FieldLabel
            label="MLS Number"
            hint="Optional but ideal. Example: 22123456"
          />
          <Input
            value={mlsNumber}
            onChange={(e) => setMlsNumber(e.target.value)}
            placeholder="Enter MLS number if available"
          />
        </div>
        <div>
          <FieldLabel
            label="Property address"
            hint="Street, city, state; whatever you know today."
          />
          <Input
            value={propertyAddress}
            onChange={(e) => setPropertyAddress(e.target.value)}
            placeholder="1234 Example Ave, Sample, WA"
          />
        </div>
      </div>
    </div>
  );
}

function StepLocation(props: {
  city: string;
  county: string;
  setCity: (v: string) => void;
  setCounty: (v: string) => void;
}) {
  const { city, county, setCity, setCounty } = props;

  return (
    <div className="space-y-4">
      <h2 className="text-base font-semibold text-slate-50 md:text-lg">
        City & county permitting context
      </h2>
      <p className="text-xs text-slate-300 md:text-sm">
        Different cities and counties handle AFH, WABO, fire, and parking rules
        very differently. Be as specific as you can here.
      </p>
      <div className="space-y-3">
        <div>
          <FieldLabel
            label="City"
            hint="Where the property physically sits."
          />
          <Input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="e.g. Federal Way, Tacoma, Bellevue"
          />
        </div>
        <div>
          <FieldLabel
            label="County"
            hint="Important for WABO, fire marshal, and inspection expectations."
          />
          <Input
            value={county}
            onChange={(e) => setCounty(e.target.value)}
            placeholder="e.g. King County, Pierce County"
          />
        </div>
      </div>
    </div>
  );
}

function StepGoals(props: {
  goals30: string;
  goals365: string;
  setGoals30: (v: string) => void;
  setGoals365: (v: string) => void;
  role: UserRole;
}) {
  const { goals30, goals365, setGoals30, setGoals365, role } = props;

  const roleLabel =
    role === "provider"
      ? "AFH provider / operator"
      : role === "investor"
      ? "AFH-focused investor"
      : "real estate agent";

  return (
    <div className="space-y-4">
      <h2 className="text-base font-semibold text-slate-50 md:text-lg">
        Goals & timelines as a {roleLabel}
      </h2>
      <p className="text-xs text-slate-300 md:text-sm">
        The cluster will prioritize tasks differently depending on your
        30-day and 12-month goals (offer, licensing, build-out, refinance,
        marketing, etc.).
      </p>
      <div className="space-y-3">
        <div>
          <FieldLabel
            label="30-day focus"
            hint="What would make the next 30 days a win for you on this property?"
          />
          <TextArea
            rows={3}
            value={goals30}
            onChange={(e) => setGoals30(e.target.value)}
            placeholder="Examples: validate AFH viability, rough budget, talk to city planner, get initial drawings..."
          />
        </div>
        <div>
          <FieldLabel
            label="12-month outcome"
            hint="In a perfect scenario, what does 12 months from now look like?"
          />
          <TextArea
            rows={3}
            value={goals365}
            onChange={(e) => setGoals365(e.target.value)}
            placeholder="Examples: licensed AFH with X residents, stabilized NOI, sale to AFH operator, refinance..."
          />
        </div>
      </div>
    </div>
  );
}

function StepProfile(props: {
  role: UserRole;
  setRole: (v: UserRole) => void;
  knowledge: KnowledgeLevel;
  setKnowledge: (v: KnowledgeLevel) => void;
  communities: string;
  setCommunities: (v: string) => void;
}) {
  const { role, setRole, knowledge, setKnowledge, communities, setCommunities } = props;

  return (
    <div className="space-y-4">
      <h2 className="text-base font-semibold text-slate-50 md:text-lg">
        Who you are & where you learn
      </h2>
      <p className="text-xs text-slate-300 md:text-sm">
        This helps the cluster tune the level of detail, jargon, and references
        (AFH Facebook groups, mentors, code citations) it uses when it reports
        back to you.
      </p>
      <div className="space-y-3">
        <div>
          <FieldLabel label="Primary role" />
          <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
            <RolePill
              label="Provider"
              description="Current or aspiring AFH operator"
              active={role === "provider"}
              onClick={() => setRole("provider")}
            />
            <RolePill
              label="Investor"
              description="Returns, financing, exit strategy"
              active={role === "investor"}
              onClick={() => setRole("investor")}
            />
            <RolePill
              label="Real estate agent"
              description="Listings, buyers, AFH leads"
              active={role === "agent"}
              onClick={() => setRole("agent")}
            />
          </div>
        </div>
        <div>
          <FieldLabel
            label="AFH / code knowledge level"
            hint="So the agents don't talk over or under you."
          />
          <div className="flex flex-wrap gap-2">
            <Chip
              label="New to AFH"
              active={knowledge === "new"}
              onClick={() => setKnowledge("new")}
            />
            <Chip
              label="Some experience"
              active={knowledge === "intermediate"}
              onClick={() => setKnowledge("intermediate")}
            />
            <Chip
              label="Very experienced / expert"
              active={knowledge === "expert"}
              onClick={() => setKnowledge("expert")}
            />
          </div>
        </div>
        <div>
          <FieldLabel
            label="Communities, mentors, or pages you follow"
            hint="AFH Facebook groups, state associations, city planning pages, YouTube channels, etc."
          />
          <TextArea
            rows={3}
            value={communities}
            onChange={(e) => setCommunities(e.target.value)}
            placeholder="Examples: Washington AFH Network FB group, DSHS AFH training, local AFH meetup..."
          />
        </div>
      </div>
    </div>
  );
}

function RolePill(props: {
  label: string;
  description: string;
  active: boolean;
  onClick: () => void;
}) {
  const { label, description, active, onClick } = props;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-start gap-0.5 rounded-2xl border px-3 py-2 text-left text-xs transition md:text-sm ${
        active
          ? "border-emerald-400/80 bg-emerald-500/10 text-emerald-50 shadow-[0_0_0_1px_rgba(16,185,129,0.4)]"
          : "border-slate-800 bg-slate-900/60 text-slate-200 hover:border-slate-600 hover:bg-slate-900"
      }`}
    >
      <span className="font-medium">{label}</span>
      <span className="text-[11px] text-slate-400 md:text-xs">{description}</span>
    </button>
  );
}

function Chip(props: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  const { label, active, onClick } = props;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-[11px] font-medium transition md:text-xs ${
        active
          ? "border-emerald-400/80 bg-emerald-500/10 text-emerald-100"
          : "border-slate-700 bg-slate-900/70 text-slate-200 hover:border-slate-500 hover:bg-slate-900"
      }`}
    >
      {label}
    </button>
  );
}

function AgentTracks(props: {
  activeTracks: AgentTrack[];
  role: UserRole;
  knowledge: KnowledgeLevel;
  submitted: boolean;
}) {
  const { activeTracks, role, knowledge, submitted } = props;

  return (
    <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950/80 p-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-slate-200 md:text-sm">
          Live cluster (simulated)
        </span>
        <span
          className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] ${
            submitted
              ? "bg-emerald-500/15 text-emerald-300"
              : "bg-slate-800 text-slate-300"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              submitted ? "bg-emerald-400" : "bg-slate-500"
            }`}
          />
          {submitted ? "Running plan" : "Idle / ready"}
        </span>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {activeTracks.map((track) => (
          <AgentTrackCard
            key={track}
            track={track}
            role={role}
            knowledge={knowledge}
            submitted={submitted}
          />
        ))}
      </div>
      <p className="mt-1 text-[11px] text-slate-400 md:text-xs">
        In a full Popebot-style setup, each tile maps to an actual agent role
        (CTO, UX, Dev, Compliance) triggered via GitHub labels, webhooks, or
        file watches. This UI is ready to be wired into that backend.
      </p>
    </div>
  );
}

function AgentTrackCard(props: {
  track: AgentTrack;
  role: UserRole;
  knowledge: KnowledgeLevel;
  submitted: boolean;
}) {
  const { track, role, knowledge, submitted } = props;

  const status = submitted ? "Queued from wizard" : "Waiting for launch";

  let focus: string;
  if (track === "cto") {
    focus = "Overall AFH viability, zoning constraints, and project phasing.";
  } else if (track === "ux") {
    focus = "Resident experience, family tours, and floor plan flow.";
  } else if (track === "dev") {
    focus = "Automation, documentation, and repeatable checklists.";
  } else {
    focus = "WABO, fire, city permits, and inspection prep.";
  }

  const roleHint =
    role === "provider"
      ? "Will bias toward operator workload and staffing realities."
      : role === "investor"
      ? "Will bias toward returns, capex, and exit paths."
      : "Will bias toward listing language and AFH buyer/seller talking points.";

  const levelHint =
    knowledge === "new"
      ? "Explain in plain language with code references spelled out."
      : knowledge === "intermediate"
      ? "Assume you've seen AFH before but want more depth."
      : "Talk like an experienced operator / consultant; focus on edge cases.";

  return (
    <div className="flex flex-col gap-1.5 rounded-xl border border-slate-800 bg-slate-950 px-3 py-2">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold text-slate-100 md:text-sm">
          {agentTrackLabels[track]}
        </span>
        <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] text-slate-400">
          {status}
        </span>
      </div>
      <p className="text-[11px] text-slate-300 md:text-xs">{focus}</p>
      <p className="text-[10px] text-slate-500 md:text-[11px]">{roleHint}</p>
      <p className="text-[10px] text-slate-500 md:text-[11px]">{levelHint}</p>
    </div>
  );
}

function PlanPreview(props: {
  mlsNumber: string;
  propertyAddress: string;
  city: string;
  county: string;
  role: UserRole;
  goals30: string;
  goals365: string;
  knowledge: KnowledgeLevel;
  communities: string;
  submitted: boolean;
}) {
  const {
    mlsNumber,
    propertyAddress,
    city,
    county,
    role,
    goals30,
    goals365,
    knowledge,
    communities,
    submitted,
  } = props;

  const roleLabel =
    role === "provider"
      ? "AFH provider / operator"
      : role === "investor"
      ? "AFH-focused investor"
      : "real estate agent working with AFH deals";

  const knowledgeLabel =
    knowledge === "new"
      ? "New to AFH / codes"
      : knowledge === "intermediate"
      ? "Some AFH experience"
      : "Very experienced / expert";

  return (
    <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950/90 p-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold text-slate-100 md:text-sm">
          Draft plan snapshot
        </span>
        <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] text-slate-400">
          {submitted ? "Ready for real agents" : "Fill wizard to refine"}
        </span>
      </div>
      <div className="space-y-2 text-[11px] text-slate-200 md:text-xs">
        <p>
          <span className="font-semibold text-slate-100">Property context: </span>
          {mlsNumber && <>MLS #{mlsNumber} · </>}
          {propertyAddress || "Property address TBD"}
          {city && ` · ${city}`}
          {county && ` · ${county} County`}
        </p>
        <p>
          <span className="font-semibold text-slate-100">You: </span>
          {roleLabel} · {knowledgeLabel}
        </p>
        {(goals30 || goals365) && (
          <div>
            <span className="font-semibold text-slate-100">Goals: </span>
            {goals30 && (
              <span>
                30-day focus – {goals30.trim()}{" "}
              </span>
            )}
            {goals365 && (
              <span>
                · 12-month outcome – {goals365.trim()}
              </span>
            )}
          </div>
        )}
        {communities && (
          <p>
            <span className="font-semibold text-slate-100">Communities & inputs: </span>
            {communities.trim()}
          </p>
        )}
      </div>
      <p className="text-[10px] text-slate-500 md:text-[11px]">
        This snapshot is what you would pass into your Popebot-style cluster as a
        shared context document (inbox folder, GitHub issue, or planning file).
        Each agent then adds its own notes, drawings, checklists, and permit
        strategies back into a shared `reports` folder or pull request.
      </p>
    </div>
  );
}
