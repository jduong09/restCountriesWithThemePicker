import { addFilterFunctions } from './filter';

const populateCountriesList = (countries, listCountries) => {
  countries.forEach(country => {
    const listItem = document.createElement('li');
    listItem.classList.add('item-country');
    
    const imgCountry = document.createElement('img');
    imgCountry.src = country.flags.png;
    imgCountry.classList.add('img-flag');
    imgCountry.alt = `flag of ${country.name.official}`;

    const name = document.createElement('h2');
    name.innerText = country.name.official;

    const information = document.createElement('div');
    information.classList.add('div-information');

    const population = document.createElement('div');
    population.innerHTML = `<span>Population:</span>${country.population}`;

    const region = document.createElement('div');
    region.innerHTML = `<span>Region:</span>${country.region}`;

    const capital = document.createElement('div');
    capital.innerHTML = `<span>Capital:</span>${country.capital}`;

    information.append(population, region, capital);

    listItem.append(imgCountry, name, information);

    listCountries.append(listItem);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const listCountries = document.querySelector('.list-countries');

  const http = new XMLHttpRequest();

  http.onload = () => {
    if (http.status === 200 && http.readyState === 4) {
      const json = JSON.parse(http.response);
      populateCountriesList(json, listCountries);
      addFilterFunctions();
    } else {
      console.log(http.responseText);
    }
  }

  http.open('GET', 'https://restcountries.com/v3.1/all');
  http.send();
});