
import {boardTrips, boardMainFilters} from "./store/const";
import {mockData, filters} from "./store/tripsData";
import Trip from "./components/trip";
import TripEdit from "./components/trip-edit";
import Filter from "./components/filter";

const tripsContainer = boardTrips;
const tripsArray = mockData();
const renderTrips = (arrayObjects) => {
  boardTrips.innerHTML = ``;
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
    tripPoint.update(trip);
    tripPoint.render();
    tripsContainer.replaceChild(tripPoint.element, tripPointEdit.element);
    tripPointEdit.unrender();
  };
  tripPointEdit.reset = () => {
    tripPointEdit.unrender(tripsContainer);
  };
};

const filterSearch = (filterValue, trips) => {
  const currentDate = new Date().getTime();
  switch (filterValue) {
    case `future`:
      return trips.filter((item) => item.from > currentDate);
    case `past`:
      return trips.filter((item) => item.from < currentDate);
    default:
      return trips;
  }
};

const filtersInit = (filtersData, trips) => {
  filtersData.forEach((item)=>{
    const filter = new Filter(item);
    boardMainFilters.appendChild(filter.render());
    filter.onFilter = (event) => {
      const filteredItems = filterSearch(event.target.value, trips);
      renderTrips(filteredItems);
    };
  });
};

renderTrips(tripsArray);

filtersInit(filters, tripsArray);
