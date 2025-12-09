
function openPayment() {
    document.getElementById("paymentModal").style.display = "flex";
}

function closePayment() {
    document.getElementById("paymentModal").style.display = "none";
}

function finalizeTransaction() {
    let method = document.querySelector('input[name="payment"]:checked');
    
    if (!method) {
        alert("Please select a payment method.");
        return;
    }


    alert("Payment Successful");
    closePayment();
}