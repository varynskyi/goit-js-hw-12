import markupOfCountries from "../templates/countries-markup.hbs";
import markupOfOneCountry from '../templates/one-country-markup';

import Notiflix from "notiflix";

var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

import FC from './fetchCountries';


const inputRef = document.querySelector('#search-box');

const countryInfoRef = document.querySelector(".country-info");
const countryListRef = document.querySelector('.country-list');


inputRef.addEventListener('input', debounce(onInputCountry,DEBOUNCE_DELAY));

function onInputCountry(evt) {

    const countryName = evt.target.value.trim();
    // console.log(countryName);
    if (countryName ==='') {
        return Notiflix.Notify.failure('Please enter country');
    }
   
    FC.fetchCountries(countryName).then(countryName => { 
       clearPage()
        if (countryName.status === 404) {
            Notiflix.Notify.failure('Oops, there is no country with that name');
        } else if (countryName.length > 10) {
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        } else if (countryName.length === 1) {
            getMarkupOfOneCountry(countryName);
        } else if (countryName.length > 1 && countryName.length <= 10) {
            getMarkupOfCountries(countryName);
        }
    });

}

function getMarkupOfCountries(countries) {
    countryListRef.insertAdjacentHTML('beforeend', markupOfCountries(countries));
}

function getMarkupOfOneCountry(country) {
    countryInfoRef.insertAdjacentHTML('beforeend', markupOfOneCountry(country));
}

function clearPage() {
    countryInfoRef.innerHTML = "";
    countryListRef.innerHTML = "";
}