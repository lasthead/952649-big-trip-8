export default ({Name, Checked}) => {
  let div = document.createElement(`span`);
  div.innerHTML = `
      <input type="radio" id="filter__${Name ? Name.toLowerCase() : ``}" name="filter" 
        ${Checked ? `checked` : ``}
        value="everything" checked>
       <label class="trip-filter__item" for="filter__${Name ? Name.toLowerCase() : ``}">${Name}</label>
  `.trim();
  return div;
};
