import {mainFilterList} from "./store/filtersList";
import makeMainFilter from "./makeFilter";
import refreshTaskBoard from "./refreshTaskBoard";
import {mainFilter, boardTrips} from "./store/const.js";


export default () => {
  mainFilterList.forEach((item)=>{
    mainFilter.appendChild(makeMainFilter(item)).addEventListener(`click`, refreshTaskBoard(boardTrips.className, 7));
  });
};
