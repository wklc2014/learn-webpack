import lodash from 'lodash';
import './example.css';
import Hydrangeas from '../../assets/images/Hydrangeas.jpg';

function component() {
    var element = document.createElement('div');

    element.innerHTML = lodash.join(['Learn', 'webpack'], ' ');

    element.classList.add('hello');

    var img = document.createElement('img');
    img.src = Hydrangeas;
    img.width = 100;
    img.height = 100;

    element.appendChild(img);

    return element;
}

export default component;
