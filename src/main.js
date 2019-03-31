
import {boardTrips} from "./store/const";
import tripData from "./store/tripsData";
import Trip from "./components/trip";
import TripEdit from "./components/trip-edit";

const tripsContainer = boardTrips;
const firstTrip = new Trip(tripData());
const firstTripEdit = new TripEdit();

firstTrip.render(tripsContainer);
firstTrip.onClick = () => {
  firstTripEdit.render(tripsContainer);
  firstTripEdit.submit = () => {
    firstTripEdit.unrender(tripsContainer);
  };
  firstTripEdit.reset = () => {
    firstTripEdit.unrender(tripsContainer);
  };
};
