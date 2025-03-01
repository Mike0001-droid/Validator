document.addEventListener("DOMContentLoaded", function () {
    const inputField = document.querySelector(".input-group input");
    const clearButton = document.querySelector(".clear-button");

    // Показываем крестик только при наличии текста в поле
    inputField.addEventListener("input", function () {
        if (inputField.value.length > 0) {
            clearButton.style.visibility = "visible";
        } else {
            clearButton.style.visibility = "hidden";
        }
    });

    // Очищаем поле при нажатии на крестик
    clearButton.addEventListener("click", function () {
        inputField.value = "";
        clearButton.style.visibility = "hidden";
        inputField.focus();
    });
});
