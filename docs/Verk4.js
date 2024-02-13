//Selectors
document.querySelector('form').addEventListener('submit', handleSubmitForm);
document.querySelector('ul').addEventListener('click', handleClickDeleteOrCheck);
document.getElementById('clearAll').addEventListener('click', handleClearAll);

//Event Handler
function handleSubmitForm(e) {
    e.preventDefault();
    let item = document.getElementById('item');
    let price = document.getElementById('price');
    
    if (item.value != '' && price.value != '') {
        let newItem = new Item(item.value, price.value)
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
    document.querySelector('ul').innerHTML = '';
    calculateTotal();
}

// Helpers
function addItem(item) {
    let ul = document.querySelector('ul');
    let li = document.createElement('li');

    li.innerHTML = `
        <span class="todo-item">${item.name}</span> <span class="todo-item-price"> ${item.price}kr</span>
        <button name = "deleteButton"><i class="fas fa-trash"></i></button>

    `;
    li.classList.add('todo-list-item');
    ul.appendChild(li);
}

function checkItem(e) {
    let item = e.target.parentNode;
    if (item.style.textDecoration == 'line-through') {
        item.style.textDecoration = 'none';
    } else {
        item.style.textDecoration = 'line-through';
    }
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

    item.addEventListener('transitionend', function () {
        item.remove();
        calculateTotal();
    })

    item.classList.add('todo-list-item-fall');
}

// Object
function Item(name, price) {
    this.name = name;
    this.price = price;
}

let apple = new Item('Epli', 109);
let milk = new Item('Mjólk', 349);
let bread = new Item('Brauð', 589);
let ananas = new Item('Ananas', 309);
let kiwi = new Item('Kiwi', 110);

addItem(apple);
addItem(milk);
addItem(bread);
addItem(ananas);
addItem(kiwi);
calculateTotal();
