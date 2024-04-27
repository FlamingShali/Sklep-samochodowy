'use strict'

let nazwaSamochodu = document.getElementById('nazwaSamochodu');
let obrazSamochodu = document.getElementById('obrazSamochodu');
let infoSamochodu = document.getElementById('infoSamochodu');

document.addEventListener('DOMContentLoaded', function () {
  const params = new URLSearchParams(window.location.search);
  const carId = params.get('id');
  nazwaSamochodu.textContent = samochody[carId].tittle;
  obrazSamochodu.src = samochody[carId].img;
  infoSamochodu.textContent = samochody[carId].opis;
});
