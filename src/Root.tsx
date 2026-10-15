import { Composition } from "remotion";
import React from "react";
import { PromoReels, promoReelsSchema } from "./compositions/PromoReels";

export const Root: React.FC = () => {
  return (
    <>
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
