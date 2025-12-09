// Load cart from localStorage
function loadCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Add item to cart
function addToCart(product) {
    let cart = loadCart();

    let existing = cart.find(item => item.name === product.name);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart(cart);
}

// Display cart items on cart.html
function displayCart() {
    const cart = loadCart();
    const container = document.getElementById("cart-items");
    const totalElement = document.getElementById("total");

    container.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        const div = document.createElement("div");
        div.classList.add("box");
        div.style.width = "300px";
        div.style.margin = "10px auto";

        div.innerHTML = `
    <img src="${item.image}" style="width:200px;">
    <div class="row">
        <h3>${item.name}</h3>
        <p>₱${item.price}</p>
    </div>


    <div style="display:flex; justify-content:space-between; align-items:center; margin:10px 0;">
    
    <!-- LEFT SIDE -->
    <div style="display:flex; align-items:center; gap:10px;">
        <button onclick="changeQty(${index}, -1)" style="width:40px;">-</button>
        <span style="font-size:18px; font-weight:bold;">${item.quantity}</span>
        <button onclick="changeQty(${index}, 1)" style="width:40px;">+</button>
    </div>

    <!-- RIGHT SIDE -->
    <p style="margin:0;">Subtotal: ₱${(item.price * item.quantity).toFixed(2)}</p>

</div>


    <button onclick="removeItem(${index})" style="background:#444;">Remove</button>
`;

        container.appendChild(div);
    });
    totalElement.style.fontWeight = "bold"; 
    totalElement.style.color = "#020202ff"; 
    totalElement.innerText = total.toFixed(2);
}

// Change quantity (+ or -)
function changeQty(index, amount) {
    let cart = loadCart();

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    saveCart(cart);
    displayCart();
}

// Remove item
function removeItem(index) {
    let cart = loadCart();

    cart.splice(index, 1);
    saveCart(cart);
    displayCart();
}
