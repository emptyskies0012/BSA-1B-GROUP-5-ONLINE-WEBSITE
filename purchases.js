function finalizeTransaction() {
    let method = document.querySelector('input[name="payment"]:checked');
    
    if (!method) {
        alert("Please select a payment method.");
        return;
    }

    // 1. Load cart items
    let cart = loadCart();

    if(cart.length === 0){
        alert("Cart is empty!");
        closePayment();
        return;
    }

    // 2. Move items to purchases popup
    const purchasedContainer = document.getElementById("purchased-items");
    purchasedContainer.innerHTML = ""; // clear previous

    let total = 0;

    cart.forEach(item => {
        let div = document.createElement("div");
            div.style.display = "flex";
            div.style.justifyContent = "space-between";
            div.style.marginBottom = "5px";

div.innerHTML = `
    <span>${item.name}</span>
    <span>₱${(item.price * item.quantity).toFixed(2)}</span>
`;
purchasedContainer.appendChild(div);

        total += item.price * item.quantity;
    });

    // Save purchases history
let history = JSON.parse(localStorage.getItem("purchases")) || [];
history.push({
    items: cart,
    total: total,
    date: new Date().toLocaleString()
});
localStorage.setItem("purchases", JSON.stringify(history));

// 3. Clear cart
localStorage.removeItem("cart");
displayCart();
closePayment();


}

// Close purchases popup
function closePurchases() {
    document.getElementById("purchasesModal").style.display = "none";
}
function openPurchases() {
    document.getElementById("purchasesModal").style.display = "block";
}
