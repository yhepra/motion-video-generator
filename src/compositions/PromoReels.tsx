import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export interface PromoReelsProps {
  title: string;
  subtitle: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
}

export const PromoReels: React.FC<PromoReelsProps> = ({
  title,
  subtitle,
  backgroundColor,
  textColor,
  accentColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance animation using spring
  const scale = spring({
    frame,
    fps,
    config: {
      damping: 12,
    },
  });

  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  const subtitleOffset = interpolate(frame, [15, 35], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        flex: 1,
        backgroundColor,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          opacity,
          color: textColor,
          fontSize: 72,
          fontWeight: 800,
          textAlign: "center",
          marginBottom: 24,
          lineHeight: 1.2,
        }}
      >
        {title}
      </div>

      <div
        style={{
          opacity: interpolate(frame, [20, 40], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          transform: `translateY(${subtitleOffset}px)`,
          color: accentColor,
          fontSize: 36,
          fontWeight: 600,
          textAlign: "center",
        }}
      >
        {subtitle}
      </div>
    </div>
  );
};
