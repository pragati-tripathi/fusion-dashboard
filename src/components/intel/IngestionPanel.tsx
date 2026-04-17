import { useCallback, useRef, useState } from "react";
import { Upload, FileJson, FileSpreadsheet, Image as ImageIcon, Database, Cloud, CheckCircle2, MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { IntelNode } from "@/data/intelData";
import { toast } from "sonner";

interface IngestionPanelProps {
  onIngest: (nodes: IntelNode[]) => void;
}

const newId = (prefix: string) =>
  `${prefix}-${Math.floor(1000 + Math.random() * 9000)}`;

const randomNear = (lat: number, lng: number, jitter = 4) => ({
  lat: lat + (Math.random() - 0.5) * jitter,
  lng: lng + (Math.random() - 0.5) * jitter,
});

export const IngestionPanel = ({ onIngest }: IngestionPanelProps) => {
  const [dragOver, setDragOver] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const parseCsv = (text: string): IntelNode[] => {
    const lines = text.trim().split(/\r?\n/);
    if (lines.length < 2) return [];
    const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
    const idx = (k: string) => headers.indexOf(k);
    return lines.slice(1).map((line) => {
      const cells = line.split(",").map((c) => c.trim());
      const lat = parseFloat(cells[idx("lat")] || cells[idx("latitude")] || "0");
      const lng = parseFloat(cells[idx("lng")] || cells[idx("longitude")] || cells[idx("lon")] || "0");
      return {
        id: cells[idx("id")] || newId("HU"),
        source: "HUMINT",
        title: cells[idx("title")] || "Field Report (CSV)",
        summary: cells[idx("summary")] || cells[idx("description")] || "Imported from CSV ingestion.",
        lat: isFinite(lat) ? lat : 0,
        lng: isFinite(lng) ? lng : 0,
        timestamp: new Date().toISOString(),
        confidence: "MEDIUM",
        classification: "CONFIDENTIAL",
        origin: "Manual Upload / CSV",
      } as IntelNode;
    }).filter((n) => n.lat !== 0 || n.lng !== 0);
  };

  const handleFiles = useCallback(async (files: FileList | File[]) => {
    const arr = Array.from(files);
    const ingested: IntelNode[] = [];

    for (const file of arr) {
      const lower = file.name.toLowerCase();
      try {
        if (lower.endsWith(".json")) {
          const text = await file.text();
          const data = JSON.parse(text);
          const records = Array.isArray(data) ? data : [data];
          records.forEach((r: any) => {
            ingested.push({
              id: r.id || newId("HU"),
              source: (r.source as any) || "HUMINT",
              title: r.title || "Field Report (JSON)",
              summary: r.summary || r.description || "Imported from JSON ingestion.",
              lat: Number(r.lat ?? r.latitude ?? 0),
              lng: Number(r.lng ?? r.lon ?? r.longitude ?? 0),
              timestamp: r.timestamp || new Date().toISOString(),
              confidence: r.confidence || "MEDIUM",
              classification: r.classification || "CONFIDENTIAL",
              origin: `Manual Upload / ${file.name}`,
              meta: r.meta,
            });
          });
        } else if (lower.endsWith(".csv")) {
          const text = await file.text();
          ingested.push(...parseCsv(text));
        } else if (/\.(jpe?g|png|webp)$/.test(lower)) {
          const url = URL.createObjectURL(file);
          // synthesize an IMINT node at a randomized location
          const { lat, lng } = randomNear(20, 30, 80);
          ingested.push({
            id: newId("IM"),
            source: "IMINT",
            title: `Imagery — ${file.name}`,
            summary: "Manually ingested imagery awaiting analyst tagging.",
            lat,
            lng,
            timestamp: new Date().toISOString(),
            confidence: "MEDIUM",
            classification: "CONFIDENTIAL",
            origin: `Drag-Drop / ${file.name}`,
            imageUrl: url,
            meta: {
              size: `${(file.size / 1024).toFixed(1)} KB`,
              type: file.type || "image",
            },
          });
        } else {
          toast.error(`Unsupported file: ${file.name}`);
        }
      } catch (e) {
        toast.error(`Failed to parse ${file.name}`);
      }
    }

    if (ingested.length) {
      onIngest(ingested);
      toast.success(`Ingested ${ingested.length} intel node${ingested.length > 1 ? "s" : ""}`);
    }
  }, [onIngest]);

  const simulate = (kind: "mongo" | "s3") => {
    const presets = {
      mongo: {
        source: "OSINT" as const,
        prefix: "OS",
        title: "OSINT Pull — MongoDB Sync",
        origin: "MongoDB / osint.live",
      },
      s3: {
        source: "OSINT" as const,
        prefix: "OS",
        title: "OSINT Pull — S3 Bucket",
        origin: "AWS S3 / osint-archive-02",
      },
    };
    const p = presets[kind];
    const nodes: IntelNode[] = Array.from({ length: 2 }).map(() => {
      const { lat, lng } = randomNear(30, 40, 120);
      return {
        id: newId(p.prefix),
        source: p.source,
        title: p.title,
        summary: "Automated retrieval — pending analyst review.",
        lat,
        lng,
        timestamp: new Date().toISOString(),
        confidence: "MEDIUM",
        classification: "UNCLASSIFIED",
        origin: p.origin,
      };
    });
    onIngest(nodes);
    toast.success(`Pulled ${nodes.length} ${kind === "mongo" ? "MongoDB" : "S3"} records`);
  };

  return (
    <div className="panel p-3 space-y-3">
      <div className="label-mono px-1">Data Ingestion</div>

      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
        }}
        onClick={() => fileInput.current?.click()}
        className={cn(
          "relative cursor-pointer rounded-md border-2 border-dashed p-4 text-center transition-all",
          dragOver
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50 hover:bg-secondary/40",
        )}
      >
        <Upload className="mx-auto h-5 w-5 text-primary mb-2" />
        <div className="text-xs font-medium">Drag & drop files</div>
        <div className="label-mono mt-1">CSV • JSON • JPG • PNG</div>
        <input
          ref={fileInput}
          type="file"
          multiple
          accept=".csv,.json,.jpg,.jpeg,.png,.webp"
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
      </div>

      <div className="grid grid-cols-3 gap-1.5">
        <FormatChip icon={<FileSpreadsheet className="h-3 w-3" />} label="CSV" />
        <FormatChip icon={<FileJson className="h-3 w-3" />} label="JSON" />
        <FormatChip icon={<ImageIcon className="h-3 w-3" />} label="IMINT" />
      </div>

      <div className="space-y-1.5 pt-1">
        <div className="label-mono px-1">Connectors</div>
        <ConnectorButton
          icon={<Database className="h-3.5 w-3.5" />}
          label="Sync MongoDB"
          sublabel="osint.live"
          onClick={() => simulate("mongo")}
        />
        <ConnectorButton
          icon={<Cloud className="h-3.5 w-3.5" />}
          label="Pull from S3"
          sublabel="osint-archive-02"
          onClick={() => simulate("s3")}
        />
      </div>
    </div>
  );
};

const FormatChip = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="flex items-center justify-center gap-1 py-1.5 rounded border border-border/60 bg-secondary/40 font-mono text-[10px] uppercase text-muted-foreground">
    {icon}
    {label}
  </div>
);

const ConnectorButton = ({
  icon, label, sublabel, onClick,
}: { icon: React.ReactNode; label: string; sublabel: string; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-md border border-border bg-secondary/30 hover:bg-secondary hover:border-primary/40 transition-all text-left group"
  >
    <span className="text-primary group-hover:scale-110 transition-transform">{icon}</span>
    <div className="min-w-0 flex-1">
      <div className="text-xs font-medium truncate">{label}</div>
      <div className="font-mono text-[10px] text-muted-foreground truncate">{sublabel}</div>
    </div>
    <span className="label-mono text-primary opacity-0 group-hover:opacity-100 transition-opacity">
      RUN →
    </span>
  </button>
);
