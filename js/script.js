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
const API_KEY = "AIzaSyAZqa8SymhYGehLRyJYqvYl5s3kHiKo3IA"; // Nu lăsa cheia API publică!
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
        quantity: 0,
        image: "images/pandorei.jpeg",
        title: "Box of Pandora",
        description: "A modern, functional prosthetic with articulated fingers.",
        shortDescription: "High-tech prosthetic arm with flexible movement.",
        price: 59.99,
        oldPrice: 99.99
    },
    {
        id:2,
        quantity: 0,
        image: "images/paispic.jpeg",
        title: "Box Paispe",
        price: 399.99,
        oldPrice: 499.99
    },
    {
        id:3,
        quantity: 0,
        image: "images/infinity1.png",
        title: "Infinity Box",
        price: 99.99,
        oldPrice: 129.99
    },
    {
        id:4,
        quantity: 0,
        image: "images/box2.jpeg",
        title: "Epic Drop",
        price: 59.99,
        oldPrice: 89.99
    },
    {
        id:5,
        quantity: 0,
        image: "images/box10.jpeg",
        title: "Golden Mistery",
        price: 59.99,
        oldPrice: 89.99
    },
    {
        id:6,
        quantity: 0,
        image: "images/box9.jpeg",
        title: "The Joker Box",
        price: 79.99,
        oldPrice: 129.99
    },
    {
        id:7,
        quantity: 0,
        image: "images/box8.jpeg",
        title: "Lucky Box",
        price: 39.99,
        oldPrice: 54.99,
    },
    {
        id:8,
        quantity: 0,
        image: "images/box3.jpeg",
        title: "Mistery Box:The Unknow",
        price: 99.99,
        oldPrice: 149.99
    },
    {
        id:9,
        quantity: 0,
        image: "images/box4.jpeg",
        title: "Nobel Box",
        price: 189.99,
        oldPrice: 200.99
    },
    {
        id:10,
        quantity: 0,
        image: "images/box5.jpeg",
        title: "Subway Surf Box",
        price: 69.99,
        oldPrice: 90.99
    },
    {
        id:11,
        quantity: 0,
        image: "images/box6.jpeg",
        title: "Innovation Box",
        price: 69.99,
        oldPrice: 89.99
    },

    {
        id:12,
        quantity: 0,
        image: "images/box7.jpeg",
        title: "THE Mistery Box",
        price: 99.99,
        oldPrice: 119.99
    },
];

function renderProducts() {
    const container = document.querySelector(".box-container");
    
    products.forEach((product, index) => {
        const productHTML = `
            <div class="box">
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>${product.shortDescription}</p> <!-- Descriere scurtă -->
                <div class="price">$${product.price} <span>$${product.oldPrice}</span></div>
                <a href="#" class="btn" onclick="addToCart(${index})">Add to cart</a>
            </div>
        `;
        container.innerHTML += productHTML;
    });
}

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

    // Caută produsul după ID
    let existingProduct = cart.find(item => item.id === products[index].id);

    if (existingProduct) {
        existingProduct.quantity++; // Crește cantitatea
    } else {
        cart.push({ ...products[index], quantity: 1 }); // Adaugă produsul cu quantity 1
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
    
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


    // Convertim obiectul într-un array și generăm UI-ul
    cart.forEach((item) => {
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

    // Găsește produsul în coș
    let index = cart.findIndex((item) => item.id === productId);

    if (index !== -1) {
        if (cart[index].quantity > 1) {
            cart[index].quantity--; // Doar scade cantitatea
        } else {
            cart.splice(index, 1); // Dacă e ultimul, elimină-l din coș
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
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

    // Convertim obiectul într-un array și generăm UI-ul
    cart.forEach((item) => {
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

    // Adăugăm butonul de Checkout Now
    let checkoutButton = document.createElement("a");
    checkoutButton.textContent = "Checkout Now";
    checkoutButton.href = "http://127.0.0.1:5500/cart.html"; // Modifică acest link către pagina ta de checkout
    checkoutButton.classList.add("checkout-btn");

    cartContainer.appendChild(checkoutButton);
}


const advices = {
    "Physical Health": [
        { text: "Drink at least 2 liters of water daily to stay hydrated.", image: "imagies/water.jpeg" },
        { text: "Exercise for at least 30 minutes a day to boost your cardiovascular system.", image: "imagies/exercice.jpeg" },
        { text: "Stretch before and after workouts to prevent injuries and improve flexibility.", image: "imagies/stretch.jpeg" },
        { text: "Take short breaks during long sitting periods to reduce strain on your spine.", image: "imagies/breaks.jpeg" },
        { text: "Get at least 7-8 hours of quality sleep to allow your body to recover.", image: "imagies/sleep.jpg" },
        { text: "Spend at least 15 minutes in the sun daily to get enough Vitamin D.", image: "imagies/sunlight.jpg" }
    ],
    "Mental Well-being": [
        { text: "Practice mindfulness or meditation for at least 10 minutes a day to lower stress levels.", image: "imagies/meditation.jpeg" },
        { text: "Limit social media use to avoid mental fatigue and improve focus.", image: "imagies/social_media.jpeg" },
        { text: "Engage in hobbies that make you happy and reduce anxiety.", image: "imagies/hobbies.jpeg" },
        { text: "Write down three things you're grateful for each day to boost positivity.", image: "imagies/gratitude.jpeg" },
        { text: "Spend time in nature to improve mood and mental clarity.", image: "imagies/nature.jpeg" },
        { text: "Connect with family or friends regularly to maintain emotional well-being.", image: "imagies/friends.jpeg" }
    ],
    "Nutrition and Diet": [
        { text: "Eat a balanced diet rich in fruits, vegetables, and whole grains for optimal health.", image: "imagies/healthy_food.jpeg" },
        { text: "Reduce processed sugar intake to maintain stable blood sugar levels.", image: "imagies/sugar.jpeg" },
        { text: "Include protein in every meal to support muscle growth and repair.", image: "imagies/protein.jpeg" },
        { text: "Avoid skipping breakfast to maintain energy levels throughout the day.", image: "imagies/breakfast.jpeg" },
        { text: "Incorporate healthy fats like nuts, seeds, and olive oil into your diet.", image: "imagies/healthy_fats.jpeg" },
        { text: "Drink green tea or herbal teas for their antioxidants and health benefits.", image: "imagies/tea.jpeg" }
    ]
};

function getNewAdvice(category) {
    const adviceTextElement = document.getElementById(`${category.replace(/\s+/g, '-')}-adviceText`);
    const adviceImageElement = document.getElementById(`${category.replace(/\s+/g, '-')}-adviceImage`);

    let newAdvice;
    do {
        newAdvice = advices[category][Math.floor(Math.random() * advices[category].length)];
    } while (adviceTextElement.innerText === newAdvice.text);

    adviceTextElement.innerText = newAdvice.text;
    adviceImageElement.src = newAdvice.image;
    adviceImageElement.alt = newAdvice.text;
}

document.addEventListener("DOMContentLoaded", () => {
    Object.keys(advices).forEach(category => {
        getNewAdvice(category);
        document.getElementById(`${category.replace(/\s+/g, '-')}-button`).addEventListener("click", () => getNewAdvice(category));
    });
});


