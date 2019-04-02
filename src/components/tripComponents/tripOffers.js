import {getRandomNumberRange} from './../../store/const';
export default (offers) => {
  const offerMarkdown = [...offers].map((it) =>
    `<li>
       <button class="trip-point__offer">${it.name} +&euro;&nbsp;20</button>
    </li>`).join(``);
  return offerMarkdown;
};
