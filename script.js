/**
 * JBKULINER - JAVASCRIPT LOGIC
 */

let currentProduct = {
  name: '',
  price: 0,
  qty: 1,
  img: ''
};

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMenuFilter();
  initQuickReservation();
  initReservationForm();
});

/* ==========================================
   1. NAVBAR & MOBILE MENU TOGGLE
   ========================================== */
function initNavbar() {
  const toggleBtn = document.getElementById('mobile-toggle-btn');
  const navMenu = document.getElementById('nav-menu');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
      if (navMenu.style.display === 'flex') {
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '100%';
        navMenu.style.left = '0';
        navMenu.style.width = '100%';
        navMenu.style.background = '#080808';
        navMenu.style.padding = '1.5rem';
        navMenu.style.borderBottom = '1px solid #262626';
      }
    });
  }
}

/* ==========================================
   2. QUICK RESERVATION BAR LOGIC
   ========================================== */
function initQuickReservation() {
  const form = document.getElementById('quick-res-form');
  if (form) {
    const dateInput = document.getElementById('quick-date');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.min = today;
      dateInput.value = today;
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const guests = document.getElementById('quick-guests').value;
      const date = document.getElementById('quick-date').value;
      const time = document.getElementById('quick-time').value;

      showToast(`Meja untuk ${guests} tamu pada ${date} pukul ${time} berhasil dicari.`);
      document.getElementById('kontak').scrollIntoView({ behavior: 'smooth' });
    });
  }
}

/* ==========================================
   3. FILTER MENU KATEGORI (JAWA & BALI)
   ========================================== */
function initMenuFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      menuCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================
   4. MODAL PESAN MENU & WHATSAPP
   ========================================== */
function openOrderModal(name, price, img) {
  currentProduct = { name, price, qty: 1, img };

  const modal = document.getElementById('orderModal');
  document.getElementById('modalProductName').textContent = name;
  document.getElementById('modalProductPrice').textContent = formatRupiah(price);
  document.getElementById('modalProductImg').src = img;
  document.getElementById('modalQtyInput').value = 1;
  document.getElementById('modalTotalPrice').textContent = formatRupiah(price);

  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeOrderModal() {
  const modal = document.getElementById('orderModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function changeModalQty(change) {
  let newQty = currentProduct.qty + change;
  if (newQty < 1) newQty = 1;
  if (newQty > 50) newQty = 50;

  currentProduct.qty = newQty;
  document.getElementById('modalQtyInput').value = newQty;

  const total = currentProduct.price * newQty;
  document.getElementById('modalTotalPrice').textContent = formatRupiah(total);
}

function sendOrderViaWhatsApp() {
  const total = currentProduct.price * currentProduct.qty;
  const message = `Halo JBKuliner, saya ingin memesan:\n` +
                  `- Menu: *${currentProduct.name}*\n` +
                  `- Jumlah: *${currentProduct.qty} porsi*\n` +
                  `- Total: *${formatRupiah(total)}*\n\n` +
                  `Mohon informasikan proses pemesanan selanjutnya. Terima kasih!`;

  const waUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
  
  closeOrderModal();
  showToast(`Mengarahkan pesanan ${currentProduct.name} ke WhatsApp...`);

  setTimeout(() => {
    window.open(waUrl, '_blank');
  }, 500);
}

/* ==========================================
   5. FORMULIR RESERVASI UTAMA
   ========================================== */
function initReservationForm() {
  const form = document.getElementById('reservation-form');
  if (form) {
    const dateInput = document.getElementById('res-date');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.min = today;
      dateInput.value = today;
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('res-name').value.trim();
      const guests = document.getElementById('res-guests').value;
      const date = document.getElementById('res-date').value;
      const time = document.getElementById('res-time').value;

      if (!name) {
        showToast('Mohon masukkan nama lengkap Anda.');
        return;
      }

      showToast(`Terima kasih ${name}! Reservasi meja untuk ${guests} pada ${date} (${time}) berhasil dikirim.`);
      form.reset();
    });
  }
}

/* ==========================================
   6. HELPER FUNCTIONS
   ========================================== */
function formatRupiah(number) {
  return 'Rp ' + Number(number).toLocaleString('id-ID');
}

function showToast(message) {
  const toast = document.getElementById('toastMsg');
  const toastText = document.getElementById('toastText');

  if (toast && toastText) {
    toastText.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }
}
