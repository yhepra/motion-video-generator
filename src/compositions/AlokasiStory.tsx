import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";
import { z } from "zod";

const { fontFamily } = loadFont();

export const alokasiStorySchema = z.object({
  brandDomain: z.string(),
  brandSlogan: z.string(),
  primaryColor: z.string(),
  emeraldAccent: z.string(),
  textColor: z.string(),
  bgWhite: z.string(),
  audioVoiceover: z.string().optional(),
  audioMusic: z.string().optional(),
});

export type AlokasiStoryProps = z.infer<typeof alokasiStorySchema>;

export const AlokasiStory: React.FC<AlokasiStoryProps> = ({
  brandDomain,
  brandSlogan,
  primaryColor,
  emeraldAccent,
  textColor,
  bgWhite,
  audioVoiceover,
  audioMusic,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Durasi Total: 18 detik = 540 frames @ 30fps
  // Scene 1 (0 - 5 detik / frames 0 - 150): Hook Masalah "Gaji masuk, langsung habis?"
  // Scene 2 (5 - 13 detik / frames 145 - 390): Solusi Phone Mockup & Budget Cards
  // Scene 3 (13 - 18 detik / frames 380 - 540): Call to Action & 3D Geometric Wallet Logo

  const fluidSpring = (startFrame: number, damping = 14, mass = 0.8) => {
    return spring({
      frame: frame - startFrame,
      fps,
      config: { damping, mass },
    });
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
        backgroundColor: bgWhite,
        fontFamily,
        color: textColor,
        overflow: "hidden",
      }}
    >
      {/* Soft studio light & subtle gradient aura */}
      <div
        style={{
          position: "absolute",
          top: -250,
          left: "50%",
          transform: "translateX(-50%)",
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${primaryColor}12 0%, rgba(255,255,255,0) 70%)`,
          filter: "blur(70px)",
        }}
      />

      {/* Persistent Elegant Brand Watermark */}
      <div
        style={{
          position: "absolute",
          top: 70,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 12,
          opacity: interpolate(frame, [0, 25], [0, 0.9], { extrapolateRight: "clamp" }),
        }}
      >
        <Img
          src={staticFile("images/alokasi-logo.png")}
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            boxShadow: `0 8px 24px ${primaryColor}25`,
          }}
        />
        <span
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: textColor,
            letterSpacing: "-0.5px",
          }}
        >
          {brandDomain}
        </span>
      </div>

      {/* ================= SCENE 1: HOOK (Detik 0 - 5 / Frame 0 - 150) ================= */}
      {frame < 155 && (
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: "0 80px",
            opacity: interpolate(frame, [135, 150], [1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            transform: `translateY(${interpolate(frame, [135, 150], [0, -50], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}px)`,
          }}
        >
          {/* 3D Minimalist Clay Sphere with floating minus tags */}
          <div
            style={{
              position: "relative",
              width: 240,
              height: 240,
              marginBottom: 60,
              transform: `scale(${fluidSpring(8)}) translateY(${Math.sin(frame / 15) * 8}px)`,
            }}
          >
            {/* Clay Sphere */}
            <div
              style={{
                width: 240,
                height: 240,
                borderRadius: "50%",
                background: "radial-gradient(circle at 35% 30%, #ffffff 0%, #e2e8f0 70%, #cbd5e1 100%)",
                boxShadow: "0 35px 60px rgba(148, 163, 184, 0.35), inset 0 -10px 20px rgba(0,0,0,0.06)",
              }}
            />

            {/* Drifting Floating Minus Percentage Tags */}
            {[
              { tag: "-35% Makan Luar", top: 10, left: -90, delay: 25, speed: 1.2 },
              { tag: "-20% Belanja Impulsif", top: 120, right: -110, delay: 35, speed: 0.9 },
              { tag: "-15% Langganan Lupa Stop", top: 210, left: -70, delay: 45, speed: 1.1 },
            ].map((item, idx) => {
              const driftY = (frame - item.delay) * item.speed;
              const tagSpring = fluidSpring(item.delay);
              return (
                <div
                  key={idx}
                  style={{
                    position: "absolute",
                    top: item.top,
                    left: item.left,
                    right: item.right,
                    backgroundColor: "#ffffff",
                    padding: "10px 20px",
                    borderRadius: 24,
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#ef4444",
                    boxShadow: "0 12px 28px rgba(0,0,0,0.07)",
                    border: "1px solid #fee2e2",
                    transform: `scale(${tagSpring}) translateY(${driftY * 0.4}px)`,
                    opacity: interpolate(frame, [item.delay, item.delay + 10], [0, 1], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    }),
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.tag}
                </div>
              );
            })}
          </div>

          {/* Question Badge */}
          <div
            style={{
              padding: "10px 24px",
              borderRadius: 30,
              backgroundColor: "#fee2e2",
              color: "#dc2626",
              fontSize: 22,
              fontWeight: 700,
              marginBottom: 24,
              transform: `scale(${fluidSpring(15)})`,
            }}
          >
            Tiap Akhir Bulan...
          </div>

          <h1
            style={{
              fontSize: 70,
              fontWeight: 800,
              textAlign: "center",
              lineHeight: 1.2,
              color: textColor,
              marginBottom: 24,
              letterSpacing: "-1px",
              transform: `translateY(${interpolate(fluidSpring(18), [0, 1], [40, 0])}px)`,
              opacity: interpolate(frame, [15, 30], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            Gaji masuk,
            <br />
            <span style={{ color: "#ef4444" }}>langsung habis?</span>
          </h1>

          <p
            style={{
              fontSize: 28,
              fontWeight: 500,
              color: "#64748b",
              textAlign: "center",
              lineHeight: 1.4,
              opacity: interpolate(frame, [30, 45], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            Selalu bingung uang lari ke mana tanpa jejak.
          </p>
        </AbsoluteFill>
      )}

      {/* ================= SCENE 2: SOLUSI / PHONE MOCKUP (Detik 05 - 13 / Frame 145 - 390) ================= */}
      {frame >= 145 && frame < 395 && (
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: "0 60px",
            opacity:
              frame < 160
                ? interpolate(frame, [145, 160], [0, 1], { extrapolateRight: "clamp" })
                : interpolate(frame, [375, 390], [1, 0], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
            transform: `translateY(${
              frame > 375
                ? interpolate(frame, [375, 390], [0, -40])
                : interpolate(fluidSpring(150), [0, 1], [60, 0])
            }px)`,
          }}
        >
          {/* Header Solusi */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 24px",
              borderRadius: 30,
              backgroundColor: `${emeraldAccent}15`,
              color: emeraldAccent,
              fontWeight: 700,
              fontSize: 22,
              marginBottom: 20,
            }}
          >
            ✨ Saatnya Pakai Alokasi
          </div>

          <h2
            style={{
              fontSize: 60,
              fontWeight: 800,
              textAlign: "center",
              lineHeight: 1.2,
              color: textColor,
              marginBottom: 12,
            }}
          >
            Otomatisasi Budgeting.
          </h2>

          <div
            style={{
              fontSize: 26,
              fontWeight: 600,
              color: primaryColor,
              marginBottom: 44,
              textAlign: "center",
            }}
          >
            Kebutuhan • Tabungan • Keinginan
          </div>

          {/* Floating Smartphone Mockup with Glassmorphism Cards */}
          <div
            style={{
              width: "100%",
              maxWidth: 720,
              backgroundColor: "#ffffff",
              borderRadius: 48,
              padding: "36px 32px",
              boxShadow: "0 30px 80px rgba(37, 99, 235, 0.12), 0 4px 20px rgba(0,0,0,0.04)",
              border: "1px solid #e2e8f0",
              position: "relative",
              transform: `scale(${fluidSpring(160)}) translateY(${Math.sin((frame - 150) / 18) * 6}px)`,
            }}
          >
            {/* Phone Screen Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 28,
                paddingBottom: 20,
                borderBottom: "1px solid #f1f5f9",
              }}
            >
              <div>
                <div style={{ fontSize: 18, color: "#94a3b8", fontWeight: 600 }}>
                  Alokasi Dompet Otomatis
                </div>
                <div style={{ fontSize: 36, fontWeight: 800, color: textColor, marginTop: 4 }}>
                  Rp 10.000.000
                </div>
              </div>
              <div
                style={{
                  padding: "8px 16px",
                  borderRadius: 20,
                  backgroundColor: `${emeraldAccent}18`,
                  color: emeraldAccent,
                  fontSize: 18,
                  fontWeight: 700,
                }}
              >
                Tersinkron AI
              </div>
            </div>

            {/* 3 Finance Budget Cards with Staggered Elastic Bounce */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                {
                  title: "Kebutuhan Pokok (50%)",
                  amount: "Rp 5.000.000",
                  sub: "Kos, Makan, Tagihan Listrik",
                  tagColor: primaryColor,
                  delay: 175,
                },
                {
                  title: "Tabungan & Investasi (30%)",
                  amount: "Rp 3.000.000",
                  sub: "Dana Darurat & Reksadana",
                  tagColor: emeraldAccent,
                  delay: 200,
                },
                {
                  title: "Keinginan & Lifestyle (20%)",
                  amount: "Rp 2.000.000",
                  sub: "Kopi, Hiburan, Belanja",
                  tagColor: "#f59e0b",
                  delay: 225,
                },
              ].map((card, idx) => {
                const cardSpring = fluidSpring(card.delay, 12, 0.7);
                return (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: "#f8fafc",
                      borderRadius: 24,
                      padding: "22px 28px",
                      border: "1px solid #e2e8f0",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      transform: `translateX(${interpolate(cardSpring, [0, 1], [60, 0])}px)`,
                      opacity: interpolate(frame, [card.delay, card.delay + 10], [0, 1], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                      }),
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 22, fontWeight: 700, color: textColor }}>
                        {card.title}
                      </div>
                      <div style={{ fontSize: 18, color: "#64748b", marginTop: 4 }}>
                        {card.sub}
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: 24,
                        fontWeight: 800,
                        color: card.tagColor,
                        textAlign: "right",
                      }}
                    >
                      {card.amount}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* ================= SCENE 3: CTA / BRANDING (Detik 13 - 18 / Frame 380 - 540) ================= */}
      {frame >= 380 && (
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: "0 80px",
            opacity: interpolate(frame, [380, 400], [0, 1], { extrapolateRight: "clamp" }),
            transform: `scale(${interpolate(fluidSpring(385), [0, 1], [0.9, 1])})`,
          }}
        >
          {/* Sleek Alokasi 3D Logo with Floating Pulse */}
          <div
            style={{
              position: "relative",
              width: 150,
              height: 150,
              marginBottom: 44,
              transform: `translateY(${Math.sin((frame - 380) / 15) * 8}px)`,
            }}
          >
            {/* Glowing Pulse Aura */}
            <div
              style={{
                position: "absolute",
                inset: -20,
                borderRadius: 50,
                background: `radial-gradient(circle, ${primaryColor}40 0%, rgba(37,99,235,0) 70%)`,
                transform: `scale(${1 + Math.sin(frame / 12) * 0.08})`,
              }}
            />

            {/* Official Logo Image */}
            <Img
              src={staticFile("images/alokasi-logo.png")}
              style={{
                width: 150,
                height: 150,
                borderRadius: 42,
                boxShadow: `0 24px 50px ${primaryColor}40`,
                position: "relative",
              }}
            />
          </div>

          <h2
            style={{
              fontSize: 72,
              fontWeight: 800,
              textAlign: "center",
              color: textColor,
              lineHeight: 1.2,
              marginBottom: 16,
              letterSpacing: "-1px",
            }}
          >
            {brandDomain}
          </h2>

          <p
            style={{
              fontSize: 34,
              fontWeight: 600,
              color: emeraldAccent,
              textAlign: "center",
              lineHeight: 1.4,
              marginBottom: 50,
            }}
          >
            {brandSlogan}
          </p>

          {/* CTA Button */}
          <div
            style={{
              backgroundColor: primaryColor,
              color: "#ffffff",
              padding: "24px 60px",
              borderRadius: 40,
              fontSize: 32,
              fontWeight: 700,
              boxShadow: `0 16px 40px ${primaryColor}35`,
              display: "flex",
              alignItems: "center",
              gap: 16,
              transform: `scale(${fluidSpring(405)})`,
            }}
          >
            <span>Coba Sekarang Gratis</span>
            <span style={{ fontSize: 32 }}>→</span>
          </div>

          <div
            style={{
              marginTop: 36,
              fontSize: 24,
              color: "#94a3b8",
              fontWeight: 600,
            }}
          >
            Kunjungi alokasi.id
          </div>
        </AbsoluteFill>
      )}

      {/* Optional Audio Layers (Voiceover & Background Music) */}
      {audioVoiceover && <Audio src={staticFile(audioVoiceover)} volume={1} />}
      {audioMusic && <Audio src={staticFile(audioMusic)} volume={0.15} loop />}

      {/* Modern Bottom Progress Bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: 8,
          width: `${(frame / 540) * 100}%`,
          background: `linear-gradient(90deg, ${primaryColor}, ${emeraldAccent})`,
        }}
      />
    </div>
  );
};
