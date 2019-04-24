
import {boardTrips, boardMainFilters, messageLoading} from "./store/const";
import {filters} from "./store/tripsData";
import Trip from "./components/trip";
import TripEdit from "./components/tripEdit";
import Filter from "./components/filter";
import API from "./components/API";
const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=${Math.random()}`;
const END_POINT = `https://es8-demo-srv.appspot.com/big-trip`;
const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});
let destinations = [];
let offers = [];
api.getOffers()
  .then((response)=> {
    offers = response;
  });
api.getDestinations()
  .then((response)=> {
    destinations = response;
  });
export {destinations, offers};

boardTrips.innerHTML = messageLoading;
api.getPoints()
  .then((points)=>{
    boardTrips.innerHTML = ``;
    points.forEach((item)=>{
      tripEventInit(item);
    })
    .catch((err) => {
      boardTrips.innerHTML = `Something went wrong while loading your route info. Check your connection or try again later. fetch error: ${err}`;
      throw err;
    });
    filtersInit(filters, points);
  });

const tripsContainer = boardTrips;
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
    trip = updateTrip(trip, trip.id, newObject);
    api.updatePoint(trip)
      .then(() => {
        tripPoint.update(trip);
        tripPoint.render();
        tripsContainer.replaceChild(tripPoint.element, tripPointEdit.element);
        tripPointEdit.unrender();
      })
      .catch((err) => {
        boardTrips.innerHTML = `Something went wrong while loading your route info. Check your connection or try again later. fetch error: ${err}`;
        throw err;
      });
  };
  tripPointEdit.reset = () => {
    api.deletePoint(trip)
      .then(()=>{
        tripPointEdit.unrender(tripsContainer);
      });
  };
};

const filterSearch = (filterValue, trips) => {
  const currentDate = new Date().getTime();
  switch (filterValue) {
    case `future`:
      return trips.filter((item) => item.dateFrom > currentDate);
    case `past`:
      return trips.filter((item) => item.dateFrom < currentDate);
    default:
      return trips;
  }
};

const filtersInit = (filtersData, trips) => {
  filtersData.forEach((item)=>{
    const filter = new Filter(item);
    boardMainFilters.appendChild(filter.render());
    filter.onFilter = (event) => {
      boardTrips.innerHTML = ``;
      const filteredItems = filterSearch(event.target.value, trips);
      filteredItems.forEach((filteredItem)=>{
        tripEventInit(filteredItem);
      });
    };
  });
};


