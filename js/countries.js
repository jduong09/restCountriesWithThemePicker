const createDetailPage = (objCountry) => {
  const divDetail = document.createElement('div');
  divDetail.classList.add('detail');

  const detailImg = document.createElement('img');
  detailImg.src = objCountry.flags.png;
  detailImg.alt = `flag of ${objCountry.name}`;

  const divInfo = document.createElement('div');

  const detailHeader = document.createElement('h2');
  detailHeader.innerHTML = objCountry.name;

  const detailInfo1 = document.createElement('ul');
  detailInfo1.innerHTML = `
    <li>
      <span>Native Name:</span>${objCountry.nativeName}
    </li>
    <li>
      <span>Population:</span>${objCountry.population}
    </li>
    <li>
      <span>Region:</span>${objCountry.region}
    </li>
    <li>
      <span>Sub Region:</span>${objCountry.subregion}
    </li>
    <li>
      <span>Capital:</span>${objCountry.capital}
    </li>
    `;

  const detailInfo2 = document.createElement('ul');
  detailInfo2.innerHTML = `
    <li>
      <span>Top Level Domain:</span>${objCountry.topLevelDomain}
    </li>
    <li>
      <span>Currencies:</span>${objCountry.currencies[0].name}
    </li>
    <li>
      <span>Languages:</span>${objCountry.languages[0].name}
    </li>
  `;

  divInfo.append(detailHeader, detailInfo1, detailInfo2);
  divDetail.append(detailImg, divInfo);

  if (objCountry.borders) {
    const divBorderCountries = document.createElement('div');
    divBorderCountries.innerHTML = `
    <span>Border Countries:</span>`;
  
    const ulBorderCountries = document.createElement('ul');
    ulBorderCountries.classList.add('list-border-countries');

    objCountry.borders.forEach(borderCountry => {
      const item = document.createElement('li');
      let countryInfo;
      const http = new XMLHttpRequest();
      http.onload = () => {
        countryInfo = JSON.parse(http.response);
        item.innerHTML = countryInfo.name;
      };

      http.open('GET', `https://restcountries.com/v2/alpha/${borderCountry}`);
      http.send();

      item.addEventListener('click', () => {
        const main = document.querySelector('main');
        const currentDetail = document.querySelector('.detail');
        const divDetail = createDetailPage(countryInfo);

        currentDetail.remove();
        main.appendChild(divDetail);
      });


      ulBorderCountries.appendChild(item);
    });

    divBorderCountries.appendChild(ulBorderCountries);
    divInfo.appendChild(divBorderCountries);
  }


  return divDetail;
}

const populateCountriesList = (countries, listCountries) => {
  countries.forEach(country => {
    const listItem = document.createElement('li');
    listItem.classList.add('item-country');
    
    const imgCountry = document.createElement('img');
    imgCountry.src = country.flags.png;
    imgCountry.classList.add('img-flag');
    imgCountry.alt = `flag of ${country.name}`;

    const name = document.createElement('h2');
    name.innerText = country.name;

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

    listItem.addEventListener('click', (e) => {
      e.preventDefault();
      const main = document.querySelector('main');
      const divForm = document.querySelector('.div-form');
      const divFilter = document.querySelector('.container-filter');
      const divSelect = document.querySelector('.select');
      const btnBack = document.getElementById('btn-back');
      listCountries.classList.add('hide');

      const name = e.currentTarget.children[1].innerHTML;

      const http = new XMLHttpRequest();

      http.onload = () => {
        response = JSON.parse(http.response);
        const country = response[0];
       
        const detailPage = createDetailPage(country);

        main.append(detailPage);
        divForm.classList.add('hide');
        divFilter.classList.add('filter-hidden');
        divSelect.classList.add('hide');
        btnBack.classList.remove('hide');
      }

      http.open('GET', `https://restcountries.com/v2/name/${name}`);
      http.send();
    });

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
      addFilterListener();
    } else {
      console.log(http.responseText);
    }
  }

  http.open('GET', 'https://restcountries.com/v2/all');
  http.send();
});