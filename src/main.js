
import {boardTrips, boardMainFilters} from "./store/const";
import {mockData, filters} from "./store/tripsData";
import Trip from "./components/trip";
import TripEdit from "./components/trip-edit";

const tripsContainer = boardTrips;
const renderTrips = (arrayObjects) => {
  arrayObjects.forEach((item)=>{
    tripEventInit(item);
  });
};
const updateTrip = (trip, i, newTrip) => {

  trip = Object.assign({}, trip, newTrip);
  return trip;
};

const tripEventInit = (trip)=>{
  const tripPoint = new Trip(trip);
  const tripPointEdit = new TripEdit(trip);
  tripsContainer.appendChild(tripPoint.render());
  tripPoint.onClick = () => {
    tripPointEdit.render();
    tripsContainer.replaceChild(tripPointEdit.element, tripPoint.element);
    tripPoint.unrender();
  };
  tripPointEdit.onSubmit = (newObject) => {

    updateTrip(trip, trip.id, newObject);
    // console.log(trip);
    // console.log(newTrip);
    // trip.travelWay = newObject.travelWay;
    // trip.destination = newObject.destination;
    // trip.price = newObject.price;
    // trip.offers = newObject.offers;
    tripPoint.update(trip);
    tripPoint.render();
    tripsContainer.replaceChild(tripPoint.element, tripPointEdit.element);
    tripPointEdit.unrender();
  };
  tripPointEdit.reset = () => {
    tripPointEdit.unrender(tripsContainer);
  };
};
const filtersInit(filtersData) {
  boardMainFilters;

}
renderTrips(mockData());

filtersInit(filters);
