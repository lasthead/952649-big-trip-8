import {getRandomNumberRange} from './../../store/const';
export default (offers) => {
  const offerMarkdown = [...offers].map((it) =>
    `<li>
       <button class="trip-point__offer">${it.title} +&euro;&nbsp;${it.price}</button>
    </li>`).join(``);
  return offerMarkdown;
};
