import {boardTrips} from "./store/const";
import makeTrip from "./makeTrip";
import {trips} from "./store/tripsList";

export default (count) =>{
  for (let i = 0; i <= count - 1; i++) {
    boardTrips.insertAdjacentHTML(`beforeEnd`, makeTrip(trips()));
  }
};

