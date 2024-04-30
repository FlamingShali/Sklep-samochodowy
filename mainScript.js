'use strict';

const czyszczenieKoszyka = document.getElementById('wyczyscKoszykBtn');
const formularzKoszyka = document.getElementById('koszyk-btn');
const modal = document.querySelector('.modal');
const formularz = document.getElementById('formularz--daneOsobowe');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');
const podsumowanieZakupu = document.getElementById('podsumowanie');
const btnPrzejdzDalej = document.querySelector('.btn-przejdzDalej');

let iloscKoszykPrzedmioty = document.getElementById('koszyk-przedmioty');
let cenaOstateczna = document.getElementById('cenaOstateczna');
let datyZakupu = document.getElementById('data');
let doZaplaty = document.getElementById('doZaplaty');

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
  });
  let koszykCena =
    (cenaOstateczna.textContent = `Cena do zapłaty: ${suma.toFixed(2)} PLN`);
  iloscKoszykPrzedmioty.textContent = `Ilośc przedmiotów w koszyku: ${koszyk.length}`;
  console.log(koszyk);
};

function dodajDoKoszyka(item) {
  koszyk.push(item);
  localStorage.setItem('koszyk', JSON.stringify(koszyk));
  sumujKoszyk();
  let formularzPrzedmiotyWKoszyku =
    document.getElementById('przedmiotyWKoszyku');
  let koszykList = '';
  for (let i = 0; i < koszyk.length; i++) {
    let przedmiot = `<li class="car">
                      <h4 class="car--nazwa">${koszyk[i].nazwa}</h4>
                      <p class="car--info">Cena: ${koszyk[i].cena} PLN</p>     
                    </li>`;
    koszykList += przedmiot;
  }
  formularzPrzedmiotyWKoszyku.innerHTML = koszykList;
}

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
  }
};

const przejdzDoPodsumowania = function () {
  let cash = document.getElementById('btn-gotowka');
  let leasing = document.getElementById('btn-leasing');
  let nameSurname = document.querySelector('.nameSurname').value;
  if (
    nameSurname === '' ||
    (cash.checked == false && leasing.checked == false)
  ) {
    if (nameSurname === '') {
      alert('Sprawdź poprawność danych');
      document.getElementById('pole1').innerHTML =
        'Podaj poprawne imię i nazwisko';
    } else {
      alert('Proszę wybrać formę finansowania');
    }
  } else {
    formularz.classList.add('hidden');
    podsumowanieZakupu.classList.remove('hidden');
  }
};

const zamknijFormularz = function () {
  formularz.classList.add('hidden');
  podsumowanieZakupu.classList.add('hidden');
};

document.addEventListener('DOMContentLoaded', function () {
  let carsSelect = document.getElementById('carsSelect');
  let carList = '';
  for (let i = 0; i < samochody.length; i++) {
    let car = `<li class="car">
                  <h4 class="car--nazwa">${samochody[i].nazwa}</h4>
                  <img class="car--img" src="${samochody[i].img}">
                  <p class="car--info">Rok produkcji: ${samochody[i].rokProdukcji}</p>
                  <p class="car--info">Kolor: ${samochody[i].kolor}</p>
                  <p class="car--info">Cena: ${samochody[i].cena} PLN</p>
                  <button class="btn btn-dodajDoKoszyka" onclick="dodajDoKoszyka(samochody[${i}])">Dodaj do koszyka</button>
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
                        <p class="car--info">Cena: ${akcesoria[j].cena} PLN</p>
                        <p class="car--info">${akcesoria[j].opis}</p>
                        <button class="btn btn-dodajDoKoszyka" onclick="dodajDoKoszyka(akcesoria[${j}])">Dodaj do koszyka</button>
                      </li>`;
    accesoriesList += przedmiot;
  }
  accesoriesSelect.innerHTML = accesoriesList;
  let daty = '';
  for (let i = 1; i < 15; i++) {
    let dzien = new Date();
    dzien.setDate(dzien.getDate() + i);
    let dzienHTML = `<option>${dzien.toDateString()}</option>`;
    daty += dzienHTML;
  }
  datyZakupu.innerHTML = daty;
  check();
});

formularzKoszyka.addEventListener('click', openFormularz);
btnCloseModal.addEventListener('click', zamknijFormularz);
btnPrzejdzDalej.addEventListener('click', przejdzDoPodsumowania);
