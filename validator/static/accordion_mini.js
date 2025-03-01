document.addEventListener("DOMContentLoaded", function () {
  // ----------- MINI ACCORDION -----------
  const miniAccordionItems = document.querySelectorAll('.accordion-item-mini');

  miniAccordionItems.forEach((miniAccordion) => {
    const miniAccordionButton = miniAccordion.querySelector('.accordion-button-mini');
    const miniAccordionIcon   = miniAccordionButton.querySelector('.accordion-icon-mini');
    const miniAccordionCollapse = miniAccordion.querySelector('.accordion-collapse-mini');

    // Initial (closed) state
    miniAccordionButton.classList.remove("open");
    miniAccordionCollapse.style.maxHeight = "0px";
    miniAccordionCollapse.style.overflow = "hidden";
    if (miniAccordionIcon) miniAccordionIcon.style.transform = "rotate(0deg)";

    // Optional: color styles (adjust as needed)
    miniAccordionButton.style.backgroundColor = "#FFFFFF";
    miniAccordionButton.style.color = "#333";

    // On click, toggle open/close
    miniAccordionButton.addEventListener('click', function () {
      const isOpen = miniAccordionButton.classList.contains("open");

      if (isOpen) {
        // Close it
        miniAccordionButton.classList.remove("open");
        miniAccordionCollapse.style.maxHeight = "0px";
        miniAccordionCollapse.style.overflow = "hidden";
        miniAccordionButton.style.backgroundColor = "#FFFFFF";
        miniAccordionButton.style.color = "#333";
        if (miniAccordionIcon) miniAccordionIcon.style.transform = "rotate(0deg)";
      } else {
        // Open it
        miniAccordionButton.classList.add("open");
        miniAccordionCollapse.style.maxHeight = miniAccordionCollapse.scrollHeight + "px";
        miniAccordionCollapse.style.overflow = "visible";
        miniAccordionButton.style.backgroundColor = "#C5A47E"; // or your desired color
        miniAccordionButton.style.color = "#fff";
        if (miniAccordionIcon) miniAccordionIcon.style.transform = "rotate(180deg)";
      }
    });
  });
});