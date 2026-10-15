"""
Script untuk generate voiceover AlokasiStory menggunakan VoxCPM2
Repo: https://github.com/OpenBMB/VoxCPM
Model: openbmb/VoxCPM2

Instalasi dependensi (Python >= 3.10, PyTorch dengan CUDA):
    pip install voxcpm soundfile

Jalankan:
    python src/scripts/generate_voxcpm.py
"""

import os
from voxcpm import VoxCPM
import soundfile as sf

def main():
    output_dir = os.path.join(os.path.dirname(__file__), "..", "..", "public", "audio")
    os.makedirs(output_dir, exist_ok=True)
    output_path = os.path.join(output_dir, "alokasi-voiceover.wav")

    print("Memuat model VoxCPM2...")
    model = VoxCPM.from_pretrained("openbmb/VoxCPM2", load_denoiser=False)

    # Naskah Voiceover 18 detik disesuaikan dengan 3 Scene AlokasiStory:
    # Scene 1 (0-5s): Hook Masalah
    # Scene 2 (5-13s): Solusi Budgeting
    # Scene 3 (13-18s): Call to Action
    prompt_text = (
        "(Suara pria muda Indonesia, ramah, energik, profesional, artikulasi jelas) "
        "Tiap akhir bulan, gaji masuk langsung habis? "
        "Saatnya pakai Alokasi. Otomatisasi budgeting: kebutuhan pokok lima puluh persen, "
        "tabungan tiga puluh persen, dan keinginan dua puluh persen. "
        "Kelola keuangan lebih tenang bersama Alokasi. Coba sekarang gratis di alokasi titik id!"
    )

    print("Menghasilkan audio dengan Voice Design...")
    wav = model.generate(
        text=prompt_text,
        cfg_value=2.0,
        inference_timesteps=10,
        seed=42,
    )

    sf.write(output_path, wav, model.tts_model.sample_rate)
    print(f"Berhasil disimpan ke: {output_path}")

if __name__ == "__main__":
    main()
