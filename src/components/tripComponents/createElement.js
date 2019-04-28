export default (template) => {
  const newElement = document.createElement(`span`);
  newElement.innerHTML = template;
  return newElement;
};
