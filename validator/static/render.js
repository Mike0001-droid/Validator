
let currentModel = null;
let currentSynchronization = null;
let currentTransaction = null;

const synchronizationsContainer = document.querySelector('.synchronizations-container');
const synchronizationsAccordion = document.querySelector('.accordion#accordion-1');
const currentSynchronizationElement = document.querySelector('.current-synchronization');
const accordionItemTemplate = document.querySelector('template#accordion-item').content;
const fileInfoContainer = document.querySelector('.file-info-container');
const transactionListTemplate = document.querySelector('template#transaction-list-item').content;
const operationsContainer = document.querySelector('.operations-container');

const clearModel = () => {
    synchronizationsContainer.querySelector('.accordion').replaceChildren();
    fileInfoContainer.replaceChildren();
//    pictureContainerElement.querySelectorAll('.picture').forEach((item) => item.remove());
};

const clearCurrentSynchronization = () => {
    let details = currentSynchronizationElement.querySelector('.synchronization-details');
    details.replaceChildren();
    details.content = null;

    let tr = currentSynchronizationElement.querySelector('.current-transaction');
    tr.replaceChildren();
    tr.content = null;

    operationsContainer.replaceChildren();
//    let tr_cont = currentSynchronizationElement.querySelector('.operations-container');
//    let tr_list = tr_cont.querySelector('ul');
//    tr_list.replaceChildren();
};

const renderNewModel = (model) => {
    clearCurrentSynchronization();
    clearModel();
    currentModel = model;
    console.log(model);

    let title = document.createElement("p");
    title.textContent = `Информация о файле с сервера`;
    fileInfoContainer.append(title);

    let lastUpdated = document.createElement("p");
    lastUpdated.textContent = `Последнее обновление: ${currentModel.last_updated}`;
    fileInfoContainer.append(lastUpdated);

    let lastUpdatedBy = document.createElement("p");
    lastUpdatedBy.textContent = `Последнее обновление by: ${currentModel.last_updated_by}`;
    fileInfoContainer.append(lastUpdatedBy);

    let dateCreated = document.createElement("p");
    dateCreated.textContent = `Дата создания: ${currentModel.date_created}`;
    fileInfoContainer.append(dateCreated);

    let currentSupportFiles = document.createElement("p");
    currentSupportFiles.textContent = `Текущие файлы поддержки: ${currentModel.current_support_files_size}`;
    fileInfoContainer.append(currentSupportFiles);

    let currentModelSize = document.createElement("p");
    currentModelSize.textContent = `Текущие размер модели: ${currentModel.current_model_size}`;
    fileInfoContainer.append(currentModelSize);

    var s_counter = 0;
    model.synchronization_set.forEach((synchronization) => {
        let accordionItem = accordionItemTemplate.cloneNode(true);

        let accordionButton = accordionItem.querySelector('.accordion-button');
        accordionButton.setAttribute("data-bs-target", `#accordion-1 .item-${s_counter}`);
        accordionButton.setAttribute("aria-controls", `accordion-1 .item-${s_counter}`);
        accordionButton.setAttribute("synchronization-id", `synchronization-${s_counter}`)

        var date = new Date(synchronization.server_datetime);
        let formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
        var options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        formattedDate = date.toLocaleDateString("ru-RU", options)
        accordionButton.textContent = `Синхронизация №${s_counter + 1} ${formattedDate} ${synchronization.user_id}`
        accordionButton.addEventListener("click", function(){renderSynchronization(this)});

        let accordionCollapse = accordionItem.querySelector('.accordion-collapse');
        accordionCollapse.classList.add(`item-${s_counter}`);

        let transactionsList = accordionCollapse.querySelector('.transaction-list');
        var t_counter = 1;
        synchronization.transaction_set.forEach((transaction) => {

            let transactionListWrapper = transactionListTemplate.cloneNode(true);
            let transactionListItem = transactionListWrapper.querySelector('li');

            transactionListItem.id = `transaction-${t_counter - 1}`;

            let transactionTitle = transactionListItem.querySelector('p');
            transactionTitle.textContent = `Транзакция ${t_counter}`;
            transactionsList.append(transactionListItem);
            transactionListItem.addEventListener("click", function(){resetTransaction(this)});
            t_counter++;
        });

        synchronizationsAccordion.append(accordionItem);
        console.log(s_counter);
        s_counter++;
    });
}

const renderSynchronization = (synchronizationAccordionButton) => {
    clearCurrentSynchronization();
    console.log(synchronizationAccordionButton.getAttribute('aria-expanded'));
    if (!(synchronizationAccordionButton.getAttribute('aria-expanded') == 'true')) {
        console.log('aaa');
        return;
    }
    let synchronizationDetails = currentSynchronizationElement.querySelector('.synchronization-details');

    let synchronizationId = synchronizationAccordionButton.getAttribute('synchronization-id');
    let index = parseInt(synchronizationId.match(/(\d+)$/)[0], 10);
    let synchronizationObject = currentModel.synchronization_set[index];
    console.log(synchronizationObject);

    let title = document.createElement("p");
    title.textContent = `Синхронизация №${index + 1}`;
    synchronizationDetails.append(title);

    let user = document.createElement("p");
    user.textContent = `Пользователь: ${synchronizationObject.user_id}`;
    synchronizationDetails.append(user);

    let date = document.createElement("p");
    date.textContent = `Дата: ${synchronizationObject.server_datetime}`;
    synchronizationDetails.append(date);

    let supportFiles = document.createElement("p");
    supportFiles.textContent = `Текущие файлы поддержки: ${synchronizationObject.support_files_size}`;
    synchronizationDetails.append(supportFiles);

    let modelSize = document.createElement("p");
    modelSize.textContent = `Размер модели: ${synchronizationObject.model_file_size}`;
    synchronizationDetails.append(modelSize);

    let currentTransactionElement = currentSynchronizationElement.querySelector('.current-transaction');
    currentTransactionElement.textContent = 'Choose transaction pls';
    currentTransaction = null;
    currentSynchronization = synchronizationObject;
}

const resetTransaction = (transactionElement) => {
    console.log('SELECTED TRANSACTION ID: ' + transactionElement.id);
    let index = parseInt(transactionElement.id.match(/(\d+)$/)[0], 10);
    currentTransaction = currentSynchronization.transaction_set[index];

    let currentTransactionElement = currentSynchronizationElement.querySelector('.current-transaction');
    currentTransactionElement.replaceChildren();

    let title = document.createElement("p");
    title.textContent = `Транзакция №${index + 1}`;
    currentTransactionElement.append(title);

    let transactionInfo = document.createElement("p");
    transactionInfo.textContent = ` Name: ${currentTransaction.name}; Type: ${currentTransaction.type}; Time: ${currentTransaction.time};`;
    currentTransactionElement.append(transactionInfo);

    renderTransaction();
}

const renderTransaction = () => {

//    console.log('SELECTED TRANSACTION ID: ' + transactionElement.id);
//    let index = parseInt(transactionElement.id.match(/(\d+)$/)[0], 10);
//    currentTransaction = currentSynchronization.transactions[index];


    operationsContainer.replaceChildren();

    let o_index = 0;



    currentTransaction.elements.forEach((element) => {
        console.log('PRINTING ' + o_index);
        let operationElement = document.createElement("p");
        operationElement.textContent = `Элемент ID: ${element.id}.`;
        operationsContainer.append(operationElement);
        o_index++;
    });
//    currentTransaction.elements.forEach((operation) => {
//        console.log('PRINTING ' + o_index);
//        let operationElement = document.createElement("p");
//        operationElement.textContent = `Операция №${o_index + 1}: тип: ${operation.type}; категория: ${operation.category}; элемент: ${operation.element}.`;
//        operationsContainer.append(operationElement);
//        o_index++;
//    });
}

const getFilteredTypes = () => {

}

export { renderNewModel };
