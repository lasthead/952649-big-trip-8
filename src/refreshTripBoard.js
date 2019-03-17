import fillTripBoard from './fillTripBoard';
export default (name, count) => {
  return function () {
    document.getElementsByClassName(name)[0].innerHTML = ``;
    fillTripBoard(count);
  };
};
