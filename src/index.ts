import { registerRoot, Composition } from "remotion";
import React from "react";
import { PromoReels } from "./compositions/PromoReels.js";
import defaultInput from "./configs/video-input.json" with { type: "json" };

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="PromoReels"
        component={PromoReels}
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
