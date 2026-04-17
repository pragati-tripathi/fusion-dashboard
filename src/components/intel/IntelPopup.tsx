import { IntelNode } from "@/data/intelData";
import { cn } from "@/lib/utils";

const sourceColor: Record<IntelNode["source"], string> = {
  OSINT: "text-osint border-osint/40 bg-osint/10",
  HUMINT: "text-humint border-humint/40 bg-humint/10",
  IMINT: "text-imint border-imint/40 bg-imint/10",
};

const classificationStyle: Record<IntelNode["classification"], string> = {
  UNCLASSIFIED: "bg-success/15 text-success border-success/30",
  CONFIDENTIAL: "bg-warning/15 text-warning border-warning/30",
  SECRET: "bg-destructive/15 text-destructive border-destructive/30",
};

export const IntelPopupContent = ({ node }: { node: IntelNode }) => {
  const time = new Date(node.timestamp).toUTCString().replace("GMT", "Z");
  return (
    <div className="font-sans text-foreground">
      {node.imageUrl && (
        <div className="relative h-32 w-full overflow-hidden rounded-t-md scanline">
          <img
            src={node.imageUrl}
            alt={node.title}
            loading="lazy"
            width={512}
            height={512}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-popover via-transparent to-transparent" />
          <div className="absolute top-1.5 left-1.5 font-mono text-[9px] uppercase tracking-widest text-primary bg-background/70 px-1.5 py-0.5 rounded border border-primary/40">
            IMINT FEED
          </div>
        </div>
      )}

      <div className="p-3 space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <span className={cn(
            "font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border",
            sourceColor[node.source],
          )}>
            {node.source}
          </span>
          <span className={cn(
            "font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded border",
            classificationStyle[node.classification],
          )}>
            {node.classification}
          </span>
        </div>

        <div>
          <h3 className="text-sm font-semibold leading-snug">{node.title}</h3>
          <div className="font-mono text-[10px] text-muted-foreground mt-0.5">
            ID {node.id}
          </div>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">
          {node.summary}
        </p>

        {node.meta && (
          <div className="grid grid-cols-2 gap-1.5 pt-1 border-t border-border">
            {Object.entries(node.meta).map(([k, v]) => (
              <div key={k} className="min-w-0">
                <div className="label-mono truncate">{k}</div>
                <div className="font-mono text-[11px] text-foreground truncate">{v}</div>
              </div>
            ))}
          </div>
        )}

        <div className="pt-2 border-t border-border space-y-1">
          <Row label="COORDS" value={`${node.lat.toFixed(4)}, ${node.lng.toFixed(4)}`} />
          <Row label="ORIGIN" value={node.origin} />
          <Row label="LOGGED" value={time} />
          <Row label="CONF" value={node.confidence} highlight />
        </div>
      </div>
    </div>
  );
};

const Row = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
  <div className="flex items-center justify-between gap-2 text-[10px]">
    <span className="label-mono">{label}</span>
    <span className={cn(
      "font-mono tabular-nums truncate",
      highlight ? "text-primary" : "text-foreground/80",
    )}>
      {value}
    </span>
  </div>
);
