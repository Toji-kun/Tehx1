let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}

let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
    cartItem.classList.remove('active');
}

let cartItem = document.querySelector('.cart-items-container');

document.querySelector('#cart-btn').onclick = () =>{
    cartItem.classList.toggle('active');
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
}

window.onscroll = () =>{
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}

function toggleChat() {
    const chatBox = document.getElementById("chatBox");
    chatBox.style.display = (chatBox.style.display === "block") ? "none" : "block";
}

function sendMessage(event) {
    if (event.key === "Enter") {
        let input = document.getElementById("chatInput");
        let message = input.value;
        if (message.trim() === "") return;

        let chatMessages = document.getElementById("chatMessages");
        let newMessage = document.createElement("div");
        newMessage.textContent = "Tu: " + message;
        chatMessages.appendChild(newMessage);

        input.value = "";

        // Răspuns AI fake (în realitate ar trebui integrat un AI)
        setTimeout(() => {
            let botMessage = document.createElement("div");
            botMessage.textContent = "AI: Salut! Cum te pot ajuta?";
            chatMessages.appendChild(botMessage);
        }, 1000);
    }
}
const API_KEY = ""; // Nu lăsa cheia API publică!
const model = "gemini-1.5-flash"; // Poți schimba modelul dacă vrei

async function sendMessage(event) {
    if (event.key === "Enter") {
        let input = document.getElementById("chatInput");           
        let message = input.value;
        if (message.trim() === "") return;

        let chatMessages = document.getElementById("chatMessages");

        // Afișează mesajul utilizatorului
        let newMessage = document.createElement("div");
        newMessage.textContent = "Tu: " + message;
        chatMessages.appendChild(newMessage);
        input.value = "";

        // Afișează mesaj "Gândesc..." în timp ce AI-ul răspunde
        let botMessage = document.createElement("div");
        botMessage.textContent = "AI: Gândesc...";
        chatMessages.appendChild(botMessage);

        try {
            // Trimite mesajul la AI și primește un răspuns
            const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/" + model + ":generateContent?key=" + API_KEY, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ contents: [{ parts: [{ text: message }] }] })
            });

            const data = await response.json();
            let aiReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Eroare la răspunsul AI";

            // Schimbă mesajul "Gândesc..." cu răspunsul AI
            botMessage.textContent = "AI: " + aiReply;
        } catch (error) {
            botMessage.textContent = "AI: Eroare la conectare.";
            console.error("Eroare API:", error);
        }
    }
}
const products = [
    {
        id:1,
        image: "images/background3.jpg",
        title: "Tasty and Healthy",
        price: 15.99,
        oldPrice: 20.99
    },
    {
        id:2,
        image: "images/background3.jpg",
        title: "Tasty and Healthy",
        price: 15.99,
        oldPrice: 20.99
    },
    {
        id:3,
        image: "images/background3.jpg",
        title: "Tasty and Healthy",
        price: 15.99,
        oldPrice: 20.99
    },
    {
        id:4,
        image: "images/background3.jpg",
        title: "Tasty and Healthy",
        price: 15.99,
        oldPrice: 20.99
    },
    {
        id:5,
        image: "images/background3.jpg",
        title: "Tasty and Healthy",
        price: 15.99,
        oldPrice: 20.99
    },
    {
        id:6,
        image: "images/background3.jpg",
        title: "Tasty and Healthy",
        price: 15.99,
        oldPrice: 20.99
    },
    {
        id:7,
        image: "images/background3.jpg",
        title: "Tasty and Healthy",
        price: 15.99,
        oldPrice: 20.99
    },
    {
        id:8,
        image: "images/background3.jpg",
        title: "Tasty and Healthy",
        price: 15.99,
        oldPrice: 20.99
    },
    {
        id:9,
        image: "images/background3.jpg",
        title: "Tasty and Healthy",
        price: 15.99,
        oldPrice: 20.99
    },
    {
        id:10,
        image: "images/background3.jpg",
        title: "Tasty and Healthy",
        price: 15.99,
        oldPrice: 20.99
    }
];

document.addEventListener("DOMContentLoaded", () => {

  if(location.pathname=="/menu.html") renderProducts();  
    updateCartUI();
});

function renderProducts() {
    const container = document.querySelector(".box-container");
    
    products.forEach((product, index) => {
        const productHTML = `
            <div class="box">
                <img src="${product.image}" alt="">
                <h3>${product.title}</h3>
                <div class="price">$${product.price} <span>$${product.oldPrice}</span></div>
                <a href="#" class="btn" onclick="addToCart(${index})">Add to cart</a>
            </div>
        `;
        container.innerHTML += productHTML;
    });
}

function addToCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(products[index]);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
    alert("Product added to cart!");
}

function updateCartUI() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContainer = document.querySelector(".cart-items-container");

    if (!cartContainer) {
        cartContainer = document.createElement("div");
        cartContainer.classList.add("cart-container");
        document.body.appendChild(cartContainer);
    }

    cartContainer.innerHTML = "<h2>Cart</h2>";

    // Obiect pentru a grupa produsele după ID
    let groupedCart = {};

    cart.forEach((item) => {
        if (groupedCart[item.id]) {
            groupedCart[item.id].quantity++;
        } else {
            groupedCart[item.id] = { ...item, quantity: 1 };
        }
    });

    // Convertim obiectul într-un array și generăm UI-ul
    Object.values(groupedCart).forEach((item) => {
        let cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        let title = document.createElement("h4");
        title.textContent = `${item.title} (x${item.quantity})`;

        let price = document.createElement("p");
        price.textContent = `$${item.price * item.quantity}`; // Afișează prețul total

        let removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.style.backgroundColor = "red";
        removeButton.style.color = "black";
        removeButton.style.border = "none";
        removeButton.style.borderRadius = "12px";
        removeButton.style.padding = "8px 12px";
        removeButton.style.cursor = "pointer";
        removeButton.style.fontWeight = "bold";
        removeButton.style.transition = "all 0.3s ease";

        // Efect hover pe buton
        removeButton.onmouseover = function () {
            removeButton.style.transform = "scale(1.1)";
            removeButton.style.backgroundColor = "darkred";
        };

        removeButton.onmouseleave = function () {
            removeButton.style.transform = "scale(1)";
            removeButton.style.backgroundColor = "red";
        };

        removeButton.onclick = function () {
            removeFromCart(item.id);
        };

        cartItem.appendChild(title);
        cartItem.appendChild(price);
        cartItem.appendChild(removeButton);

        cartContainer.appendChild(cartItem);
    });
}

// 🗑️ Funcție pentru a elimina produsele din coș
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Găsește primul produs cu acel ID și scade cantitatea
    let index = cart.findIndex((item) => item.id === productId);
    if (index !== -1) {
        cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
}

