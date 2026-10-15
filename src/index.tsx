import { registerRoot, Composition } from "remotion";
import React from "react";
import { PromoReels, promoReelsSchema } from "./compositions/PromoReels";
import defaultInput from "./configs/video-input.json";

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="PromoReels"
        component={PromoReels}
        schema={promoReelsSchema}
        durationInFrames={defaultInput.durationInFrames}
        fps={defaultInput.fps}
        width={defaultInput.width}
        height={defaultInput.height}
        defaultProps={{
          title: defaultInput.title,
          subtitle: defaultInput.subtitle,
          backgroundColor: defaultInput.backgroundColor,
          textColor: defaultInput.textColor,
          accentColor: defaultInput.accentColor,
        }}
      />
    </>
  );
};

registerRoot(Root);
