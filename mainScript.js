'use strict';

const car = document.getElementById('car')
const details = document.querySelector('.details') 
const mainPage = document.querySelector('.mainPage')
const accessories = document.querySelector('.accessories')



//Aktualizowanie elementu html
//
const showCarDetails = function(){
    details.classList.remove('hidden')
    console.log('cos')
}

const nextPage = function(){
    details.classList.add('hidden')
    accessories.classList.remove('hidden')
}




