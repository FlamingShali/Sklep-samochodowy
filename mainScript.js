'use strict';
const zamknijPodsumowanie = document.querySelector('.zamknij-podsumowanie');
const czyszczenieKoszyka = document.getElementById('clear-cart');
const formularzKoszyka = document.getElementById('cart-btn');
const modal = document.querySelector('.modal');
const formularz = document.getElementById('formularz--daneOsobowe');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');
const podsumowanieZakupu = document.getElementById('podsumowanie');
const btnPrzejdzDalej = document.querySelector('.btn-przejdzDalej');
const pokazMojKoszykBtn = document.getElementById('present-cart');
const mainPage = document.querySelector('.main-page');
let iloscKoszykPrzedmioty = document.getElementById('koszyk-przedmioty');
let cenaOstateczna = document.getElementById('cenaOstateczna');
let datyZakupu = document.getElementById('date-of-order-input');
let doZaplaty = document.querySelector('.doZaplaty');
let cartContainer = document.getElementById('present-cart-container');
let koszykCena = document.querySelector('.cena-koszyk');
const btnBackToForm = document.querySelector('.back-to-form');
const btnOrder = document.querySelector('.btn-order');
const lastPage = document.getElementById('last-page');
const btnFinishOrder = document.querySelector('.btn--back-to-main-page');

let koszyk = [];

function check() {
  if (localStorage.getItem('koszyk')) {
    koszyk = JSON.parse(localStorage.getItem('koszyk'));
    sumujKoszyk();
  }

  czyszczenieKoszyka.addEventListener('click', wyczyscKoszyk);
}

function wyczyscKoszyk() {
  koszyk = [];
  localStorage.removeItem('koszyk');
  sumujKoszyk();
}

const sumujKoszyk = function () {
  let suma = 0;
  koszyk.forEach(item => {
    suma += item.cena;
    let podgladKoszyka = document.querySelector('.podglad-koszyka');
    let formularzPrzedmiotyWKoszyku = document.querySelector(
      '.przedmiotyWKoszyku'
    );
    let koszykList = '';
    for (let i = 0; i < koszyk.length; i++) {
      let przedmiot = `<li class="car">
                      <h4 class="car--nazwa">${koszyk[i].nazwa}</h4>
                      <p class="car--info">Cena: ${koszyk[i].cena} PLN</p>
                      <img class="car--img" src="${koszyk[i].img}"> 
                      <button class="btn btn-usunZKoszyka" onclick="usunZKoszyka(koszyk[${i}])">Usuń z koszyka</button>                     
                    </li>`;
      koszykList += przedmiot;
    }
    formularzPrzedmiotyWKoszyku.innerHTML = koszykList;
    podgladKoszyka.innerHTML = koszykList;
  });

  doZaplaty.textContent = `Cena do zapłaty: ${suma.toFixed(2)} PLN`;
  cenaOstateczna.textContent = `Cena do zapłaty: ${suma.toFixed(2)} PLN`;
  koszykCena.textContent = `Cena do zapłaty: ${suma.toFixed(2)} PLN`;
  iloscKoszykPrzedmioty.textContent = `Ilośc przedmiotów w koszyku: ${koszyk.length}`;
};

function dodajDoKoszyka(item) {
  koszyk.push(item);
  localStorage.setItem('koszyk', JSON.stringify(koszyk));
  sumujKoszyk();
}

function usunZKoszyka(item) {
  if (koszyk.length === 1) {
    location.reload();
    for (let i = 0; i < koszyk.length; i++) {
      if (koszyk[i] === item) {
        koszyk.splice(i, 1);
        localStorage.setItem('koszyk', JSON.stringify(koszyk));
        sumujKoszyk();
        break;
      }
    }
  } else {
    for (let i = 0; i < koszyk.length; i++) {
      if (koszyk[i] === item) {
        koszyk.splice(i, 1);
        localStorage.setItem('koszyk', JSON.stringify(koszyk));
        sumujKoszyk();
        break;
      }
    }
  }
}

const order = function () {
  podsumowanieZakupu.classList.add('hidden');
  lastPage.classList.remove('hidden');
  wyczyscKoszyk();
};

function sprawdz1() {
  if (nameSurname == '') {
    document.getElementById('pole1').innerHTML =
      'Podaj poprawne imię i nazwisko';
  }
}

const openFormularz = function () {
  if (koszyk == '') {
    alert('Dodaj do koszyka jakiś przedmiot');
  } else {
    formularz.classList.remove('hidden');
    mainPage.classList.add('hidden');
  }
};

const pokazKoszyk = function () {
  if (koszyk == '') {
    alert('Dodaj do koszyka jakiś przedmiot');
  } else {
    cartContainer.classList.remove('hidden');
  }
};

const przejdzDoPodsumowania = function () {
  const dateOfOrder = document.getElementById('order-date');
  const cash = document.getElementById('btn-gotowka');
  const leasing = document.getElementById('btn-leasing');
  const name = document.querySelector('.name');
  const surname = document.querySelector('.surname');
  let dataName = document.getElementById('data-name');
  let dataSurname = document.getElementById('data-surname');
  let dataFinancing = document.getElementById('data-financing');
  if (
    name.value === '' ||
    surname.value === '' ||
    (cash.checked == false && leasing.checked == false)
  ) {
    if (name.value === '' || surname.value === '') {
      alert('Sprawdź poprawność danych');
      document.getElementById('pole1').innerHTML =
        'Podaj poprawne imię i nazwisko';
    } else {
      alert('Proszę wybrać formę finansowania');
    }
  } else {
    formularz.classList.add('hidden');
    podsumowanieZakupu.classList.remove('hidden');
    dataName.textContent = `Twoje imię i nazwisko: ${name.value} ${surname.value}`;
    if (cash.checked == true) {
      dataFinancing.textContent = 'Wybrana forma finansowania: "Gotówka"';
    } else if (leasing.checked == true) {
      dataFinancing.textContent = 'Wybrana forma finansowania: "Leasing"';
    }
    dateOfOrder.innerHTML = `Data odbioru twojego zamówienia to: ${
      datyZakupu.options[datyZakupu.selectedIndex].value
    }`;
  }
};

const zamknijFormularz = function () {
  formularz.classList.add('hidden');
  mainPage.classList.remove('hidden');
  console.log(`cos`);
};
const zamknijPodsumowanie1 = function () {
  podsumowanieZakupu.classList.add('hidden2');
  mainPage.classList.remove('hidden');
  console.log(`cos`);
};

const backToForm = function () {
  podsumowanieZakupu.classList.add('hidden');
  formularz.classList.remove('hidden');
};

document.addEventListener('DOMContentLoaded', function () {
  let carsSelect = document.getElementById('carsSelect');
  let carList = '';
  for (let i = 0; i < samochody.length; i++) {
    let car = `<li class="car">
                  <h4 class="car--nazwa">${samochody[i].nazwa}</h4>
                  <img class="car--img" src="${samochody[i].img}">
                  <h3 class="heading-tertiary">O samochodzie:</h3>
                  <p class="car--info">Rok produkcji: ${samochody[i].rokProdukcji}</p>
                  <p class="car--info">Kolor: ${samochody[i].kolor}</p>
                  <p class="car--info">Przebieg: ${samochody[i].przebiegKm} PLN</p>
                  <button class="btn btn-dodajDoKoszyka" onclick="dodajDoKoszyka(samochody[${i}])">Dodaj do koszyka</button>
                  <p class="car--info">Cena: ${samochody[i].cena} PLN</p>
                </li>`;
    carList += car;
  }
  carsSelect.innerHTML = carList;

  let accesoriesSelect = document.getElementById('accessories-select');
  let accesoriesList = '';
  for (let j = 0; j < akcesoria.length; j++) {
    let przedmiot = `<li class="przedmiot">
                        <h4 class="car--nazwa">${akcesoria[j].nazwa}</h4>
                        <img class="car--img" src="${akcesoria[j].img}">
                        <p class="car--info">${akcesoria[j].opis}</p>
                        <p class="car--info">Cena: ${akcesoria[j].cena} PLN</p>
                        <button class="btn btn-dodajDoKoszyka" onclick="dodajDoKoszyka(akcesoria[${j}])">Dodaj do koszyka</button>
                      </li>`;
    accesoriesList += przedmiot;
  }
  accesoriesSelect.innerHTML = accesoriesList;
  let daty = '';
  for (let i = 1; i < 15; i++) {
    let dzien = new Date();
    dzien.setDate(dzien.getDate() + i);
    let dzienHTML = `<option>${dzien.toLocaleDateString()}</option>`;
    daty += dzienHTML;
  }

  datyZakupu.innerHTML = daty;

  check();
});

formularzKoszyka.addEventListener('click', openFormularz);
btnCloseModal.addEventListener('click', zamknijFormularz);
btnPrzejdzDalej.addEventListener('click', przejdzDoPodsumowania);
pokazMojKoszykBtn.addEventListener('click', pokazKoszyk);
zamknijPodsumowanie.addEventListener('click', zamknijPodsumowanie1);
btnBackToForm.addEventListener('click', backToForm);
btnOrder.addEventListener('click', order);
btnFinishOrder.addEventListener('click', function () {
  location.reload();
});
