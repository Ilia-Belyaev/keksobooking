const form = document.querySelector('.ad-form');
const formElements = document.querySelectorAll('.ad-form__element');
const mapFilters = document.querySelectorAll('.map__filters select');
const filterForm = document.querySelector('.map__filters');


const stateForm = (state) => {
  if (state) {
    form.classList.remove('ad-form--disabled');
    filterForm.classList.remove('map__filters--disabled');

    formElements.forEach((element) => {
      element.removeAttribute('disabled');
    });

    mapFilters.forEach((filter) => {
      filter.removeAttribute('disabled');
    });
  } else {
    form.classList.add('ad-form--disabled');
    filterForm.classList.add('map__filters--disabled');

    formElements.forEach((element) => {
      element.setAttribute('disabled', true);
    });

    mapFilters.forEach((filter) => {
      filter.setAttribute('disabled', true);
    });
  }
};

stateForm(true);
