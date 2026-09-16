import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.domain}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#F8F7F2", color: "#10283B", padding: "72px 80px", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: 300, height: 630, background: "#EEF7F7", display: "flex" }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%" }}>
          <div style={{ display: "flex", fontSize: 30, letterSpacing: 1 }}>
            <span>PENCHEFF.</span>
            <span style={{ color: "#13AFC4" }}>INFO</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 20, letterSpacing: 4, color: "#526674" }}>
              <div style={{ width: 56, height: 2, background: "#13AFC4", display: "flex" }} />
              RESEARCH / TECHNOLOGY / ENTREPRENEURSHIP
            </div>
            <div style={{ fontSize: 112, lineHeight: 1, marginTop: 28, letterSpacing: -3 }}>{site.name}</div>
            <div style={{ fontSize: 34, marginTop: 28, color: "#526674", maxWidth: 820 }}>{site.positioning}</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
