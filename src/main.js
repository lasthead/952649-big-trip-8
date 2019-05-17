
import {cloneDeep} from 'lodash';
import {boardTrips, boardMainFilters, boardMainSortButtons, messageLoading, calculatePrice} from "./store/const";
import {filters, sort} from "./store/tripsData";
import moment from "moment";
import Trip from "./components/trip";
import TripEdit from "./components/tripEdit";
import TripDay from "./components/tripDay";
import Filter from "./components/filter";
import Sort from "./components/sort";
import API from "./components/API";
import {moneyChart} from "./components/Statistic";

const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=${Math.random()}`;
const END_POINT = `https://es8-demo-srv.appspot.com/big-trip`;
const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});
const StatisticElement = document.querySelector(`a[href="#stats"]`);
const TableElement = document.querySelector(`a[href="#table"]`);
let destinations = [];
let offers = [];
let points = [];
moneyChart;
const StatisticHandlerOption = function (e) {
  e.preventDefault();
  document.querySelector(`.statistic`).classList.remove(`visually-hidden`);
  document.querySelector(`main`).classList.add(`visually-hidden`);
};
const TableHandlerOption = function (e) {
  e.preventDefault();
  document.querySelector(`.statistic`).classList.add(`visually-hidden`);
  document.querySelector(`main`).classList.remove(`visually-hidden`);
};
StatisticElement.addEventListener(`click`, StatisticHandlerOption);
TableElement.addEventListener(`click`, TableHandlerOption);

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

const renderPoints = (pointsList) => {
  if (pointsList) {
    const pointsDays = pointsList.reduce((daysCollect, point) => {
      const tripDay = moment(point.dateFrom).format(`MMM DD`);
      if (!daysCollect[tripDay]) {
        daysCollect[tripDay] = [];
      }
      daysCollect[tripDay].push(point);
      return daysCollect;
    }, {});
    boardTrips.innerHTML = ``;
    Object.keys(pointsDays).forEach((dateName, index) => {
      const tripDay = new TripDay(dateName, index + 1);
      const tripDayBlock = tripDay.render();
      const tripDayPointsBlock = tripDayBlock.querySelector(`.trip-day__items`);

      pointsDays[dateName].forEach((item) => {
        const point = tripEventInit(item);
        tripDayPointsBlock.appendChild(point.render());
      });
      tripsContainer.appendChild(tripDayBlock);
    });
  }
};

const initPointsList = () => {
  api.getPoints()
    .then((pointsList) => {
      points = pointsList;
      renderPoints(points);
      filtersInit(filters, points);
      sortInit(sort, points);
    }).catch((err) => {
    boardTrips.innerHTML = `Something went wrong while loading your route info. Check your connection or try again later. fetch error: ${err}`;
    throw err;
  });
};

const tripsContainer = boardTrips;
const updateTrip = (trip, i, newTrip) => {
  trip = Object.assign({}, trip, newTrip);
  return trip;
};

function addNewPoint() {
  const NewPointData = {};
  const newTripPoint = new TripEdit(NewPointData);
  tripsContainer.insertBefore(newTripPoint.render(), tripsContainer.firstChild);
  newTripPoint.onSubmit = (newObject) => {
    api.createPoint(newObject)
      .then(() => {
        const tripPoint = new Trip(newObject);
        tripsContainer.appendChild(tripPoint.render());
        newTripPoint.unrender();
        initPointsList();
      })
      .catch((err) => {
        boardTrips.innerHTML = `Something went wrong while loading your route info. Check your connection or try again later. fetch error: ${err}`;
        throw err;
      });
  };

}
document.querySelector(`.trip-controls__new-event`).addEventListener(`click`, addNewPoint);

const removePoint = (savedPoints, pointId) => {
  return savedPoints.filter((point) => point.id !== pointId);
};
const clickPointHandler = (original, trip) => {
  const tripPointEdit = new TripEdit(trip);
  replaceElements(original, tripPointEdit.render());
  tripPointEdit.onSubmit = (newObject) => {
    points = removePoint(points, trip.id);
    let newPoint = updateTrip(trip, trip.id, newObject);
    points.push(newPoint);
    renderPoints(points);
  };
  tripPointEdit.onCancel = () => {
    replaceElements(tripPointEdit.element, original);
    tripPointEdit.unrender(tripsContainer);
  };
  tripPointEdit.reset = () => {
    api.deletePoint(trip)
      .then(()=>{
        tripPointEdit.unrender(tripsContainer);
      });
  };
};

const tripEventInit = (trip)=>{
  const tripPoint = new Trip(trip);
  tripPoint.onClick = clickPointHandler;
  return tripPoint;
};

const replaceElements = (original, replacement) => {
  original.parentNode.insertBefore(replacement, original.nextSibling);
  original.parentNode.removeChild(original);
  original = null;
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

const sortTrips = (sortValue, trips) => {
  switch (sortValue) {
    case `event`:
      return trips.sort((a, b) => (a.id > b.id ? 1 : -1));
    case `time`:
      return trips.sort((a, b) =>
        moment(a.timeStart) - moment(a.timeEnd) > moment(b.timeStart) - moment(b.timeEnd) ? 1 : -1
      );
    case `price`:
      return trips.sort((a, b) => calculatePrice(a) < calculatePrice(b) ? 1 : -1);
    default:
      return trips;
  }
};

const filtersInit = (filtersData, pointsList) => {
  boardMainFilters.innerHTML = ``;

  filtersData.forEach((item)=>{
    const filter = new Filter(item);
    boardMainFilters.appendChild(filter.render());
    filter.onFilter = () => {
      boardTrips.innerHTML = ``;
      const filteredItems = filterSearch(item.name.toLowerCase(), pointsList);
      renderPoints(filteredItems);
    };
  });
};

const sortInit = (sortData, pointsList) => {
  boardMainSortButtons.innerHTML = ``;
  sortData.forEach((item)=>{
    const sortButton = new Sort(item);
    boardMainSortButtons.appendChild(sortButton.render());
    sortButton.onClick = () => {
      boardTrips.innerHTML = ``;
      const sortItems = sortTrips(item.name.toLowerCase(), pointsList);
      renderPoints(sortItems);
    };
  });
};

initPointsList();
