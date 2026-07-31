import { ImageResponse } from "next/og";
import { firmBySlug, plansOfFirm, cheapestPlan, slugOf } from "@/lib/seo";
import { FIRMS, initials } from "@/lib/data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return FIRMS.map((f) => ({ slug: slugOf(f) }));
}

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const f = firmBySlug(slug);
  if (!f) return new ImageResponse(<div style={{ display: "flex" }}>Propfundsy</div>, size);
  const cheapest = cheapestPlan(f.id);
  const planCount = plansOfFirm(f.id).length;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0a0e17 0%, #0e1420 60%, #16213a 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div
            style={{
              width: 110, height: 110, borderRadius: 24,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: f.color, color: "#0a0e17", fontSize: 48, fontWeight: 800,
            }}
          >
            {initials(f.name)}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#e7ecf4", fontSize: 56, fontWeight: 800 }}>{f.name}</span>
            <span style={{ color: "#8b98ad", fontSize: 28 }}>
              {f.cat === "forex" ? "Forex / CFD" : "Futures"} prop firm · {f.model}
            </span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 56, marginTop: 64 }}>
          {[
            [f.split, "Profit split"],
            [cheapest ? cheapest.priceLabel : f.from, "Plans from"],
            [f.sizes, "Account sizes"],
            [`${planCount || "—"}`, "Plans tracked"],
          ].map(([v, l]) => (
            <div key={l} style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ color: "#d4af6a", fontSize: 36, fontWeight: 700 }}>{v}</span>
              <span style={{ color: "#8b98ad", fontSize: 22 }}>{l}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", marginTop: 60, fontSize: 26 }}>
          <span style={{ color: "#e7ecf4" }}>Compared on Prop</span>
          <span style={{ color: "#d4af6a" }}>fundsy</span>
        </div>
      </div>
    ),
    size,
  );
}
