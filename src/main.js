
import {boardTrips} from "./store/const";
import tripData from "./store/tripsData";
import Trip from "./components/trip";
import TripEdit from "./components/trip-edit";

const trip = tripData();
const tripsContainer = boardTrips;
const firstTrip = new Trip(trip);
const firstTripEdit = new TripEdit(trip);

tripsContainer.appendChild(firstTrip.render());
firstTrip.onClick = () => {
  firstTripEdit.render();
  tripsContainer.replaceChild(firstTripEdit.element, firstTrip.element);
  firstTrip.unrender();
};
firstTripEdit.onSubmit = (newObject) => {
  trip.travelWay = newObject.travelWay;
  trip.destination = newObject.destination;
  trip.price = newObject.price;
  trip.offers = newObject.offers;
  // trip.title = newObject.title;
  //console.log(newObject);
  firstTrip.update(trip);
  firstTrip.render();
  tripsContainer.replaceChild(firstTrip.element, firstTripEdit.element);
  firstTripEdit.unrender();
};
firstTripEdit.reset = () => {
  firstTripEdit.unrender(tripsContainer);
};
