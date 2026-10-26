// ==========================================
// JB KULINER - JAVASCRIPT
// ==========================================

const WHATSAPP_NUMBER = "62881025467022";

const menuData = [
  { id: 1, name: "Nasi Goreng Jawa", category: "Khas Jawa", type: "Makanan", price: 18000, description: "Nasi goreng berbumbu dengan cita rasa gurih.", image: "./images/nasi-goreng.jpg" },
  { id: 2, name: "Sate Ayam", category: "Khas Jawa", type: "Makanan", price: 22000, description: "Sate ayam dengan bumbu kacang yang nikmat.", image: "./images/sate-ayam.jpg" },
  { id: 3, name: "Gudeg Jogja", category: "Khas Jawa", type: "Makanan", price: 20000, description: "Gudeg manis gurih dengan pelengkap tradisional.", image: "./images/gudeg.jpg" },
  { id: 4, name: "Rawon", category: "Khas Jawa", type: "Makanan", price: 25000, description: "Sup daging dengan kuah kluwek yang khas.", image: "./images/rawon.jpg" },
  { id: 5, name: "Soto Ayam", category: "Khas Jawa", type: "Makanan", price: 18000, description: "Soto hangat dengan ayam dan rempah pilihan.", image: "./images/soto-ayam.jpg" },
  { id: 6, name: "Bakso Kuah", category: "Khas Jawa", type: "Makanan", price: 17000, description: "Bakso kenyal dalam kuah gurih yang hangat.", image: "./images/bakso.jpg" },
  { id: 7, name: "Ayam Betutu", category: "Khas Bali", type: "Makanan", price: 32000, description: "Ayam berbumbu rempah khas Pulau Dewata.", image: "./images/ayam-betutu.jpg" },
  { id: 8, name: "Sate Lilit Bali", category: "Khas Bali", type: "Makanan", price: 26000, description: "Sate lilit dengan racikan bumbu Bali.", image: "./images/sate-lilit.jpg" },
  { id: 9, name: "Nasi Campur Bali", category: "Khas Bali", type: "Makanan", price: 28000, description: "Nasi dengan aneka lauk bercita rasa Bali.", image: "./images/nasi-campur.jpg" },
  { id: 10, name: "Lawar Bali", category: "Khas Bali", type: "Makanan", price: 24000, description: "Hidangan tradisional dengan racikan bumbu khas.", image: "./images/lawar.jpg" },
  { id: 11, name: "Tipat Cantok", category: "Khas Bali", type: "Makanan", price: 16000, description: "Ketupat dan sayuran dengan saus kacang.", image: "./images/tipat-cantok.jpg" },
  { id: 12, name: "Pisang Goreng", category: "Camilan", type: "Camilan", price: 12000, description: "Pisang goreng hangat dengan tekstur renyah.", image: "./images/pisang-goreng.jpg" },
  { id: 13, name: "Klepon", category: "Camilan", type: "Camilan", price: 10000, description: "Kue tradisional berisi gula merah dan kelapa.", image: "./images/klepon.jpg" },
  { id: 14, name: "Lumpia", category: "Camilan", type: "Camilan", price: 14000, description: "Lumpia renyah dengan isian gurih.", image: "./images/lumpia.jpg" },
  { id: 15, name: "Es Teh Manis", category: "Minuman", type: "Minuman", price: 5000, description: "Teh manis dingin untuk menemani santapan.", image: "./images/es-teh.jpg" },
  { id: 16, name: "Es Jeruk", category: "Minuman", type: "Minuman", price: 8000, description: "Minuman jeruk segar dengan rasa alami.", image: "./images/es-jeruk.jpg" },
  { id: 17, name: "Wedang Jahe", category: "Minuman", type: "Minuman", price: 10000, description: "Minuman jahe hangat dengan aroma rempah.", image: "./images/wedang-jahe.jpg" },
  { id: 18, name: "Es Kelapa", category: "Minuman", type: "Minuman", price: 12000, description: "Kelapa muda segar yang cocok diminum siang hari.", image: "./images/es-kelapa.jpg" }
];

const menuGrid = document.getElementById("menu-grid");
const searchInput = document.getElementById("search-input");
const categoryButtons = document.querySelectorAll(".category");
const menuTotal = document.getElementById("menu-total");
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const toast = document.getElementById("toast");

let activeCategory = "Semua";
let cart = {};
let toastTimeout;

function rupiah(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(amount);
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

function renderMenu() {
  const keyword = searchInput.value.trim().toLowerCase();

  const filtered = menuData.filter(item => {
    const matchesCategory =
      activeCategory === "Semua" ||
      item.category === activeCategory ||
      item.type === activeCategory;

    const matchesSearch =
      item.name.toLowerCase().includes(keyword) ||
      item.description.toLowerCase().includes(keyword) ||
      item.category.toLowerCase().includes(keyword);

    return matchesCategory && matchesSearch;
  });

  menuTotal.textContent = `${filtered.length} menu tersedia`;

  if (!filtered.length) {
    menuGrid.innerHTML = `
      <div class="empty-menu">
        <h3>Menu belum ditemukan 🔎</h3>
        <p>Coba kata kunci atau kategori lain.</p>
      </div>`;
    return;
  }

  // Pake gambar cadangan biar ga ngebug
  menuGrid.innerHTML = filtered.map(item => `
    <article class="menu-card">
      <div class="menu-image-wrap">
        <img class="menu-image"
          src="${item.image}"
          alt="${escapeHTML(item.name)}"
          loading="lazy"
          onerror="this.onerror=null; this.src='https://placehold.co/700x500?text=Foto+Menu';">
        <span class="menu-tag">${escapeHTML(item.category)}</span>
      </div>
      <div class="menu-info">
        <h3>${escapeHTML(item.name)}</h3>
        <p class="menu-description">${escapeHTML(item.description)}</p>
        <div class="menu-bottom">
          <span class="menu-price">${rupiah(item.price)}</span>
          <button class="add-button" data-add="${item.id}"
            aria-label="Tambah ${escapeHTML(item.name)}">+</button>
        </div>
      </div>
    </article>
  `).join("");
}

function getCartQuantity() {
  return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
}

function getCartTotal() {
  return Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = menuData.find(menu => menu.id === Number(id));
    return sum + (item ? item.price * qty : 0);
  }, 0);
}

function renderCart() {
  cartCount.textContent = getCartQuantity();
  cartTotal.textContent = rupiah(getCartTotal());

  const entries = Object.entries(cart).filter(([, qty]) => qty > 0);

  if (!entries.length) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        <p style="font-size:34px">🛒</p>
        <p>Keranjangmu masih kosong.</p>
        <p>Yuk, pilih menu favoritmu!</p>
      </div>`;
    return;
  }

  cartItems.innerHTML = entries.map(([id, qty]) => {
    const item = menuData.find(menu => menu.id === Number(id));
    if (!item) return "";

    return `
      <div class="cart-item">
        <div>
          <h3>${escapeHTML(item.name)}</h3>
          <p>${rupiah(item.price * qty)}</p>
        </div>
        <div class="cart-controls">
          <button data-change="-1" data-id="${item.id}">−</button>
          <span>${qty}</span>
          <button data-change="1" data-id="${item.id}">+</button>
        </div>
      </div>`;
  }).join("");
}

function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  renderCart();

  const item = menuData.find(menu => menu.id === id);
  showToast(`${item.name} ditambahkan ke keranjang`);
}

function changeQuantity(id, change) {
  cart[id] = (cart[id] || 0) + change;
  if (cart[id] <= 0) delete cart[id];
  renderCart();
}

function openCart() {
  document.body.classList.add("cart-open");
}

function closeCart() {
  document.body.classList.remove("cart-open");
}

// ==========================================
// PENGIRIMAN PESAN KE WHATSAPP
// ==========================================

function sendWhatsApp(message) {
  const number = WHATSAPP_NUMBER.replace(/\D/g, "");

  if (!number || number.length < 10) {
    alert("Nomor WhatsApp tujuan belum benar.");
    return;
  }

  const url =
    "https://wa.me/" +
    number +
    "?text=" +
    encodeURIComponent(message);

  window.open(url, "_blank");
}

// Tambah menu ke keranjang.
menuGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-add]");
  if (button) addToCart(Number(button.dataset.add));
});

// Filter kategori.
categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.category;

    categoryButtons.forEach(category => {
      category.classList.toggle("active", category === button);
    });

    renderMenu();
  });
});

// Pencarian menu.
searchInput.addEventListener("input", renderMenu);

// Buka dan tutup keranjang.
document.getElementById("cart-button").addEventListener("click", openCart);
document.getElementById("close-cart").addEventListener("click", closeCart);
document.getElementById("cart-overlay").addEventListener("click", closeCart);

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeCart();
});

// Ubah jumlah pesanan.
cartItems.addEventListener("click", event => {
  const button = event.target.closest("[data-change]");
  if (!button) return;

  changeQuantity(
    Number(button.dataset.id),
    Number(button.dataset.change)
  );
});

// Checkout keranjang.
document.getElementById("checkout-button").addEventListener("click", () => {
  const entries = Object.entries(cart).filter(([, qty]) => qty > 0);

  if (!entries.length) {
    showToast("Keranjang masih kosong.");
    return;
  }

  const lines = entries.map(([id, qty]) => {
    const item = menuData.find(menu => menu.id === Number(id));
    return `- ${item.name} x${qty}: ${rupiah(item.price * qty)}`;
  });

  const message = [
    "Halo JB Kuliner, saya ingin memesan:",
    "",
    ...lines,
    "",
    `Total: ${rupiah(getCartTotal())}`,
    "",
    "Mohon konfirmasi pesanan saya. Terima kasih."
  ].join("\n");

  sendWhatsApp(message);
});

// Atur tanggal minimum reservasi.
const dateInput = document.getElementById("reservation-date");
if (dateInput) {
  dateInput.min = new Date(
    Date.now() - new Date().getTimezoneOffset() * 60000
  ).toISOString().slice(0, 10);
}

// Kirim detail reservasi ke WhatsApp.
const reservationForm = document.getElementById("reservation-form");
if (reservationForm) {
  reservationForm.addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("customer-name").value.trim();
    const guests = document.getElementById("guest-count").value;
    const table = document.getElementById("table-type").value;
    const date = dateInput.value;
    const time = document.getElementById("reservation-time").value;
    const note = document.getElementById("reservation-note").value.trim();

    if (!name || !date || !time) {
      showToast("Lengkapi nama, tanggal, dan jam reservasi.");
      return;
    }

    const message = [
      "Halo JB Kuliner, saya ingin mengajukan reservasi meja.",
      "",
      `Nama: ${name}`,
      `Jumlah orang: ${guests}`,
      `Pilihan meja: ${table}`,
      `Tanggal: ${date}`,
      `Jam: ${time}`,
      `Catatan: ${note || "-"}`,
      "",
      "Mohon konfirmasi ketersediaan meja. Terima kasih."
    ].join("\n");

    sendWhatsApp(message);
  });
}

// Tahun footer
const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Tampilkan menu dan keranjang saat pertama diload
renderMenu();
renderCart();
