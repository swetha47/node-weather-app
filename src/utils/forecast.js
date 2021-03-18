const { builtinModules } = require("module");
const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  //url =    "http://api.weatherstack.com/current?access_key=85304cbb9f53ac979ed0b2d20c50b9e8&query=37.8267,-122.4233&units=f";
  url = `http://api.weatherstack.com/current?access_key=85304cbb9f53ac979ed0b2d20c50b9e8&query=${latitude},${longitude}&units=f`;

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather stack service", undefined);
    } else if (body.current === null) {
      callback("Unable to get weather information", undefined);
    } else {
      callback(undefined, {
        temperature: body.current.temperature,
        description: body.current.weather_descriptions[0],
        feelslike: body.current.feelslike,
      });
    }
  });
};

module.exports = forecast;
