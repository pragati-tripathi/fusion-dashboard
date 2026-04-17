import imintPort from "@/assets/imint-port.jpg";
import imintAirfield from "@/assets/imint-airfield.jpg";
import imintBorder from "@/assets/imint-border.jpg";
import imintUrban from "@/assets/imint-urban.jpg";

export type IntelSource = "OSINT" | "HUMINT" | "IMINT";
export type Confidence = "LOW" | "MEDIUM" | "HIGH";
export type Classification = "UNCLASSIFIED" | "CONFIDENTIAL" | "SECRET";

export interface IntelNode {
  id: string;
  source: IntelSource;
  title: string;
  summary: string;
  lat: number;
  lng: number;
  timestamp: string; // ISO
  confidence: Confidence;
  classification: Classification;
  origin: string; // e.g. "AWS S3 / OSINT-BUCKET-01"
  imageUrl?: string;
  meta?: Record<string, string>;
}

export const initialIntel: IntelNode[] = [
  {
    id: "OS-1041",
    source: "OSINT",
    title: "Cargo Convoy — Rotterdam Approach",
    summary:
      "Open-source vessel tracking shows 3 unflagged cargo vessels deviating from declared route toward port of Rotterdam.",
    lat: 51.9244,
    lng: 4.4777,
    timestamp: "2025-04-15T08:42:00Z",
    confidence: "HIGH",
    classification: "UNCLASSIFIED",
    origin: "MongoDB / osint.maritime",
    meta: { vessels: "3", flag: "UNKNOWN", aisStatus: "INTERMITTENT" },
  },
  {
    id: "HU-2204",
    source: "HUMINT",
    title: "Asset Report — Beirut District 4",
    summary:
      "Field asset reports increased nighttime movement at warehouse complex. Three unidentified vehicles observed offloading crates.",
    lat: 33.8938,
    lng: 35.5018,
    timestamp: "2025-04-16T22:10:00Z",
    confidence: "MEDIUM",
    classification: "SECRET",
    origin: "Manual Upload / fieldreport_044.json",
    meta: { asset: "BLACKBIRD-7", contacts: "2", reliability: "B" },
  },
  {
    id: "IM-3318",
    source: "IMINT",
    title: "Satellite Pass — Bandar Abbas Port",
    summary:
      "Latest pass confirms presence of 4 fast-attack craft and unusual container staging on south pier.",
    lat: 27.1865,
    lng: 56.2808,
    timestamp: "2025-04-17T03:22:00Z",
    confidence: "HIGH",
    classification: "SECRET",
    origin: "AWS S3 / imint-sat-04",
    imageUrl: imintPort,
    meta: { resolution: "0.3m", platform: "EO-7B", cloudCover: "8%" },
  },
  {
    id: "IM-3319",
    source: "IMINT",
    title: "Airfield Activity — Eastern Sector",
    summary:
      "Two strategic transport aircraft present on tarmac. Fuel bowsers staged. Ground crew activity elevated.",
    lat: 24.4667,
    lng: 54.3667,
    timestamp: "2025-04-17T05:01:00Z",
    confidence: "HIGH",
    classification: "CONFIDENTIAL",
    origin: "AWS S3 / imint-sat-04",
    imageUrl: imintAirfield,
    meta: { resolution: "0.5m", platform: "SAT-9", aircraft: "2x heavy" },
  },
  {
    id: "OS-1042",
    source: "OSINT",
    title: "Social Chatter — Kyiv Oblast",
    summary:
      "Geotagged social posts indicate civilian reports of low-altitude UAV overflight in northern districts.",
    lat: 50.4501,
    lng: 30.5234,
    timestamp: "2025-04-17T01:14:00Z",
    confidence: "MEDIUM",
    classification: "UNCLASSIFIED",
    origin: "MongoDB / osint.social",
    meta: { posts: "47", platform: "X/Telegram", language: "UK/RU" },
  },
  {
    id: "HU-2205",
    source: "HUMINT",
    title: "Source Debrief — Tbilisi",
    summary:
      "Walk-in source provides documentation alleging procurement network operating through commercial cover.",
    lat: 41.7151,
    lng: 44.8271,
    timestamp: "2025-04-14T11:30:00Z",
    confidence: "LOW",
    classification: "CONFIDENTIAL",
    origin: "CSV Upload / debrief_q2.csv",
    meta: { asset: "WALK-IN", reliability: "D", corroboration: "PARTIAL" },
  },
  {
    id: "IM-3320",
    source: "IMINT",
    title: "Border Crossing — Wakhan Corridor",
    summary:
      "Imagery confirms small convoy (4 vehicles) staged at unimproved crossing point. Tracks indicate recent traffic.",
    lat: 37.0,
    lng: 73.5,
    timestamp: "2025-04-16T13:45:00Z",
    confidence: "MEDIUM",
    classification: "SECRET",
    origin: "AWS S3 / imint-sat-02",
    imageUrl: imintBorder,
    meta: { resolution: "0.4m", platform: "EO-7A", vehicles: "4" },
  },
  {
    id: "IM-3321",
    source: "IMINT",
    title: "Urban Surveillance — Caracas",
    summary:
      "Multi-spectral pass over target district. No structural changes detected versus baseline of 2025-03-20.",
    lat: 10.4806,
    lng: -66.9036,
    timestamp: "2025-04-15T16:00:00Z",
    confidence: "HIGH",
    classification: "CONFIDENTIAL",
    origin: "AWS S3 / imint-sat-01",
    imageUrl: imintUrban,
    meta: { resolution: "0.3m", change: "NONE", baseline: "2025-03-20" },
  },
  {
    id: "OS-1043",
    source: "OSINT",
    title: "Shipping Manifest Anomaly — Singapore",
    summary:
      "Public customs records show declared cargo weight inconsistent with vessel draft observed in port imagery.",
    lat: 1.2655,
    lng: 103.8201,
    timestamp: "2025-04-17T06:30:00Z",
    confidence: "MEDIUM",
    classification: "UNCLASSIFIED",
    origin: "MongoDB / osint.customs",
    meta: { vessel: "MV-OBSCURE", delta: "+12%", route: "SG→DJI" },
  },
];
