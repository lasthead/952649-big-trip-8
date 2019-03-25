
import {boardTrips} from "./store/const";
import tripData from "./store/tripsData";
import Trip from "./trip";

const tripsContainer = boardTrips;
const firstTrip = new Trip(tripData());

firstTrip.render(tripsContainer);

