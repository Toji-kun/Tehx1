const advices = {
    "Mistery Box": [
        { text: "U could get a laptop", image: "images/box8.jpeg" },
        { text: "U can get a design T-shirt of subway Surff", image: "images/box5.jpeg" },
        { text: "", image: "images/stretch.jpeg" },
        { text: ".", image: "images/breaks.jpeg" },
        { text: "", image: "images/sleep.jpg" },
        { text: "", image: "images/sunlight.jpg" }
    ],
    "Mental Well-being": [
        { text: "", image: "images/meditation.jpeg" },
        { text: "", image: "images/social_media.jpeg" },
        { text: "", image: "images/hobbies.jpeg" },
        { text: "", image: "images/gratitude.jpeg" },
        { text: "", image: "images/nature.jpeg" },
        { text: "", image: "images/friends.jpeg" }
    ],
    "Nutrition and Diet": [
        { text: "", image: "images/healthy_food.jpeg" },
        { text: "", image: "images/sugar.jpeg" },
        { text: "", image: "images/protein.jpeg" },
        { text: "", image: "images/breakfast.jpeg" },
        { text: "", image: "images/healthy_fats.jpeg" },
        { text: "", image: "images/tea.jpeg" }
    ]
};

function NewItem(category) {
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
        NewItem(category);
        document.getElementById(`${category.replace(/\s+/g, '-')}-button`).addEventListener("click", () => NewItem(category));
    });
});



