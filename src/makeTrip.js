

export default ({icon, title, timetable, duration, price, currency, offers}) => `
    <article class="trip-point">
      <i class="trip-icon">${ icon }</i>
      <h3 class="trip-point__title">${ title }</h3>
      <p class="trip-point__schedule">
        <span class="trip-point__timetable">${ timetable }</span>
        <span class="trip-point__duration">${ duration }</span>
      </p>
      <p class="trip-point__price"> ${ currency } ${ price }</p>
      <ul class="trip-point__offers">
        
        <li>
          <button class="trip-point__offer">Order UBER +&euro;&nbsp;20</button>
        </li>
        <li>
          <button class="trip-point__offer">Upgrade to business +&euro;&nbsp;20</button>
        </li>
      </ul>
    </article>
`;
