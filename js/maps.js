const adress = document.querySelector('#address');

const map = L.map('map-canvas')
  .setView({
    lat: 59.96831,
    lng: 30.31748,
  }, 16);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: 59.96831,
    lng: 30.31748,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  adress.value = `${evt.target.getLatLng().lat}, ${evt.target.getLatLng().lng}`;
});

// mainPinMarker.setLatLng({// вернуть в начальное положение маркер
//   lat: 59.96831,
//   lng: 30.31748,
// });

// map.setView({ //вернуть карту в начальное положение
//   lat: 59.96831,
//   lng: 30.31748,
// }, 16);

// mainPinMarker.remove(); //удаление метки

// const points = [// добавить несколько маркеров на карту + инфу на метках
//   {
//     title: 'Футура',
//     lat: 59.96925,
//     lng: 30.31730,
//   },
//   {
//     title: 'Шаверма',
//     lat: 59.96783,
//     lng: 30.31258,
//   },
//   {
//     title: 'Франк',
//     lat: 59.95958,
//     lng: 30.30228,
//   },
//   {
//     title: 'Ginza',
//     lat: 59.97292,
//     lng: 30.31982,
//   },
// ];

// const icon = L.icon({
//   iconUrl: './img/pin.svg',
//   iconSize: [40, 40],
//   iconAnchor: [20, 40],
// });

// points.forEach(({lat, lng, title}) => {
//   const marker = L.marker(
//     {
//       lat,
//       lng,
//     },
//     {
//       icon,
//     },
//   );

//   marker
//     .addTo(map)
//     .bindPopup(title);
// });
