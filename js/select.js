document.addEventListener('DOMContentLoaded', () => {
  const select = document.querySelector('select');
  // create div for holding custom select
  const div = document.createElement('div');
  // create header for custom select
  const header = document.createElement('div');
  // create a datalist tag that will hold the option tag.
  const datalist = document.createElement('datalist');
  // const optgroups = select.querySelectorAll('optgroup');
  // span element for header
  const span = document.createElement('span');
  // set variable for current option tags in current select tag
  const options = select.options;
  // set variable for parent element of select
  const parent = select.parentElement;
  // set onclick function
  function onclick(e) {
    // checked if clicked option has attribute data-disabled
    const disabled = this.hasAttribute('data-disabled');
    // set select value to the value of the option tag
    select.value = this.dataset.value;
    // set span inner text to the label of the option tag
    span.innerText = this.dataset.label;
    // if clicked target is disabled then return.
    if (disabled) return;
    // set a variable and grab all the tags that contain the option class name.
    const options = div.querySelectorAll('.option');
    // iterate through the option tags and remove the checked attribute.
    // set the checked attribute on current clicked element.
    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      option.removeAttribute("data-checked");
    }
    this.setAttribute("data-checked", "");
  }

  // if user tabs and clicks enter on an option, run the click function.
  function onkeyup(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.keyCode === 13) {
      this.click();
    }
  }

  // add select class to div that will be the custom select container.
  // add header class to header.
  div.classList.add('select');
  header.classList.add('header');
  // set tab index to 1 for the div and make the actual select tag unable to be tabbed
  div.tabIndex = 1;
  select.tabIndex = -1;
  // set the span for the header to be the label of the actual select
  span.innerText = 'Filter By Region';

  /*
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
    <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
  </svg>
  */
  const iconArrow = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  iconArrow.setAttribute('viewBox', '0 0 512 512');
  iconArrow.setAttribute('width', '16');
  iconArrow.setAttribute('height', '16');
  iconArrow.id = 'icon-arrow';

  const iconArrowPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  iconArrowPath.setAttribute('d', "M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z");
  iconArrow.appendChild(iconArrowPath);

  header.append(span, iconArrow);

  // iterate through all the select attributes and set the div to have a dataset attribute
  for (const attribute of select.attributes) {
    div.dataset[attribute.name] = attribute.value;
  }

  // iterate through all the option tags in the select statement
  for (let i = 0; i < options.length; i++) {
    // make an option tag that is a div
    // make a label tag that is a div
    const option = document.createElement('div');
    const label = document.createElement('div');
    const o = options[i];
    // iterate through the attributes and set the attributes
    for (const attribute of o.attributes) {
      option.dataset[attribute.name] = attribute.value;
    }
    option.classList.add('option');
    label.classList.add('label');
    label.innerText = o.label;
    option.dataset.value = o.value;
    option.dataset.label = o.label;
    option.onclick = onclick;
    option.onkeyup = onkeyup;
    option.tabIndex = i + 1;
    option.appendChild(label);
    datalist.appendChild(option);
  }
  div.appendChild(header);
  
  // remove default feature for clicking on the div.
  div.onclick = (e) => {
    e.preventDefault();
  };

  parent.insertBefore(div, select);
  header.appendChild(select);
  div.appendChild(datalist);
  datalist.style.top = `${header.offsetTop + header.offsetHeight + 10}px`;

  div.onclick = (e) => {
    const open = div.hasAttribute("data-open");
    e.stopPropagation();
    if (open) {
      div.removeAttribute("data-open");
    } else {
      div.setAttribute("data-open", "");
    }
  };

  div.onkeyup = (event) => {
    event.preventDefault();
    if (event.code === 13) {
      this.click();
    }
  };

  document.addEventListener('click', () => {
    if (div.hasAttribute("data-open")) {
      div.removeAttribute("data-open");
    }
  });
});