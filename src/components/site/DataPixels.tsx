const PIXELS = [
  { left: "6%", top: "18%", size: 10, delay: 0, dur: 7 },
  { left: "14%", top: "68%", size: 6, delay: 1.2, dur: 9 },
  { left: "27%", top: "34%", size: 14, delay: 0.6, dur: 8 },
  { left: "38%", top: "78%", size: 8, delay: 2.1, dur: 10 },
  { left: "52%", top: "22%", size: 6, delay: 1.6, dur: 7.5 },
  { left: "63%", top: "58%", size: 12, delay: 0.3, dur: 9.5 },
  { left: "74%", top: "28%", size: 8, delay: 2.6, dur: 8.5 },
  { left: "83%", top: "72%", size: 10, delay: 1.1, dur: 11 },
  { left: "92%", top: "40%", size: 6, delay: 0.9, dur: 8 },
  { left: "46%", top: "52%", size: 5, delay: 3, dur: 9 },
];

export function DataPixels({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <div className="pixel-field" aria-hidden="true">
      {PIXELS.map((p, i) => (
        <span
          key={i}
          className={
            "absolute rounded-[2px] " +
            (tone === "light"
              ? i % 3 === 0
                ? "bg-gold/70"
                : "bg-accent/60"
              : i % 3 === 0
                ? "bg-gold/50"
                : "bg-primary/25")
          }
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animation: `float-pixel ${p.dur}s ease-in-out ${p.delay}s infinite`,
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
}
