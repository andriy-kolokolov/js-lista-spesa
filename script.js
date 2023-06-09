const tableList = document.getElementById('table-shopping-list');
const inputForm = document.getElementById('input-add-item');
const logField = document.getElementById('log-field');
const btnAdd = document.getElementById('btn-add');
const btnRemove = document.getElementById('btn-remove');

let shoppingList = ["lemons", "beer", "juice", "cola", "bread"];

refreshTable(); // print table

btnAdd.addEventListener("click", function (event) {
    event.preventDefault();
    if (inputForm.value.length !== 0 && !shoppingList.includes(inputForm.value)) {
        shoppingList.push(inputForm.value);
        tableList.innerHTML += `
        <tr id="item-${inputForm.value.replace(/\s/g, '-')}">
            <th scope="row">${shoppingList.length}</th>
            <td>${inputForm.value}</td>
        </tr>
        `;
        setLogField("success", "Item added");
        refreshTable();
    } else {
        setLogField("warning", "Empty input or item exists");
    }
});

btnRemove.addEventListener("click", function (event) {
    event.preventDefault();
    if (inputForm.value.length !== 0 && shoppingList.includes(inputForm.value)) {
        // remove element from DOM
        document
            .getElementById(`item-${inputForm.value.replace(/\s/g, '-')}`)
            .remove();
        // remove item from list
        removeFromList(shoppingList, inputForm.value);
        setLogField("success", "Item removed");
        refreshTable();
    } else {
        setLogField("warning", "Item not found");
    }
});

function setLogField(color, text) {
    switch (color) {
        case "success":
            logField.classList.remove("text-bg-warning");
            logField.classList.add("text-bg-success");
            break;
        case "warning":
            logField.classList.remove("text-bg-success")
            logField.classList.add("text-bg-warning");
            break;
    }
    logField.value = text;
}

function refreshTable() {
    inputForm.value = "";
    // clear table
    const eleTable = document.getElementById('table-shopping-list');
    while (eleTable.firstChild) {
        eleTable.removeChild(eleTable.lastChild);
    }
    // fill table
    for (let i = 0; i < shoppingList.length; i++) {
        tableList.innerHTML += `
        <tr id="item-${shoppingList.at(i).replace(/\s/g, '-')}">
            <th scope="row">${i + 1}</th>
            <td>${shoppingList.at(i)}</td>
        </tr>
        `
    }
}

function removeFromList(list, item) {
    list.splice(list.indexOf(item), 1);
}

// // soluzione ciclo while
// function printShoppingList() {
//     let i = 0;
//     while (i < shoppingList.length) {
//         console.log(shoppingList.at(i));
//         i++;
//     }
// }
