import path from "node:path";
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import inputConfig from "../configs/video-input.json" with { type: "json" };

async function main() {
  console.log("Menyiapkan bundle video...");
  const entryPoint = path.resolve(process.cwd(), "src/index.ts");
  const bundled = await bundle({
    entryPoint,
  });

  const compositionId = "PromoReels";
  console.log(`Mengambil komposisi "${compositionId}"...`);
  const composition = await selectComposition({
    serveUrl: bundled,
    id: compositionId,
    inputProps: inputConfig,
  });

  const outputLocation = path.resolve(process.cwd(), "outputs/video.mp4");
  console.log(`Mulai merender video ke ${outputLocation}...`);

  await renderMedia({
    composition,
    serveUrl: bundled,
    codec: "h264",
    outputLocation,
    inputProps: inputConfig,
    onProgress: ({ progress }) => {
      console.log(`Render progress: ${(progress * 100).toFixed(1)}%`);
    },
  });

  console.log(`Selesai! File video tersimpan di: ${outputLocation}`);
}

main().catch((err) => {
  console.error("Gagal melakukan render:", err);
  process.exit(1);
});
