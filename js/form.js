import {DWELLING_TYPES} from './data.js';
import {initSlider} from './slider.js';

const TITLE_ERROR_TEXT = 'Не верный заголовок объявления';
const PRICE_ERROR_TEXT = 'Неправильная цена';
const ROOM_ERROR_TEXT = {
  1: 'для 1 гостя',
  2: 'для 2 или менее гостей',
  3: 'для 3 или менее гостей',
  100: 'не для гостей',
};
const CAPACITY_VALUE = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
};
const MAX_PRICE = 100000;
const TITLE_LENGTH = {
  MIN: 30,
  MAX: 100,
};
const MIN_PRICE = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};
const form = document.querySelector('.ad-form');
const formElements = document.querySelectorAll('.ad-form__element');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersFields = document.querySelectorAll('.map__filters select');
const adTitle = document.querySelector('#title');
const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');
const typeHouse = document.querySelector('#type');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
export const price = document.querySelector('#price');

const setDisabledAttribute = (array) => array.forEach((element) => element.setAttribute('disabled', true));

const removeDisabledAttribute = (array) => array.forEach((element) => element.removeAttribute('disabled'));

export const setActiveForm = () => {
  form.classList.remove('ad-form--disabled');
  removeDisabledAttribute(formElements);

  initSlider();
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

const pristine = new Pristine(
  form, {
    classTo: 'required_field',
    errorTextParent: 'required_field',
    errorTextTag: 'span',
    errorTextClass: 'form__error',
  }
);

const isValidTitle = () => adTitle.value.length < TITLE_LENGTH.MAX && adTitle.value.length > TITLE_LENGTH.MIN;

const isValidPrice = () => price.value >= MIN_PRICE[typeHouse.value] && price.value <= MAX_PRICE;

const isValidRoom = () => {
  switch (Number(roomNumber.value)) {
    case 1:
      return Number(capacity.value) <= CAPACITY_VALUE[1];
    case 2:
      return Number(capacity.value) <= CAPACITY_VALUE[2];
    case 3:
      return Number(capacity.value) <= CAPACITY_VALUE[3];
    case 100:
      return Number(capacity.value) === CAPACITY_VALUE[0];
  }
};

const getErrorText = () => {
  switch (Number(roomNumber.value)) {
    case 100:
      return ROOM_ERROR_TEXT[100];
    case 3:
      return ROOM_ERROR_TEXT[3];
    case 2:
      return ROOM_ERROR_TEXT[2];
    case 1:
      return ROOM_ERROR_TEXT[1];
  }
};

pristine.addValidator(adTitle, isValidTitle, TITLE_ERROR_TEXT);
pristine.addValidator(price, isValidPrice, PRICE_ERROR_TEXT);
pristine.addValidator(roomNumber, isValidRoom, getErrorText);

typeHouse.addEventListener('change', () => {
  switch (typeHouse.value) {
    case DWELLING_TYPES.palace.type:
      price.placeholder = MIN_PRICE.palace;
      break;
    case DWELLING_TYPES.flat.type:
      price.placeholder = MIN_PRICE.flat;
      break;
    case DWELLING_TYPES.hotel.type:
      price.placeholder = MIN_PRICE.hotel;
      break;
    case DWELLING_TYPES.house.type:
      price.placeholder = MIN_PRICE.house;
      break;
    case DWELLING_TYPES.bungalow.type:
      price.placeholder = MIN_PRICE.bungalow;
      break;
  }
  pristine.validate(price);
});

timeIn.addEventListener('change', () => {
  timeOut.value = timeIn.value;
});

timeOut.addEventListener('change', () => {
  timeIn.value = timeOut.value;
});

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {

  }

});
