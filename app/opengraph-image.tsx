import { ImageResponse } from "next/og";
import { FIRMS, PLANS } from "@/lib/data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Propfundsy — compare prop trading firms and plans";

export default function OgImage() {
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
        <div style={{ display: "flex", fontSize: 56, fontWeight: 800 }}>
          <span style={{ color: "#e7ecf4" }}>Prop</span>
          <span style={{ color: "#d4af6a" }}>fundsy</span>
        </div>
        <div style={{ display: "flex", color: "#e7ecf4", fontSize: 40, marginTop: 28, maxWidth: 900, lineHeight: 1.3 }}>
          Find the prop firm that actually fits your trading.
        </div>
        <div style={{ display: "flex", gap: 56, marginTop: 56 }}>
          {[
            [`${FIRMS.length}`, "Firms"],
            [`${PLANS.length}+`, "Plans"],
            ["$2K–$500K", "Accounts"],
            ["Up to 100%", "Splits"],
          ].map(([v, l]) => (
            <div key={l} style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ color: "#d4af6a", fontSize: 40, fontWeight: 700 }}>{v}</span>
              <span style={{ color: "#8b98ad", fontSize: 24 }}>{l}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
