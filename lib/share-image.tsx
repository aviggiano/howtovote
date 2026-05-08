import { ImageResponse } from "next/og";
import {
  shareImageAlt,
  shareImageSize,
  type SharePreviewSummary,
} from "@/lib/share-preview";

export const alt = shareImageAlt;
export const contentType = "image/png";
export const size = shareImageSize;

export function buildShareImageResponse(summary: SharePreviewSummary) {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        padding: "44px",
        background:
          "linear-gradient(145deg, #f7f4ff 0%, #eef2ff 52%, #eaf1ff 100%)",
        color: "#20274f",
        fontFamily:
          "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          borderRadius: "34px",
          padding: "42px",
          background:
            "linear-gradient(140deg, rgba(255,255,255,0.95), rgba(232,236,255,0.9))",
          boxShadow: "0 20px 80px rgba(53, 70, 145, 0.14)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              maxWidth: "760px",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: "22px",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#5166d6",
              }}
            >
              How To Vote
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "58px",
                lineHeight: 1.03,
                fontWeight: 700,
              }}
            >
              {summary.presetLabel} preset
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "28px",
                color: "#58638d",
              }}
            >
              {summary.subtitle}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "192px",
              height: "192px",
              borderRadius: "999px",
              background:
                "linear-gradient(180deg, rgba(227,92,94,0.18), rgba(81,102,214,0.18))",
              color: "#20274f",
              fontSize: "64px",
              fontWeight: 700,
            }}
          >
            {summary.maxProjects}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "22px",
            marginTop: "34px",
            flex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              padding: "28px",
              borderRadius: "28px",
              background: "rgba(255,255,255,0.78)",
              border: "1px solid rgba(81, 102, 214, 0.12)",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: "20px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#5166d6",
              }}
            >
              Top picks
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                marginTop: "20px",
              }}
            >
              {summary.topProjects.map((project, index) => (
                <div
                  key={`${project.title}-${index}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "20px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      fontSize: "28px",
                      fontWeight: 600,
                      lineHeight: 1.2,
                    }}
                  >
                    {project.title}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      fontSize: "26px",
                      fontWeight: 700,
                      color: "#e35c5e",
                    }}
                  >
                    {project.allocationLabel}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "320px",
              padding: "28px",
              borderRadius: "28px",
              background: "rgba(81,102,214,0.08)",
              border: "1px solid rgba(81, 102, 214, 0.12)",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: "20px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#5166d6",
              }}
            >
              Custom boosts
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                marginTop: "20px",
              }}
            >
              {(summary.customizations.length > 0
                ? summary.customizations
                : ["No custom boosts"]
              ).map((customization) => (
                <div
                  key={customization}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "52px",
                    padding: "0 18px",
                    borderRadius: "999px",
                    background: "rgba(255,255,255,0.9)",
                    fontSize: "24px",
                    fontWeight: 600,
                    textAlign: "center",
                  }}
                >
                  {customization}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "28px",
            fontSize: "22px",
            color: "#596483",
          }}
        >
          <div style={{ display: "flex" }}>
            Share a donor configuration, not a spreadsheet.
          </div>
          <div style={{ display: "flex", fontWeight: 700, color: "#20274f" }}>
            howtovote.vercel.app
          </div>
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
