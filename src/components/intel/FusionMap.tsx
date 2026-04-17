import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { IntelNode } from "@/data/intelData";
import { IntelPopupContent } from "./IntelPopup";
import { createRoot } from "react-dom/client";

const buildIcon = (source: IntelNode["source"]) =>
  L.divIcon({
    className: "",
    html: `<div class="intel-marker ${source.toLowerCase()}"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
    popupAnchor: [0, -8],
  });

// Fit bounds when nodes change significantly
const FitBounds = ({ nodes }: { nodes: IntelNode[] }) => {
  const map = useMap();
  useEffect(() => {
    if (!nodes.length) return;
    const bounds = L.latLngBounds(nodes.map((n) => [n.lat, n.lng] as [number, number]));
    map.fitBounds(bounds, { padding: [60, 60], maxZoom: 5 });
  }, [nodes.length, map]);
  return null;
};

interface FusionMapProps {
  nodes: IntelNode[];
}

export const FusionMap = ({ nodes }: FusionMapProps) => {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-md border border-border">
      <MapContainer
        center={[25, 30]}
        zoom={3}
        minZoom={2}
        maxZoom={10}
        worldCopyJump
        className="h-full w-full"
        zoomControl={true}
        attributionControl={true}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds nodes={nodes} />
        {nodes.map((node) => (
          <Marker
            key={node.id}
            position={[node.lat, node.lng]}
            icon={buildIcon(node.source)}
            eventHandlers={{
              mouseover: (e) => e.target.openPopup(),
            }}
          >
            <Popup autoPan closeButton={false} maxWidth={300}>
              <PopupRenderer node={node} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Corner overlays */}
      <div className="pointer-events-none absolute top-3 left-3 panel px-2.5 py-1.5 z-[400]">
        <div className="label-mono">Theater Map</div>
        <div className="font-mono text-[10px] text-primary">FIXED TERRAIN / OSM</div>
      </div>
      <div className="pointer-events-none absolute bottom-3 left-3 panel px-2.5 py-1.5 z-[400] flex items-center gap-3">
        <Legend color="bg-osint" label="OSINT" />
        <Legend color="bg-humint" label="HUMINT" />
        <Legend color="bg-imint" label="IMINT" />
      </div>
    </div>
  );
};

const Legend = ({ color, label }: { color: string; label: string }) => (
  <div className="flex items-center gap-1.5">
    <span className={`h-2 w-2 rounded-full ${color} shadow-[0_0_6px_currentColor]`} />
    <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
      {label}
    </span>
  </div>
);

// Render React content into Leaflet popup container
const PopupRenderer = ({ node }: { node: IntelNode }) => {
  // react-leaflet renders children in a portal already; we can return JSX directly.
  return <IntelPopupContent node={node} />;
};

// silence unused
void createRoot;
