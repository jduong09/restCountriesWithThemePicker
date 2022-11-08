document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main');
  const divForm = document.querySelector('.div-form');
  const divFilter = document.querySelector('.container-filter');
  const divSelect = document.querySelector('.select');
  const btnBack = document.getElementById('btn-back');
  const listCountries = document.querySelector('.list-countries');
  const inputSearch = document.getElementById('input-search');
  const form = document.querySelector('form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputCountry = inputSearch.value;

    if (!inputCountry) {
      return false;
    }

    const http = new XMLHttpRequest();

    http.onload = () => {
      if (http.readyState === 4 && http.status === 200) {
        const response = JSON.parse(http.response)[0];
        const detailPage = createDetailPage(response);

        if (document.querySelector('.detail')) {
          const currentDetail = document.querySelector('.detail');
          currentDetail.remove();
        }

        main.append(detailPage);
        divForm.classList.add('hide');
        divFilter.classList.add('filter-hidden');
        divSelect.classList.add('hide');
        btnBack.classList.remove('hide');
        listCountries.classList.add('hide');

        inputSearch.value = '';
      } else {
        console.log('Incorrect input');
      }
    }

    http.open('GET', `https://restcountries.com/v2/name/${inputCountry}`);
    http.send();
  });
});