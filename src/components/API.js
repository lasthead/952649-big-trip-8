import AdapterTrips from './adapterTrips';
import AdapterOffers from './adapterOffers';
import AdapterDestinations from './adapterDestinations';


const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};
const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};
const toJSON = (response) => {
  return response.json();
};
export default class API {
  constructor({endPoint, authorization}) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getDestinations() {
    return this._load({url: `destinations`})
    .then(toJSON)
    .then(AdapterDestinations.parseDestinations);
  }
  getPoints() {
    return this._load({url: `points`})
    .then(toJSON)
    .then(AdapterTrips.parsePoints);
  }
  getOffers() {
    return this._load({url: `offers`})
      .then(toJSON)
      .then(AdapterOffers.parseOffers);
  }
  createTask({task}) {
  }

  updateTask({id, data}) {
  }

  deleteTask({id}) {
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        console.error(`fetch error: ${err}`);
        throw err;
      });
  }
};
