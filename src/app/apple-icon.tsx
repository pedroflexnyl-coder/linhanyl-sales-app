import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#2d7a2d",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: 96,
          fontWeight: 800,
          letterSpacing: -2,
          fontFamily: "system-ui",
        }}
      >
        L
      </div>
    ),
    { ...size }
  );
}
