import {getRandomArrayElement,getRandomValue} from'./utils.js';
import * as CONSTANTS from './data.js';

const FLAG = 1;

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const popupPhoto = cardTemplate.querySelector('.popup__photo');
const popupFeautures = cardTemplate.querySelector('.popup__feature');

const getCoordinate = (min, max) =>  (Math.random() * (max - min) + min).toFixed(CONSTANTS.FIX_NUMBER);

const createOffer = () => ({
  title: getRandomArrayElement(CONSTANTS.OFFER_TITLES),
  address: `${getCoordinate(CONSTANTS.LOCATION.MIN_LAT, CONSTANTS.LOCATION.MAX_LAT)} - ${getCoordinate(CONSTANTS.LOCATION.MIN_LON, CONSTANTS.LOCATION.MAX_LON)}`,
  price: getRandomValue(0, CONSTANTS.MAX_ADVERTISMENT_LENGTH),
  type: CONSTANTS.DWELLING_TYPES[Object.keys(CONSTANTS.DWELLING_TYPES)[getRandomValue(0, Object.keys(CONSTANTS.DWELLING_TYPES).length - 1)]].type,
  rooms: getRandomValue(0, CONSTANTS.MAX_ADVERTISMENT_LENGTH),
  guests: getRandomValue(0, CONSTANTS.MAX_ADVERTISMENT_LENGTH),
  checkin: getRandomArrayElement(CONSTANTS.TIMES),
  checkout: getRandomArrayElement(CONSTANTS.TIMES),
  feautures: CONSTANTS.FEAUTURES.slice(0, getRandomValue(0, CONSTANTS.FEAUTURES.length)),
  description: getRandomArrayElement(CONSTANTS.OFFER_TITLES),
  photos: CONSTANTS.PHOTOS.slice(0, getRandomValue(0, CONSTANTS.PHOTOS.length)),
});

const getCorrectUserId = (id) => id < CONSTANTS.MAX_ADVERTISMENT_LENGTH ? `0${id}` : id;

const createAdvertisement = (userId) => ({
  author: {
    avatar: `img/avatars/user${getCorrectUserId(userId)}.png`,
  },
  offer: createOffer(),
  location: {
    lat: getCoordinate(CONSTANTS.LOCATION.MIN_LAT, CONSTANTS.LOCATION.MAX_LAT),
    lon: getCoordinate(CONSTANTS.LOCATION.MIN_LON, CONSTANTS.LOCATION.MAX_LON),
  },
});


export const advertisements = (length) => Array.from({length}, (_, i) => createAdvertisement(i + 1));

const createFeauture = (feauture) => {
  const popupFeauturesClone = popupFeautures.cloneNode(true);
  popupFeauturesClone.className = feauture;
  popupFeauturesClone.classList.add(`popup__feature--${feauture}`);
  popupFeauturesClone.textContent = feauture;

  return popupFeauturesClone;

};

const createPhoto = (photo) => {
  const popupPhotoClone = popupPhoto.cloneNode(true);
  popupPhotoClone.src = photo;

  return popupPhotoClone;
};

const createElement = (data, flag = 0) => {
  const fragment = document.createDocumentFragment();

  data.forEach((element) => {
    fragment.append(flag ? createPhoto(element) : createFeauture(element));
  });

  return fragment;
};

const checkAvatar = (patternClone, selector, avatar) => {
  const element = patternClone.querySelector(selector);

  if (!avatar) {
    element.remove();

    return;
  }

  element.src = avatar;
};

const checkTextData = (patternClone, selector, data) => {
  const element = patternClone.querySelector(selector);

  if (!data) {
    element.remove();

    return;
  }

  element.textContent = data;
};

const checkFeauturesOrPhotos = (patternClone, selector, data, flag = 0) => {
  const element = patternClone.querySelector(selector);

  if (!data) {
    element.remove();

    return;
  }

  if (flag) {
    element.replaceChildren(createElement(data, flag));
  } else {
    element.replaceChildren(createElement(data));
  }
};

const checkCapacity = (patternClone, selector, rooms, guests) => {
  const element = patternClone.querySelector(selector);

  if (!rooms && !guests) {
    element.remove();

    return;
  }

  element.textContent = `${rooms ? rooms : ''} комнаты для ${guests ? guests : ''} гостей`;
};

const checkPrice = (patternClone, selector, price) => {
  const element = patternClone.querySelector(selector);

  if (!price) {
    element.remove();

    return;
  }

  element.textContent = `${price} ₽/ночь`;
};

const checkTime = (patternClone, selector, checkin, checkout) => {
  const element = patternClone.querySelector(selector);

  if (!checkin && !checkout) {
    element.remove();

    return;
  }

  element.textContent = `Заезд после ${checkin ? checkin : ''}, выезд до ${checkout ? checkout : ''}`;
};

export const renderCard = (element) => {
  const patternClone = cardTemplate.cloneNode(true);

  checkTextData(patternClone, '.popup__title', element.offer.title);
  checkTextData(patternClone, '.popup__text--address', element.offer.address);
  checkPrice(patternClone, '.popup__text--price', element.offer.price);
  checkTextData(patternClone, '.popup__type', CONSTANTS.DWELLING_TYPES[element.offer.type].translate);
  checkCapacity(patternClone, '.popup__text--capacity', element.offer.rooms, element.offer.guests);
  checkTime(patternClone, '.popup__text--time', element.offer.checkin, element.offer.checkout);
  checkFeauturesOrPhotos(patternClone, '.popup__features', element.offer.feautures);
  checkTextData(patternClone, '.popup__description', element.offer.description);
  checkFeauturesOrPhotos(patternClone, '.popup__photos', element.offer.photos, FLAG);
  checkAvatar(patternClone, '.popup__avatar', element.author.avatar);

  return patternClone;
};
