import {price} from './form,js';

export const initSlider = () => {
  const PRICE = {
    min: 0,
    max: 100000,
  };

  const sliderElement = document.querySelector('.ad-form__slider');

  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: PRICE.max,
    },
    start: PRICE.min,
    connect: 'lower',
    step: 1000,
    format: {
      to: function (value) {
        return value;
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });

  sliderElement.noUiSlider.on('update', () => {
    price.value = sliderElement.noUiSlider.get();
  });
};