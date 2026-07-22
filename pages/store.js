const products = [
  {
    id: 1,
    name: "MAIAMMA School T-Shirt",
    category: "School Merchandise",
    price: 499,
    image: "images/merch-tshirt.jpg"
  },
  {
    id: 2,
    name: "School Uniform Set",
    category: "Uniform",
    price: 1499,
    image: "images/uniform.jpg"
  },
  {
    id: 3,
    name: "Student Stationery Kit",
    category: "Stationery",
    price: 299,
    image: "images/stationery-kit.jpg"
  },
  {
    id: 4,
    name: "Geometry Box",
    category: "Stationery",
    price: 199,
    image: "images/geometry-box.jpg"
  },
  {
    id: 5,
    name: "Science Laboratory Kit",
    category: "Laboratory",
    price: 999,
    image: "images/science-lab-kit.jpg"
  },
  {
    id: 6,
    name: "Class Textbook Set",
    category: "Books",
    price: 1299,
    image: "images/textbooks.jpg"
  },
  {
    id: 7,
    name: "STEM & Coding Activity Book",
    category: "Books",
    price: 399,
    image: "images/stem-coding-book.jpg"
  },
  {
    id: 8,
    name: "Sports Activity Handbook",
    category: "Books",
    price: 349,
    image: "images/sports-book.jpg"
  },
  {
  id: 9,
  name: "Custom Name School Bag",
  category: "School Bags",
  price: 999,
  image: "images/custom-school-bag.jpg"
}
];

let selectedCategory = "All";
let cart = JSON.parse(localStorage.getItem("schoolStoreCart") || "[]");

const productGrid = document.querySelector("#productGrid");
const cartPanel = document.querySelector("#cartPanel");
const overlay = document.querySelector("#overlay");

function showProducts() {
  const keyword = document.querySelector("#searchProduct").value.toLowerCase();

  const filtered = products.filter(product =>
    (selectedCategory === "All" || product.category === selectedCategory) &&
    `${product.name} ${product.category}`.toLowerCase().includes(keyword)
  );

  productGrid.innerHTML = filtered.map(product => `
    <article class="product-card">
      <img src="${product.image}" alt="${product.name}">
      <div class="product-info">
        <p>${product.category}</p>
        <h3>${product.name}</h3>
        <div class="product-bottom">
          <span class="price">₹${product.price}</span>
          <button onclick="addToCart(${product.id})">
            <i class="fa-solid fa-cart-plus"></i> Add
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

function addToCart(id) {
  const product = products.find(item => item.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  openCart();
}

function saveCart() {
  localStorage.setItem("schoolStoreCart", JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  const cartItems = document.querySelector("#cartItems");
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  document.querySelector("#cartCount").textContent = count;
  document.querySelector("#cartTotal").textContent = `₹${total}`;

  cartItems.innerHTML = cart.length
    ? cart.map(item => `
      <div class="cart-item">
        <div>
          <b>${item.name}</b>
          <p>₹${item.price} × ${item.quantity}</p>
        </div>

        <button class="remove" onclick="removeFromCart(${item.id})">
          Remove
        </button>
      </div>
    `).join("")
    : `<p class="empty">Your cart is empty.</p>`;
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
}

function openCart() {
  cartPanel.classList.add("show");
  overlay.classList.add("show");
}

function closeCart() {
  cartPanel.classList.remove("show");
  overlay.classList.remove("show");
}

document.querySelectorAll(".category").forEach(button => {
  button.addEventListener("click", () => {
    selectedCategory = button.dataset.category;

    document.querySelectorAll(".category").forEach(item =>
      item.classList.remove("active")
    );

    button.classList.add("active");
    showProducts();
  });
});

document.querySelector("#searchProduct").addEventListener("input", showProducts);

document.querySelector("#cartButton").addEventListener("click", openCart);
document.querySelector("#closeCart").addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);

document.querySelector("#shopNow").addEventListener("click", () => {
  document.querySelector("#products").scrollIntoView();
});

document.querySelector("#checkout").addEventListener("click", () => {
  alert("Payment checkout will be connected later.");
});

showProducts();
renderCart();
