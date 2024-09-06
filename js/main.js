import './baloon.js';
import './form.js';
import './maps.js';


// import {renderCard, advertisements} from './baloon.js';
// import {MAX_ADVERTISMENT_LENGTH} from './data.js';
import {setInactiveFormState, setActiveForm } from './form.js';

// const mapCanvas = document.querySelector('.map__canvas');

setInactiveFormState();
setActiveForm();
//mapCanvas.append(renderCard(advertisements(MAX_ADVERTISMENT_LENGTH)[1]));
