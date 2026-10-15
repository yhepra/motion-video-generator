import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";
import { z } from "zod";

const { fontFamily } = loadFont();

export const alokasiPromoSchema = z.object({
  brandName: z.string(),
  tagline: z.string(),
  primaryColor: z.string(),
  accentBlue: z.string(),
  lightBg: z.string(),
  ctaText: z.string(),
});

export type AlokasiPromoProps = z.infer<typeof alokasiPromoSchema>;

export const AlokasiPromo: React.FC<AlokasiPromoProps> = ({
  brandName,
  tagline,
  primaryColor,
  accentBlue,
  lightBg,
  ctaText,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // SCENE 1: Hook Masalah Catat Manual (Frame 0 - 75)
  // SCENE 2: Solusi AI Scan PDF Mutasi (Frame 70 - 155)
  // SCENE 3: Hasil Dashboard & Saldo Otomatis (Frame 150 - 235)
  // SCENE 4: Call to Action (Frame 230 - 300)

  // Fluid Spring Helper
  const getFluidSpring = (startFrame: number, damping = 14, mass = 0.8) => {
    return spring({
      frame: frame - startFrame,
      fps,
      config: { damping, mass },
    });
  };

  return (
    <AbsoluteFill
      style={{
        backgroundColor: lightBg,
        fontFamily,
        color: "#0f172a",
        overflow: "hidden",
      }}
    >
      {/* Background Subtle Gradient Blobs */}
      <div
        style={{
          position: "absolute",
          top: -200,
          right: -200,
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${accentBlue}22 0%, rgba(255,255,255,0) 70%)`,
          filter: "blur(60px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -150,
          left: -150,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${primaryColor}18 0%, rgba(255,255,255,0) 70%)`,
          filter: "blur(50px)",
        }}
      />

      {/* Top Header Brand (Persistent Subtle Watermark) */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 12,
          opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 14,
            background: `linear-gradient(135deg, ${primaryColor}, ${accentBlue})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            fontWeight: 800,
            fontSize: 22,
            boxShadow: `0 8px 24px ${primaryColor}40`,
          }}
        >
          A
        </div>
        <span
          style={{
            fontSize: 32,
            fontWeight: 800,
            color: "#1e293b",
            letterSpacing: "-0.5px",
          }}
        >
          {brandName}
        </span>
      </div>

      {/* ================= SCENE 1: HOOK (Frame 0 - 75) ================= */}
      {frame < 80 && (
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: "0 80px",
            opacity: interpolate(frame, [65, 75], [1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            transform: `translateY(${interpolate(frame, [65, 75], [0, -60], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}px)`,
          }}
        >
          <div
            style={{
              padding: "10px 22px",
              borderRadius: 30,
              backgroundColor: "#fee2e2",
              color: "#ef4444",
              fontWeight: 700,
              fontSize: 22,
              marginBottom: 30,
              transform: `scale(${getFluidSpring(5)})`,
            }}
          >
            Capek Catat Manual?
          </div>

          <h1
            style={{
              fontSize: 66,
              fontWeight: 800,
              textAlign: "center",
              lineHeight: 1.25,
              color: "#0f172a",
              marginBottom: 40,
              transform: `translateY(${interpolate(
                getFluidSpring(12),
                [0, 1],
                [40, 0]
              )}px)`,
              opacity: interpolate(frame, [10, 25], [0, 1], {
                extrapolateRight: "clamp",
              }),
            }}
          >
            Input mutasi bank satu-per-satu makan banyak waktu.
          </h1>

          {/* Card Mockup Tumpukan Kertas/Mutasi Rumit */}
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "24px 32px",
              borderRadius: 24,
              boxShadow: "0 20px 40px rgba(0,0,0,0.06)",
              border: "1px solid #f1f5f9",
              display: "flex",
              alignItems: "center",
              gap: 20,
              transform: `scale(${getFluidSpring(22)})`,
            }}
          >
            <div
              style={{
                fontSize: 38,
                backgroundColor: "#f8fafc",
                borderRadius: 16,
                padding: 12,
              }}
            >
              📑
            </div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 700, color: "#334155" }}>
                Mutasi Rekening BCA/Mandiri
              </div>
              <div style={{ fontSize: 20, color: "#94a3b8", marginTop: 4 }}>
                150+ baris transaksi belum dicatat...
              </div>
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* ================= SCENE 2: AI SCAN HERO (Frame 70 - 155) ================= */}
      {frame >= 70 && frame < 160 && (
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: "0 80px",
            opacity:
              frame < 80
                ? interpolate(frame, [70, 80], [0, 1], { extrapolateRight: "clamp" })
                : interpolate(frame, [145, 155], [1, 0], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
            transform: `scale(${
              frame > 145
                ? interpolate(frame, [145, 155], [1, 0.95])
                : interpolate(getFluidSpring(75), [0, 1], [0.92, 1])
            })`,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 24px",
              borderRadius: 30,
              backgroundColor: `${accentBlue}18`,
              color: primaryColor,
              fontWeight: 700,
              fontSize: 22,
              marginBottom: 24,
            }}
          >
            ✨ Fitur Unggulan Alokasi
          </div>

          <h2
            style={{
              fontSize: 64,
              fontWeight: 800,
              textAlign: "center",
              lineHeight: 1.25,
              color: "#0f172a",
              marginBottom: 50,
            }}
          >
            Cukup Upload PDF.
            <br />
            <span
              style={{
                color: primaryColor,
                background: `linear-gradient(135deg, ${primaryColor}, ${accentBlue})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              AI yang Bereskan.
            </span>
          </h2>

          {/* Scanning Box Card */}
          <div
            style={{
              width: "100%",
              maxWidth: 720,
              height: 400,
              backgroundColor: "#ffffff",
              borderRadius: 36,
              boxShadow: `0 24px 60px ${primaryColor}18`,
              border: `2px dashed ${primaryColor}55`,
              position: "relative",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: 40,
            }}
          >
            {/* Laser Scanning Line */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                backgroundColor: primaryColor,
                boxShadow: `0 0 20px 6px ${accentBlue}`,
                transform: `translateY(${interpolate(
                  (frame - 85) % 45,
                  [0, 45],
                  [20, 380]
                )}px)`,
                opacity: frame > 85 ? 1 : 0,
              }}
            />

            <div
              style={{
                width: 90,
                height: 90,
                borderRadius: 24,
                backgroundColor: `${primaryColor}15`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 44,
                marginBottom: 20,
                transform: `scale(${getFluidSpring(80)})`,
              }}
            >
              📄
            </div>

            <div
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: "#1e293b",
                marginBottom: 8,
              }}
            >
              Rekening_Koran_Okt.pdf
            </div>

            <div
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: primaryColor,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span>⚡ Gemini AI Ekstraksi... 98% Akurasi</span>
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* ================= SCENE 3: AUTOMATED DASHBOARD (Frame 150 - 235) ================= */}
      {frame >= 150 && frame < 240 && (
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: "0 70px",
            opacity:
              frame < 160
                ? interpolate(frame, [150, 160], [0, 1], {
                    extrapolateRight: "clamp",
                  })
                : interpolate(frame, [225, 235], [1, 0], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
            transform: `translateY(${
              frame > 225
                ? interpolate(frame, [225, 235], [0, -40])
                : interpolate(getFluidSpring(155), [0, 1], [50, 0])
            }px)`,
          }}
        >
          <div
            style={{
              padding: "10px 22px",
              borderRadius: 30,
              backgroundColor: "#dcfce7",
              color: "#16a34a",
              fontWeight: 700,
              fontSize: 22,
              marginBottom: 20,
            }}
          >
            ✓ Ekstraksi Otomatis Selesai
          </div>

          <h2
            style={{
              fontSize: 58,
              fontWeight: 800,
              textAlign: "center",
              lineHeight: 1.25,
              color: "#0f172a",
              marginBottom: 40,
            }}
          >
            Semua Transaksi Rapi Seketika
          </h2>

          {/* Clean Modern Dashboard Widget */}
          <div
            style={{
              width: "100%",
              maxWidth: 760,
              backgroundColor: "#ffffff",
              borderRadius: 32,
              padding: 36,
              boxShadow: "0 24px 60px rgba(0,0,0,0.08)",
              border: "1px solid #e2e8f0",
            }}
          >
            {/* Saldo Header */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 20, color: "#64748b", fontWeight: 600 }}>
                Total Saldo Terdeteksi
              </div>
              <div
                style={{
                  fontSize: 52,
                  fontWeight: 800,
                  color: "#0f172a",
                  marginTop: 6,
                }}
              >
                Rp 12.450.000
              </div>
            </div>

            {/* List Transaksi Animasi Muncul Bertahap */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { name: "Pemasukan Invoice Klien", amount: "+Rp 8.200.000", color: "#16a34a", delay: 165 },
                { name: "Langganan Cloud Server", amount: "-Rp 650.000", color: "#ef4444", delay: 175 },
                { name: "Patungan Makan Tim", amount: "-Rp 280.000", color: "#ef4444", delay: 185 },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "18px 24px",
                    borderRadius: 20,
                    backgroundColor: "#f8fafc",
                    border: "1px solid #f1f5f9",
                    transform: `translateX(${interpolate(
                      getFluidSpring(item.delay),
                      [0, 1],
                      [40, 0]
                    )}px)`,
                    opacity: interpolate(frame, [item.delay, item.delay + 10], [0, 1], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    }),
                  }}
                >
                  <span style={{ fontSize: 24, fontWeight: 600, color: "#334155" }}>
                    {item.name}
                  </span>
                  <span style={{ fontSize: 24, fontWeight: 700, color: item.color }}>
                    {item.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* ================= SCENE 4: CTA OUTRO (Frame 230 - 300) ================= */}
      {frame >= 230 && (
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: "0 80px",
            opacity: interpolate(frame, [230, 245], [0, 1], {
              extrapolateRight: "clamp",
            }),
            transform: `scale(${interpolate(
              getFluidSpring(235),
              [0, 1],
              [0.9, 1]
            )})`,
          }}
        >
          {/* Main Big Logo */}
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: 36,
              background: `linear-gradient(135deg, ${primaryColor}, ${accentBlue})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontWeight: 800,
              fontSize: 64,
              boxShadow: `0 20px 50px ${primaryColor}45`,
              marginBottom: 36,
            }}
          >
            A
          </div>

          <h2
            style={{
              fontSize: 64,
              fontWeight: 800,
              textAlign: "center",
              color: "#0f172a",
              lineHeight: 1.2,
              marginBottom: 16,
            }}
          >
            {brandName}
          </h2>

          <p
            style={{
              fontSize: 30,
              fontWeight: 500,
              color: "#64748b",
              textAlign: "center",
              maxWidth: 700,
              lineHeight: 1.5,
              marginBottom: 50,
            }}
          >
            {tagline}
          </p>

          {/* Button CTA */}
          <div
            style={{
              backgroundColor: primaryColor,
              color: "#ffffff",
              padding: "24px 60px",
              borderRadius: 40,
              fontSize: 32,
              fontWeight: 700,
              boxShadow: `0 16px 40px ${primaryColor}40`,
              display: "flex",
              alignItems: "center",
              gap: 16,
              transform: `scale(${getFluidSpring(250)})`,
            }}
          >
            <span>{ctaText}</span>
            <span style={{ fontSize: 30 }}>→</span>
          </div>

          <div
            style={{
              marginTop: 32,
              fontSize: 22,
              color: "#94a3b8",
              fontWeight: 600,
            }}
          >
            Kunjungi alokasi.id • Gratis Masa Beta
          </div>
        </AbsoluteFill>
      )}

      {/* Modern Bottom Progress Bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: 8,
          width: `${(frame / 300) * 100}%`,
          background: `linear-gradient(90deg, ${primaryColor}, ${accentBlue})`,
        }}
      />
    </AbsoluteFill>
  );
};
