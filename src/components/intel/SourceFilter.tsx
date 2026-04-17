import { IntelSource } from "@/data/intelData";
import { cn } from "@/lib/utils";

interface SourceFilterProps {
  active: Record<IntelSource, boolean>;
  counts: Record<IntelSource, number>;
  onToggle: (source: IntelSource) => void;
}

const SOURCES: { key: IntelSource; label: string; colorClass: string; dotClass: string }[] = [
  { key: "OSINT",  label: "Open Source",   colorClass: "text-osint",  dotClass: "bg-osint" },
  { key: "HUMINT", label: "Human Intel",   colorClass: "text-humint", dotClass: "bg-humint" },
  { key: "IMINT",  label: "Imagery Intel", colorClass: "text-imint",  dotClass: "bg-imint" },
];

export const SourceFilter = ({ active, counts, onToggle }: SourceFilterProps) => (
  <div className="panel p-3 space-y-2">
    <div className="label-mono px-1">Source Filters</div>
    <div className="space-y-1.5">
      {SOURCES.map((s) => {
        const isActive = active[s.key];
        return (
          <button
            key={s.key}
            onClick={() => onToggle(s.key)}
            className={cn(
              "w-full flex items-center justify-between gap-2 px-3 py-2 rounded-md border text-left transition-all",
              isActive
                ? "bg-secondary border-border"
                : "bg-transparent border-border/40 opacity-50 hover:opacity-80",
            )}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span
                className={cn(
                  "h-2.5 w-2.5 rounded-full shrink-0",
                  s.dotClass,
                  isActive && "shadow-[0_0_8px_currentColor]",
                )}
              />
              <div className="min-w-0">
                <div className={cn("font-mono text-xs font-semibold", s.colorClass)}>
                  {s.key}
                </div>
                <div className="text-[10px] text-muted-foreground truncate">{s.label}</div>
              </div>
            </div>
            <span className="font-mono text-xs tabular-nums text-muted-foreground">
              {String(counts[s.key] ?? 0).padStart(2, "0")}
            </span>
          </button>
        );
      })}
    </div>
  </div>
);
