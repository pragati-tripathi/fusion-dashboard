import { IntelNode } from "@/data/intelData";
import { cn } from "@/lib/utils";

interface IntelFeedProps {
  nodes: IntelNode[];
}

const dotClass: Record<IntelNode["source"], string> = {
  OSINT: "bg-osint",
  HUMINT: "bg-humint",
  IMINT: "bg-imint",
};

const timeAgo = (iso: string) => {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "now";
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  return `${Math.floor(h / 24)}d`;
};

export const IntelFeed = ({ nodes }: IntelFeedProps) => {
  const sorted = [...nodes].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );
  return (
    <div className="panel p-3 flex-1 min-h-0 flex flex-col">
      <div className="flex items-center justify-between px-1 mb-2">
        <div className="label-mono">Live Feed</div>
        <div className="label-mono text-primary">{sorted.length} EVT</div>
      </div>
      <div className="flex-1 overflow-y-auto -mr-2 pr-2 space-y-1.5">
        {sorted.slice(0, 50).map((n) => (
          <div
            key={n.id}
            className="group flex items-start gap-2.5 px-2 py-2 rounded-md border border-transparent hover:border-border hover:bg-secondary/40 transition-all cursor-default"
          >
            <span className={cn("h-2 w-2 rounded-full mt-1.5 shrink-0 shadow-[0_0_6px_currentColor]", dotClass[n.source])} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[10px] text-muted-foreground">{n.id}</span>
                <span className="font-mono text-[10px] text-muted-foreground">{timeAgo(n.timestamp)}</span>
              </div>
              <div className="text-xs text-foreground/90 truncate">{n.title}</div>
            </div>
          </div>
        ))}
        {!sorted.length && (
          <div className="text-center py-8 text-xs text-muted-foreground">
            No intel matches current filters.
          </div>
        )}
      </div>
    </div>
  );
};
