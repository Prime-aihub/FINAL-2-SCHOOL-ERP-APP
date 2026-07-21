const products = [
  {
    id: 1,
    name: "Creative Art & Craft Kit",
    category: "Educational Toys",
    price: 499,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 2,
    name: "Premium Stationery Set",
    category: "Stationery",
    price: 299,
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 3,
    name: "DIY Robotics STEM Kit",
    category: "STEM Kits",
    price: 1299,
    image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 4,
    name: "Custom Name School Bag",
    category: "School Bags",
    price: 999,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 5,
    name: "Solar System Learning Model",
    category: "Educational Toys",
    price: 699,
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 6,
    name: "Geometry Box Set",
    category: "Stationery",
    price: 249,
    image: "https://images.unsplash.com/photo-1516383607781-913a19294fd1?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 7,
    name: "Electric Circuit Explorer Kit",
    category: "STEM Kits",
    price: 899,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 8,
    name: "Kids Learning Backpack",
    category: "School Bags",
    price: 849,
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=700&q=80"
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