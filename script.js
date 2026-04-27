// ====== FORMAT RUPIAH ======
function formatRupiah(angka) {
  return angka.toLocaleString("id-ID");
}

// ====== GET CART ======
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// ====== SAVE CART ======
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ====== Keranjang Belanja ======
let cart = [];

// ====== KERANJANG ======
function addToCartPromo(name, price, index) {
  const colorEl = document.getElementById(`color-${index}`);
  const sizeEl = document.getElementById(`size-${index}`);

  let color = colorEl ? colorEl.value : "";
  let size = sizeEl ? sizeEl.value : "";

  if (colorEl && !color) {
    alert("Silakan pilih warna terlebih dahulu!");
    return;
  }

  if (sizeEl && !size) {
    alert("Silakan pilih size terlebih dahulu!");
    return;
  }

  let cart = getCart();

  cart.push({
    name,
    price,
    color: color || null,
    size: size || null,
    qty: 1
  });

  saveCart(cart);
  updateCartIcon();

  let detail = name;
  if (color) detail += ` (Warna: ${color})`;
  if (size) detail += ` (Size: ${size})`;

  alert(`${detail} ditambahkan ke keranjang dengan harga promo!`);
}

// ====== UPDATE ICON CART ======
function updateCartIcon() {
  let cart = getCart();
  const el = document.getElementById("cart-count");

  if (el) {
    let total = cart.reduce((sum, i) => sum + i.qty, 0);
    el.textContent = total;
  }
}

// ====== TAMPILKAN CART ======
function displayPromo() {
  const container = document.getElementById("promo-items");
  container.innerHTML = "";

  promoProducts.forEach((item, index) => {
    // dropdown warna
    let colorSelect = "";
    if (item.colors) {
      const colorOptions = item.colors.map(c => `<option value="${c}">${c}</option>`).join("");
      colorSelect = `
        <label for="color-${index}">Pilih Warna:</label>
        <select id="color-${index}" class="promo-select">
          <option value="">-- Pilih Warna --</option>
          ${colorOptions}
        </select>
      `;
    }

    // dropdown size
    let sizeSelect = "";
    if (item.sizes) {
      const sizeOptions = item.sizes.map(s => `<option value="${s}">${s}</option>`).join("");
      sizeSelect = `
        <label for="size-${index}">Pilih Size:</label>
        <select id="size-${index}" class="promo-select">
          <option value="">-- Pilih Size --</option>
          ${sizeOptions}
        </select>
      `;
    }

    container.innerHTML += `
      <div class="promo-card">
        <img id="promo-img-${index}" src="${item.images[0]}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p><del>Rp ${item.price}</del> <strong>Rp ${item.promoPrice}</strong></p>
        <div class="promo-options">
          ${colorSelect}
          ${sizeSelect}
        </div>
        <button onclick="addToCartPromo('${item.name}', ${item.promoPrice}, ${index})">Learn More</button>
      </div>
    `;
  });
}

// ====== HAPUS / KURANGI ======
function removeItem(index) {
  let cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  displayCart();
  updateCartIcon();
}

function reduceItem(index) {
  let cart = getCart();

  if (cart[index].qty > 1) {
    cart[index].qty--;
  } else {
    cart.splice(index, 1);
  }

  saveCart(cart);
  displayCart();
  updateCartIcon();
}

// ====== CHECKOUT ======
function checkout() {
  let cart = getCart();

  if (cart.length === 0) {
    alert("Keranjang kosong!");
    return;
  }

  let total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  localStorage.setItem("checkoutTotal", total);
  window.location.href = "checkout.html";
}

// ====== PROSES PEMBAYARAN ======
function processPayment(event) {
  event.preventDefault();

  const selected = document.querySelector('input[name="payment"]:checked');

  if (!selected) {
    alert("Pilih metode pembayaran!");
    return;
  }

  const method = selected.value;
  let total = parseInt(localStorage.getItem("checkoutTotal")) || 0;

  if (total === 0) {
    alert("Keranjang kosong!");
    return;
  }

  localStorage.setItem("paymentMethod", method);

  if (method === "transfer") {
    const bank = document.getElementById("bank-name")?.value || "BCA";
    localStorage.setItem("bankName", bank);
  }

  if (method === "cod") {
    const address = document.getElementById("address")?.value.trim();
    if (!address) {
      alert("Alamat wajib diisi!");
      return;
    }
    localStorage.setItem("codAddress", address);
  }

  window.location.href = "order-confirmation.html";
}

// ====== PRODUK ======
const PRODUCTS = {
  shirt: [
    {name:"Shirt 1",price:1000000,img:"img/shirt1.jpg",sizes:["S","M","L","XL"]},
    {name:"Shirt 2",price:600000,img:"img/shirt2.jpg",sizes:["S","M","L","XL"]},
    {name:"Shirt 3",price:500000,img:"img/shirt3.jpg",sizes:["S","M","L","XL"]},
    {name:"Shirt 4",price:350000,img:"img/shirt4.jpg",sizes:["S","M","L","XL"]},
    {name:"Shirt 5",price:400000,img:"img/shirt5.jpg",sizes:["S","M","L","XL"]},
    {name:"Shirt 6",price:800000,img:"img/shirt6.jpg",sizes:["S","M","L","XL"]},
    {name:"Shirt 7",price:800000,img:"img/shirt7.jpg",sizes:["S","M","L","XL"]},
    {name:"Shirt 8",price:1200000,img:"img/shirt8.jpg",sizes:["S","M","L","XL"]},
    {name:"Shirt 9",price:500000,img:"img/shirt9.jpg",sizes:["S","M","L","XL"]},
    {name:"Shirt 10",price:650000,img:"img/shirt10.jpg",sizes:["S","M","L","XL"]},
    {name:"Shirt 11",price:600000,img:"img/shirt11.jpg",sizes:["S","M","L","XL"]},
    {name:"Shirt 12",price:550000,img:"img/shirt12.jpg",sizes:["S","M","L","XL"]}
  ],

  pants: [
    {name:"Pants 1",price:150000,img:"img/pants1.jpg",sizes:["28","30","32","34"]},
    {name:"Pants 2",price:170000,img:"img/pants2.jpg",sizes:["28","30","32","34"]},
    {name:"Pants 3",price:180000,img:"img/pants3.jpg",sizes:["28","30","32","34"]},
    {name:"Pants 4",price:190000,img:"img/pants4.jpg",sizes:["28","30","32","34"]},
    {name:"Pants 5",price:200000,img:"img/pants5.jpg",sizes:["28","30","32","34"]},
    {name:"Pants 6",price:210000,img:"img/pants6.jpg",sizes:["28","30","32","34"]},
    {name:"Pants 7",price:220000,img:"img/pants7.jpg",sizes:["28","30","32","34"]},
    {name:"Pants 8",price:230000,img:"img/pants8.jpg",sizes:["28","30","32","34"]},
    {name:"Pants 9",price:240000,img:"img/pants9.jpg",sizes:["28","30","32","34"]},
    {name:"Pants 10",price:250000,img:"img/pants10.jpg",sizes:["28","30","32","34"]},
    {name:"Pants 11",price:300000,img:"img/pants11.jpg",sizes:["28","30","32","34"]},
    {name:"Pants 12",price:350000,img:"img/pants12.jpg",sizes:["28","30","32","34"]}
  ],

  bags: [
    {name:"Bags 1",price:250000,img:"img/bags1.jpg"},
    {name:"Bags 2",price:480000,img:"img/bags2.jpg"},
    {name:"Bags 3",price:280000,img:"img/bags3.jpg"},
    {name:"Bags 4",price:380000,img:"img/bags4.jpg"},
    {name:"Bags 5",price:500000,img:"img/bags5.jpg"},
    {name:"Bags 6",price:250000,img:"img/bags6.jpg"},
    {name:"Bags 7",price:250000,img:"img/bags7.jpg"},
    {name:"Bags 8",price:550000,img:"img/bags8.jpg"},
    {name:"Bags 9",price:520000,img:"img/bags9.jpg"},
    {name:"Bags 10",price:300000,img:"img/bags10.jpg"},
    {name:"Bags 11",price:450000,img:"img/bags11.jpg"},
    {name:"Bags 12",price:500000,img:"img/bags12.jpg"}
  ],

  wallet: [
    {name:"Wallet 1",price:80000,img:"img/wallet1.jpg"},
    {name:"Wallet 2",price:100000,img:"img/wallet2.jpg"},
    {name:"Wallet 3",price:100000,img:"img/wallet3.jpg"},
    {name:"Wallet 4",price:100000,img:"img/wallet4.jpg"},
    {name:"Wallet 5",price:100000,img:"img/wallet5.jpg"},
    {name:"Wallet 6",price:100000,img:"img/wallet6.jpg"},
    {name:"Wallet 7",price:100000,img:"img/wallet7.jpg"},
    {name:"Wallet 8",price:100000,img:"img/wallet8.jpg"},
    {name:"Wallet 9",price:100000,img:"img/wallet9.jpg"},
    {name:"Wallet 10",price:100000,img:"img/wallet10.jpg"},
    {name:"Wallet 11",price:100000,img:"img/wallet11.jpg"},
    {name:"Wallet 12",price:100000,img:"img/wallet12.jpg"}
  ]
};

// ====== TAMPILKAN PRODUK ======
function showCategory(category) {
  const container = document.getElementById("produk-container");
  if (!container) return;

  // reset isi
  container.innerHTML = "";
  container.classList.remove("empty");

  let productsToShow = [];

  // ambil produk sesuai kategori
  if (category === "all") {
    productsToShow = [
      ...PRODUCTS.shirt,
      ...PRODUCTS.pants,
      ...PRODUCTS.bags,
      ...PRODUCTS.wallet
    ];
  } else {
    productsToShow = PRODUCTS[category] || [];
  }

  // jika kosong
  if (productsToShow.length === 0) {
    container.innerHTML = `
      <div class="placeholder">
        <h2>✨Produk tidak tersedia</h2>
      </div>
    `;
    return;
  }

  // tampilkan produk
  productsToShow.forEach((p, index) => {
    const sizeId = `size-${category}-${index}`;
    let sizeSelect = "";

    // hanya tampilkan size jika ada
    if (p.sizes && p.sizes.length > 0) {
      sizeSelect = `
        <select id="${sizeId}" class="size-select">
          <option value="">-- Pilih Ukuran --</option>
          ${p.sizes.map(size => `<option value="${size}">${size}</option>`).join("")}
        </select>
      `;
    }

    container.innerHTML += `
      <div class="product-card">
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>Rp ${formatRupiah(p.price)}</p>

        ${sizeSelect}

        <button onclick="learnMore('${p.name}', ${p.price}, '${p.sizes ? sizeId : ""}')">
          Learn More
        </button>
      </div>
    `;
  });
}

// ====== LOAD SAAT HALAMAN DIBUKA ======
window.addEventListener("DOMContentLoaded", function() {
  updateCartIcon();
  displayCart();
  loadOrderConfirmation();

  const totalEl = document.getElementById("checkout-total");
  if (totalEl) {
    const total = parseInt(localStorage.getItem("checkoutTotal")) || 0;
    totalEl.textContent = formatRupiah(total);
  }
});

// ====== KONFIRMASI PESANAN ======
function loadOrderConfirmation() {
  updateCartIcon();

  const cart = getCart();
  const total = parseInt(localStorage.getItem("checkoutTotal")) || 0;
  const method = localStorage.getItem("paymentMethod");

  const orderItems = document.getElementById("order-items");
  const orderTotal = document.getElementById("order-total");
  const orderMethod = document.getElementById("order-method");
  const orderAddress = document.getElementById("order-address");

  if (!orderItems) return;

  orderItems.innerHTML = "";
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} (Size ${item.size}) - Rp ${formatRupiah(item.price)} (x${item.qty})`;
    orderItems.appendChild(li);
  });

  orderTotal.textContent = formatRupiah(total);

  // tampilkan metode pembayaran
  let methodText = "";
  if (method === "transfer") methodText = "Transfer Bank";
  else if (method === "ewallet") methodText = "E-Wallet";
  else if (method === "cod") methodText = "COD";

  orderMethod.textContent = "Metode Pembayaran: " + methodText;

  // tampilkan alamat kalau COD
  if (method === "cod") {
    const address = localStorage.getItem("codAddress");
    orderAddress.textContent = "Alamat: " + address;
  } else {
    orderAddress.textContent = "";
  }
}

// ====== LEARN MORE ======
function learnMore(name, price, sizeSelectId) {
  let size = "";

  // Jika produk punya ukuran
  if (sizeSelectId) {
    const selectEl = document.getElementById(sizeSelectId);

    if (selectEl) {
      size = selectEl.value;

      if (!size) {
        alert("Silakan pilih ukuran terlebih dahulu!");
        return;
      }
    }
  }

  let cart = getCart();

  cart.push({
    name: name,
    price: price,
    size: size || null,
    qty: 1
  });

  saveCart(cart);

  let detail = name;
  if (size) detail += ` (Size ${size})`;

  alert(`${detail} ditambahkan ke keranjang!`);

  updateCartIcon();
}

// ====== DISPLAY CART ======
function displayCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  if (!cartItems) return;

  let cart = getCart();
  cartItems.innerHTML = "";

  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Keranjang belanja kosong.</p>";
    cartTotal.textContent = "0";
    return;
  }

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    cartItems.innerHTML += `
      <div class="cart-item">
        <div class="cart-name">
          ${item.name}
          ${item.size ? `<span class="cart-size">(Size: ${item.size})</span>` : ""}
          ${item.color ? `<span class="cart-color">(Warna: ${item.color})</span>` : ""}
        </div>

        <div class="cart-price">
          Rp ${formatRupiah(item.price)}
        </div>

        <div class="cart-qty">
          <button class="qty-btn" onclick="reduceItem(${index})">-</button>
          <span>${item.qty}</span>
          <button class="qty-btn" onclick="addQty(${index})">+</button>
        </div>

        <button class="delete-btn" onclick="removeItem(${index})">🗑</button>
      </div>
    `;
  });

  cartTotal.textContent = formatRupiah(total);
}

function addQty(index) {
  let cart = getCart();

  cart[index].qty++;

  saveCart(cart);
  displayCart();
  updateCartIcon();
}