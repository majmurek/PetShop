function getData() {
    return {
        'row1-1': {image: "./images/image0.jpg", price: '10', name: "Wiewiórka"},
        'row1-2': {image: "./images/image1.jpg", price: '10', name: "Kot"},
        'row1-3': {image: "./images/image2.jpg", price: '120', name: "Jeleń"},
        'row2-1': {image: "./images/image0.jpg", price: '15', name: "Wiewiórka"},
        'row2-2': {image: "./images/image1.jpg", price: '15', name: "Kot"},
        'row2-3': {image: "./images/image2.jpg", price: '150', name: "Jeleń"},
        'row3-1': {image: "./images/image0.jpg", price: '20', name: "Wiewiórka"},
        'row3-2': {image: "./images/image1.jpg", price: '25', name: "Kot"},
        'row3-3': {image: "./images/image2.jpg", price: '210', name: "Jeleń"},
        'row4-1': {image: "./images/image0.jpg", price: '25', name: "Wiewiórka"},
        'row4-2': {image: "./images/image1.jpg", price: '85', name: "Kot"},
        'row4-3': {image: "./images/image2.jpg", price: '400', name: "Jeleń"}
    }
}

function clearBasket() {
    const parent = document.getElementById("selected-items-container");
    while (parent.firstChild) {
        parent.firstChild.remove();
    }
    document.getElementById('price-sum').innerText = "0";
}

function deleteItemFromBasket(id, attr) {
    const deletedItem = document.getElementById(id);
    deletedItem.remove();
    decreasePrice(attr.price);
}

function risePrice(price) {
    const priceSum = document.getElementById('price-sum');
    const currentSum = priceSum.innerText;
    const addedPrice = parseInt(price, 10);
    let sum = parseInt(currentSum, 10);

    sum = sum + addedPrice;
    priceSum.innerText = sum;
}

function decreasePrice(price) {
    const priceSum = document.getElementById('price-sum');
    const currentSum = priceSum.innerText;
    const deletedPrice = parseInt(price, 10);
    let sum = parseInt(currentSum, 10);

    sum = sum - deletedPrice;
    priceSum.innerText = sum;
}


function addItemToBasket(attr, id) {
    const boxContainer = document.getElementById('selected-items-container');
    const itemId = id + '-basket';

    risePrice(attr.price);

    const singleProduct = document.createElement('div');
    singleProduct.classList.add('single-product');
    singleProduct.id = itemId;


    const productHeader = document.createElement('div');
    productHeader.classList.add('product-header');

    const priceProduct = document.createElement('div');
    priceProduct.classList.add('price-product');
    priceProduct.innerText = "Cena: " + attr.price;

    const productName = document.createElement('div');
    productName.classList.add('product-name');
    productName.innerText = attr.name;

    const buttonDelete = document.createElement('button');
    buttonDelete.onclick = function () { deleteItemFromBasket(itemId, attr)};
    buttonDelete.classList.add('button-delete', 'btn', 'btn-danger');
    buttonDelete.innerText = 'X';

    boxContainer.appendChild(singleProduct);

    singleProduct.appendChild(productHeader);
    singleProduct.appendChild(priceProduct);

    productHeader.appendChild(productName);
    productHeader.appendChild(buttonDelete);
}


function createItem(id) {
    const attr = getData()[id];

    const item = document.createElement('div');
    item.classList.add('item');
    item.id = id;

    const image = document.createElement('img');
    image.classList.add('image');
    image.style.backgroundImage = `url(${attr.image})`;

    const name = document.createElement('span');
    name.classList.add('item-name');
    name.innerText = attr.name;

    const priceContainer = document.createElement('div');
    priceContainer.classList.add('price-container');

    const additionPrice = document.createElement('button');
    additionPrice.onclick = function () { addItemToBasket(attr, id)};
    additionPrice.classList.add('addition-price', 'btn', 'btn-primary');
    additionPrice.innerText = 'Dodaj';

    const price = document.createElement('span');
    price.classList.add('price-product');
    price.innerText = attr.price + 'zl';

    item.appendChild(image);
    item.appendChild(name);
    item.appendChild(priceContainer);
    priceContainer.appendChild(price);
    priceContainer.appendChild(additionPrice);
    return item;
}

function onLoadFunction() {
    const itemsContainer = document.getElementById('items-container');
    const itemsRow = document.createElement('div');
    const itemsRow2 = document.createElement('div');
    const itemsRow3 = document.createElement('div');
    const itemsRow4 = document.createElement('div');

    const row = [itemsRow, itemsRow2, itemsRow3, itemsRow4];

    row.forEach((row) => {
        row.classList.add('flexRow', 'itemRow');
    itemsContainer.appendChild(row);
});

    for (i = 1; i <= 3; i++) {
        itemsRow.appendChild(createItem(`row1-${i}`));
        itemsRow2.appendChild(createItem(`row2-${i}`));
        itemsRow3.appendChild(createItem(`row3-${i}`));
        itemsRow4.appendChild(createItem(`row4-${i}`));
    }
}
