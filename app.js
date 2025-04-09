const products = [
    { id: 1, name: "Coffee", price: 3, description: "Fresh brewed coffee", image: "cofee.jpg" },
    { id: 2, name: "Tea", price: 2.5, description: "Relaxing tea", image: "tea.jpeg" },
    { id: 3, name: "Sandwich", price: 5, description: "Delicious sandwich", image: "sandwitch.jpeg" },
];

let cart = [];
let orders = [];

function displayProducts() {
    const productList = document.getElementById("product-list");
    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productCard);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCart();
}

function updateCart() {
    const cartList = document.getElementById("cart-list");
    cartList.innerHTML = "";
    cart.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.innerHTML = `<p>${item.name} - $${item.price}</p>`;
        cartList.appendChild(cartItem);
    });
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const order = {
        id: orders.length + 1,
        items: cart,
        total: total,
        status: "Pending",
    };
    orders.push(order);
    cart = [];
    updateOrders();
    alert(`Order placed! Total: $${total}`);
    updateCart();
}

function updateOrders() {
    const ordersList = document.getElementById("orders-list");
    ordersList.innerHTML = "";
    orders.forEach(order => {
        const orderItem = document.createElement("div");
        orderItem.innerHTML = `
            <h4>Order ID: ${order.id}</h4>
            <p>Status: ${order.status}</p>
            <p>Total: $${order.total}</p>
        `;
        ordersList.appendChild(orderItem);
    });
}

// Initialize the page
displayProducts();
