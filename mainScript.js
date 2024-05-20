'use strict';

const btnCloseSummary = document.querySelector('.close-summary');
const btnClearCart = document.getElementById('clear-cart');
const cartForm = document.getElementById('cart-btn');
const form = document.getElementById('form--personal-data');
const btnCloseModal = document.querySelector('.close-modal');
const shoppingSummary = document.getElementById('summary');
const btnGoFurther = document.querySelector('.btn-przejdzDalej');
const btnShowMyCart = document.getElementById('present-cart');
const mainPage = document.querySelector('.main-page');
const itemsInCartNumber = document.getElementById('cart-items');
const finalPrice = document.getElementById('final-price');
const datesOfOrder = document.getElementById('date-of-order-input');
const payment = document.querySelector('.payment');
const cartContainer = document.getElementById('present-cart-container');
const cartPrice = document.querySelector('.cart-price');
const btnBackToForm = document.querySelector('.back-to-form');
const btnOrder = document.querySelector('.btn-order');
const lastPage = document.getElementById('last-page');
const btnFinishOrder = document.querySelector('.btn--back-to-main-page');
const btnBackFromCartPreview = document.querySelector('.btn-back-to-page');
const previewPriceFromForm = document.querySelector('.preview-from-form');
const btnClearLocalStorage = document.getElementById(
  'clear-entire-local-storage'
);

let cart = [];
let userData = {
  name: '',
  surname: '',
  financing: '',
  dateOfOrder: '',
};

const clearLocalStorage = function () {
  location.reload();
  localStorage.clear();
};

function check() {
  if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
    cartSum();
  }

  if (localStorage.getItem('userData')) {
    userData = JSON.parse(localStorage.getItem('userData'));
    document.querySelector('.name').value = userData.name;
    document.querySelector('.surname').value = userData.surname;
    document.getElementById(userData.financing).checked = true;
    datesOfOrder.value = userData.dateOfOrder;
  }

  btnClearCart.addEventListener('click', clearCart);
}

function clearCart() {
  cart = [];
  localStorage.removeItem('cart');
  cartSum();
}

const cartSum = function () {
  let sum = 0;
  const cartPreview = document.querySelector('.cart-preview');
  const formItemsInCart = document.querySelector('.items-in-cart');
  const cartList = generateCartItems(cart);

  cart.forEach(item => (sum += item.price));

  formItemsInCart.innerHTML = cartList;
  cartPreview.innerHTML = cartList;
  updateCartInfo(sum);
};

const updateCartInfo = function (sum) {
  const priceText = `Cena do zapłaty: ${sum.toFixed(2)} PLN`;
  payment.textContent = priceText;
  finalPrice.textContent = priceText;
  cartPrice.textContent = priceText;
  itemsInCartNumber.textContent = `Ilość przedmiotów w koszyku: ${cart.length}`;
  previewPriceFromForm.textContent = priceText;
};

function addToCart(item) {
  cart.push(item);
  localStorage.setItem('cart', JSON.stringify(cart));
  cartSum();
}

function deleteFromCart(item) {
  const index = cart.indexOf(item);
  if (index > -1) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    cartSum();
  }
}

const order = function () {
  shoppingSummary.classList.add('hidden');
  lastPage.classList.remove('hidden');
  clearCart();
};

const toggleVisibility = (hideElement, showElement) => {
  hideElement.classList.add('hidden');
  showElement.classList.remove('hidden');
};

const backFromCartPreview = function () {
  toggleVisibility(cartContainer, mainPage);
};

const openForm = function () {
  if (cart.length === 0) {
    alert('Dodaj do koszyka jakiś przedmiot');
  } else {
    toggleVisibility(mainPage, form);
  }
};

const showCartInventory = function () {
  if (cart.length === 0) {
    alert('Dodaj do koszyka jakiś przedmiot');
  } else {
    toggleVisibility(mainPage, cartContainer);
  }
};

const closeForm = () => toggleVisibility(form, mainPage);
const closeSummary = () => toggleVisibility(shoppingSummary, mainPage);
const backToForm = () => toggleVisibility(shoppingSummary, form);

const goToSummary = function () {
  const dateOfOrder = document.getElementById('order-date');
  const cash = document.getElementById('btn-cash');
  const leasing = document.getElementById('btn-leasing');
  const name = document.querySelector('.name');
  const surname = document.querySelector('.surname');
  const dataNameSurname = document.getElementById('data-name');
  const dataFinancing = document.getElementById('data-financing');
  if (
    name.value === '' ||
    surname.value === '' ||
    (!cash.checked && !leasing.checked)
  ) {
    alert('Sprawdź poprawność danych i wybierz formę finansowania');
    document.getElementById('warning-field').textContent =
      'Podaj poprawne imię i nazwisko';
  } else {
    toggleVisibility(form, shoppingSummary);
    dataNameSurname.textContent = `Twoje imię i nazwisko: ${name.value} ${surname.value}`;
    dataFinancing.textContent = cash.checked
      ? 'Wybrana forma finansowania: "Gotówka"'
      : 'Wybrana forma finansowania: "Leasing"';
    dateOfOrder.innerHTML = `Data odbioru twojego zamówienia to: ${datesOfOrder.value}`;
  }
};

const createItemHTML = function (type, item, index) {
  if (type === 'car') {
    return `
      <li class="car">
        <h4 class="car--name">${item.name}</h4>
        <img class="car--img" src="${item.img}">
        <h3 class="heading-tertiary">O samochodzie:</h3>
        <p class="car--info">Rok produkcji: ${item.yearOfProduction}</p>
        <p class="car--info">Kolor: ${item.color}</p>
        <p class="car--info">Przebieg: ${item.mileage} km</p>
        <button class="btn btn-addToCart" onclick="addToCart(arrCars[${index}])">Dodaj do koszyka</button>
        <p class="car--info">Cena: ${item.price} PLN</p>
      </li>`;
  } else if (type === 'accessory') {
    return `
      <li class="item">
        <h4 class="item--name">${item.name}</h4>
        <img class="item--img" src="${item.img}">
        <p class="item--info">${item.description}</p>
        <button class="btn btn-addToCart" onclick="addToCart(arrAccessories[${index}])">Dodaj do koszyka</button>
        <p class="item--info">Cena: ${item.price} PLN</p>
      </li>`;
  } else if (type === 'cart') {
    return `
      <li class="car">
        <h4 class="car--name">${item.name}</h4>
        <p class="car--info">Cena: ${item.price} PLN</p>
        <img class="car--img" src="${item.img}">
        <button class="btn btn-deleteFromCart" onclick="deleteFromCart(cart[${index}])">Usuń z koszyka</button>
      </li>`;
  }
};

const generateCarItems = function (arr) {
  return arr.map((car, index) => createItemHTML('car', car, index)).join('');
};

const generateAccessoryItems = function (arr) {
  return arr
    .map((item, index) => createItemHTML('accessory', item, index))
    .join('');
};

const generateCartItems = function (cart) {
  return cart
    .map((item, index) => createItemHTML('cart', item, index))
    .join('');
};

const generateDates = function (numDays) {
  let datesHtml = '';
  for (let i = 1; i <= numDays; i++) {
    const day = new Date();
    day.setDate(day.getDate() + i);
    datesHtml += `<option>${day.toLocaleDateString()}.</option>`;
  }
  datesOfOrder.innerHTML = datesHtml;
};

const saveUserData = function (key, value) {
  userData[key] = value;
  localStorage.setItem('userData', JSON.stringify(userData));
};

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('carsSelect').innerHTML = generateCarItems(arrCars);
  document.getElementById('accessories-select').innerHTML =
    generateAccessoryItems(arrAccessories);
  generateDates(14);

  ['name', 'surname'].forEach(field => {
    document
      .querySelector(`.${field}`)
      .addEventListener('change', function (e) {
        saveUserData(field, e.target.value);
      });
  });

  ['btn-cash', 'btn-leasing'].forEach(financeType => {
    document
      .getElementById(financeType)
      .addEventListener('change', function (e) {
        if (e.target.checked) saveUserData('financing', financeType);
      });
  });

  datesOfOrder.addEventListener('change', function (e) {
    saveUserData('dateOfOrder', e.target.value);
  });

  check();
});

cartForm.addEventListener('click', openForm);
btnCloseModal.addEventListener('click', closeForm);
btnGoFurther.addEventListener('click', goToSummary);
btnShowMyCart.addEventListener('click', showCartInventory);
btnCloseSummary.addEventListener('click', closeSummary);
btnBackToForm.addEventListener('click', backToForm);
btnOrder.addEventListener('click', order);
btnFinishOrder.addEventListener('click', function () {
  location.reload();
});
btnBackFromCartPreview.addEventListener('click', backFromCartPreview);
btnClearLocalStorage.addEventListener('click', clearLocalStorage);
