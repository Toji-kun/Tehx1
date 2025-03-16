const advices = {
    "Physical Health": [
        { text: "Drink at least 2 liters of water daily to stay hydrated.", image: "images/water.jpeg" },
        { text: "Exercise for at least 30 minutes a day to boost your cardiovascular system.", image: "images/exercice.jpeg" },
        { text: "Stretch before and after workouts to prevent injuries and improve flexibility.", image: "images/stretch.jpeg" },
        { text: "Take short breaks during long sitting periods to reduce strain on your spine.", image: "images/breaks.jpeg" },
        { text: "Get at least 7-8 hours of quality sleep to allow your body to recover.", image: "images/sleep.jpg" },
        { text: "Spend at least 15 minutes in the sun daily to get enough Vitamin D.", image: "images/sunlight.jpg" }
    ],
    "Mental Well-being": [
        { text: "Practice mindfulness or meditation for at least 10 minutes a day to lower stress levels.", image: "images/meditation.jpeg" },
        { text: "Limit social media use to avoid mental fatigue and improve focus.", image: "images/social_media.jpeg" },
        { text: "Engage in hobbies that make you happy and reduce anxiety.", image: "images/hobbies.jpeg" },
        { text: "Write down three things you're grateful for each day to boost positivity.", image: "images/gratitude.jpeg" },
        { text: "Spend time in nature to improve mood and mental clarity.", image: "images/nature.jpeg" },
        { text: "Connect with family or friends regularly to maintain emotional well-being.", image: "images/friends.jpeg" }
    ],
    "Nutrition and Diet": [
        { text: "Eat a balanced diet rich in fruits, vegetables, and whole grains for optimal health.", image: "images/healthy_food.jpeg" },
        { text: "Reduce processed sugar intake to maintain stable blood sugar levels.", image: "images/sugar.jpeg" },
        { text: "Include protein in every meal to support muscle growth and repair.", image: "images/protein.jpeg" },
        { text: "Avoid skipping breakfast to maintain energy levels throughout the day.", image: "images/breakfast.jpeg" },
        { text: "Incorporate healthy fats like nuts, seeds, and olive oil into your diet.", image: "images/healthy_fats.jpeg" },
        { text: "Drink green tea or herbal teas for their antioxidants and health benefits.", image: "images/tea.jpeg" }
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



