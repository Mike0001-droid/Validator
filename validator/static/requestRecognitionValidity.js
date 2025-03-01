// Функция для получения CSRF-токена
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const csrftoken = getCookie('csrftoken');

// Функция для добавления выбранного типа СК
function addSelectedTypeSk(typeSkId, typeSkName) {
    const selectedTypesSkContainer = $('#selected-types-sk');
    selectedTypesSkContainer.empty(); // Очищаем предыдущий выбор
    selectedTypesSkContainer.append(`
        <div class="selected-value" data-value="${typeSkId}">
            ${typeSkName}
            <span class="remove-value" onclick="removeSelectedTypeSk()">❌</span>
        </div>
    `);
}

// Функция для удаления выбранного типа СК
function removeSelectedTypeSk() {
    $('#selected-types-sk').empty(); // Очищаем блок выбранного типа СК
    $('#id_type_sk').val(''); // Сбрасываем выбор в выпадающем списке
}

// Обработка выбора типа СК
$('#id_type_sk').change(function() {
    const typeSkId = $(this).val();
    if (typeSkId) {
        $.ajax({
            url: `/get-parameters/${typeSkId}/`,
            method: 'GET',
            success: function(data) {
                const container = $('#parameters-container');
                container.empty();
                data.forEach(function(param) {
                    container.append(`
                        <div class="parameter-block">
                            <div class="custom-dropdown">
                                <div class="dropdown-toggle">
                                    <span>${param.name}</span>
                                </div>
                                <div class="dropdown-menu">
                                    ${param.values.map(value => `
                                        <div class="dropdown-item" data-value="${value}">${value}</div>
                                    `).join('')}
                                </div>
                            </div>
                            <div class="selected-values" id="selected-values-${param.id}"></div>
                            <button type="button" class="btn btn-outline-secondary show-new-value-input" data-param-id="${param.id}">
                                <img class="imgObject" src="{% static 'images/buttonForChat.svg' %}" alt="Плюс">
                            </button>
                            <div class="new-value-input-group" id="new-value-input-group-${param.id}">
                                <input type="text" class="form-control new-value-input" data-param-id="${param.id}" placeholder="Введите новое значение">
                                <button type="button" class="btn btn-outline-secondary add-value-btn" data-param-id="${param.id}">Добавить</button>
                            </div>
                        </div>
                    `);
                });
            }
        });
    }
});

// Функция для добавления выбранного значения параметра
function addSelectedValue(paramId, value) {
    const selectedValuesContainer = $(`#selected-values-${paramId}`);
    if (!selectedValuesContainer.find(`.selected-value[data-value="${value}"]`).length) {
        selectedValuesContainer.append(`
            <div class="selected-value" data-value="${value}">
                ${value}
                <span class="remove-value" onclick="removeSelectedValue(${paramId}, '${value}')">❌</span>
            </div>
        `);
    }
}

// Функция для удаления выбранного значения параметра
function removeSelectedValue(paramId, value) {
    $(`#selected-values-${paramId} .selected-value[data-value="${value}"]`).remove();
}

// Обработка нажатия на стрелочку для открытия/закрытия выпадающего списка
$(document).on('click', '.dropdown-toggle', function() {
    $(this).toggleClass('active');
    $(this).next('.dropdown-menu').toggle();
});

// Обработка выбора значения из выпадающего списка
$(document).on('click', '.dropdown-item', function() {
    const paramId = $(this).closest('.parameter-block').find('.new-value-input').data('param-id');
    const value = $(this).data('value');
    addSelectedValue(paramId, value);
    $(this).closest('.dropdown-menu').hide();
    $(this).closest('.dropdown-toggle').removeClass('active');
});

// Обработка нажатия на кнопку "+" для отображения поля ввода нового значения
$(document).on('click', '.show-new-value-input', function() {
    const paramId = $(this).data('param-id');
    $(`#new-value-input-group-${paramId}`).toggle(); // Показываем/скрываем поле ввода
});

// Обработка добавления нового значения параметра
$(document).on('click', '.add-value-btn', function() {
    const paramId = $(this).data('param-id');
    const newValue = $(`.new-value-input[data-param-id="${paramId}"]`).val().trim();
    if (newValue) {
        $.ajax({
            url: `/add-value/${paramId}/`,
            method: 'POST',
            headers: {
                'X-CSRFToken': csrftoken
            },
            data: {
                value: newValue
            },
            success: function(response) {
                if (response.success) {
                    alert('Новое значение успешно добавлено!');
                    $(`.new-value-input[data-param-id="${paramId}"]`).val('');
                    const dropdownMenu = $(`.parameter-block[data-param-id="${paramId}"] .dropdown-menu`);
                    dropdownMenu.append(`
                        <div class="dropdown-item" data-value="${newValue}">${newValue}</div>
                    `);
                    addSelectedValue(paramId, newValue); // Добавляем новое значение в выбранные
                    $(`#new-value-input-group-${paramId}`).hide(); // Скрываем поле ввода после добавления
                } else {
                    alert('Ошибка: ' + response.error);
                }
            },
            error: function(xhr, status, error) {
                console.error('AJAX Error:', error);
            }
        });
    } else {
        alert('Пожалуйста, введите новое значение.');
    }
});

// Обработка сохранения формы
$('#save-form-btn').click(function() {
    const typeSkId = $('#id_type_sk').val(); // Получаем значение напрямую из выпадающего списка
    const parameters = [];

    if (!typeSkId) {
        alert('Пожалуйста, выберите тип СК.');
        return; // Останавливаем выполнение, если тип СК не выбран
    }

    $('.parameter-block').each(function() {
        const paramId = $(this).find('.new-value-input').data('param-id');
        const values = $(`#selected-values-${paramId} .selected-value`).map(function() {
            return $(this).data('value');
        }).get();
        if (values.length > 0) {
            parameters.push({ paramId, values });
        }
    });

    if (parameters.length === 0) {
        alert('Пожалуйста, выберите значения для параметров.');
        return; // Останавливаем выполнение, если нет выбранных значений
    }

    let dataString = '';
    const typeSkName = $('#id_type_sk option:selected').text();
    dataString += typeSkName;

    parameters.forEach(param => {
        const paramName = $(`[data-param-id="${param.paramId}"]`).prev('label').text();
        dataString += `, ${param.values.join(', ')}`;
    });

    $.ajax({
        url: `/save-construct/`,
        method: 'POST',
        headers: {
            'X-CSRFToken': csrftoken
        },
        data: {
            type_sk_id: typeSkId,
            data_string: dataString
        },
        success: function(response) {
            if (response.success) {
                alert('Данные успешно сохранены!');
            } else {
                alert('Error: ' + response.error);
            }
        },
        error: function(xhr, status, error) {
            console.error('AJAX Error:', error);
        }
    });
});