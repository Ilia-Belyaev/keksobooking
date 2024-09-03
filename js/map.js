import {getRandomArrayElement,getRandomValue} from'./utils.js';
import * as CONSTANTS from './data.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('.map__canvas');

const getCoordinate = (min, max) =>  (Math.random() * (max - min) + min).toFixed(5);

const getRandomLengthArray = (array) => {
  const feautures = new Set();
  const arrayLength = getRandomValue(0, array.length);

  while (feautures.size < arrayLength) {
    feautures.add(getRandomArrayElement(CONSTANTS.FEAUTURES));
  }

  return Array.from(feautures);
};

const createOffer = () => ({
  title: getRandomArrayElement(CONSTANTS.OFFER_TITLES),
  address: `${getCoordinate(CONSTANTS.MIN_LAT, CONSTANTS.MAX_LAT)} - ${getCoordinate(CONSTANTS.MIN_LON, CONSTANTS.MAX_LON)}`,
  price: getRandomValue(0, CONSTANTS.MAX_ADVERTISMENT_LENGTH),
  type: CONSTANTS.DWELLING_TYPES[getRandomValue(0, CONSTANTS.DWELLING_TYPES.length)],
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
  }
});


const createAdvertisements = (length) => Array.from({length}, (_, i) => createAdvertisement(i + 1));

const createCard = (element) => {
  const patternClone = cardTemplate.cloneNode(true);

  patternClone.querySelector('.popup__title').textContent = element.offer.title;
  patternClone.querySelector('.popup__text--address').textContent = element.offer.address;
  patternClone.querySelector('.popup__text--price').textContent = `${element.offer.price} ₽/ночь`;
  patternClone.querySelector('.popup__type').textContent = element.offer.type;//ПЕРЕДЕЛАТЬ
  patternClone.querySelector('.popup__text--capacity').textContent = `${element.offer.rooms} комнаты для ${element.offer.guests} гостей`;
  patternClone.querySelector('.popup__text--time').textContent = `Заезд после ${element.offer.checkin}, выезд до ${element.offer.checkout}`;
  patternClone.querySelector('.popup__features').textContent = element.feautures;
  patternClone.querySelector('.popup__description').textContent = element.offer.description;
};

const renderMap = (array) => {
  const fragment = document.createDocumentFragment();

  // array.forEach((element) => {
    fragment.append(createCard(array[4]));
  // });

  mapCanvas.append(fragment);
};

renderMap(createAdvertisements(CONSTANTS.MAX_ADVERTISMENT_LENGTH));

