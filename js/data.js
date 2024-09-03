import {getRandomArrayElement, getRandomValue } from './utils.js';

const MAX_ADVERTISMENT_LENGTH = 10;
const OFFER_TITLES = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi facilisis.',
  'Fusce congue lacinia ligula nec sagittis. Curabitur ante nibh, sagittis.',
  'Donec sagittis nisl et felis ultrices lacinia. Maecenas condimentum condimentum.',
  'Cras in eros sagittis, luctus enim et, venenatis ante. Maecenas.',
  'Proin id cursus ipsum. Mauris aliquam vehicula velit, efficitur maximus.',
  'Proin suscipit efficitur justo eu eleifend. Morbi sit amet nisi.',
  'Nullam nunc leo, tincidunt eu magna in, sodales porttitor nunc.',
  'Curabitur bibendum tortor mauris, in volutpat urna lobortis at. Fusce.',
  'Sed auctor purus quis nulla egestas, porttitor euismod diam laoreet.',
  'Morbi a arcu semper, convallis quam vel, efficitur ipsum. Pellentesque.',
  'Morbi eleifend orci vel diam rutrum, id tempus ligula porttitor.',
  'Maecenas consequat nibh id sapien ornare pellentesque. Suspendisse porttitor fringilla.',
  'Curabitur fermentum nibh a ligula iaculis, in iaculis dolor feugiat.',
  'Vivamus dapibus pulvinar cursus. Donec fermentum placerat pulvinar. Mauris ac.',
  'Integer augue neque, tempor eget vehicula faucibus, viverra volutpat lorem.'
];
const DWELLING_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];
const CHECKIN_TIMES = [
  '12:00',
  '13:00',
  '14:00',
];
const FEAUTURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const MIN_LAT = 35.65;
const MAX_LAT = 35.7;
const MIN_LON = 139.7;
const MAX_LON = 139.8;

const getCoordinate = (min, max) =>  (Math.random() * (max - min) + min).toFixed(5);

const getRandomLengthArray = (array) => {
  const feautures = new Set();
  const arrayLength = getRandomValue(0, array.length);

  while (feautures.size < arrayLength) {
    feautures.add(getRandomArrayElement(FEAUTURES));
  }

  return Array.from(feautures);
};

const createOffer = () => ({
  title: getRandomArrayElement(OFFER_TITLES),
  address: `${getCoordinate(MIN_LAT, MAX_LAT)} - ${getCoordinate(MIN_LON, MAX_LON)}`,
  price: getRandomValue(0, MAX_ADVERTISMENT_LENGTH),
  type: DWELLING_TYPES[getRandomValue(0, DWELLING_TYPES.length)],
  rooms: getRandomValue(0, MAX_ADVERTISMENT_LENGTH),
  guests: getRandomValue(0, MAX_ADVERTISMENT_LENGTH),
  checkin: CHECKIN_TIMES[getRandomValue(0, CHECKIN_TIMES.length - 1)],
  checkout: CHECKIN_TIMES[getRandomValue(0, CHECKIN_TIMES.length - 1)],
  feautures: getRandomLengthArray(FEAUTURES),
  description: getRandomArrayElement(OFFER_TITLES),
  photos: getRandomLengthArray(PHOTOS),
});

const getCorrectUserId = (id) => id < MAX_ADVERTISMENT_LENGTH ? `0${id}` : id;

const createAdvertisement = (userId) => ({
  author: {
    avatar: `img/avatars/user${getCorrectUserId(userId)}.png`,
  },
  offer: createOffer(),
  location: {
    lat: getCoordinate(MIN_LAT, MAX_LAT),
    lon: getCoordinate(MIN_LON, MAX_LON),
  }
});


const createAdvertisements = (length) => Array.from({length}, (_, i) => createAdvertisement(i + 1));

createAdvertisements(MAX_ADVERTISMENT_LENGTH);
