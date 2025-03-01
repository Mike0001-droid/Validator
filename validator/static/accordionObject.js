document.addEventListener("DOMContentLoaded", function() {
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach((accordion) => {
        const accordionButton = accordion.querySelector('.accordion-button');
        const accordionCollapse = accordion.querySelector('.accordion-collapse');
        const accordionIcon = accordionButton.querySelector('.accordion-icon');

        accordionButton.addEventListener('click', function() {
            const isOpen = accordion.classList.contains('open');

            if (isOpen) {
                // Закрыть аккордеон
                accordion.classList.remove('open');
                accordionCollapse.style.maxHeight = "0";
                accordionIcon.style.transform = "rotate(0deg)";
            } else {
                // Открыть аккордеон
                accordion.classList.add('open');
                accordionCollapse.style.maxHeight = accordionCollapse.scrollHeight + "px";
                accordionIcon.style.transform = "rotate(180deg)";
            }
        });
    });
});
