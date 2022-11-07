document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');
  const btnDark = document.getElementById('btn-dark');
  const btnLight = document.getElementById('btn-light');

  btnDark.addEventListener('click', (e) => {
    e.preventDefault();

    body.classList.add('dark');
    btnLight.classList.remove('hide');
    btnDark.classList.add('hide');
  });

  btnLight.addEventListener('click', (e) => {
    e.preventDefault();

    body.classList.remove('dark');
    btnDark.classList.remove('hide');
    btnLight.classList.add('hide');
  });
});