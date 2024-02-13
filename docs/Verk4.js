//Selectors
document.querySelector('form').addEventListener('submit', handleSubmitForm);
document.querySelector('ul').addEventListener('click', handleClickDeleteOrCheck);
document.getElementById('clearAll').addEventListener('click', handleClearAll);

window.onload = addAllItemsToCart;
//Event Handler
function handleSubmitForm(e) {
    e.preventDefault();
    let item = document.getElementById('item');
    let price = document.getElementById('price');
    
    if (item.value != '' && price.value != '') {
        let newItem = new Item(item.value, price.value)
        itemsArray.push(newItem);
        saveItemsToLocalStorage(itemsArray);
        addItem(newItem);
        calculateTotal();
    }
    item.value = '';
    price.value = '';
}

function handleClickDeleteOrCheck(e) {
    if (e.target.name == 'checkButton') {
        checkItem(e);
    }
    if (e.target.name == 'deleteButton') {
        deleteItem(e);
    }
}

function handleClearAll(e) {
    localStorage.removeItem('items');
    document.querySelector('ul').innerHTML = '';
    calculateTotal();
}

// Helpers
function addItem(item) {
    //window.onload = addAllItemsToCart;
    let ul = document.querySelector('ul');
    let li = document.createElement('li');

    li.innerHTML = `
        <span class="todo-item">${item.name}</span> <span class="todo-item-price"> ${item.price}kr</span>
        <button name = "deleteButton"><i class="fas fa-trash"></i></button>

    `;
    li.classList.add('todo-list-item');
    ul.appendChild(li);
    calculateTotal();
}

function calculateTotal() {
    let totalPrice = 0;
    document.querySelectorAll('.todo-item-price').forEach(item => {
        let price = parseFloat(item.textContent.match(/\d+/)[0]);
        totalPrice += price;
    });
    document.getElementById('totalPrice').textContent = totalPrice.toFixed(2);
}

function deleteItem(e) {
    let item = e.target.parentNode;
    let itemName = item.querySelector('.todo-item').textContent;
    let index = itemsArray.findIndex(item => item.name === itemName);

    if (index !== -1) {
        itemsArray.splice(index, 1);
        // Update localStorage
        updateLocalStorage(itemsArray);
    }

    item.addEventListener('transitionend', function () {
        item.remove();
        calculateTotal();
    });

    item.classList.add('todo-list-item-fall');
}

function loadItemsFromLocalStorage() {
    var items = localStorage.getItem('items');
    if (items) {
        return JSON.parse(items);
    } else {
        return [];
    }
}

function saveItemsToLocalStorage(itemsArray) {
    localStorage.setItem('items', JSON.stringify(itemsArray));
}

function addAllItemsToCart() {
    itemsArray.forEach(item => {
        addItem(item);
    });
}

// Object
function Item(name, price) {
    this.name = name;
    this.price = price;
}

function updateLocalStorage(itemsArray) {
    localStorage.setItem('items', JSON.stringify(itemsArray));
}

let itemsArray = loadItemsFromLocalStorage();

if (itemsArray.length === 0) {
    addDefaultItems();

    updateLocalStorage(itemsArray);
}

function addDefaultItems() {
    itemsArray.push(
        {name: 'Epli', price: 109},
        {name: 'Mjólk', price: 349},
        {name: 'Brauð', price: 589},
        {name: 'Ananas', price: 309},
        {name: 'Kiwi', price: 110}
    );
}


console.log(itemsArray);
//localStorage.clear();
console.log(localStorage);

calculateTotal();
