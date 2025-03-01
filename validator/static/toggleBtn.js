document.addEventListener("DOMContentLoaded", function () {
    // Находим все кнопки "плюс"
    document.querySelectorAll(".plus-button").forEach((button) => {
        const inputContainer = button.nextElementSibling; // Следующий элемент (контейнер ввода)

        // Проверяем, существует ли поле ввода
        if (!inputContainer) return;

        // При клике скрываем кнопку и показываем поле ввода
        button.addEventListener("click", () => {
            button.style.display = "none"; // Скрываем кнопку
            inputContainer.style.display = "flex"; // Показываем поле ввода
        });
    });
});
