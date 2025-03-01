document.addEventListener("DOMContentLoaded", function () {
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach((accordion) => {
        const accordionButton = accordion.querySelector('.accordion-button');
        const accordionIcon = accordionButton.querySelector('.accordion-icon');
        const accordionCollapse = accordion.querySelector('.accordion-collapse');

        // Начальное состояние (закрыто)
        accordionButton.classList.remove("open");
        accordionCollapse.style.maxHeight = "0px";
        accordionCollapse.style.overflow = "hidden"; // Скрываем контент
        accordionIcon.style.transform = "rotate(0deg)"; // Начальное положение стрелки
        accordionButton.style.backgroundColor = "#FFFFFF"; // Белый фон
        accordionButton.style.color = "#333"; // Черный текст

        // Добавляем обработчик клика (автономный)
        accordionButton.addEventListener('click', function () {
            const isOpen = accordionButton.classList.contains("open");

            if (isOpen) {
                accordionButton.classList.remove("open");
                accordionCollapse.style.maxHeight = "0px";
                accordionCollapse.style.overflow = "hidden";
                accordionButton.style.backgroundColor = "#FFFFFF";
                accordionButton.style.color = "#333";
                accordionIcon.style.transform = "rotate(0deg)"; // Стрелка в исходное положение
            } else {
                accordionButton.classList.add("open");
                accordionCollapse.style.maxHeight = accordionCollapse.scrollHeight + "px";
                accordionCollapse.style.overflow = "visible";
                accordionButton.style.backgroundColor = "#C5A47E"; // Цвет при открытии
                accordionButton.style.color = "#fff"; // Белый текст
                accordionIcon.style.transform = "rotate(180deg)"; // Стрелка вниз
            }
        });
    });
});

// Добавляем эффект выбора элемента списка
document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".list-group-item");

    buttons.forEach((button) => {
        button.addEventListener("click", function () {
            // Сбрасываем стиль у всех кнопок
            buttons.forEach(btn => btn.classList.remove("active"));

            // Добавляем стиль к нажатой кнопке
            this.classList.add("active");
        });
    });
});


