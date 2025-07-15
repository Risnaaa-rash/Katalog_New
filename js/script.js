document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("promptForm");
  const promptOutput = document.getElementById("promptOutput");

  // Toggle tampilan link hero image
  const heroCheckbox = document.getElementById("heroImage");
  const heroLinkContainer = document.getElementById("heroImageLinkContainer");

  heroCheckbox.addEventListener("change", function () {
    if (this.checked) {
      heroLinkContainer.classList.remove("hidden");
    } else {
      heroLinkContainer.classList.add("hidden");
      document.getElementById("heroImageLink").value = "";
    }
  });

  // Format link Google Drive menjadi link gambar
  function formatGoogleDriveLink(link) {
    if (!link) return "";
    const match = link.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://lh3.googleusercontent.com/d/${match[1]}`;
    }
    return "Link Google Drive tidak valid";
  }

  // Event saat form disubmit
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Ambil semua input
    const namaProduk = document.getElementById("namaProduk").value.trim();
    const kategoriProduk = document.getElementById("kategoriProduk").value;
    const bahan = document.getElementById("bahan").value.trim();
    const ukuranTersedia = document.getElementById("ukuranTersedia").value.trim();
    const warnaTersedia = document.getElementById("warnaTersedia").value.trim();
    const hargaProduk = document.getElementById("hargaProduk").value.trim();
    const deskripsiProduk = document.getElementById("deskripsiProduk").value.trim();
    const gayaBahasa = document.getElementById("gayaBahasa").value;
    const fotoProdukLink = formatGoogleDriveLink(document.getElementById("fotoProdukLink").value.trim());
    const lokasi = document.getElementById("lokasi").value.trim();
    const temaWarna = document.getElementById("temaWarna").value;
    const gayaVisual = document.getElementById("gayaVisual").value;

    // Cek elemen website
    let elemenWebsite = [];
    if (heroCheckbox.checked) {
      const heroImageFormatted = formatGoogleDriveLink(document.getElementById("heroImageLink").value.trim());
      elemenWebsite.push(`- Hero image Produk Unggulan: ${heroImageFormatted}`);
    }

    // Awal prompt
    let prompt = `Saya ingin kamu bertindak sebagai seorang frontend developer profesional yang membuat website Katalog Fashion digital. Website ini harus memiliki desain yang modern, elegan, dan responsif (mobile-first & mode Dekstop). Gunakan efek animasi halus saat scroll, parallax ringan, serta transisi yang lembut. Tombol aksi akan muncul secara bertahap. Website mencakup beberapa bagian utama seperti:\n\n`;

    // Detail produk
    prompt += `Detail Produk:\n`;
    if (namaProduk) prompt += `- Nama Produk: ${namaProduk}\n`;
    if (kategoriProduk) prompt += `- Kategori Produk: ${kategoriProduk}\n`;
    if (bahan) prompt += `- Bahan: ${bahan}\n`;
    if (ukuranTersedia) prompt += `- Ukuran yang tersedia: ${ukuranTersedia}\n`;
    if (warnaTersedia) prompt += `- Warna yang tersedia: ${warnaTersedia}\n`;
    if (hargaProduk) prompt += `- Harga Produk: ${hargaProduk}\n`;
    if (deskripsiProduk) prompt += `- Deskripsi Singkat / Keunggulan Produk: ${deskripsiProduk}\n`;
    if (gayaBahasa) prompt += `- Gaya Bahasa Katalog: ${gayaBahasa}\n`;
    if (fotoProdukLink) prompt += `- Foto Produk: ${fotoProdukLink}\n`;
    if (lokasi) prompt += `- Lokasi: ${lokasi}\n`;

    // Detail website
    prompt += `\nDetail Website:\n`;
    if (temaWarna) prompt += `- Tema Warna Website: ${temaWarna}\n`;
    if (gayaVisual) prompt += `- Gaya Visual Website: ${gayaVisual}\n`;
    if (elemenWebsite.length > 0) {
      prompt += `- Elemen yang ingin ditampilkan di website:\n${elemenWebsite.join("\n")}\n`;
    }

    // Outputkan hasilnya
    promptOutput.textContent = prompt;
  });
});
