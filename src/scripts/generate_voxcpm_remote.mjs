import { Client } from "@gradio/client";
import fs from "node:fs";
import path from "node:path";
import https from "node:https";

// Bypass corporate proxy TLS verification for download if needed
const agent = new https.Agent({
  rejectUnauthorized: false
});

async function main() {
  console.log("Menghubungkan ke VoxCPM2 di Hugging Face Space...");
  const client = await Client.connect("https://openbmb-voxcpm-demo.hf.space");

  const targetText =
    "Tiap akhir bulan, gaji masuk langsung habis? Selalu bingung uang lari ke mana tanpa jejak. " +
    "Saatnya pakai Alokasi! Otomatisasi budgeting: kebutuhan pokok lima puluh persen, " +
    "tabungan tiga puluh persen, dan gaya hidup dua puluh persen. " +
    "Kelola keuangan lebih tenang bersama Alokasi. Coba sekarang gratis di alokasi titik id!";

  const controlInstruction = "Suara pria muda Indonesia, ramah, artikulasi jelas, tempo stabil dan profesional.";

  console.log("Mengirim request ke VoxCPM2 /generate...");
  console.log("Teks:", targetText);
  console.log("Kontrol Suara:", controlInstruction);

  const result = await client.predict("/generate", {
    text_input: targetText,
    control_instruction: controlInstruction,
    reference_wav_path_input: null,
    use_prompt_text: false,
    prompt_text_input: "",
    cfg_value_input: 2.0,
    do_normalize: false,
    denoise: false,
  });

  console.log("Hasil dari VoxCPM:", JSON.stringify(result.data, null, 2));

  const audioInfo = result.data[0];
  let downloadUrl = "";
  if (typeof audioInfo === "string") {
    downloadUrl = audioInfo;
  } else if (audioInfo && audioInfo.url) {
    downloadUrl = audioInfo.url;
  }

  if (!downloadUrl) {
    throw new Error("Gagal mendapatkan URL audio dari VoxCPM: " + JSON.stringify(result.data));
  }

  console.log("Mengunduh file audio dari:", downloadUrl);
  const outDir = path.resolve(process.cwd(), "public/audio");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  const outFile = path.join(outDir, "alokasi-voiceover.wav");

  // Fetch file
  const res = await fetch(downloadUrl, {
    // node 18+ fetch
  });

  if (!res.ok) {
    throw new Error(`Gagal download: ${res.statusText}`);
  }

  const arrayBuffer = await res.arrayBuffer();
  fs.writeFileSync(outFile, Buffer.from(arrayBuffer));
  console.log("Berhasil menyimpan voiceover ke:", outFile);
}

main().catch((err) => {
  console.error("Error generating voiceover:", err);
  process.exit(1);
});
