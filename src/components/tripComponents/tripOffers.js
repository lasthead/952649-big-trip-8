export default (offers) => {
  const offerMarkdown = [...offers.slice(0, 2)].map((it) =>
    `<li>
       <button class="trip-point__offer">${it.name} +&euro;&nbsp;20</button>
    </li>`).join(``);
  return offerMarkdown;
};
