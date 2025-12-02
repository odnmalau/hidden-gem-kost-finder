# Hidden Gem Kost Finder

Aplikasi pencari kost sederhana berbasis web (React) yang fokus menemukan tempat kost "warga" (non-premium) menggunakan data Google Maps via SerpApi.

Didesain dengan gaya "Zine/Editorial" yang unik dan mobile-first.

## Fitur Utama

*   Smart Search: Cukup ketik nama daerah/kampus (misal: "Binus", "Tebet"), sistem otomatis mencari kost di area tersebut.
*   Anti-Zonk Filter: Filter otomatis untuk menyembunyikan kost dengan rating rendah.
*   Mobile-First Design: Tampilan dioptimalkan untuk layar HP, tapi tetap cantik di desktop.
*   Session Limit: Proteksi kuota API dengan membatasi pencarian maksimal 5x per sesi (refresh untuk reset).

## Cara Menjalankan

1.  Clone & Install:
    ```bash
    git clone <repo-url>
    cd hidden-gem-kost-finder
    bun install
    ```

2.  Setup API Key:
    Buat file .env di root folder dan masukkan API Key SerpApi Anda (Daftar gratis di serpapi.com):
    ```env
    VITE_SERPAPI_KEY=masukkan_api_key_anda_disini
    ```

3.  Jalankan:
    ```bash
    bun run dev
    ```
    Buka http://localhost:5173 di browser.

## Tech Stack

*   Frontend: React (Vite)
*   Styling: Tailwind CSS
*   Fonts: Playfair Display, DM Sans, Bricolage Grotesque
*   API: SerpApi (Google Maps Engine)
*   HTTP Client: Axios

---
Dibuat untuk menemukan kost nyaman tanpa ribet.
