request = require("postman-request");

const geocode = function (address, callback) {
  urlMapbox =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoic3dldGhhNDc3NCIsImEiOiJja2xpY21mcDUwMzAyMm9tdGkyaGU3MmY3In0.qZrBmN6viBZ5Bx2flmJVXA&limit=1";

  request({ url: urlMapbox, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the address url.", undefined);
    } else if (body.features.length < 1) {
      callback("Unable to find the location", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        place: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
