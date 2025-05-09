const animations = [
    {
        elementId: "animated-text-1",
        texts: ["Привет!", "Играю в майнкрафт 4 года"]
    },
    {
        elementId: "animated-text-2",
        texts: [
            "Меня зовут Вадим.<br>Я Бедварсер из России.",
            "Играю в игры: Roblox, GTA V, <br>Amanda The Adventurer, Portal 2, CS2"
        ]
    },
    {
        elementId: "animated-text-22",
        texts: [
            "Меня зовут Вадим.<br>Я Бедварсер из России.",
            "Играю в игры: Roblox, <br>GTA V, Amanda The Adventurer, <br>Portal 2, CS2"
        ]
    }
];

const randomChars = "!@#$%^&*()_+{}|:<>?1234567890abcdefghijklmnopqrstuvwxyz";

function randomizeText(length) {
    let result = "";
    for (let i = 0; i < length; i++) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}

function animateText(animation) {
    const textElement = document.getElementById(animation.elementId);
    if (!textElement) {
        console.error(`Элемент с id '${animation.elementId}' не найден!`);
        return;
    }

    let currentIndex = 0;

    function runAnimation() {
        const currentText = animation.texts[currentIndex];
        let step = 0;

        // Step 1: Show original text
        textElement.innerHTML = currentText;

        // Dynamically change font size for animated-text-1
        if (animation.elementId === "animated-text-1") {
            if (currentText === "Привет!") {
                textElement.style.fontSize = "114px";
            } else {
                textElement.style.fontSize = "77px";
            }
        }

        textElement.classList.remove("hidden");
        textElement.classList.add("visible");

        setTimeout(() => {
            // Step 2: Transition to random symbols
            const interval = setInterval(() => {
                textElement.innerHTML = randomizeText(currentText.length);
                step++;
                if (step > 10) {
                    clearInterval(interval);

                    // Step 3: Transition to next text
                    currentIndex = (currentIndex + 1) % animation.texts.length;
                    textElement.innerHTML = animation.texts[currentIndex];

                    // Update font size again
                    if (animation.elementId === "animated-text-1") {
                        if (animation.texts[currentIndex] === "Привет!") {
                            textElement.style.fontSize = "114px";
                        } else {
                            textElement.style.fontSize = "64px";
                        }
                    }
                }
            }, 100);
        }, 3000);

        // Repeat animation
        setTimeout(() => {
            textElement.classList.remove("visible");
            textElement.classList.add("hidden");
            setTimeout(runAnimation, 1000); // Запуск следующей итерации
        }, 10000);
    }

    runAnimation();
}

// Запуск анимаций для всех элементов
animations.forEach(animateText);
