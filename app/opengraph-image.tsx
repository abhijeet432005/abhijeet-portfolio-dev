import { ImageResponse } from "next/og";

export const alt =
  "Abhijeet Kumar, freelance web developer in New Delhi, India";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#101010",
          color: "#f4f1e8",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#aaa69d",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          Portfolio · New Delhi, India
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              display: "flex",
              fontSize: 74,
              fontWeight: 700,
              letterSpacing: "-0.05em",
            }}
          >
            Abhijeet Kumar
          </div>
          <div style={{ display: "flex", fontSize: 34, color: "#aaa69d" }}>
            Freelance Web Developer · Full-Stack &amp; AI Engineer
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 22,
            color: "#aaa69d",
            letterSpacing: "0.04em",
          }}
        >
          FRONTEND · BACKEND · SHOPIFY · AI
        </div>
      </div>
    ),
    size,
  );
}
