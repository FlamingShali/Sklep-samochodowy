'use strict';


document.addEventListener('DOMContentLoaded', function () {
  let carsSelect = document.getElementById('carsSelect');
  let carList = '';
  for (let i = 0; i < samochody.length; i++) {
    let car = `<li class="car">
                  <h4 class="car--tittle">${samochody[i].tittle}</h4>
                  <img class="car--img" src="${samochody[i].img}">
                  <p class="car--info">${samochody[i].opis}</p>
                  <button class="btn--buy" onclick="document.location='formularzZakupu.html?id=${i}'" ">Kupuję</button>
                </li>`;
    carList += car;
  }
  carsSelect.innerHTML = carList;
});
