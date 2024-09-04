import {getRandomArrayElement,getRandomValue} from'./utils.js';
import * as CONSTANTS from './data.js';

const FLAG = 1;

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('.map__canvas');
const popupPhoto = cardTemplate.querySelector('.popup__photo');
const feauturesTemplate = cardTemplate.querySelector('.popup__features');
const popupFeautures = feauturesTemplate.querySelector('.popup__feature');

const getCoordinate = (min, max) =>  (Math.random() * (max - min) + min).toFixed(5);

const getRandomLengthArray = (array) => {
  const set = new Set();
  const randArrayLength = getRandomValue(0, array.length);

  while (set.size < randArrayLength) {
    set.add(getRandomArrayElement(array));
  }

  return Array.from(set);
};

const createOffer = () => ({
  title: getRandomArrayElement(CONSTANTS.OFFER_TITLES),
  address: `${getCoordinate(CONSTANTS.MIN_LAT, CONSTANTS.MAX_LAT)} - ${getCoordinate(CONSTANTS.MIN_LON, CONSTANTS.MAX_LON)}`,
  price: getRandomValue(0, CONSTANTS.MAX_ADVERTISMENT_LENGTH),
  type: CONSTANTS.DWELLING_TYPES[Object.keys(CONSTANTS.DWELLING_TYPES)[getRandomValue(0, Object.keys(CONSTANTS.DWELLING_TYPES).length - 1)]].type,
  rooms: getRandomValue(0, CONSTANTS.MAX_ADVERTISMENT_LENGTH),
  guests: getRandomValue(0, CONSTANTS.MAX_ADVERTISMENT_LENGTH),
  checkin: CONSTANTS.CHECKIN_TIMES[getRandomValue(0, CONSTANTS.CHECKIN_TIMES.length - 1)],
  checkout: CONSTANTS.CHECKIN_TIMES[getRandomValue(0, CONSTANTS.CHECKIN_TIMES.length - 1)],
  feautures: getRandomLengthArray(CONSTANTS.FEAUTURES),
  description: getRandomArrayElement(CONSTANTS.OFFER_TITLES),
  photos: getRandomLengthArray(CONSTANTS.PHOTOS),
});

const getCorrectUserId = (id) => id < CONSTANTS.MAX_ADVERTISMENT_LENGTH ? `0${id}` : id;

const createAdvertisement = (userId) => ({
  author: {
    avatar: `img/avatars/user${getCorrectUserId(userId)}.png`,
  },
  offer: createOffer(),
  location: {
    lat: getCoordinate(CONSTANTS.MIN_LAT, CONSTANTS.MAX_LAT),
    lon: getCoordinate(CONSTANTS.MIN_LON, CONSTANTS.MAX_LON),
  },
});


const advertisements = (length) => Array.from({length}, (_, i) => createAdvertisement(i + 1));

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

  if (flag) {
    data.forEach((element) => {
      fragment.append(createPhoto(element));
    });

    return fragment;
  }

  data.forEach((element) => {
    fragment.append(createFeauture(element));
  });

  return fragment;
};

const renderCard = (element) => {
  const patternClone = cardTemplate.cloneNode(true);

  patternClone.querySelector('.popup__title').textContent = element.offer.title;
  patternClone.querySelector('.popup__text--address').textContent = element.offer.address;
  patternClone.querySelector('.popup__text--price').textContent = `${element.offer.price} ₽/ночь`;
  patternClone.querySelector('.popup__type').textContent = CONSTANTS.DWELLING_TYPES[element.offer.type].translate;
  patternClone.querySelector('.popup__text--capacity').textContent = `${element.offer.rooms} комнаты для ${element.offer.guests} гостей`;
  patternClone.querySelector('.popup__text--time').textContent = `Заезд после ${element.offer.checkin}, выезд до ${element.offer.checkout}`;
  patternClone.querySelector('.popup__features').replaceChildren(createElement(element.offer.feautures));
  patternClone.querySelector('.popup__description').textContent = element.offer.description;
  patternClone.querySelector('.popup__photos').replaceChildren(createElement(element.offer.photos, FLAG));
  patternClone.querySelector('.popup__avatar ').src = element.author.avatar;

  return patternClone;
};

const renderMap = (array) => {
  const fragment = document.createDocumentFragment();

  fragment.append(renderCard(getRandomArrayElement(array)));

  mapCanvas.append(fragment);
};

renderMap(advertisements(CONSTANTS.MAX_ADVERTISMENT_LENGTH));

