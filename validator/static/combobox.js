document.addEventListener("DOMContentLoaded", function () {
    function initializeCombobox(comboboxId, selectedItemsId, optionsListId) {
        const combobox = document.getElementById(comboboxId);
        const selectedItems = document.getElementById(selectedItemsId);
        const optionsList = document.getElementById(optionsListId);

        if (!combobox || !selectedItems || !optionsList) return;

        // Открытие/закрытие списка
        combobox.addEventListener("click", () => {
            combobox.classList.toggle("open");
        });

        // Обработчик выбора элемента
        optionsList.addEventListener("click", (event) => {
            if (event.target.classList.contains("combobox-item")) {
                const selectedText = event.target.textContent;

                // Проверяем, есть ли уже такой элемент в выбранных
                if (!Array.from(selectedItems.children).some(el => el.dataset.value === selectedText)) {
                    // Создаём новый элемент
                    const newItem = document.createElement("div");
                    newItem.classList.add("combobox-item");
                    newItem.dataset.value = selectedText;
                    newItem.textContent = selectedText;

                    // Кнопка удаления
                    const removeBtn = document.createElement("span");
                    removeBtn.classList.add("remove-item");
                    removeBtn.textContent = "×";
                    removeBtn.addEventListener("click", (e) => {
                        e.stopPropagation();
                        selectedItems.removeChild(newItem);
                    });

                    newItem.appendChild(removeBtn);
                    selectedItems.appendChild(newItem);
                }
            }
        });

        // Закрытие выпадающего списка при клике вне combobox
        document.addEventListener("click", (event) => {
            if (!combobox.contains(event.target)) {
                combobox.classList.remove("open");
            }
        });
    }

    // Автоматически инициализируем все combobox на странице
    initializeCombobox("customCombobox", "selectedItems", "optionsList");
    initializeCombobox("customCombobox1", "selectedItems1", "optionsList1");
    initializeCombobox("customCombobox2", "selectedItems2", "optionsList2");
});
