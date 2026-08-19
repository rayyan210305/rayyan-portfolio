import { ImageResponse } from "next/og";

export const alt =
  "Rayyan Mardhatillah — Network & Web Engineer, Universitas Syiah Kuala";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  async function loadFont(weight: string): Promise<ArrayBuffer | null> {
    try {
      const res = await fetch(
        `https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-${weight}-normal.ttf`,
        { next: { revalidate: 86400 } }
      );
      if (!res.ok) return null;
      return await res.arrayBuffer();
    } catch {
      return null;
    }
  }

  const [inter700, inter800] = await Promise.all([
    loadFont("700"),
    loadFont("800"),
  ]);

  const hasFont = !!(inter700 && inter800);
  const fonts = hasFont
    ? [
        {
          name: "Inter",
          data: inter700 as ArrayBuffer,
          style: "normal" as const,
          weight: 700 as const,
        },
        {
          name: "Inter",
          data: inter800 as ArrayBuffer,
          style: "normal" as const,
          weight: 800 as const,
        },
      ]
    : [];

  const nodes = [
    { left: "72%", top: "14%", size: 10 },
    { left: "82%", top: "38%", size: 7 },
    { left: "66%", top: "52%", size: 8 },
    { left: "88%", top: "68%", size: 12 },
    { left: "75%", top: "82%", size: 6 },
    { left: "60%", top: "28%", size: 6 },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0A0F",
          color: "#F8FAFC",
          fontFamily: hasFont ? "Inter" : "sans-serif",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        {/* Network node decorations */}
        {nodes.map((n, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: n.left,
              top: n.top,
              width: n.size,
              height: n.size,
              borderRadius: "50%",
              background: "#A78BFA",
              opacity: 0.5,
              boxShadow: "0 0 24px rgba(167,139,250,0.6)",
            }}
          />
        ))}
        {/* Connection lines */}
        <svg
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          viewBox="0 0 1200 630"
        >
          <line x1="860" y1="80" x2="985" y2="240" stroke="#A78BFA" strokeWidth="1.5" opacity="0.25" />
          <line x1="985" y1="240" x2="800" y2="330" stroke="#A78BFA" strokeWidth="1.5" opacity="0.25" />
          <line x1="800" y1="330" x2="1055" y2="430" stroke="#60A5FA" strokeWidth="1.5" opacity="0.25" />
          <line x1="1055" y1="430" x2="900" y2="515" stroke="#A78BFA" strokeWidth="1.5" opacity="0.25" />
        </svg>

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              border: "2px solid rgba(167,139,250,0.5)",
              background: "rgba(167,139,250,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 800,
              backgroundImage: "linear-gradient(135deg, #A78BFA, #60A5FA)",
              WebkitBackgroundClip: "text",
              color: "#F8FAFC",
            }}
          >
            R
          </div>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 1,
              color: "rgba(248,250,252,0.7)",
            }}
          >
            rayyanmardhatillah.dev
          </div>
        </div>

        {/* Title block */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 88,
              fontWeight: 800,
              letterSpacing: -2,
              color: "#F8FAFC",
            }}
          >
            Rayyan Mardhatillah
          </div>
          <div
            style={{
              fontSize: 40,
              color: "#A78BFA",
              fontWeight: 700,
            }}
          >
            Network &amp; Web Engineer
          </div>
          <div
            style={{
              fontSize: 26,
              color: "rgba(248,250,252,0.6)",
              marginTop: 8,
            }}
          >
            Teknik Komputer · Universitas Syiah Kuala
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 200,
              height: 3,
              background: "linear-gradient(90deg, #A78BFA, #60A5FA)",
              borderRadius: 2,
            }}
          />
          <div
            style={{
              fontSize: 20,
              color: "rgba(248,250,252,0.45)",
              letterSpacing: 1,
            }}
          >
            rayyan-portfolio-nu.vercel.app
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts,
    }
  );
}
