
import { renderNewModel } from './render.js';

$(function () {
//        $('#tree').bstreeview({
//            data: tree_data,
//            expandIcon: 'fa fa-angle-down fa-fw',
//            collapseIcon: 'fa fa-angle-right fa-fw',
//            indent: 1,
//            parentsMarginLeft: '1rem',
//            openNodeLinkOnNewTab: true
//        });
        var counter = 0;
        $('.file-item').click(function(){
            const getData = () => {
              fetch('http://127.0.0.1:8000/models?path=' + this.id) // TODO change ip address to
                .then((response) => response.json())
                .then((r) => (renderNewModel(r)));
            };
            getData();
        });
    });



document.addEventListener("DOMContentLoaded", function () {
    // --- Логика поиска ---
    const searchInput = document.querySelector(".search-input");
    if (searchInput) {
        const checkboxes = document.querySelectorAll(".form-check");

        searchInput.addEventListener("input", function () {
            const searchText = searchInput.value.toLowerCase();

            checkboxes.forEach((checkbox) => {
                const label = checkbox.querySelector("label").textContent.toLowerCase();
                checkbox.style.display = label.includes(searchText) ? "flex" : "none";
            });
        });
    }
});

