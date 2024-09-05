import './map.js';
import './form.js';

import {renderCard, advertisements} from './map.js';
import {MAX_ADVERTISMENT_LENGTH} from './data.js';

const mapCanvas = document.querySelector('.map__canvas');

mapCanvas.append(renderCard(advertisements(MAX_ADVERTISMENT_LENGTH)[1]));
