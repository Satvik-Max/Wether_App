const express = require("express");
const bodyparser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.set('view engine', 'ejs'); 

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.post("/", function (request, response) {
  var city = request.body.cityname;
  var query = city;
  var apikey = "3fc2ed540d7f978ba2f5dda8ab423a65";
  var url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +query +"&appid=" +apikey +"&units=metric";

  https.get(url, function (res) {
    res.on("data", function (data) {
      const weatherdata = JSON.parse(data);
      const temp = weatherdata.main.temp;
      const desc = weatherdata.weather[0].description;
      const icon = weatherdata.weather[0].icon;
      const imageurl ="http://openweathermap.org/img/wn/" + icon + "@2x.png";

      response.render('index', { desc: desc, query: query, temp: temp, imageurl: imageurl });
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running on port number 3000");
});
