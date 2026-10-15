import { Composition } from "remotion";
import React from "react";
import { PromoReels, promoReelsSchema } from "./compositions/PromoReels";
import {
  AlokasiPromo,
  alokasiPromoSchema,
} from "./compositions/AlokasiPromo";
import {
  AlokasiStory,
  alokasiStorySchema,
} from "./compositions/AlokasiStory";

export const Root: React.FC = () => {
  return (
    <>
      {/* Alokasi 18-second Video Story (VO Aligned, 540 frames @ 30fps) */}
      <Composition
        id="AlokasiStory"
        component={AlokasiStory}
        schema={alokasiStorySchema}
        durationInFrames={540}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          brandDomain: "alokasi.id",
          brandSlogan: "Kelola Keuangan Lebih Tenang.",
          primaryColor: "#2563eb",
          emeraldAccent: "#059669",
          textColor: "#1e293b",
          bgWhite: "#f9fafb",
        }}
      />

      {/* Alokasi AI Statement Scan Promo (Reels 9:16 - 10s @ 30fps) */}
      <Composition
        id="AlokasiPromo"
        component={AlokasiPromo}
        schema={alokasiPromoSchema}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          brandName: "Alokasi",
          tagline: "Platform pencatatan keuangan pintar dengan AI.",
          primaryColor: "#2563eb",
          accentBlue: "#38bdf8",
          lightBg: "#f8fafc",
          ctaText: "Mulai Gratis Sekarang",
        }}
      />

      {/* Starter Promo Template */}
      <Composition
        id="PromoReels"
        component={PromoReels}
        schema={promoReelsSchema}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          title: "Welcome to Motion Generator",
          subtitle: "Dibuat langsung via prompt & kode",
          backgroundColor: "#0f172a",
          textColor: "#38bdf8",
          accentColor: "#f43f5e",
        }}
      />
    </>
  );
};
