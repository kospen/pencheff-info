import type { Milestone } from "@/lib/types";
import { formatPeriod } from "@/lib/content";
import { DrawLine } from "@/components/media/DrawLine";

const statusLabel: Record<Milestone["status"], string> = {
  completed: "Completed",
  "in-progress": "In progress",
  planned: "Upcoming",
  unconfirmed: "To be confirmed",
};

function Marker({ status }: { status: Milestone["status"] }) {
  if (status === "completed") return <span className="block size-3 rounded-full bg-cyan-deep" />;
  if (status === "in-progress")
    return (
      <span className="relative block size-3 rounded-full border border-cyan-deep bg-ivory">
        <span className="absolute inset-0 m-auto block size-1.5 rounded-full bg-cyan" />
      </span>
    );
  if (status === "planned") return <span className="block size-3 rounded-full border border-cyan-deep bg-ivory" />;
  return <span className="block size-3 rounded-full border border-dashed border-slate bg-ivory" />;
}

/**
 * Research stages — status based, never percentages.
 * Horizontal on large screens, vertical on mobile.
 */
export function StageTimeline({ milestones, compact = false }: { milestones: Milestone[]; compact?: boolean }) {
  const unconfirmed = milestones.every((m) => m.status === "unconfirmed");
  return (
    <div>
      {/* Desktop — horizontal */}
      <div className="relative hidden lg:block">
        <DrawLine
          className="absolute top-[5px] left-1.5 block h-px bg-soft"
          style={{ right: `calc(100% / ${milestones.length} - 6px)` }}
        />
      <ol className="grid" style={{ gridTemplateColumns: `repeat(${milestones.length}, minmax(0, 1fr))` }}>
        {milestones.map((m) => (
          <li key={m.id} className="relative pr-4">
            <span className="relative z-10 inline-block bg-transparent">
              <Marker status={m.status} />
            </span>
            <p className={`mt-4 font-serif leading-snug ${compact ? "text-base" : "text-lg"}`}>{m.label}</p>
            <p className="label mt-1 text-[0.625rem]!">
              <span className="sr-only">Status: </span>
              {statusLabel[m.status]}
            </p>
            {!compact && formatPeriod(m.period) && <p className="mt-1 font-mono text-xs text-slate">{formatPeriod(m.period)}</p>}
            {!compact && m.summary && <p className="mt-2 text-sm text-slate">{m.summary}</p>}
          </li>
        ))}
      </ol>
      </div>

      {/* Mobile / tablet — vertical */}
      <ol className="relative flex flex-col gap-5 border-l border-soft pl-6 lg:hidden">
        {milestones.map((m) => (
          <li key={m.id} className="relative">
            <span aria-hidden className="absolute top-1.5 -left-[31px]">
              <Marker status={m.status} />
            </span>
            <p className="font-serif text-lg leading-snug">{m.label}</p>
            <p className="label mt-0.5 text-[0.625rem]!">{statusLabel[m.status]}</p>
            {!compact && m.summary && <p className="mt-1 text-sm text-slate">{m.summary}</p>}
          </li>
        ))}
      </ol>

      {unconfirmed && (
        <p className="mt-6 flex items-center gap-2 text-sm text-slate">
          <span aria-hidden className="inline-block size-2.5 rounded-full border border-dashed border-slate" />
          Stage statuses will be published once confirmed.
        </p>
      )}
    </div>
  );
}
