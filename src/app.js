const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

const publicDirectory = path.join(__dirname, "../public");
const viewDirectory = path.join(__dirname, "../templates/views");
const partialsDirectoty = path.join(__dirname, "../templates/partials");
const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "hbs");
app.set("views", viewDirectory);
hbs.registerPartials(partialsDirectoty);

app.use(express.static(publicDirectory));

app.get("", (req, res) => {
  res.render("index", {
    title: "WeatherApp Page",
    name: "Swetha",
    footernotes: "This page belongs to Swetha",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page",
    name: "Swetha katipalli",
    footernotes: "This page belongs to Swetha Katipalli",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    name: "swetha",
    title: "Help page",
    footernotes: "This page belongs to swetha",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send("You must enter an adrress to display weather.");
  } else {
    geocode(req.query.address, (error, { latitude, longitude, place } = {}) => {
      if (error) {
        res.send(error);
      } else {
        forecast(latitude, longitude, (error, { temperature }) => {
          if (error) {
            res.send(error);
          } else {
            res.send({
              place: place,
              temperature: temperature,
            });
          }
        });
      }
    });
  }
});
app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "Error",
    footernotes: "This page was an error",
    errormessage: "Help article not found",
  });
});
app.get("*", (req, res) => {
  res.render("error", {
    title: "Error",
    footernotes: "This page was an error",
    errormessage: "Page not found",
  });
});

app.listen(port, () => {
  console.log(`The server is up and running on ${port}`);
});
