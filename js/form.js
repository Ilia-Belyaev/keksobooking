const form = document.querySelector('.ad-form');
const formElements = document.querySelectorAll('.ad-form__element');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersFields = document.querySelectorAll('.map__filters select');

const setDisabledAttribute = (array) => array.forEach((element) => element.setAttribute('disabled', true));

const removeDisabledAttribute = (array) => array.forEach((element) => element.removeAttribute('disabled'));

export const setActiveForm = () => {
  form.classList.remove('ad-form--disabled');
  removeDisabledAttribute(formElements);
};

export const setActiveMapFilters = () => {
  mapFilters.classList.remove('map__filters--disabled');
  removeDisabledAttribute(mapFiltersFields);
};

export const setInactiveFormState = () => {
  form.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');

  setDisabledAttribute(formElements);
  setDisabledAttribute(mapFiltersFields);
};
