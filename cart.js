document.addEventListener("DOMContentLoaded", () => {
    const cartTable = document.getElementById("cart-items");
    const totalAmount = document.getElementById("total-amount");
    const clearCartButton = document.getElementById("clear-cart");
    const cartCount = document.getElementById("cart-count");
    const confirmOrderButton = document.getElementById("confirm-order");

    function loadCart() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cartTable.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.title}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>
                    <button class="decrease-qty" data-index="${index}">-</button>
                    <span class="qty">${item.quantity}</span>
                    <button class="increase-qty" data-index="${index}">+</button>
                </td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
                <td><button class="remove-item" data-index="${index}">Remove</button></td>
            `;

            total += item.price * item.quantity;
            cartTable.appendChild(row);
        });

        totalAmount.textContent = `$${total.toFixed(2)}`;
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    // 🔥 Folosim event delegation pentru a evita problemele
    cartTable.addEventListener("click", (event) => {
        if (event.target.classList.contains("increase-qty")) {
            updateQuantity(event.target.dataset.index, 1);
        }
        if (event.target.classList.contains("decrease-qty")) {
            updateQuantity(event.target.dataset.index, -1);
        }
        if (event.target.classList.contains("remove-item")) {
            removeItem(event.target.dataset.index);
        }
    });

    function updateQuantity(index, change) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        index = parseInt(index);

        if (cart[index].quantity + change > 0) {
            cart[index].quantity += change;
        } else {
            cart.splice(index, 1);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
    }

    function removeItem(index) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.splice(parseInt(index), 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
    }

    function clearCart() {
        localStorage.removeItem("cart");
        loadCart();
    }

    if (clearCartButton) {
        clearCartButton.addEventListener("click", clearCart);
    }

    if (confirmOrderButton) {
        confirmOrderButton.addEventListener("click", () => {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            if (cart.length === 0) {
                alert("Your cart is empty! Add items before confirming the order.");
            } else {
                alert("Thank you! Your order has been confirmed.");
                clearCart();
            }
        });
    }

    loadCart();
});
