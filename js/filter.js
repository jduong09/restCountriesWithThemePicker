const addFilterListener = () => {
  const divOptions = document.getElementsByClassName('option');
  const listCountries = document.querySelector('.list-countries');
  const allCountries = [...listCountries.children];
  const clonedList = [...listCountries.children];
  
  for (let i = 0; i < divOptions.length; i++) {
    const divOption = divOptions[i];

    divOption.addEventListener('click', (e) => {
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

          const filteredList = clonedList.filter(country => {
            return onlyNames.includes(country.children[1].innerHTML);
          });

          listCountries.innerHTML = '';
          
          for (let j = 0; j < filteredList.length; j++) {
            listCountries.appendChild(filteredList[j]);
          }        
        } else {
          console.log('Error filtering');
        }
      }

      http.open('GET', `https://restcountries.com/v2/region/${region}`);
      http.send();
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const divForm = document.querySelector('.div-form');
  const containerFilter = document.querySelector('.container-filter');
  const btnBack = document.getElementById('btn-back');

  btnBack.addEventListener('click', () => {
    const listCountries = document.querySelector('.list-countries');
    const divDetail = document.querySelector('.detail');
    const divSelect = document.querySelector('div.select');

    divForm.classList.remove('hide');
    containerFilter.classList.remove('filter-hidden');
    divSelect.classList.remove('hide');
    listCountries.classList.remove('hide');
    btnBack.classList.add('hide');

    divDetail.remove();
  });
});