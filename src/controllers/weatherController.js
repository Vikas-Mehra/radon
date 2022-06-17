const axios = require("axios");

const getWeather = async function (req, res) {
  try {
    let city = req.query.q;
    let appId = req.query.appid;

    let option = {
      method: "get",
      url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appId}`,
    };

    let result = await axios(option);
    console.log(result);
    res.status(200).send({ data: result.data });
  } catch (err) {
    res.status(500).send({ ERROR: err.message });
  }
};

const onlyTemp = async function (req, res) {
  try {
    let city = req.query.q;
    let appId = req.query.appid;
    let option = {
      method: "get",
      url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appId}`,
    };

    let result = await axios(option);
    console.log(result);
    res.status(200).send({ data: result.data.main.temp });
  } catch (err) {
    res.status(500).send({ ERROR: err.message });
  }
};

let cities = [
  "Bengaluru",
  "Mumbai",
  "Delhi",
  "Kolkata",
  "Chennai",
  "London",
  "Moscow",
];

const SortedByTemp = async function (req, res) {
  try {
    let newArr = [];
    let appId = req.query.appid;

    for (let i = 0; i < cities.length; i++) {
      let option = {
        method: "get",
        url: `http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=${appId}`,
      };

      let result = await axios(option);
      newArr.push({ city: result.data.name, temp: result.data.main.temp });
    }

    newArr.sort((a, b) => a["temp"] - b["temp"]);
    res.status(200).send({ data: newArr });
  } catch (err) {
    res.status(500).send({ ERROR: err.message });
  }
};

module.exports.getWeather = getWeather;
module.exports.onlyTemp = onlyTemp;
module.exports.SortedByTemp = SortedByTemp;
