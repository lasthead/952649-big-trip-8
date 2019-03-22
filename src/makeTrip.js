
import {timeFormatter} from './store/const';
import tripOffers from './components/tripComponents/tripOffers';

export default ({type, destinations, dateFrom, dateTo, price, currency, offers}) => `
    <article class="trip-point">
      <i class="trip-icon">${ type.icon }</i>
      <h3 class="trip-point__title">${ type.name } to ${ destinations }</h3>
      <p class="trip-point__schedule">
        <span class="trip-point__timetable">${ timeFormatter(dateFrom) }</span>
        <span class="trip-point__duration">${ timeFormatter(dateTo) }</span>
      </p>
      <p class="trip-point__price"> ${ currency } ${ price }</p>
      <ul class="trip-point__offers">
        ${ tripOffers(offers) }
      </ul>
    </article>
`;
