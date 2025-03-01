document.addEventListener("DOMContentLoaded", function () {
//    const treeData = [
//        {
//            text: "ws2019-rs21.avln.local",
//            nodes: [
//                {
//                    text: "22_БРУ_ТМН_ОКТ8",
//                    nodes: [
//                        {
//                            text: "01_Стадион ЭП",
//                            nodes: [
//                                {
//                                    text: "АР",
//                                    nodes: [
//                                        { text: "TMN.OKT.08_CA_AR.rvt", file: true },
//                                        { text: "TMN.OKT.08_CP_AR.rvt", file: true },
//                                        { text: "Архив" }
//                                    ]
//                                }
//                            ]
//                        }
//                    ]
//                },
//                {
//                    text: "23_БРУ_ТМН_ОКТ9",
//                    nodes: [
//                        {
//                            text: "02_Стадион МП",
//                            nodes: [
//                                {
//                                    text: "АР",
//                                    nodes: [
//                                        { text: "TMN.OKT.09_CA_AR.rvt", file: true },
//                                        { text: "TMN.OKT.09_CP_AR.rvt", file: true },
//                                        { text: "Архив" }
//                                    ]
//                                }
//                            ]
//                        }
//                    ]
//                },
//                {
//                    text: "24_БРУ_ТМН_ОКТ10",
//                    nodes: [
//                        {
//                            text: "03_Стадион ВП",
//                            nodes: [
//                                {
//                                    text: "АР",
//                                    nodes: [
//                                        { text: "TMN.OKT.10_CA_AR.rvt", file: true },
//                                        { text: "TMN.OKT.10_CP_AR.rvt", file: true },
//                                        { text: "Архив" }
//                                    ]
//                                }
//                            ]
//                        }
//                    ]
//                },
//                {
//                    text: "25_БРУ_ТМН_ОКТ11",
//                    nodes: [
//                        {
//                            text: "04_Стадион КП",
//                            nodes: [
//                                {
//                                    text: "АР",
//                                    nodes: [
//                                        { text: "TMN.OKT.11_CA_AR.rvt", file: true },
//                                        { text: "TMN.OKT.11_CP_AR.rvt", file: true },
//                                        { text: "Архив" }
//                                    ]
//                                }
//                            ]
//                        }
//                    ]
//                },
//                {
//                    text: "26_БРУ_ТМН_ОКТ12",
//                    nodes: [
//                        {
//                            text: "05_Стадион ФП",
//                            nodes: [
//                                {
//                                    text: "АР",
//                                    nodes: [
//                                        { text: "TMN.OKT.12_CA_AR.rvt", file: true },
//                                        { text: "TMN.OKT.12_CP_AR.rvt", file: true },
//                                        { text: "Архив" }
//                                    ]
//                                }
//                            ]
//                        }
//                    ]
//                },
//                {
//                    text: "27_БРУ_ТМН_ОКТ13",
//                    nodes: [
//                        {
//                            text: "06_Стадион ДП",
//                            nodes: [
//                                {
//                                    text: "АР",
//                                    nodes: [
//                                        { text: "TMN.OKT.13_CA_AR.rvt", file: true },
//                                        { text: "TMN.OKT.13_CP_AR.rvt", file: true },
//                                        { text: "Архив" }
//                                    ]
//                                }
//                            ]
//                        }
//                    ]
//                }
//            ]
//        }
//    ];

    function createTree(parent, nodes, icons) {
        if (!nodes) return;
        let ul = document.createElement("ul");
        ul.classList.add("tree-list"); // Добавляем класс для стилизации
        parent.appendChild(ul);

        nodes.forEach(node => {
            let li = document.createElement("li");
            li.classList.add("tree-item");

            let container = document.createElement("div");
            container.classList.add(node.file ? "file-item" : "tree-folder");

            // Создаем иконку папки или файла
            let icon = document.createElement("img");
            icon.src = node.file ? icons.file : icons.folderClosed;
            icon.classList.add(node.file ? "file-icon" : "folder-icon");

            let textNode = document.createElement("span");
            textNode.textContent = node.text;

            container.appendChild(icon);
            container.appendChild(textNode);
            li.appendChild(container);
            ul.appendChild(li);

            if (node.file) {
                container.setAttribute("id", node.id);
            }

            if (node.nodes && node.nodes.length > 0) {
                // Создаем стрелку, если у папки есть вложенные элементы
                let arrow = document.createElement("img");
                arrow.src = icons.expandIcon;
                arrow.classList.add("arrow-icon");
                container.insertBefore(arrow, icon); // Вставляем стрелку перед иконкой

                // Создаем вложенное дерево
                let subTree = document.createElement("ul");
                subTree.classList.add("tree-list");
                subTree.style.display = "none"; // Изначально скрываем вложенные папки
                li.appendChild(subTree);

                // Обработчик клика для открытия/закрытия папок
                container.addEventListener("click", function () {
                    let isOpen = subTree.style.display === "block";
                    subTree.style.display = isOpen ? "none" : "block";
                    li.classList.toggle("open", !isOpen);
                    icon.src = isOpen ? icons.folderClosed : icons.folderOpen;
                    arrow.src = isOpen ? icons.expandIcon : icons.collapseIcon;
                });

                createTree(subTree, node.nodes, icons);
            }
        });
    }

    const treeContainer = document.getElementById("tree-view");
    const icons = {
        folderClosed: treeContainer.getAttribute("data-folder-icon"),
        folderOpen: treeContainer.getAttribute("data-folder-open-icon"),
        file: treeContainer.getAttribute("data-file-icon"),
        expandIcon: treeContainer.getAttribute("data-expand-icon"),
        collapseIcon: treeContainer.getAttribute("data-collapse-icon")
    };

    createTree(treeContainer, treeData, icons);
});
