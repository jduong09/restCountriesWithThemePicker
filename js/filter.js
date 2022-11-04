const addFilterListener = () => {
  const divOptions = document.getElementsByClassName('option');
  const listCountries = document.querySelector('.list-countries');
  const allCountries = [...listCountries.children];
  const clonedList = [...listCountries.children];
  let filter = '';

  for (let i = 0; i < divOptions.length; i++) {
    const divOption = divOptions[i];

    divOption.addEventListener('click', (e) => {
      console.log(e.currentTarget.getAttribute('data-value'));
      const region = e.currentTarget.getAttribute('data-value');


      if (region === 'all') {
        listCountries.innerHTML = '';
        for (let k = 0; k < allCountries.length; k++) {
          listCountries.appendChild(allCountries[k]);
        }

        return;
      }

      const http = new XMLHttpRequest();

      http.onload = () => {
        if (http.status === 200 && http.readyState === 4) {
          const newListCountries = document.createElement('ul');
          newListCountries.classList.add('list-countries');
          const json = JSON.parse(http.response);
          const onlyNames = json.map((country) => {
            return country.name.official;
          });

          console.log(clonedList);
          console.log(onlyNames);

          const filteredList = clonedList.filter(country => {
            return onlyNames.includes(country.children[1].innerHTML);
          });

          listCountries.innerHTML = '';
          
          for (let j = 0; j < filteredList.length; j++) {
            listCountries.appendChild(filteredList[j]);
          }

          /*

          json.forEach(filteredCountry => {
            const listItem = document.createElement('li');
            listItem.classList.add('item-country');
            
            const imgCountry = document.createElement('img');
            imgCountry.src = filteredCountry.flags.png;
            imgCountry.classList.add('img-flag');
            imgCountry.alt = `flag of ${filteredCountry.name.official}`;

            const name = document.createElement('h2');
            name.innerText = filteredCountry.name.official;

            const information = document.createElement('div');
            information.classList.add('div-information');

            const population = document.createElement('div');
            population.innerHTML = `<span>Population:</span>${filteredCountry.population}`;

            const region = document.createElement('div');
            region.innerHTML = `<span>Region:</span>${filteredCountry.region}`;

            const capital = document.createElement('div');
            capital.innerHTML = `<span>Capital:</span>${filteredCountry.capital}`;

            information.append(population, region, capital);

            listItem.append(imgCountry, name, information);

            newListCountries.append(listItem);
          });

          listCountries.replaceWith(newListCountries);
          */
        } else {
          console.log('Error filtering');
        }
      }

      http.open('GET', `https://restcountries.com/v3.1/region/${region}`);
      http.send();
    });
  }
};