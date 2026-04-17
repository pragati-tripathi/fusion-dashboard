import { Activity, Radio } from "lucide-react";

interface HeaderProps {
  totalNodes: number;
  lastUpdate: string;
}

export const Header = ({ totalNodes, lastUpdate }: HeaderProps) => {
  return (
    <header className="panel border-x-0 border-t-0 rounded-none px-4 md:px-6 py-3 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 min-w-0">
        <div className="relative h-9 w-9 rounded-md bg-primary/10 border border-primary/40 flex items-center justify-center shrink-0">
          <Radio className="h-4 w-4 text-primary" />
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-success animate-pulse" />
        </div>
        <div className="min-w-0">
          <h1 className="text-sm md:text-base font-semibold tracking-tight truncate">
            Strategic Fusion Dashboard
          </h1>
          <p className="label-mono truncate">
            OSINT • HUMINT • IMINT — Common Operating Picture
          </p>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-6">
        <Stat label="Active Nodes" value={String(totalNodes).padStart(3, "0")} />
        <Stat label="Last Sync" value={lastUpdate} accent />
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-success/10 border border-success/30">
          <Activity className="h-3.5 w-3.5 text-success" />
          <span className="font-mono text-[11px] text-success uppercase tracking-wider">
            Live
          </span>
        </div>
      </div>
    </header>
  );
};

const Stat = ({ label, value, accent }: { label: string; value: string; accent?: boolean }) => (
  <div className="text-right">
    <div className="label-mono">{label}</div>
    <div
      className={`font-mono text-sm tabular-nums ${
        accent ? "text-primary" : "text-foreground"
      }`}
    >
      {value}
    </div>
  </div>
);
