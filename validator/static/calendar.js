document.addEventListener("DOMContentLoaded", function () {
    const monthYear = document.getElementById("month-year");
    const prevMonth = document.getElementById("prev-month");
    const nextMonth = document.getElementById("next-month");
    const daysContainer = document.getElementById("days");

    let currentDate = new Date();
    let startDate = null;
    let endDate = null;
    let selectedMonth = currentDate.getMonth();
    let selectedYear = currentDate.getFullYear();

    // Создание выпадающего меню выбора месяца и года
    let dropdown = document.createElement("div");
    dropdown.classList.add("dropdown-container");
    dropdown.style.display = "none"; // Скрываем по умолчанию

    // Контейнер для месяцев и годов в одной строке
    let flexContainer = document.createElement("div");
    flexContainer.classList.add("flex-dropdown");

    // Список месяцев (с отдельным скроллом)
    let monthsContainer = document.createElement("div");
    monthsContainer.classList.add("dropdown-section", "months-scroll");

    const months = [
        "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
        "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
    ];

    months.forEach((month, index) => {
        let monthItem = document.createElement("div");
        monthItem.textContent = month;
        monthItem.classList.add("dropdown-item");
        monthItem.addEventListener("click", () => {
            currentDate.setMonth(index);
            dropdown.style.display = "none";
            renderCalendar();
        });
        monthsContainer.appendChild(monthItem);
    });

    // Список годов (с отдельным скроллом)
    let yearsContainer = document.createElement("div");
    yearsContainer.classList.add("dropdown-section", "years-scroll");

    for (let i = selectedYear - 50; i <= selectedYear + 50; i++) {
        let yearItem = document.createElement("div");
        yearItem.textContent = i;
        yearItem.classList.add("dropdown-item");
        yearItem.addEventListener("click", () => {
            currentDate.setFullYear(i);
            dropdown.style.display = "none";
            renderCalendar();
        });
        yearsContainer.appendChild(yearItem);
    }

    flexContainer.appendChild(monthsContainer);
    flexContainer.appendChild(yearsContainer);
    dropdown.appendChild(flexContainer);
    document.body.appendChild(dropdown);

    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        selectedMonth = month;
        selectedYear = year;

        monthYear.textContent = new Intl.DateTimeFormat('ru-RU', { month: 'long', year: 'numeric' }).format(currentDate);

        daysContainer.innerHTML = "";

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const prevMonthDays = new Date(year, month, 0).getDate();

        let startDay = firstDay === 0 ? 6 : firstDay - 1;

        // Заполняем предыдущие дни месяца (серые)
        for (let i = startDay; i > 0; i--) {
            let day = document.createElement("div");
            day.textContent = prevMonthDays - i + 1;
            day.classList.add("day", "other-month");
            daysContainer.appendChild(day);
        }

        // Заполняем текущий месяц
        for (let i = 1; i <= daysInMonth; i++) {
            let day = document.createElement("div");
            day.textContent = i;
            day.classList.add("day");

            if (i === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
                day.classList.add("today");
            }

            day.addEventListener("click", function () {
                selectDate(year, month, i);
            });

            daysContainer.appendChild(day);
        }

        // Заполняем следующий месяц (серые числа)
        let remainingDays = (startDay + daysInMonth) % 7;
        if (remainingDays !== 0) {
            for (let i = 1; i <= 7 - remainingDays; i++) {
                let day = document.createElement("div");
                day.textContent = i;
                day.classList.add("day", "other-month");
                daysContainer.appendChild(day);
            }
        }

        highlightRange();
    }

    function selectDate(year, month, day) {
        let selectedDate = new Date(year, month, day);

        if (month !== selectedMonth || year !== selectedYear) {
            startDate = selectedDate;
            endDate = null;
            selectedMonth = month;
            selectedYear = year;
        } else {
            if (!startDate || (startDate && endDate)) {
                startDate = selectedDate;
                endDate = null;
            } else {
                if (selectedDate < startDate) {
                    endDate = startDate;
                    startDate = selectedDate;
                } else {
                    endDate = selectedDate;
                }
            }
        }

        highlightRange();
    }

    function highlightRange() {
        let days = document.querySelectorAll(".day");
        days.forEach(day => day.classList.remove("selected", "range"));

        if (startDate) {
            days.forEach(day => {
                let dayValue = parseInt(day.textContent, 10);
                let dayDate = new Date(selectedYear, selectedMonth, dayValue);

                if (dayDate.getTime() === startDate.getTime()) {
                    day.classList.add("selected");
                }

                if (endDate && dayDate > startDate && dayDate < endDate) {
                    day.classList.add("range");
                }

                if (endDate && dayDate.getTime() === endDate.getTime()) {
                    day.classList.add("selected");
                }
            });
        }
    }

    prevMonth.addEventListener("click", function () {
        currentDate.setMonth(currentDate.getMonth() - 1);
        startDate = null;
        endDate = null;
        renderCalendar();
    });

    nextMonth.addEventListener("click", function () {
        currentDate.setMonth(currentDate.getMonth() + 1);
        startDate = null;
        endDate = null;
        renderCalendar();
    });

    monthYear.addEventListener("click", function (event) {
        dropdown.style.display = "block";
        dropdown.style.position = "absolute";
        dropdown.style.top = event.clientY + "px";
        dropdown.style.left = event.clientX + "px";
    });

    document.addEventListener("click", function (event) {
        if (!monthYear.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.style.display = "none";
        }
    });

    renderCalendar();
});
