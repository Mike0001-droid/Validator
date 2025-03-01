document.addEventListener("DOMContentLoaded", function() {
    // Для серого аккордеона
    const greyAccordionItems = document.querySelectorAll('.accordion-item-Grey');

    greyAccordionItems.forEach((accordion) => {
        const accordionButton = accordion.querySelector('.accordion-button-Grey');
        const accordionCollapse = accordion.querySelector('.accordion-collapse-Grey');
        const accordionIcon = accordionButton.querySelector('.accordion-icon-Grey');

        // Начальное состояние (закрыт)
        accordion.classList.remove('open');
        accordionCollapse.style.maxHeight = "0"; // Скрываем контент
        accordionIcon.style.transform = "rotate(0deg)"; // Стрелка не поворачивается

        // Обработчик клика для серого аккордеона
        accordionButton.addEventListener('click', function() {
            const isOpen = accordion.classList.contains('open');

            if (isOpen) {
                // Закрыть серый аккордеон
                accordion.classList.remove('open');
                accordionCollapse.style.maxHeight = "0"; // Скрываем контент
                accordionIcon.style.transform = "rotate(0deg)"; // Стрелка в исходное положение
            } else {
                // Открыть серый аккордеон
                accordion.classList.add('open');
                accordionCollapse.style.maxHeight = accordionCollapse.scrollHeight + "px"; // Показываем контент
                accordionIcon.style.transform = "rotate(180deg)"; // Стрелка вниз
            }
        });
    });
});
