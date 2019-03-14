import {mainFilterList} from "./store/filtersList";
import makeMainFilter from "./makeFilter";
import refreshTripBoard from "./refreshTripBoard";
import {mainFilter, boardTrips} from "./store/const.js";


export default () => {
  mainFilterList.forEach((item)=>{
    mainFilter.appendChild(makeMainFilter(item)).addEventListener(`click`, refreshTripBoard(boardTrips.className, 7));
  });
};
