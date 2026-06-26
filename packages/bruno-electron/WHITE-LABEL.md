# White-label branding

Build Electron bisa di-rebrand per build tanpa harus ubah kode sumber.
Semua nilai branding dibaca dari environment variable saat build, lalu
disimpan ke `resources/white-label.json` supaya aplikasi hasil build tetap
memakai identitas yang sama saat runtime.

## Cara pakai cepat

```bash
# Contoh di macOS
WHITELABEL_PRODUCT_NAME="MyClient" \
WHITELABEL_APP_ID="com.example.myclient" \
WHITELABEL_PROTOCOL="myclient" \
WHITELABEL_PUBLISHER="Example Inc" \
WHITELABEL_COPYRIGHT_OWNER="Example Inc" \
WHITELABEL_GITHUB_URL="https://github.com/example/myclient/issues" \
  node scripts/build-electron.js
```

Atau simpan di file `.env`, lalu arahkan dengan `DOTENV_PATH`:

```bash
DOTENV_PATH=.env.myclient node scripts/build-electron.js
```

## Environment variable yang tersedia

| Variable | Default | Kegunaan |
|----------|---------|----------|
| `WHITELABEL_PRODUCT_NAME` | `PAKPOS` | Nama aplikasi, judul window, about window, label menu, nama protokol, nama installer |
| `WHITELABEL_APP_ID` | `com.pakpos.app` | macOS bundle ID / Windows ASID |
| `WHITELABEL_PROTOCOL` | `pakpos` | Custom URL scheme, misal `pakpos://` |
| `WHITELABEL_PUBLISHER` | `PAKPOS` | Nama publisher di Windows |
| `WHITELABEL_COPYRIGHT_OWNER` | `PAKPOS` | Baris copyright di installer dan about window |
| `WHITELABEL_GITHUB_URL` | `https://github.com/usebruno/bruno/issues` | Link report error yang muncul di console |
| `WHITELABEL_DESCRIPTION` | deskripsi dari `package.json` | Tagline di about window |
| `WHITELABEL_ICON_MAC` | `resources/icons/mac/icon.icns` | Icon aplikasi macOS |
| `WHITELABEL_ICON_WIN` | `resources/icons/win/icon.ico` | Icon aplikasi Windows |
| `WHITELABEL_ICON_LINUX` | `resources/icons/png` | Folder icon aplikasi Linux |
| `WHITELABEL_ABOUT_ICON` | `src/about/256x256.png` | Icon window/about |

## Mengganti icon

Cara paling mudah: timpa file-file di path default di atas.

Kalau mau tiap brand punya folder sendiri, arahkan lewat env var:

```bash
WHITELABEL_ICON_MAC="/path/to/myclient/icon.icns" \
WHITELABEL_ICON_WIN="/path/to/myclient/icon.ico" \
WHITELABEL_ICON_LINUX="/path/to/myclient/png" \
WHITELABEL_ABOUT_ICON="/path/to/myclient/256x256.png" \
  node scripts/build-electron.js
```

## Runtime config yang dihasilkan

`electron-builder-config.js` akan menulis `resources/white-label.json`
saat proses build berjalan. File ini dibaca saat runtime dan menangani
env var, jadi aplikasi hasil build berdiri sendiri tanpa bergantung pada
environment variable di mesin pengguna.

File `resources/white-label.json` sudah masuk `.gitignore`, jangan di-commit.

## Notarisasi macOS

Kalau `afterSign: 'notarize.js'` diaktifkan kembali, notarisasi sekarang
memakai `appId` dari white-label config dan ASC provider dari env var
`APPLE_ASC_PROVIDER`.
