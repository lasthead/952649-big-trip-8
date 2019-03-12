import {boardTrips} from "./store/const";
import makeTask from "./makeTask";

export default (count) =>{
  for (let i = 0; i <= count - 1; i++) {
    boardTrips.insertAdjacentHTML(`beforeEnd`, makeTask());
  }
};

