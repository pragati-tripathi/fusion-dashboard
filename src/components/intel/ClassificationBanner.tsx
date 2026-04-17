export const ClassificationBanner = ({ level = "SECRET // NOFORN" }: { level?: string }) => (
  <div
    className="w-full text-center py-1 font-mono text-[11px] tracking-[0.3em] font-bold text-destructive-foreground"
    style={{ background: "var(--gradient-classified)" }}
  >
    {level}
  </div>
);
