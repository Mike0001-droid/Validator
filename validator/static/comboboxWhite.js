// Функция инициализации комбобоксов (с выбором только одного элемента)
function initializeCombobox(comboboxId, selectedItemsId, optionsId) {
    const combobox = document.getElementById(comboboxId);
    const selectedItems = document.getElementById(selectedItemsId);
    const optionsList = document.getElementById(optionsId);

    // Открытие/закрытие списка
    combobox.addEventListener('click', () => {
        combobox.classList.toggle('open');
    });

    // Обработчик выбора элемента (только один)
    optionsList.addEventListener('click', (event) => {
        if (event.target.classList.contains('new-combobox-item')) {
            const selectedText = event.target.textContent;

            // Очищаем предыдущий выбор
            selectedItems.innerHTML = "";

            // Создаём новый элемент
            const newItem = document.createElement('div');
            newItem.classList.add('selected-item');
            newItem.dataset.value = selectedText;
            newItem.textContent = selectedText;

            // Кнопка удаления
            const removeBtn = document.createElement('span');
            removeBtn.classList.add('remove-item');
            removeBtn.textContent = "×";
            removeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                selectedItems.innerHTML = ""; // Удаляет выбранный элемент
            });

            newItem.appendChild(removeBtn);
            selectedItems.appendChild(newItem);
        }
    });

    // Закрытие выпадающего списка при клике вне
    document.addEventListener('click', (event) => {
        if (!combobox.contains(event.target)) {
            combobox.classList.remove('open');
        }
    });
}

// Инициализация комбобоксов
initializeCombobox("newCombobox1", "newSelectedItems1", "newOptions1");
initializeCombobox("newCombobox2", "newSelectedItems2", "newOptions2");
initializeCombobox("newCombobox3", "newSelectedItems3", "newOptions3");