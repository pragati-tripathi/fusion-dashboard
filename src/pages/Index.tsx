import { useEffect, useMemo, useState } from "react";
import { ClassificationBanner } from "@/components/intel/ClassificationBanner";
import { Header } from "@/components/intel/Header";
import { SourceFilter } from "@/components/intel/SourceFilter";
import { IngestionPanel } from "@/components/intel/IngestionPanel";
import { IntelFeed } from "@/components/intel/IntelFeed";
import { FusionMap } from "@/components/intel/FusionMap";
import { initialIntel, IntelNode, IntelSource } from "@/data/intelData";

const Index = () => {
  const [nodes, setNodes] = useState<IntelNode[]>(initialIntel);
  const [active, setActive] = useState<Record<IntelSource, boolean>>({
    OSINT: true,
    HUMINT: true,
    IMINT: true,
  });
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    document.title = "Strategic Fusion Dashboard — OSINT • HUMINT • IMINT";
    const meta = document.querySelector('meta[name="description"]');
    const desc = "Multi-source intelligence fusion dashboard unifying OSINT, HUMINT and IMINT on a single geospatial common operating picture.";
    if (meta) meta.setAttribute("content", desc);
    else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = desc;
      document.head.appendChild(m);
    }
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);

  const counts = useMemo(() => {
    return nodes.reduce(
      (acc, n) => { acc[n.source] = (acc[n.source] ?? 0) + 1; return acc; },
      { OSINT: 0, HUMINT: 0, IMINT: 0 } as Record<IntelSource, number>,
    );
  }, [nodes]);

  const visibleNodes = useMemo(
    () => nodes.filter((n) => active[n.source]),
    [nodes, active],
  );

  const lastUpdate = now.toISOString().slice(11, 19) + "Z";

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <ClassificationBanner />
      <Header totalNodes={visibleNodes.length} lastUpdate={lastUpdate} />

      <main className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[280px_1fr_300px] gap-3 p-3">
        {/* Left rail */}
        <aside className="hidden lg:flex flex-col gap-3 min-h-0">
          <SourceFilter
            active={active}
            counts={counts}
            onToggle={(s) => setActive((a) => ({ ...a, [s]: !a[s] }))}
          />
          <IngestionPanel onIngest={(n) => setNodes((prev) => [...n, ...prev])} />
        </aside>

        {/* Map */}
        <section className="min-h-[60vh] lg:min-h-0">
          <FusionMap nodes={visibleNodes} />
        </section>

        {/* Right rail */}
        <aside className="hidden lg:flex flex-col gap-3 min-h-0">
          <IntelFeed nodes={visibleNodes} />
        </aside>

        {/* Mobile: stacked filter + feed below map */}
        <div className="lg:hidden flex flex-col gap-3">
          <SourceFilter
            active={active}
            counts={counts}
            onToggle={(s) => setActive((a) => ({ ...a, [s]: !a[s] }))}
          />
          <IngestionPanel onIngest={(n) => setNodes((prev) => [...n, ...prev])} />
          <div className="h-[40vh]">
            <IntelFeed nodes={visibleNodes} />
          </div>
        </div>
      </main>

      <ClassificationBanner level="HANDLE VIA SPECIAL ACCESS CHANNELS ONLY" />
    </div>
  );
};

export default Index;
